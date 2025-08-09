import React, { useState, useRef, useEffect } from 'react';
import styles from './newsCard.module.scss';
import classNames from 'classnames';
import { FaFacebook, FaTwitter, FaLinkedin, FaThumbsUp , FaShare, FaRegHeart, FaRegThumbsUp } from 'react-icons/fa';
import { formatDate } from '../../utils/dateFormat';
import { useVoteNewsMutation,useGetNewsQuery } from "../../api/newsApi";
import { setVoteType } from "../../store/voteSlice";
import { useSelector, useDispatch } from "react-redux";
import { UserState } from "../../store/userEmailSlice";
import { logFirebaseEvent } from "../../utils/firebaseUtils";
import { FaXTwitter } from 'react-icons/fa6';


export interface NewsCardProps {
  title: string;
  description: string;
  imageUrl: string;
  channel: string;
  link: string;
  published: string;
  voteCount: number;
  userId: string;
  newsId: number;
  type: number;
  votedOrNot: number;
  onMouseOver?: () => void; 
 
}

export function NewsCard({ title, description, imageUrl, channel, link, published, voteCount, userId, newsId, type, votedOrNot, isLastRecord, onMouseOver}: NewsCardProps) {

  const decodeHtmlEntities = (htmlString: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.documentElement.textContent || "";
  };

  description = decodeHtmlEntities(description);
  title = decodeHtmlEntities(title);

  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state: { userEmail: UserState }) => state.userEmail.opUserEmail);


  const [showShareOptions, setShowShareOptions] = useState(false);
  const [currentVoteCount, setCurrentVoteCount] = useState(voteCount);
  const [currentVotedOrNot, setCurrentVotedOrNot] = useState(votedOrNot);
  
  // Container ref for the share button and social options area
  const shareContainerRef = useRef<HTMLDivElement | null>(null);

  
  const [voteNews, { isLoading }] = useVoteNewsMutation();


  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const opuseremail = useSelector((state: { userEmail: UserState }) => state.userEmail.opUserEmail);
  const userFullName = useSelector((state: { userEmail: UserState }) => state.userEmail.userName);

  const share_message_twitter = userFullName+'shared this news article with you through the @ONCOassist app. You can download ONCOassist (The go-to app for oncology professionals) through the below link.\n https://goo.gl/o0iUQG';
  const share_message_fb = userFullName+'shared this news article with you through the @ONCOassist app. You can download ONCOassist (The go-to app for oncology professionals) through the below link.%0A https://goo.gl/o0iUQG';

  const share_url = encodeURI(link);
  const twitter_url = encodeURI(share_url+"\n\n"+share_message_twitter);

  const fbhref = 'https://www.facebook.com/sharer/sharer.php?u='+share_url+'&quote='+share_message_fb;
  const twitterhref = 'https://twitter.com/intent/tweet?url='+ twitter_url;
  const linkedInhref = 'https://www.linkedin.com/shareArticle?mini=true&url=http://developer.linkedin.com&title=LinkedIn%20Developer%20Network&summary=My%20favorite%20developer%20program&source=LinkedIn&quote="dghtrhr"';

  //const { refetch } = useGetNewsQuery({ page: 1, user_object_id: userId });

  // Ensure the link is within 95 characters for firebase
  const trimmedLink = link.length > 95 ? link.substring(0, 95) : link;
  const trimmedTitle = title.length > 95 ? title.substring(0, 95) : title;   

  const handleUpvote = async () => {
    try {
      const newVoteType = currentVotedOrNot === 0 ? 1 : 0;
      setCurrentVotedOrNot(newVoteType);

      const response = await voteNews({
        news_id: newsId,
        user_object_id: userId,
        type: newVoteType
      }).unwrap();

      if ([0, 1].includes(response.status)) {
        setCurrentVoteCount((prev) => prev + (response.status === 1 ? 1 : -1));
         //refetch(); 

        logFirebaseEvent("NF_upVoteListArticle", {
          url : trimmedLink,
          title: trimmedTitle,
          id: newsId,
          cancer_type: channel       
        }); 
        
      } else {
        console.error("Vote API failed");
      }
    } catch (err) {
      console.error("Error updating vote:", err);
      setCurrentVotedOrNot(currentVotedOrNot);
    }
  };

  const handleCardClick = () => {
    //log firebase on card link
    logFirebaseEvent("NF_news_viewed", {
      url : trimmedLink,
      title: trimmedTitle,
      id: newsId,
      cancer_type: channel       
    }); 
  };

  const handleShareClick = () => {
    //log firebase on share link
    logFirebaseEvent("NF_shareArticle", {
      url : trimmedLink,
      title: trimmedTitle,
      id: newsId,
      cancer_type: channel       
    }); 
  };


 const handleMouseEnter = () => {
    // Clear any existing timeout when mouse enters
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowShareOptions(true);
  };

  // Mouse leave handler for the share container with 0.5s delay
  const handleMouseLeave = () => {
    // Set a timeout to hide the options after 0.5 seconds
    timeoutRef.current = setTimeout(() => {
      setShowShareOptions(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);


 

  return (
    <div className={classNames(styles.container)} onMouseOver={onMouseOver}  >
      <div className={classNames('card', 'mb-3', styles.cardContainer)}>
        <div className="row g-0">
          <div className={classNames(styles.contentWrapper)}>
            <div className="col-md-12">
              <div className={classNames(styles.mainContent)}>
                <div className={classNames(styles.imageSection)}>
                  <a href={link} target="_blank" rel="noopener noreferrer" onClick={handleCardClick}>
                    <img
                      src={imageUrl}
                      alt="News Thumbnail"
                      className={classNames('img-fluid rounded', styles.newsThumbImage)}
                    />
                  </a>
                </div>
                
                <div className={classNames(styles.header, 'flex-column')}>
                  <div className={classNames(styles.textWrapper)}>
                    <a href={link} target="_blank" rel="noopener noreferrer" className={styles.noUnderline} onClick={handleCardClick}>
                      <p className={classNames('card-text', styles.newsTitle)}>{title}</p>
                    </a>
                  </div>
                  
                  <div className={classNames(styles.textSection)}>
                    <p className={classNames('card-text', styles.newsText)}>{description}</p>
                  </div>
                </div>

                
              </div>
              
              <div className={classNames(styles.newsShareButton)}>
                <div className={classNames(styles.footerContainer)}>
                  <div className={classNames(styles.dateRow)}>
                    <p className={styles.publishedInfo}>{formatDate(published)}</p>
                  </div>
                  
                  <div className={classNames(styles.channelButtonsRow)}>
                    <p className={styles.channelInfo}>{channel}</p>
                    
                    <div className={classNames(styles.buttons)}>
                      {opuseremail ? (
                        currentVotedOrNot === 0 ? (
                          /*
                          <button className={classNames("btn", "btn-outline-primary", "me-1", styles.likeButton)} 
                                  onClick={handleUpvote} disabled={isLoading}>
                            <FaRegThumbsUp className={classNames("me-1", styles.heartIcon)} /> 
                            <span className={styles.voteCount}>{currentVoteCount}</span>
                          </button>
                          */

                          <button 
                            className={classNames("btn", "btn-outline-primary", "me-1", "d-flex", "align-items-end", styles.likeButton)} 
                            onClick={handleUpvote} 
                            disabled={isLoading} >
                            <FaRegThumbsUp className={classNames("me-1", styles.heartIcon)} style={{ fontSize: "1.2em" }} /> 
                            <span className={styles.voteCount} style={{ lineHeight: "1", display: "inline-flex", alignItems: "flex-end" }}>
                              {currentVoteCount}
                            </span>
                          </button>


                        ) : (
                          <button className={classNames("btn", "btn-outline-primary", "me-1", "d-flex", "align-items-end", styles.likeButton)} 
                                  onClick={handleUpvote} disabled={isLoading}>
                            <FaThumbsUp className={classNames("me-1", styles.heartIcon)} /> 
                            <span className={styles.voteCount}>{currentVoteCount}</span>
                          </button>
                        )
                      ) : (
                        <button className={classNames("btn", "btn-outline-primary", "me-1", "d-flex", "align-items-end", styles.likeButton)} disabled>
                          <FaRegThumbsUp className={classNames('me-1', styles.heartIcon)} /> 
                          <span className={styles.voteCount}>{currentVoteCount}</span>
                        </button>
                      )}
                      
                      {/* Share button with hover container */}
                      <div 
                        ref={shareContainerRef}
                        className={styles.shareContainer}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                         <button 
                            className={classNames("btn", styles.shareButton, { [styles.disabled]: !opuseremail })}
                            
                          >
                          <FaShare className={styles.newsIcon} />
                        </button>

                        
                        
                        {/* Social share options that appear on hover */}
                        {showShareOptions && (
                          <div className={classNames('mt-1', styles.newsShareIcons)}>
                            <a className={classNames("btn", "me-1", styles.socialButton)} href={fbhref} target="_blank" rel="noopener noreferrer" onClick={handleShareClick}>
                              <FaFacebook className={styles.socialShareIcons} />
                            </a>
                            <a className={classNames("btn", "me-1", styles.socialButton)} href={twitterhref} target="_blank" rel="noopener noreferrer" onClick={handleShareClick}>
                              <FaXTwitter className={styles.socialShareIcons} />
                            </a>
                            <a className={classNames("btn", styles.socialButton)} href={linkedInhref} target="_blank" rel="noopener noreferrer" onClick={handleShareClick}>
                              <FaLinkedin className={styles.socialShareIcons} />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;