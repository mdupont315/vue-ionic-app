/* eslint-disable */
import {createI18n} from 'vue-i18n';
import locales from './locales';

const i18n = createI18n({
    legacy: false, // legacy mood off for composition api
    locale: 'en', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages: locales, // set locale messages
})
export default i18n;