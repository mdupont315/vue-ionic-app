import {defineStore} from "pinia";
const LANGUAGE_STORE_KEY = 'ur-app-lang';
const appLocale = localStorage.getItem(LANGUAGE_STORE_KEY);

export const useTranslationStore = defineStore({
    id: 'translation',
    state: () => ({
        locale: appLocale || 'en',
    }),
    getters: {
        appLang: () => appLocale || 'en',
    },
    actions: {
        setLocale(locale:'en'|'tr'|'ar') {
            this.locale = locale;
            localStorage.setItem(LANGUAGE_STORE_KEY, locale);
        },
    }
});