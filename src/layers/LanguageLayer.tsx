import { initReactI18next } from 'react-i18next';
import { useEffect } from 'react';
import de from '../locales/de.json';
import en from '../locales/en.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import i18n from 'i18next';
import zh from '../locales/zh.json';
import ru from '../locales/ru.json';

const LanguageLayer = (props: { children: any; customLanguage?: any }) => {
  useEffect(() => {
    const resources = {
      en,
      de,
      fr,
      es,
      zh,
      ru,
      customLanguage: props.customLanguage,
    };

    i18n.use(initReactI18next).init({
      resources,
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
  }, []);

  return props.children;
};

export default LanguageLayer;
