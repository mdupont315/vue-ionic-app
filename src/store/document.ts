import {defineStore} from "pinia";
import {appConst, fetchWrapper} from "@/helpers";
const {BASE_URL} = appConst;

export const useDocumentDataStore = defineStore({
    id:'document-data',
    state: () => ({
        dataLoaded: false,
        countries: [],
        fieldStudy: [],
        gradingSys: [],
        schools: [],
        engTestData: [],
        postresult: "",
    }),
    actions: {
        async loadCountries() {
            await fetchWrapper.get(`${BASE_URL}/countries`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.countries = data["data"];
                }).catch(()=>{
                    return;
                });
            await fetchWrapper.get(`${BASE_URL}/disciplines`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.fieldStudy = data["data"];
                }).catch(()=>{
                    return;
                });
            await fetchWrapper.get(`${BASE_URL}/grade-scales`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.gradingSys = data["data"];
                    this.dataLoaded = true;
                }).catch(()=>{
                    return;
                });
            return  Promise.resolve();
        },
        
        async loadSchools(title="", country_id="") {
            if(title=="Higher Secondary")
                await fetchWrapper.get(`${BASE_URL}/country-schools/${country_id}`)
                    .then((response) => {
                        if (!response.ok){
                            return Promise.reject();
                        }
                        return response.json()
                    }).then((data) => {
                        this.schools = data["data"];
                        this.dataLoaded = true;
                    }).catch(()=>{
                        return;
                    })
            else 
                await fetchWrapper.get(`${BASE_URL}/country-universities/${country_id}`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.schools = data["data"];
                    this.dataLoaded = true;
                }).catch(()=>{
                    return;
                })
        
            return  Promise.resolve();
        },

        async postEducationData(title="", formData:any) {
            await fetchWrapper.post(`${BASE_URL}/user/add-education/${title}`,formData)
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

        async loadEngTests(title="") {
            await fetchWrapper.get(`${BASE_URL}/${title}-tests`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.engTestData = data["data"];
                    this.dataLoaded = true;
                }).catch(()=>{
                    return;
                })
            
            return  Promise.resolve();
        },

        async postTestData(title="", formData:any) {
            await fetchWrapper.post(`${BASE_URL}/user/add-test/${title}`,formData)
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

        async postWorkData(title="", formData:any) {
            await fetchWrapper.post(`${BASE_URL}/user/upload-document/${title}`,formData)
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