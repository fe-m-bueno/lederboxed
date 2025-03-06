import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../locales/en.json';
import ptTranslation from '../locales/pt.json';
import esTranslation from '../locales/es.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      pt: { translation: ptTranslation },
      es: { translation: esTranslation },
    },
    fallbackLng: 'en',
    debug: false,
    detection: {
      order: ['navigator', 'localStorage', 'sessionStorage', 'htmlTag'],
      caches: ['localStorage', 'sessionStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
