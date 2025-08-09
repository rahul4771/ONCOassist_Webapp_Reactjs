import React, { useEffect, useRef, useState } from "react";
import searchData from "../../utils/SearchList.json";
import styles from "./SearchComponent.module.scss";
import { useNavigate } from 'react-router-dom';
import { config } from "@oncoassist/shared/constants";
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { CiSearch } from "react-icons/ci";
import { selectMenu, setAuthScreenOn, toggleLeftMenu } from "../../store/leftMenuReducer";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../../store/userEmailSlice";
import { logFirebaseEvent } from "../../utils/firebaseUtils";
import { useTranslation } from "react-i18next";
import { RightMenuState, setSearchedText, setRedirectLink, setRedirectIframeLink, setRedirectLoginClick } from "../../store/rightMenuReducer";
import { ImCross } from "react-icons/im";
import { SponsoredSearchState } from "../../store/sponsoredSearchSlice";



interface SearchItem {
  section: string;
  synonyms: string[];
  title: string;
  deeplink: string;
  type: number;
  content: string;
  sub_title: string;
  isSponsored:number;
  sponsored_logo:string;
}

interface SearchComponentProps {
  onSelect: (item: SearchItem) => void; // Callback to handle selection
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const sponsoredResults = useSelector((state: { sponsoredData: SponsoredSearchState }) => state.sponsoredData.sponsoredResults);
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
        profession: userProfession,
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


    setSearchText(input);

    const lowerInput = input.toLowerCase();

    const matchedSponsoredItems = sponsoredResults.filter((item) =>
      item.synonyms?.some((synonym: string) =>
        synonym.toLowerCase().includes(lowerInput)
      )
    );

    // Log separate Firebase events for each sponsored item matched
    matchedSponsoredItems.forEach((item) => {
      logFirebaseEvent("Search_Sponsored_Displayed", {
        profession: userProfession,
        primary_speciality: userPrimarySpeciality,
        search_term: input,
        title: item.title,
        subtitle: item.sub_title,
      });
    });


    // Second: Filter results based on synonyms if title matches are empty
    let searchMatches = filterSearchList(lowerInput, searchData, sponsoredResults)

    //condition to hide nccn tool in US, UK and Canada
    const nccnRestrictedCountries = ['united states', 'united kingdom', 'canada'];
    const userCountryfetched = localStorage.getItem('opgeoid')?.toLowerCase();
    const userCountry = userCountryfetched ? userCountryfetched.split('-')[0].trim() : '';

    //console.log('filterSearchList---');
    //console.log(searchMatches);
    searchMatches = searchMatches.filter(
      (item) => item.deeplink !== 'oncoassist://nccn' || !nccnRestrictedCountries.includes(userCountry)
    );

