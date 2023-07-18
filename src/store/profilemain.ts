import {defineStore} from "pinia";
import {appConst, fetchWrapper} from "@/helpers";
const {BASE_URL} = appConst;

export const useProfileMainStore = defineStore({
    id:'profilemain-data',
    state: () => ({
        dataLoaded: false,
        currencies: [],
        all_lang: [],
        postresult: "",
    }),
    actions: {
        async loadCurrencies() {
            await fetchWrapper.get(`${BASE_URL}/currencies`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.currencies = data["data"];
                    this.dataLoaded = true;
                }).catch(()=>{
                    return;
                });
            return  Promise.resolve();
        },   

        async loadLanguages() {
            await fetchWrapper.get(`${BASE_URL}/welcome`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.all_lang = data["all_languages"];
                    this.dataLoaded = true;
                }).catch(()=>{
                    return;
                });
            return  Promise.resolve();
        },   

        async postCurrencyData(formData:any) {
            await fetchWrapper.post(`${BASE_URL}/user/update-currency`,formData)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.postresult = data["message"];
                }).catch(()=>{
                    return;
                })
            return  Promise.resolve();
        },

        changeFlag() {
            this.dataLoaded=false;
        }
    }
})