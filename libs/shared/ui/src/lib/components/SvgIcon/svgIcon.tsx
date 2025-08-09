import React from "react";
import homeIcon from "../../assets/icons/home.svg?react";
import searchIcon  from "../../assets/icons/search.svg?react";
import favoritesIcon  from "../../assets/icons/favorites.svg?react";
import profileIcon  from "../../assets/icons/profile.svg?react";
import toolIcon  from "../../assets/icons/tools.svg?react";
import profileSetting from "../../assets/icons/profile_settings.svg?react";
import oncoPatient from "../../assets/icons/oncopatient.svg?react";

type IconProps = {
  name: "home" | "search" | "favorites" | "profile" | "tool" | "settings" | "oncopatient"; 
  size?: number;
  color?: string;
};

const icons = {
  home: homeIcon,
  search: searchIcon,
  favorites: favoritesIcon,
  profile: profileIcon,
  tool: toolIcon,
  settings : profileSetting,
  oncopatient : oncoPatient
};

const SvgIcon: React.FC<IconProps> = ({ name, size = 24, color = "black" }) => {
  const Component = icons[name];
  return <Component width={size} height={size} fill={color} stroke={color} strokeWidth="12"/>;
};

export default SvgIcon;