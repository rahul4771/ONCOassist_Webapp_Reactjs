import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './dashboard.module.scss';
import { reviews } from '../../constants/reviewConstants';
import { config, SOCIAL_MEDIA_LINKS } from '@oncoassist/shared/constants';
import AppStoreButtons from '../../components/AppStoreButton/appStorebutton';
import NewsCard from '../../components/NewsCard/newsCard';
import { useTranslation } from 'react-i18next';
import { useGetNewsQuery } from '../../api/newsApi';
import { useDispatch, useSelector } from 'react-redux';
import {
  LeftMenuState,
  selectMenu,
  toggleLeftMenu,
} from '../../store/leftMenuReducer';
import { VoteState } from '../../store/voteSlice';
import classNames from 'classnames';
import { UserState } from '../../store/userEmailSlice';
import { RightMenuState, setRedirectIframeLink, setRedirectLink, setRedirectLoginClick, setSearchEditable } from "../../store/rightMenuReducer";
import { useIntercom } from 'react-use-intercom';
import { getApi } from '@oncoassist/shared/api';
import { useNavigate,useLocation } from 'react-router-dom';
import { useCombinedAds } from '../../hooks/useCombinedAds';

import BannerAd from '../../components/BannerAd/bannerAd';
import ProgrammaticAd from '../../components/ProgrammaticAd/programmaticAd';
import { logFirebaseEvent } from "../../utils/firebaseUtils";
import store from '../../store/store';
import { getUnifiedSearchParams } from '../../utils/urlUtils';


