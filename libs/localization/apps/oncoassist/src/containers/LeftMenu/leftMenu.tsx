import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {
  useMenuItems,
  useBottomMenuItems,
} from '../../constants/menuConstants';
import styles from './leftMenu.module.scss';
import { useNavigate } from 'react-router-dom';
import { SOCIAL_MEDIA_LINKS } from '@oncoassist/shared/constants';
import { config } from "@oncoassist/shared/constants";
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleLeftMenu,
  selectMenu,
  setAuthScreenOn,
  LeftMenuState,
} from '../../store/leftMenuReducer';
import {
  HcpValidationState,
  clearHcpValidation,
} from '../../store/getValidatedUserSlice';
import { UserState, setUser } from '../../store/userEmailSlice';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {
  IoSettingsOutline,
  IoLogOutOutline,
  IoLogInOutline,
  IoCheckmarkCircleOutline,
} from 'react-icons/io5';
import { SvgIcon, shared_assets } from '@oncoassist/shared/ui';
import { useOutsideClick } from '@oncoassist/shared/ui';
import { setRedirectIframeLink, setRedirectLink, setRedirectLoginClick, setSearchEditable,setSearchedText } from "../../store/rightMenuReducer";

const LeftMenu = () => {
  const isOpen = useSelector(
    (state: { leftMenu: LeftMenuState }) => state.leftMenu.isLeftMenuOpen
  );
  const selectedMenu = useSelector(
    (state: { leftMenu: LeftMenuState }) => state.leftMenu.selectedMenu
  );
  const activeMenu = useSelector(
    (state: { leftMenu: LeftMenuState }) => state.leftMenu.selectedMenu
  );
  const isAuthenticated = useSelector(
    (state: { userEmail: UserState }) => state.userEmail.opUserEmail
  );
  const isGetValidationCheck = Boolean(
    Number(
      useSelector(
        (state: { hcpValidation: HcpValidationState }) =>
          state.hcpValidation.isGetHcpValidationEnabled
      )
    )
  );
  
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleProfileMenu = () => setProfileMenuOpen(!isProfileMenuOpen);

  const profileDropdownRef = useOutsideClick(isProfileMenuOpen, () => {
    setProfileMenuOpen(false);
    dispatch(selectMenu(null));
    dispatch(toggleLeftMenu(true));

  });

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuItems = useMenuItems();
  const bottomMenuItems = useBottomMenuItems();

   // Check and enable ONCOpatient
   const opToken = localStorage.getItem('oplogid');
   if (opToken && isAuthenticated) {
    const opMenuItem = {
      name: t('ONCOPATIENT'),
      icon: 'oncopatient',
      link: 'public/app/patient/facility'
    }
    const insertIndex = menuItems.length - 1;
    menuItems.splice(insertIndex, 0, opMenuItem);
    }

  useEffect(() => {
    if (!isOpen) {
      setProfileMenuOpen(false);
    }
  }, [isOpen]);

  const toggleMenu = () => {
    if (isOpen) dispatch(toggleLeftMenu(false));
    else dispatch(toggleLeftMenu(true));
  };

  const handleClick = (
    menuIndex: number,
    hasSubItems: boolean,
    link: string,
    iFrameLink: string | null,
    openType: string | null
  ) => {
    const menuItemText = menuItems[menuIndex].name;
    
    dispatch(selectMenu(menuItemText));

    if(selectedMenu !== menuItemText)
     dispatch(setSearchedText(null));
    
    dispatch(setAuthScreenOn([t('FAVORITES'), t('PROFILE')].includes(menuItemText)));
    if(menuItemText === t('SEARCH')) {
      dispatch(setSearchEditable(true))
    }

    if (openType === 'dropdown' && isAuthenticated) {
      toggleProfileMenu();
      dispatch(toggleLeftMenu(true));
      return;
    } else {
      if (isAuthenticated && !hasSubItems) {
        if (iFrameLink) navigate(iFrameLink, { state: { iframeSrc: link } });
      }
    }
    if (!iFrameLink && !hasSubItems && menuItemText !== t('SEARCH') &&  menuItemText !== t('PROFILE')) {
      if(menuItemText === t('ONCOPATIENT')){
        window.location.href = config.webappURL + link;
        return;
      }
      navigate(link);
    }
    toggleMenu();
  };

  const handleBottomMenuClick = (link: string, iFrameLink: string) => {
    
    if (isAuthenticated && iFrameLink) {
      navigate(iFrameLink, { state: { iframeSrc: link } });
    } else if (!iFrameLink) {
      window.open(link, '_blank');
    } else if (!isAuthenticated) {
      //conition to display about us page
      if(iFrameLink === 'about_oncoassist'){
        navigate(iFrameLink, { state: { iframeSrc: link } });
      } else {
        const signInPath = 'public/index.php/login';
        navigate('/signin', { state: { iframeSrc: signInPath } });
      }
      
    }
  };

  const handleLogout = () => {
    // Clear Redux state
    dispatch(
      setUser({ opUserEmail: null, userName: null, userProfession: null })
    );
    dispatch(clearHcpValidation());
    dispatch(setRedirectLink(null));
    dispatch(setRedirectIframeLink(null));
    dispatch(setRedirectLoginClick(false));
    // Clear user data from localStorage
    localStorage.removeItem('opUserEmail');
    localStorage.removeItem('opUser');
    localStorage.removeItem('opProfession');
    localStorage.removeItem('IsGetHcpValidationEnabled');
    localStorage.removeItem('opuser');
    localStorage.removeItem('opprofession');
    localStorage.removeItem('opuseremail');
    localStorage.removeItem('oplogid');
    localStorage.removeItem('opgeoid');
    localStorage.removeItem('userID');
    localStorage.removeItem('isProductServiceRestricted');

    setShowModal(false);
    dispatch(selectMenu(null));
    // Navigate to logout page
    handleSignInClick('public/logout.php');
  };

  const handleSignInClick = (iframeSrc: string) => {
    toggleMenu();
    navigate('/signin', { state: { iframeSrc } });
  };

  const handleSettings = (iframeSrc: string) => {
    toggleMenu();
    navigate('/profile', { state: { iframeSrc } });
  };

  const handleGetValidated = (iframeSrc: string) => {
    toggleMenu();
    navigate('/hcpvalidation', { state: { iframeSrc } });
  };

  return (
    <>
      <div
        className={`${styles.leftMenu} ${
          isAuthenticated ? styles.fullHeight : styles.reducedHeight
        } ${isOpen ? styles.open : styles.closed}`}
      >
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <div onClick={toggleMenu} className={styles.logoWrapper}>
            {isOpen ? (
              <img
                src={shared_assets.logo}
                alt="ONCOassist"
                className={styles.logo}
              />
            ) : (
              <img
                src={shared_assets.white_logo}
                height={40}
                alt="Favicon"
                className={styles.favIcon}
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>

        {/* Toggle button */}
        <button className={styles.toggleButton} onClick={toggleMenu}>
          {isOpen ? <FaChevronLeft size={18} /> : <FaChevronRight size={18} />}
        </button>

        {/* Navigation Menu */}
        <nav className={styles.navMenu}>
          <ul>
            {menuItems.map((item, menuIndex) => (
              <li
                key={menuIndex}
                className={`${styles.menuItem} ${
                  activeMenu === menuIndex ? styles.active : ''
                }`}
              >
                <div
                  onClick={(e) => {
                    handleClick(
                      menuIndex,
                      !!item.subItems,
                      item.link,
                      item.iFrameLink ?? null,
                      item.openType ?? null
                    );
                  }}
                  className={`${styles.menuLink} ${
                    activeMenu === item.name ? styles.menuLinkActive : ''
                  }`}
                >
                  <span className={styles.icon}>
                    <SvgIcon name={item.icon} size={24} color="#1c93d1" />
                  </span>

                  {isOpen && <span className={styles.label}>{item.name}</span>}
                  {item.subItems && isOpen && (
                    <FaChevronRight
                      className={`${styles.chevron} 
                          ${
                            activeMenu === menuIndex ? styles.openChevron : ''
                          }`}
                    />
                  )}
                </div>
              </li>
            ))}

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && isOpen && isAuthenticated && (
              <div
                className={`${styles.profileDropdown} ${styles.popup}`}
                ref={profileDropdownRef}
              >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleSettings('public/index.php/profile');
                          toggleProfileMenu();
                        }}
                        className={styles.profileMenuItem}
                      >
                        <IoSettingsOutline className={styles.profileMenuIcon} />
                        <span>{t('SETTINGS')}</span>
                      </button>

                      {/* Condition for isGetValidationCheck */}
                      {isGetValidationCheck && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleGetValidated(
                              'public/index.php/hcpvalidation'
                            );
                            toggleProfileMenu();
                          }}
                          className={styles.profileMenuItem}
                        >
                          <IoCheckmarkCircleOutline
                            className={styles.profileMenuIcon}
                          />
                          <span>{t('GET_VALIDATED')}</span>
                        </button>
                      )}

                      <button
                        onClick={(e) => {
                          setShowModal(true);
                          toggleProfileMenu();
                        }}
                        className={styles.profileMenuItem}
                      >
                        <IoLogOutOutline className={styles.profileMenuIcon} />
                        <span>{t('LOGOUT')}</span>
                      </button>
              </div>
            )}
            {/* </li> */}
          </ul>
        </nav>

        {/* Bottom Menu Section */}

        <div
          className={styles.footerMenu}
          style={{ display: isOpen ? 'block' : 'none' }}
        >
          <ul className={styles.footerList}>
            {bottomMenuItems.map((item, index) => {
              return (
                <li key={index} className={styles.footerItem}>
                  <button
                    className={styles.footerLink}
                    onClick={() =>
                      handleBottomMenuClick(item.link, item.iFrameLink ?? '')
                    }
                  >
                    {t(item.name)}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Social Media Links */}
          <ul className={styles.socialMediaList}>
            {SOCIAL_MEDIA_LINKS.map(({ icon: Icon, url, name }, idx) => (
              <li key={idx} className={styles.socialMediaItem}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialMediaLink}
                  aria-label={name}
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Logout Confirmation Modal */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content" style={{ height: '180px' }}>
                <div
                  className="modal-header"
                  style={{ backgroundColor: '#1c93d1' }}
                >
                  <div className="bootstrap-dialog-header">
                    <div
                      className="bootstrap-dialog-title"
                      style={{ color: '#fff' }}
                    >
                      Alert
                    </div>
                  </div>
                </div>
                <div className="modal-body" style={{ height: '50px' }}>
                  <p>Are you sure you want to log out?</p>
                </div>
                <div className="modal-footer">
                <button
                  className="btn btn-secondary custom-secondary"
                  onClick={() => setShowModal(false)}
                >
                  No
                </button>
                <button className="btn btn-primary custom-primary" onClick={handleLogout}>
                  Yes
                </button>
              </div>
              </div>
            </div>
          </div>
          {/* Modal Backdrop */}
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
};

export default LeftMenu;
