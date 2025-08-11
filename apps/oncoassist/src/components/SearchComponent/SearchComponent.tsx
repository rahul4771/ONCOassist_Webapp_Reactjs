import React, { useEffect, useRef, useState } from "react";
import searchData from "../../utils/SearchList.json"; 
import styles from "./SearchComponent.module.scss"; 
import { useNavigate } from 'react-router-dom';
import { config } from "@oncoassist/shared/constants";
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { CiSearch } from "react-icons/ci";
import { selectMenu, setAuthScreenOn, toggleLeftMenu} from "../../store/leftMenuReducer";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../../store/userEmailSlice";
import { logFirebaseEvent } from "../../utils/firebaseUtils";
import { useTranslation } from "react-i18next";
import { RightMenuState, setSearchedText, setRedirectLink, setRedirectIframeLink, setRedirectLoginClick } from "../../store/rightMenuReducer";
import { ImCross } from "react-icons/im";


interface SearchItem {
  section: string;
  synonyms: string[];
  title: string;
  deeplink: string;
  type: number;
}

interface SearchComponentProps {
  onSelect: (item: SearchItem) => void; // Callback to handle selection
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState<string>("");
  const userProfession = useSelector((state: { userEmail: UserState }) => state.userEmail.userProfession);
  const userPrimarySpeciality = useSelector((state: { userEmail: UserState }) => state.userEmail.userPrimarySpeciality);
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state: { userEmail: UserState }) => state.userEmail.opUserEmail);
  const isSearchEditable = useSelector((state: { rightMenu: RightMenuState }) => state.rightMenu.isSearchEditable);
  const searchedText = useSelector((state: { rightMenu: RightMenuState }) => state.rightMenu.searchedText);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchEditable && inputRef.current) {
      inputRef.current.focus(); 
    }
  }, [isSearchEditable]);

  useEffect(() => {
    if (searchedText) {
      handleSearch(searchedText);      
      //Firebase events
      logFirebaseEvent("Global_Search_Term", {
        profession : userProfession,
        primary_speciality: userPrimarySpeciality,
        search_term: searchText,
        segment_selected: 'Tools & Contents',
        search_count: searchText.length,
      }); 

    }
  }, [searchedText]);


const handleSearch = (input: string) => {
  if (isAuthenticated) {
  dispatch(setSearchedText(input));
  }
    setQuery(input);
    if (input.trim() === "") {
      setResults([]); // Clear results if input is empty
      return;
    }

    const lowerInput = input.toLowerCase(); 
   

    // Second: Filter results based on synonyms if title matches are empty
    let searchMatches = filterSearchList(lowerInput,searchData)

    //condition to hide nccn tool in US, UK and Canada
    const nccnRestrictedCountries = ['united states', 'united kingdom', 'canada'];
    const userCountryfetched = localStorage.getItem('opgeoid')?.toLowerCase();
    const userCountry = userCountryfetched ? userCountryfetched.split('-')[0].trim() : '';

    searchMatches = searchMatches.filter(
      (item) => item.deeplink !== 'oncoassist://nccn' || !nccnRestrictedCountries.includes(userCountry)
    );

    // Combine results with title matches first
    setResults([...searchMatches]);


};

