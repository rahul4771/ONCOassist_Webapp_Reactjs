import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './authRightMenu.module.scss';
import { useTranslation } from "react-i18next";
import { toggleLeftMenu, selectMenu } from "../../store/leftMenuReducer";
import { useNavigate } from "react-router-dom";
import { UserState } from '../../store/userEmailSlice';
import { setRedirectLoginClick } from '../../store/rightMenuReducer';

interface AuthRightMenuProps {
  title: string;
  subtitle: string;
  signInPath: string;
  signUpPath: string;
}
const AuthRightMenu: React.FC<AuthRightMenuProps> = ({ title, subtitle, signInPath, signUpPath }) => {
  
  const isAuthenticated = useSelector((state: { userEmail: UserState }) => state.userEmail.opUserEmail);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSignInClick = (iframeSrc: string) => {
      // setIsOpen(true);
      dispatch(selectMenu(null));
      dispatch(toggleLeftMenu(true));
      dispatch(setRedirectLoginClick(true));
      navigate('/signin', { state: { iframeSrc } });
  };
  const { t } = useTranslation();

  if (isAuthenticated) return null;

  return (
    <div className={`${styles.authContainer} container text-center`}>
      <p className={styles.authTitle}>{title}</p>
      <p className={styles.authSubtitle}>{subtitle}</p>
      <div className={`${styles.buttonContainer} d-flex justify-content-center gap-2`}>
        <button
          className={`btn btn-primary custom-primary ${styles.signInButton}`}
          onClick={(e) => {
            e.preventDefault();
            handleSignInClick(signInPath);
          }}
        >
          {t("SIGN_IN")}
        </button>
        <button
          className={`btn btn-secondary custom-secondary ${styles.createAccountButton}`}
          onClick={(e) => {
            e.preventDefault();
            handleSignInClick(signUpPath);
          }}
        >
          {t("CREATE_AN_ACCOUNT")}
        </button>
      </div>
    </div>
  );
};

export default AuthRightMenu;
