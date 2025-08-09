export * from './lib/ui';
export * from "./lib/components";

export { default as Footer } from './lib/footer/footer';
export { default as useOpUserEmail } from './lib/hooks/useOpUserEmail';
export { default as useOutsideClick } from './lib/hooks/useOutsideClick';
export { default as Loader } from './lib/loader/loader';

import logo from './lib/assets/logo.png';
import fav from './lib/assets/favicon.png';
import white_logo from './lib/assets/onco_white_icon.svg';

export const shared_assets = {
  logo,
  fav,
  white_logo
};


