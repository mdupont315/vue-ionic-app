import {defineStore} from "pinia";
import {appConst, fetchWrapper} from "@/helpers";
const {BASE_URL} = appConst;

export const useCounselorData = defineStore({
    id:'counselor-data',
    state: () => ({
        dataLoaded: false,
        counselors: [],
    }),
    actions: {
        async loadCounselors() {
            await fetchWrapper.get(`${BASE_URL}/user/get-counselors`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.counselors = data["data"];
                    this.dataLoaded = true;
                }).catch(()=>{
                    return;
                });
            return  Promise.resolve();
        },   

        changeFlag() {
            this.dataLoaded=false;
        }
    }
})