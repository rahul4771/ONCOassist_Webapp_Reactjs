import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './locales';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translations.en },
    fr: { translation: translations.fr }
  },
  lng: 'en', 
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