    // Combine results with title matches first
    setResults([...searchMatches]);


  };

  const filterSearchList = (searchText: string, searchList: SearchItem[], sponsoredResults: any[]) => {
    if (!searchText) return [];


    const completeSearchList = [...searchList, ...sponsoredResults];




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
    const filteredSponsoredResults = filteredList.filter(item => item.type === 8);

    filteredList = filteredList.filter(item => !filteredSponsoredResults.includes(item));
    filteredList = [...filteredSponsoredResults, ...filteredList];
    return filteredList;
  };

  const navigate = useNavigate();




  const handleClick = (item: SearchItem, searchTerm: string) => {

    console.log('searchText--');
    console.log(searchText);
    if ((item.type === 8 && !item.content) || (item.type !== 8 && !item.deeplink)) return;

    const deeplink = item.type === 8 ? item.content : item.deeplink;

    if (item.type === 8) {
      logFirebaseEvent("Search_Sponsored_Selected", {
        profession: userProfession,
        primary_speciality: userPrimarySpeciality,
        chosen_title: item.title,
        search_term: searchText,
        chosen_section: "sponsored_search",
      });
    }


    // Extract deep link parts
    const match = deeplink.match(/^oncoassist:\/\/(.+)$/);
    const deepLinkPart1 = match ? match[1] : null;

    const match2 = deeplink.match(/^oncoassist:\/\/([^/]+)\/?([^/]*)?/);
    const deepLinkPart2: string = match2?.[2] ?? "";

    const match3 = deeplink.match(/^oncoassist:\/\/[^/]+\/[^/]+\/([^/]+)/);
    const deepLinkPart3: string = match3?.[1] ?? "";

    console.log('Deeplink');
    console.log('type--' + item.type);
    console.log(deeplink);
    console.log(deepLinkPart1);
    console.log(deepLinkPart2);

    let searchLink = `${config.webappURLString}${deepLinkPart1}`;
    let navigateTo = "";
    let validLink = true;

    // Determine navigation based on deep link type
    switch (true) {
      case deepLinkPart1?.includes("prognostic"): {
        const formatted_id = deepLinkPart2.toLowerCase().replace(/\s+/g, '_');
        if (deepLinkPart3){
          const formatted_deeplinkPart3 = deepLinkPart3.toLowerCase().replace(/\s+/g, '_');
          navigateTo = "prognostic_score/"+formatted_deeplinkPart3;
          // navigateTo = "prognostic_score/"+formatted_id+"/"+formatted_deeplinkPart3;
        }
        else{
          navigateTo = "prognostic_score/"+formatted_id;
        }
        break;
      }

      case deepLinkPart1?.includes("formulas"):{
        const formatted_id = deepLinkPart2.toLowerCase().replace(/\s+/g, '_');
        if (deepLinkPart3){
          const formatted_deeplinkPart3 = deepLinkPart3.toLowerCase().replace(/\s+/g, '_');
          navigateTo = "formula/"+formatted_deeplinkPart3;
          // navigateTo = "formula/"+formatted_id+"/"+formatted_deeplinkPart3;
        }
        else{
        navigateTo = "formula/"+formatted_id;
        }
        break;
      }

      case deepLinkPart1?.includes("adjuvant"):{
        const formatted_id = deepLinkPart2.toLowerCase().replace(/\s+/g, '_');
        if (deepLinkPart3){
          const formatted_deeplinkPart3 = deepLinkPart3.toLowerCase().replace(/\s+/g, '_');
          navigateTo = "adjuvant_tool/"+formatted_deeplinkPart3;
          // navigateTo = "adjuvant_tool/"+formatted_id+"/"+formatted_deeplinkPart3;
        }
        else{
        navigateTo = "adjuvant_tool/"+ formatted_id;
        }
        break;
      }

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

      case deepLinkPart1?.includes("druginfo"): {
        searchLink = `${config.webappURLString}spc_drug_info/spc_details/${deepLinkPart2}`;
        navigateTo = "drug_info";
        break;
      }

      case deepLinkPart1?.includes("cms"): {
        searchLink = `${config.webappURLString}cmsdetail/${deepLinkPart2}`;
        navigateTo = "drug_info";
        break;
      }


      default:
        validLink = false;
        console.warn(`Invalid or unsupported deep link section: ${deepLinkPart1}`);
        if (isAuthenticated) {
          window.open(deeplink, '_blank');
          return;
        }

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
          <CiSearch className={styles.searchIcon} />
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
          <ListGroup as="ol" className="mt-3">
            {results.map((item, index) => (
              <ListGroup.Item
                as="li"
                key={index}
                className="d-flex justify-content-between align-items-start"
                onClick={() => handleClick(item, searchText)}
                style={{ cursor: 'pointer', fontSize: "15px", padding: "5px 10px" }}
              >
                <div className="ms-2 me-auto">
                  <div >{item.title}</div>
                  {item.type === 8 ? (
                    <small className="text-muted">{item.sub_title}</small>
                  ) : (
                    <small className="text-muted">{item.section}</small>
                  )}
                </div>
                {/* <Badge bg="primary" pill>
              Sponsored
            </Badge> */}
              {item.isSponsored === 1 && (
                <img
                  src={item.sponsored_logo || '/assets/sponsored.png'}
                  alt="Sponsored"
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 80,
                    height: 'auto', // Maintain aspect ratio
                    maxHeight: 25, // Restrict maximum height
                    objectFit: 'contain',
                  }}
                />
              )}
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
