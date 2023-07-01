import {defineStore} from "pinia";

export const userDarkModeStore = defineStore({
    id: 'dark-mode',
    state: () => ({
        prefersDark:false
    }),
    actions: {
        setDarkMode(){
            this.prefersDark = true;
        },
        removeDarkMode(){
            this.prefersDark = false;
        }
    }
});