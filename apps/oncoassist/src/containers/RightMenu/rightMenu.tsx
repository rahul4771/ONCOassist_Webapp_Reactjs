import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./rightMenu.module.scss";
import { FaChevronRight } from "react-icons/fa";
import { useMenuItems } from "../../constants/menuConstants";
import { toggleLeftMenu, selectMenu, setAuthScreenOn, LeftMenuState } from "../../store/leftMenuReducer";
import { UserState} from "../../store/userEmailSlice";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; 
import AuthRightMenu from "../../components/AuthRightMenu/authRightMenu";
import { FaArrowLeft } from "react-icons/fa";
import searchListData from "../../utils/SearchList.json"; 
import SearchComponent from "../../components/SearchComponent/SearchComponent"
import { setRedirectIframeLink, setRedirectLink, setRedirectLoginClick } from "../../store/rightMenuReducer";
import { SponsoredSearchState } from '../../store/sponsoredSearchSlice';
import { config } from '@oncoassist/shared/constants';
import { getApi } from '@oncoassist/shared/api';
import { useGetSponsoredResultsQuery,useLazyGetSponsoredResultsQuery } from "../../api/sponsoredSearchApi";
import { setSponsoredResults, setLoading, setError } from "../../store/sponsoredSearchSlice";



const RightMenu: React.FC = () => {

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuItems = useMenuItems();
  const { t } = useTranslation();

  const isLeftMenuOpen = useSelector((state: { leftMenu: LeftMenuState }) => state.leftMenu.isLeftMenuOpen);
  const selectedMenu = useSelector((state: { leftMenu: LeftMenuState }) => state.leftMenu.selectedMenu);
  const isAuthScreenOn = useSelector((state: { leftMenu: LeftMenuState }) => state.leftMenu.isAuthScreenOn);
  const isAuthenticated = useSelector((state: { userEmail: UserState }) => state.userEmail.opUserEmail);

  interface UserDetails {
      opuseremail: string;
      userID: string;
      username: string;
      country: string;
      Profession: string;
      first_name: string;
      second_name: string;
      Is_Accept_GDPR_App: boolean;
      created_at: number;
      primarySpecialityName: string;
      cancer_specialist_types_select_names: string[];
      hcpvalidationVal:string;
      HCP_Registration_Id: string;
      country_object_id: string;
      userJobdescription: string;
      userSpecialityIds : string[];
  }
  
  const [userData, setUserData] = useState<UserDetails | null>(null);
  const [isSessionAuthenticated, setIsSessionAuthenticated] = useState(false);

  useEffect(() => {
      const getUserDetails = async () => {
        const data = await getApi<UserDetails>(
          config.webappURL + config.userDetailsEndpoint
        );
  
  
        if (data && data.opuseremail && data.userID) {
          setUserData(data);
          setIsSessionAuthenticated(true);
        }
        else {
          setUserData(null);
          setIsSessionAuthenticated(false);
        }
      };
  
      if (isAuthenticated) {
        getUserDetails();
      }
  }, [isAuthenticated]);

  const [triggerSponsoredQuery, { data: sponsoredSearchData, error: sponsoredSearchError, isLoading: sponsoredSearchLoading }] =  useLazyGetSponsoredResultsQuery();
    useEffect(() => {
      if (userData?.country_object_id && userData?.Profession && userData?.userJobdescription) {
        const rawSpecialities =  Array.isArray(userData.userSpecialityIds)
            ? userData.userSpecialityIds
            : (userData.userSpecialityIds as string).split(',');
              
        triggerSponsoredQuery({
          country_object_id: userData.country_object_id,
          profession: userData.Profession,
          specialities: rawSpecialities,
          jobdescription: userData.userJobdescription,
          hcpStatus: userData.hcpvalidationVal,
          hcp_id: userData.HCP_Registration_Id,
          user_id: userData.userID
        })
        .unwrap()
        .then((res) => {
          //console.log('Sponsored API success:', res);
        })
        .catch((err) => {
          console.error('Sponsored API error:', err);
        });
      }
    }, [userData]);

    useEffect(() => {  
        if (sponsoredSearchError) {
            console.log('setSponsored not fetched----');
            dispatch(setError("Failed to load sponsored results"));
        } else if (sponsoredSearchData) {
            console.log('setSponsoredResults dispatched----');
            dispatch(setSponsoredResults(sponsoredSearchData)); 
        }
    }, [sponsoredSearchData, sponsoredSearchError, sponsoredSearchLoading, dispatch]);
  

  const prevSelectedMenu = useRef<string | null>(null);

  useEffect(() => {
    if (prevSelectedMenu.current !== selectedMenu) {
      setSelectedSubMenu(null);
      setSelectedSubMenu(null);
      setSearchTerm("");
      prevSelectedMenu.current = selectedMenu;
    }
  }, [selectedMenu]);

  const [isOpen] = useState(true);

  const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState<any[]>([]);

  interface SearchItem {
    section: string;
    synonyms: string[];
    title: string;
    deeplink: string;
    type: number;
  }

  

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredResults([]);
      return;
    }
    const results = searchListData.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    setFilteredResults(results);
  }, [searchTerm]);

  const selectedMenuItem = menuItems.find((menu) => menu.name === selectedMenu);
  let subItems = selectedMenuItem?.subItems || [];
  const selectedSubMenuItem = subItems.find((item) => item.name === selectedSubMenu);
  const subSubItems = selectedSubMenuItem?.subSubItems || [];
  const isMenuOpen = !isOpen || !selectedMenu || selectedMenu === t("HOME");
  
  const isFavoritesSelected = selectedMenu === t("FAVORITES");
  const isProfileSelected = selectedMenu === t("PROFILE");
  const isSearchSelected = selectedMenu === t("SEARCH");
  const isOpSelected = selectedMenu === t("ONCOPATIENT");

  useEffect(() => {
    if (isSearchSelected && isAuthenticated) {
      dispatch(setAuthScreenOn(false));
    }
  },[isSearchSelected, isAuthenticated, dispatch]);


  if(isLeftMenuOpen) return null;
  if(isFavoritesSelected && isAuthenticated) {
    return null;
  }
  if(isProfileSelected && isAuthenticated) {
    return null;
  }
  if(isOpSelected && isAuthenticated) {
    return null;
  }


 
  const toggleMenu = () => {
    if (isFavoritesSelected || (!selectedSubMenu && !isSearchSelected)) {
      dispatch(selectMenu(null));
      if (!isLeftMenuOpen)
        dispatch(toggleLeftMenu(true));
    }

    else if (isAuthScreenOn && selectedSubMenu)  {
      dispatch(setAuthScreenOn(false));
    } 

    else if (isAuthScreenOn && isSearchSelected)  {
      dispatch(setAuthScreenOn(false));
    }

    else if (selectedSubMenu) {
      setSelectedSubMenu(null);
      dispatch(setAuthScreenOn(false));
    }
    else {
      dispatch(selectMenu(null));
      dispatch(setAuthScreenOn(false));
      dispatch(toggleLeftMenu(true));
    }
  };


  const handleClick = (link: string, iFrameLink: string, id: string) => {
    if(id)
      id = "/"+id

    if (!isAuthenticated) {
      dispatch(setRedirectLink(link));
      dispatch(setRedirectIframeLink(iFrameLink+id));
      dispatch(setAuthScreenOn(true));
    } else {
      dispatch(setRedirectLink(null));
      dispatch(setRedirectIframeLink(null));
      dispatch(setRedirectLoginClick(false));

      dispatch(setAuthScreenOn(false));
      dispatch(selectMenu(null));
      dispatch(toggleLeftMenu(true));
      setSelectedSubMenu(null);
      navigate(iFrameLink+id, { state: { iframeSrc: link }});
    }
  };
  
  //condition to hide nccn tool in US, UK and Canada
  const nccnRestrictedCountries = ['united states', 'united kingdom', 'canada'];
  const userCountryfetched = localStorage.getItem('opgeoid')?.toLowerCase();
  const userCountry = userCountryfetched ? userCountryfetched.split('-')[0].trim() : '';

  subItems = subItems.filter(
    (item) => item.iFrameLink !== 'nccn_protocol' || !nccnRestrictedCountries.includes(userCountry)
  );

    // Get the value from localStorage, defaulting to '0' if it's null
    const restrictionValue = localStorage.getItem('isProductServiceRestricted') || '0';
    // Convert to boolean
    const isProductServiceRestricted = restrictionValue === '1';
    if (isProductServiceRestricted) {
      subItems = subItems.filter(
        (item) => item.iFrameLink !== 'productservices'
      );
      }

  const renderComponent = () => {
    if (isAuthScreenOn) return null;

    if (selectedSubMenu && subSubItems.length > 0) {
      return (
        <ul className={styles.subMenu}>
          {subSubItems.map((subSubItem, index) => (
            <li key={`${selectedSubMenu}-${index}`} className={styles.subMenuItem}>
              <a
                href={subSubItem.link}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(subSubItem.link, subSubItem.iFrameLink ?? "", subSubItem.id ?? "");
                }}
                className={styles.menuLink}
              >
                <span className={styles.label}>{subSubItem.name}</span>
              </a>
            </li>
          ))}
        </ul>
      )
    }

    if (subItems.length > 0) {
      return (
        <ul className={styles.subMenu}>
          {subItems.map((subItem, index) => {
            const subKey = `${selectedMenu}-${index}`;
            return (
              <li key={subKey} className={`${styles.subMenuItem} ${styles.menuLink}`}>
                <a
                  href={subItem.link}
                  onClick={(e) => {
                    e.preventDefault();
                    if (subItem.subSubItems) {
                      setSelectedSubMenu(subItem.name);
                    } else {
                      handleClick(subItem.link, subItem.iFrameLink ?? "", "");
                    }
                  }}
                  className={styles.menuLink}
                >
                  <span className={styles.label}>{subItem.name}</span>
                  {subItem.subSubItems && <FaChevronRight className={styles.arrowIcon} />}
                </a>
              </li>
            );
          })}
        </ul>
      )
    }
  }


  const handleSelect = (item: { title: string; deeplink: string }) => {
    console.log("Selected:", item); // Handle selection (e.g., open deep link)
    window.location.href = item.deeplink; // Example: navigate to deeplink
  };


  return (
    <div
      className={`${styles.rightMenu} ${isAuthenticated ? styles.fullHeight : styles.reducedHeight} ${isMenuOpen ? styles.closed : styles.open}`}
      style={{
        backgroundColor: isAuthScreenOn ? "white" : "#2B93D1",
      }}
    >
      {/* Header Section */}
      <div className={styles.header}>
        <button onClick={toggleMenu} className={styles.toggleButton}>
          <FaArrowLeft className={styles.rightMenuIconCollapse} 
          style={{ color: isAuthScreenOn ? "#57b4e6" : "white" }}/>
        </button>
        <h4
          className={styles.menuTitle}
          style={{ color: isAuthScreenOn ? "black" : "white" }}
        >
          {selectedSubMenuItem?.subSubItems ? selectedSubMenu : selectedMenuItem?.name || ''}
        </h4>
      </div>
      {/* Show AuthRightMenu if user is NOT authenticated (except for SEARCH) */}
      {isAuthScreenOn &&
       <AuthRightMenu
          title={t(
            isFavoritesSelected 
              ? "SIGN_IN_TO_SAVE" 
              : isProfileSelected 
                ? "SIGN_IN_TO_ACCESS_PROFILE" 
                : "SIGN_IN_TO_ACCESS_TOOLS"
          )}
          subtitle={t(
            isFavoritesSelected 
              ? "SAVE_ICON_INFO" 
              : isProfileSelected 
                ? "PROFILE_ACCESS_INFO" 
                : "TOOLS_ACCESS_INFO"
          )}
          signInPath={"public/index.php/login"}
          signUpPath={"public/index.php/signup"}
        />        
        }

      <div className={styles.menuContent}>
        {renderComponent()}
      </div>
      {selectedMenu === t("SEARCH") && !isAuthScreenOn && ( <SearchComponent onSelect={handleSelect}/> )}
      </div>

  );
};

export default RightMenu;
