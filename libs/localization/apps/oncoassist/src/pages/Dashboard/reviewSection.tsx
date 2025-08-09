import React from "react";
import styles from "./dashboard.module.scss";
import { reviews } from "../../constants/reviewConstants";
import { FaInstagram, FaTwitter, FaFacebookF, FaGlobe } from "react-icons/fa";

export function ReviewSection() {
  return (
    <div className={styles.reviewSection}>
      <h1>User Reviews</h1>
      <div className={styles.reviewContainer}>
        <div className={styles.reviewCard}>
          {reviews.map((review, index) => (
            <div key={index}>
              <h3>{review.reviewer}</h3>
              {review.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              <br></br>
            </div>
          ))}


          {/* Social Media Icons */}
      <div className={styles.socialIcons}>
        <FaInstagram className={styles.icon} />
        <FaTwitter className={styles.icon} />
        <FaFacebookF className={styles.icon} />
        <FaGlobe className={styles.icon} />
      </div>

      {/* App Store & Google Play Buttons */}
      <div className={styles.storeButtons}>
        <img
          src="/assets/app-store.png"
          alt="Download on the App Store"
          className={styles.storeButton}
        />
        <img
          src="/assets/google-play.png"
          alt="Get it on Google Play"
          className={styles.storeButton}
        />
      </div>

      <p className={styles.footer}>&copy;2024 ONCOassist</p>
        </div>

        
      </div>

      
    </div>
  );
}

export default ReviewSection;
