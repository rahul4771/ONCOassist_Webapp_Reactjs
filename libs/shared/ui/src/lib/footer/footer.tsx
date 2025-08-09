import React from 'react';
import styles from './footer.module.scss';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { UserState, setUser} from "../../../../../../apps/oncoassist/src/store/userEmailSlice"; 
import { useSelector, useDispatch } from "react-redux";


export const Footer = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux dispatch hook

  const { t } = useTranslation();

  const opuseremail = useSelector((state: { userEmail: UserState }) => state.userEmail.opUserEmail);




  const handleSignInClick = (iframeSrc: string) => {
      //window.location.href = '/public/index.php/login';
      //setActiveMenu(index); // Set the active menu item
      navigate('/signin', { state: { iframeSrc } });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <img src={logo} alt="ONCOassist" className={styles.footerLogo} />
        <span className={styles.verticalLine}></span>
        <span className={styles.joinText}>{t("JOIN_COMMUNITY")}</span>
      </div>
      <div className={styles.footerContent}> 
        {opuseremail ? (
          // Show Sign Out button when user is signed in
          null
        ) : (
            <>
            <button className={styles.footerButtonCreate} onClick={(e) => {
              e.preventDefault(); // Always prevent the default behavior for links
              handleSignInClick('public/index.php/signup'); // Navigate to the link
            }}>
              {t("CREATE_ACCOUNT")}
            </button>
            
            <button className={styles.footerButtonSignIn} onClick={(e) => {
              e.preventDefault(); // Always prevent the default behavior for links
              handleSignInClick('public/index.php/login'); // Navigate to the link
            }}>
              {t("SIGN_IN")}
            </button>
          </>
          )}      
      </div>
    </footer>
  );
};

export default Footer;
