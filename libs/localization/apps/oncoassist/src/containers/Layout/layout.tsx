/* eslint-disable @nx/enforce-module-boundaries */
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftMenu from "../LeftMenu/leftMenu";
import RightMenu from "../RightMenu/rightMenu";
import styles from "./layout.module.scss";
import {useOutsideClick} from '@oncoassist/shared/ui';
import { selectMenu, selectSubMenu, toggleLeftMenu, LeftMenuState } from "../../store/leftMenuReducer";
const Layout = () => {

  const isLeftMenuOpen = useSelector((state: { leftMenu: LeftMenuState }) => state.leftMenu.isLeftMenuOpen);

  const dispatch = useDispatch();

  const leftMenuRef = useOutsideClick(!isLeftMenuOpen, () => {
    dispatch(selectMenu(null));
    dispatch(selectSubMenu(null));
    dispatch(toggleLeftMenu(false));
  });

  return (
    <div className={styles.layoutContainer} ref = {leftMenuRef}>
        <LeftMenu />
        <RightMenu />
      </div>
  );
};

export default Layout;