const filterSearchList = (searchText : string, searchList:SearchItem[]) => {
  if (!searchText) return [];

    
  setSearchText(searchText);

  const completeSearchList = [...searchList];

  // Filter by title containing searchText
  let filteredList = completeSearchList.filter(
      (item) => item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // Sort by title length
  filteredList.sort((a, b) => a.title.length - b.title.length);

  // Priority results with title starting with searchText
  let priorityResults = filteredList.filter(
      (item) => item.title.toLowerCase().startsWith(searchText.toLowerCase())
  );

  priorityResults.sort((a, b) => a.title.length - b.title.length);

  // Remove priority results from filteredList
  filteredList = filteredList.filter((item) => !priorityResults.includes(item));

  // Append remaining results
  priorityResults = [...priorityResults, ...filteredList];
  filteredList = priorityResults.sort((a, b) => a.type - b.type);

  // Synonym-based search
  const synonymSearch = completeSearchList.filter((item) =>
      item.synonyms.some((synonym: string) => synonym.toLowerCase().includes(searchText.toLowerCase()))
  );

  synonymSearch.sort((a, b) => a.type - b.type);

  synonymSearch.forEach((item) => {
      if (!filteredList.includes(item)) {
          filteredList.push(item);
      }
  });

  filteredList = [...filteredList];
  return filteredList;
};

const navigate = useNavigate();


const handleClick = (deepLink: string | null, type: number, title: string | null) => {
  if (!deepLink) return;

  // Extract deep link parts
  const match = deepLink.match(/^oncoassist:\/\/(.+)$/);
  const deepLinkPart1 = match ? match[1] : null;

  const match2 = deepLink.match(/^oncoassist:\/\/([^/]+)\/?([^/]*)?/);
  const deepLinkPart2: string = match2?.[2] ?? "";

  let searchLink = `${config.webappURLString}${deepLinkPart1}`;
  let navigateTo = "";
  let validLink = true;
  let inAppLink = false;
  let inAppLinkfs = false;

  // Determine navigation based on deep link type
  switch (true) {
    case deepLinkPart1?.includes("prognostic"):
      navigateTo = "prognostic_score";
      break;

    case deepLinkPart1?.includes("formulas"):
      navigateTo = "formula";
      break;

    case deepLinkPart1?.includes("adjuvant"):
      navigateTo = "adjuvant_tool";
      break;

    case deepLinkPart1?.includes("ajcc8"): {
      const params = new URLSearchParams({ version: "8", name: deepLinkPart2 }).toString();
      searchLink = `${config.webappURLString}ajcc/search?${params}`;
      navigateTo = "ajcc_tnm_staging";
      break;
    }

    case deepLinkPart1?.includes("ajcc9"): {
      const params = new URLSearchParams({ version: "9", name: deepLinkPart2 }).toString();
      searchLink = `${config.webappURLString}ajcc/search?${params}`;
      navigateTo = "ajcc_tnm_staging";
      break;
    }

    case deepLinkPart1?.includes("abctool"):
      navigateTo = "abc_tool";
      break;

    case deepLinkPart1?.includes("dic"):
      navigateTo = "drug_interaction_checker";
      break;

    case deepLinkPart1?.includes("nccn"):
      navigateTo = "nccn_protocol";
      break;

    case deepLinkPart1?.includes("ctcae5"): {
      const params = new URLSearchParams({ item: deepLinkPart2 }).toString();
      searchLink = `${config.webappURLString}ctcae_v5?${params}`;
      navigateTo = "toxicity_grading";
      break;
    }

    case deepLinkPart1?.includes("ctcae"): {
      const params = new URLSearchParams({ item: deepLinkPart2 }).toString();
      searchLink = `${config.webappURLString}ctcae_v4?${params}`;
      navigateTo = "toxicity_grading";
      break;
    }

    case deepLinkPart1?.includes("ajcc"): {
      const params = new URLSearchParams({ version: "7", item: deepLinkPart2 }).toString();
      searchLink = `${config.webappURLString}ajcc?${params}`;
      navigateTo = "ajcc_tnm_staging";
      break;
    }

    case deepLinkPart1?.includes("mcrpct"):
        inAppLink = true;
        navigateTo = 'mcrpc_prostate';
      break;

    case deepLinkPart1?.includes("fongscore"):
        inAppLinkfs = true;
        navigateTo = 'fongscore';
      break;

    default:
      validLink = false;
      console.warn(`Invalid or unsupported deep link section: ${deepLinkPart1}`);
      break;
  }

   
  if (!isAuthenticated) {
    dispatch(setRedirectLink(searchLink));
    dispatch(setRedirectIframeLink(navigateTo));
    dispatch(setAuthScreenOn(true));
    return;
  }

  dispatch(setRedirectLink(null));
  dispatch(setRedirectIframeLink(null));
  dispatch(setRedirectLoginClick(false));
  // Navigate to the determined path
  if(inAppLink === true){
    navigate('/mcrpc_prostate');  
    return    
  }
  if(inAppLinkfs === true){
    navigate('/fongscore');  
    return    
  }
  if (validLink && navigateTo) {
    navigate(navigateTo, { state: { iframeSrc: searchLink } });
    dispatch(toggleLeftMenu(true));
  }
};


  return (
    <div className={styles.searchContainer}>
      {/* Search Input */}
      <div className={styles.searchBox}>
      <div className={styles.searchIconWrapper}>
        <CiSearch className={styles.searchIcon}/>
      </div>
        <input
          ref={inputRef}
          type="text"
          className={styles.searchInput}
          placeholder={t('SEARCH_PLACEHOLDER')}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {query && (
          <button
            className={styles.clearButton}
            onClick={() => {
              handleSearch(""); 
              setTimeout(() => {
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }, 0);
            }}
            aria-label="Clear search"
          >
            <ImCross className={styles.clearIcon} />
          </button>
        )}
      </div>

    
       {/* Search Results - Display Below the Search Box */}
      {results.length > 0 && (
        <div className={styles.resultContainer}
        style={{
          height: isAuthenticated ? '80vh' : 'calc(100% - 160px)',
        }}
        >
        <ListGroup as="ol"  className="mt-3">
          {results.map((item, index) => (
            <ListGroup.Item
              as="li"
              key={index}
              className="d-flex justify-content-between align-items-start"
              onClick={() => handleClick(item.deeplink ?? null, item.type ?? null , item.title ?? null)}
              style={{ cursor: 'pointer', fontSize:"15px", padding: "5px 10px" }} 
            >
              <div className="ms-2 me-auto">
                <div >{item.title}</div>
                <small className="text-muted">{item.section}</small>
              </div>
              {/* <Badge bg="primary" pill>
              Sponsored
            </Badge> */}
            </ListGroup.Item>
          ))}
        </ListGroup>
        </div>
      )
      }
    </div>
  );
};

export default SearchComponent;
