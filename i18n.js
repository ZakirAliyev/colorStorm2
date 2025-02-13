import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Cookies from 'js-cookie';

import translationAZ from './src/lang/az.json';
import translationRU from './src/lang/ru.json';

const savedLanguage = Cookies.get('colorStormLang') || 'en';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            az: {
                translation: translationAZ,
            },
            ru: {
                translation: translationRU,
            },
        },
        lng: savedLanguage,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;