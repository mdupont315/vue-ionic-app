import {defineStore} from "pinia";
import {appConst, fetchWrapper} from "@/helpers";
const {BASE_URL} = appConst;

export const useApplicationStore = defineStore({
    id:'profilemain-data',
    state: () => ({
        dataLoaded: false,
        applications: [{id:1, "program_id":11, "program_title": "Software Engineering", "university":"University of Toronto", "status":"Initialised"}],
        applyData: {},
        postresult: "",
    }),
    actions: {
        async loadApplications() {
            await fetchWrapper.get(`${BASE_URL}/user/applications-list`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.applications = data["data"];
                    this.dataLoaded = true;
                }).catch(()=>{
                    return;
                });
            return  Promise.resolve();
        },   
        async postApplyData(formData:any) {
            await fetchWrapper.post(`${BASE_URL}/user/apply`,formData)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.applyData = data;
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