export function Dashboard() {
  interface NewsItem {
    id: number;
    title: string;
    description: string;
    thumb_image: string;
    rss_feed?: { rss_channel?: { name?: string } };
    link: string;
    publication_date: string;
    vote_count: number;
    votedornot: number;
  }


  useEffect(() => {
    const params = getUnifiedSearchParams();
    const isOrganicValue = params.get('is_organic'); // Gets the value like "0" or "1"   
    if (isOrganicValue === '0') {
      const utmParams: Record<string, string> = {};
      params.forEach((v, k) => {
        utmParams[k] = v;
      });
      
      if (Object.keys(utmParams).length > 0) {       
        logFirebaseEvent('campaign_visit', utmParams);
        localStorage.setItem('utmQueryParam', JSON.stringify(utmParams));
      }
    }
  }, []);

  // Instead, use ref to track the state (like this):
  const isLeftMenuOpenRef = useRef(store.getState().leftMenu.isLeftMenuOpen);

  // Keep it updated (subscribe once)
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      isLeftMenuOpenRef.current = store.getState().leftMenu.isLeftMenuOpen;
    });
    return unsubscribe;
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const opuseremail = useSelector(
    (state: { userEmail: UserState }) => state.userEmail.opUserEmail
  );
  const userObjectId = useSelector(
    (state: { userEmail: UserState }) => state.userEmail.userID
  );
  const userProfession = useSelector((state: { userEmail: UserState }) => state.userEmail.userProfession);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(true);
  const { data, error, isLoading, isFetching } = useGetNewsQuery({
    page: currentPage,
    user_object_id: userObjectId,
  });
  const totalPages = data?.totalPages ?? 1;
  const totalNewsCount = data?.total ?? 0;

  const voteTypes = useSelector(
    (state: { vote: VoteState }) => state.vote.voteTypes
  );
  const isAuthenticated = useSelector(
    (state: { userEmail: UserState }) => state.userEmail.opUserEmail
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLoadMore = useCallback(() => {
    if (!isLoading && currentPage < totalPages) {     
      setLoadingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [isLoading, currentPage, totalPages]);

  useEffect(() => {
    if (data) {
      setNewsList((prevList) => [...prevList, ...data.data.data]);
    }
  }, [data]);

  useEffect(() => {
    if (isLoading) {
      setLoading(true); // Initial page load
    } else {
      setLoading(false);
    }
  }, [isLoading]);

  const navigate = useNavigate();
  const redirectionLink = useSelector((state: { rightMenu: RightMenuState }) => state.rightMenu.redirectLink);
  const redirectIframeLink = useSelector((state: { rightMenu: RightMenuState }) => state.rightMenu.redirectIframeLink);
  const redirectLoginClick = useSelector((state: { rightMenu: RightMenuState }) => state.rightMenu.redirectLoginClick);

  useEffect(() => {

    if(isAuthenticated){

      if (redirectionLink && redirectIframeLink && redirectLoginClick) {
        dispatch(setRedirectLink(null));
        dispatch(setRedirectIframeLink(null));
        dispatch(setRedirectLoginClick(false));

        //condition to hide nccn tool in US, UK and Canada
        const nccnRestrictedCountries = ['united states', 'united kingdom', 'canada'];
        const userCountryfetched = localStorage.getItem('opgeoid')?.toLowerCase();
        const userCountry = userCountryfetched ? userCountryfetched.split('-')[0].trim() : '';

        if (redirectIframeLink.includes("nccn") && nccnRestrictedCountries.includes(userCountry))
          return
        
        navigate(`/${redirectIframeLink}`, { state: { iframeSrc: redirectionLink } }); 
      }
    }
  }, [isAuthenticated,dispatch, navigate, redirectIframeLink, redirectLoginClick,redirectionLink]);

  


  useEffect(() => {
    if (isFetching) {
      setLoadingMore(true); // Pagination loading
    } else {
      setLoadingMore(false);
    }
  }, [isFetching]);
  
 


  const [currentReview, setCurrentReview] = useState(0);
  const [fade, setFade] = useState(true);

  const handleReviewChange = (index: React.SetStateAction<number>) => {
    setFade(false);
    setTimeout(() => {
      setCurrentReview(index);
      setFade(true);
    }, 1000); // 1-second fade effect
  };

  const onFocus = () => {
    if (isLeftMenuOpenRef.current) {
      // dispatch(toggleLeftMenu(false));
      dispatch(selectMenu(t('SEARCH')));
      dispatch(setSearchEditable(true))
    } else {
      dispatch(toggleLeftMenu(true));
    }
  };

//#region Intercom Integration
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
    IsGetHcpValidationEnabled:boolean;
  }

  const { boot, update, shutdown } = useIntercom();
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
         localStorage.setItem('IsGetHcpValidationEnabled', String(data.IsGetHcpValidationEnabled));
      }
      else {
        setUserData(null);
        setIsSessionAuthenticated(false);
      }
    };

    getUserDetails();
  }, []);


  //Inline banner and programmatic ad
  const combinedAdsParams = { 
    country_object_id: userData?.country_object_id || '',
    banner_location: 0,
    profession: userData?.Profession || '',
    jobdescription: userData?.userJobdescription || '',   
    hcp_validation: userData?.hcpvalidationVal || '',
    include_weblink: 1,
    hcp_id: userData?.HCP_Registration_Id || '',
    specialities: userData?.userSpecialityIds || [],  
  }; 



  const combinedAds = useCombinedAds(combinedAdsParams);  

  useEffect(() => {
    if (isSessionAuthenticated && userData) {

      const validSpecialties = userData.cancer_specialist_types_select_names.filter(speciality => speciality.trim() !== "");

      boot({
        userId: userData.userID + userData.username,
        email: userData.opuseremail,
        createdAt: userData.created_at,
        name: userData.username,
        customAttributes: { 
          "country": userData.country,
          "Profession": userData.userJobdescription +' '+ userData.Profession,
          "first name": userData.first_name,
          "second name": userData.second_name,
          "Is_Accept_GDPR_App": userData.Is_Accept_GDPR_App
        }
      });

      update({
        customAttributes: {
          "HCPValidationStatus": userData.hcpvalidationVal === "1",
          ...(userData.hcpvalidationVal === "1" && { "HCP_Registration_Id": userData.HCP_Registration_Id }), 
          ...validSpecialties.reduce((acc: Record<string, any>, speciality: string, index: number) => {
            acc[`cancer_speciality${index + 1}`] = speciality;
            return acc;
          }, {})
        }
      });

    }
    return () => shutdown();
  }, [boot, update, shutdown, isSessionAuthenticated, userData]);
