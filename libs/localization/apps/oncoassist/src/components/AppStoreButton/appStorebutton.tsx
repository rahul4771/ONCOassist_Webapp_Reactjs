import React from "react";
import styles from "./appStoreButton.module.scss";

export function AppStoreButton() {
  return (
    <div className={styles.storeButtons}>
      

      <a href="https://apps.apple.com/ie/app/oncoassist/id558299114" target="_blank" rel="noopener noreferrer">
        <img
          src="/assets/AppStore.png"
          alt="Download on the App Store"
          className={styles.storeButton}
        />
      </a>

      <a href="https://play.google.com/store/apps/details?id=com.oncoassist.core" target="_blank" rel="noopener noreferrer">
        <img
          src="/assets/GooglePlay.png"
          alt="Get it on Google Play"
          className={styles.storeButton}
        />
      </a>
    </div>
    
  );
}

export default AppStoreButton;
