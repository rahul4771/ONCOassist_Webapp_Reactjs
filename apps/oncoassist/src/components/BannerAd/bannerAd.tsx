import React, { useEffect } from 'react';
import styles from './bannerAd.module.scss'; 
import classNames from 'classnames';
import { logFirebaseEvent } from "../../utils/firebaseUtils";

interface BannerAdProps {
  ad: {
    id: number;
    inline_banner_height: number;
    inline_banner_index: number;
    title : string;
    description : string;
    banner_type : number;
    isSponsored : number;
    sponsored_logo : string;
    impression_url : string;
    url : string;
    image : string;
    html_file_name : string;
    // Add more fields if needed
  };
  location:number;
  userData: { HCP_Registration_Id: string, Profession: string,primarySpecialityName: string } | null; // Allow null value
}

const BannerAd: React.FC<BannerAdProps> = ({ ad, userData },location) => {
    const sponsoredLogo =      ad.sponsored_logo && ad.sponsored_logo !== ''
        ? ad.sponsored_logo
        : '/public/assets/images/sponsored_logo_long.png';
  
        logFirebaseEvent("NF_Inline_ad", {
          banner_description: ad.description,
          profession: userData?.Profession || '',
          primary_speciality: userData?.primarySpecialityName || '',
          sponsored: ad.isSponsored === 1,
          banner_title: ad.title,
          banner_id: ad.id,
          banner_type: ad.banner_type === 0 ? 'image' : 'html',
          impression_url: ad.impression_url,
        });
        console.log("NF_Inline_ad--"+ad.id+'---'+ad.title);

        return (
          <div className={classNames(styles.container)}>
            <div className={classNames('card', 'mb-3', styles.cardContainer)}>
              <div className="row g-0">
                <div className={classNames(styles.contentWrapper)}>
          
                    <div className={classNames(styles.mainContent)}>
                    {ad.isSponsored === 1 && (
                              <img
                                height={30}
                                className={styles.inlineSponsoredLogoImage}
                                src={sponsoredLogo}
                                alt="Sponsored"
                              />
                            )}
                      {ad.banner_type === 0 ? (
                        <div className={classNames(styles.textCenter, styles.bannerWrapper)}   
                            style={{  height: `${ad.inline_banner_height}px`,   width: '100%',}} >
                            
                            <div className={`${styles.inlineImageWrapper} mt-2`}>
                            <a
                              className={styles.inlineBannerImage}
                              data-isSponsored={ad.isSponsored}
                              data-description={ad.description}
                              data-title={ad.title}
                              data-impression_url={ad.impression_url}
                              data-url={ad.url}
                              href={ad.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => {
                                try {
                                  logFirebaseEvent('NF_Inline_ad_click', {
                                    banner_description: ad.description,
                                    profession: userData?.Profession || '',
                                    primary_speciality: userData?.primarySpecialityName || '',
                                    sponsored: ad.isSponsored === 1,
                                    banner_title: ad.title,
                                    redirection_url: ad.url,
                                    impression_url: ad.impression_url,
                                  });
                                } catch (error) {
                                  console.error('Error logging Firebase event:', error);
                                }
                              }}
                            >
                              <img
                                height={ad.inline_banner_height}
                                src={ad.image}
                                alt={ad.title}
                              />
                            </a>
                          </div>
                        </div>
                      ) : ad.banner_type === 1 ? (
                        <div
                          className={classNames(
                            'on-ad',
                            styles.inlineHtmlWrapper,
                            styles.newsInlineBannerHtml,
                            styles.bannerAdWrapper
                          )}
                          style={{
                            height: `${ad.inline_banner_height}px`,
                            width: '100%',
                          }}
                          onClick={() => {
                            try {
                              logFirebaseEvent('NF_Inline_ad_click', {
                                banner_description: ad.description,
                                profession: userData?.Profession || '',
                                primary_speciality: userData?.primarySpecialityName || '',
                                sponsored: ad.isSponsored === 1,
                                banner_title: ad.title,
                                redirection_url: ad.url,
                                impression_url: ad.impression_url,
                              });
                            } catch (error) {
                              console.error('Error logging Firebase event:', error);
                            }
                          }}
                        >
                          
                          <iframe
                            src={ad.html_file_name}
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                            title="Ad Banner"
                            scrolling="no"
                          />
                        </div>
                      ) : null}
                    </div>
                  
                </div>
              </div>
            </div>
          </div>
        );

  };
  
  export default BannerAd;