//#endregion
 


  return (
    <div className={styles.mainContent}>
      <div className={styles.searchSection}>
        <div className={styles.searchBox}>
          <p className={styles.searchText}>{t('GLOBAL_SEARCH_INFO')}</p>
          <input
            type="text"
            placeholder={t('SEARCH_PLACEHOLDER')}
            data-ignore-outside-click
            className={styles.searchInput}
            onClick={onFocus}
            readOnly
          />
        </div>
      </div>
      <div className={styles.contentSection}>
        <div className={styles.newsSection}>
          <h1>{t('ONCOLOGY_NEWS')}</h1>

          {loading && (
            <div className={classNames(
                styles.loader,styles.loaderWithMargin
            )}>
              <div
                className={classNames(
                  'spinner-border',
                  'text-secondary',
                  styles.customLoader
                )}
              ></div>
            </div>
          )}
      

          {!isLoading && !error && newsList.length > 0 ? (
            <>
              {newsList &&
              
                newsList.map((news, index) => {

                 
                  const voteType =
                    voteTypes[news.id] ?? (news.votedornot === 1 ? 0 : 1); // Default to 0 if undefined
                  const isLastItemOfPage =
                    (index + 1) % 10 === 0 || index === newsList.length - 1
                      ? 1
                      : 0;      

                    // Map the index to the ad index (since ad index starts from 1)
                    const adIndex = index + 1;            
           
                  return (
                    <>
                    <NewsCard
                      key={index}
                      title={news.title}
                      description={news.description}
                      imageUrl={news.thumb_image}
                      channel={news.rss_feed?.rss_channel?.name || ' '}
                      link={news.link}
                      published={news.publication_date}
                      voteCount={news.vote_count}
                      userId={userObjectId}
                      newsId={news.id}
                      type={voteType}
                      votedOrNot={news.votedornot}                   
                      onMouseOver={
                        isLastItemOfPage ? handleLoadMore : undefined
                      }                      
                    />

                      
                   

                    {(() => {
                      const adsAtIndex = combinedAds[adIndex] || [];
                      const bannerAds = adsAtIndex.filter((ad: any) => ad.type === 'banner');
                      const latestBannerAd = bannerAds.sort((a: any, b: any) => b.id - a.id)[0];

                      if (latestBannerAd) {                      return (
                          <BannerAd
                            key={`banner-${adIndex}-${latestBannerAd.id}`}
                            ad={latestBannerAd}
                            location={1}
                          />
                        );
                      } else {
                        const programmaticAd = adsAtIndex.find((ad: any) => ad.type !== 'banner');
                        if (programmaticAd) {
                          return (
                            <ProgrammaticAd
                              key={`pgm-${adIndex}-${programmaticAd.id}`}
                              ad={programmaticAd}
                              userData={userData}
                            />
                          );
                        }
                      }
                      return null;
                    })()}


                    </>
                    );

                  
                })}
              {loadingMore && (
                <div className={styles.loader}>
                  <div
                    className={classNames(
                      'spinner-border',
                      'text-secondary',
                      styles.customLoader
                    )}
                  ></div>
                </div>
              )}
            </>
          ) : (
            !isLoading && <p>No news available.</p>
          )}
        </div>
        <div className={styles.reviewSection}>

          <div className={styles.reviewCarousel}>
            {/*<div className={`${styles.reviewCard} ${fade ? styles.fadeIn : styles.fadeOut}`}>
              <h3 className={styles.reviewerName}>{reviews[currentReview].reviewer}</h3>
              {reviews[currentReview].content.map((paragraph, i) => (
                <p key={i} className={styles.reviewText}>{paragraph}</p>
              ))}
            </div>
            <div className={styles.carouselDots}>
              {reviews.map((_, index) => (
                <span
                  key={index}
                  className={`${styles.dot} ${currentReview === index ? styles.activeDot : ""}`}
                  onClick={() => handleReviewChange(index)}
                ></span>
              ))}
            </div> */}

            {/* Social Media Icons */}
            <div className={styles.socialIcons}>
              {SOCIAL_MEDIA_LINKS.map(({ icon: Icon, url, name }, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                >
                  <Icon className={styles.icon} />
                </a>
              ))}
            </div>

            {/* App Store & Google Play Buttons */}
            <AppStoreButtons />

            <p className={styles.footer}>
              &copy; {new Date().getFullYear()} ONCOassist
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
