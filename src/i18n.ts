import { initReactI18next } from 'react-i18next';
import de from './locales/de.json';
import en from './locales/en.json';
import i18n from 'i18next';

const resources = {
  en,
  de,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
