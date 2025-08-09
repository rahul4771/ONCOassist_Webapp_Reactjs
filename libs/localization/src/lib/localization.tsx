import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./localization.module.scss";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    setShowPopup(true);
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const switchLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
    setShowPopup(false);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.popup}
        >
          {i18n.language === "en" ? "Switch to French?" : "Passer à l'anglais?"}
          <button onClick={switchLanguage} className={styles.button}>
            Yes
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanguageSwitcher;
