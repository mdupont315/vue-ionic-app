import {defineStore} from "pinia";
import {appConst, fetchWrapper} from "@/helpers";
// import {useAuthStore} from "@/store/auth";
const {BASE_URL, GOOGLE_API_KEY} = appConst;
export const useExploreDataStore = defineStore({
    id: 'explore-data',
    state: () => ({
        dataLoaded:false,
        total_universities:0,
        total_countries:0,
        total_programs:0,
        universities:[],
        countries:[],
        programs:[],

        elite_dataLoaded:false,
        elite_datas:[],

        study_dest_datas:[],
        study_dest_dataLoaded:false,

        region_detail_data:[],
        region_detail_dataLoaded: false,

        country_detail_data:[],
        country_detail_dataLoaded: false,

        search_programs_data:[],
        search_institutes_data:[],
        search_dataLoaded:false,
    }),
    actions: {
        async loadData(loadWithoutCheck = false) {
            console.log("loading explore Data...");
            // const {isLoggedIn} = useAuthStore();
            // if ((!isLoggedIn || this.dataLoaded) && !loadWithoutCheck) return ;
            await fetchWrapper.get(`${BASE_URL}/homepage?apikey=${GOOGLE_API_KEY}`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.total_universities = data["total_universities"];
                    this.total_countries = data["total_countries"];
                    this.total_programs = data["total_programs"];
                    this.universities = data["universities"];
                    this.countries = data["countries"];
                    this.programs = data["programs"];
                    this.dataLoaded = true;
                }).catch(()=>{
                    return;
                })
           return  Promise.resolve();
        },

        async loadEliteData(loadWithoutCheck = false) {
            console.log("loading explore Data...");
            // const {isLoggedIn} = useAuthStore();
            // if ((!isLoggedIn || this.dataLoaded) && !loadWithoutCheck) return ;
            await fetchWrapper.get(`${BASE_URL}/universities/elite?apikey=${GOOGLE_API_KEY}`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.elite_datas = data["data"];
                    this.elite_dataLoaded = true;
                }).catch(()=>{
                    return;
                })
           return  Promise.resolve();
        },

        async loadStudyDestDatas(loadWithoutCheck = false) {
            console.log("loading explore Data...");
            // const {isLoggedIn} = useAuthStore();
            // if ((!isLoggedIn || this.dataLoaded) && !loadWithoutCheck) return ;
            await fetchWrapper.get(`${BASE_URL}/regions?apikey=${GOOGLE_API_KEY}`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.study_dest_datas = data["data"];
                    this.study_dest_dataLoaded = true;
                }).catch(()=>{
                    return;
                })
           return  Promise.resolve();            
        },

        async loadStudyDestDataDetail(id = 0) {
            console.log("loading region ID... ", id);
            // const {isLoggedIn} = useAuthStore();
            // if ((!isLoggedIn || this.dataLoaded) && !loadWithoutCheck) return ;
            await fetchWrapper.get(`${BASE_URL}/region-details/${id}?apikey=${GOOGLE_API_KEY}`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.region_detail_data = data["data"];
                    this.region_detail_dataLoaded = true;
                }).catch(()=>{
                    return;
                })
           return  Promise.resolve();            
        },
        async loadStudyDestCountry(id = 0) {
            console.log("loading region ID... ", id);
            // const {isLoggedIn} = useAuthStore();
            // if ((!isLoggedIn || this.dataLoaded) && !loadWithoutCheck) return ;
            await fetchWrapper.get(`${BASE_URL}/country-details/${id}?apikey=${GOOGLE_API_KEY}`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.country_detail_data = data;
                    this.country_detail_dataLoaded = true;
                }).catch(()=>{
                    return;
                })
           return  Promise.resolve();            
        },

        async loadSearchData(keyword="") {
            console.log("loading region ID... ", keyword);
            await fetchWrapper.get(`${BASE_URL}/search/${keyword}?apikey=${GOOGLE_API_KEY}`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then((data) => {
                    this.search_programs_data = data["programs"];
                    this.search_institutes_data = data["institutes"];
                    this.search_dataLoaded = true;
                }).catch(()=>{
                    return;
                })
           return  Promise.resolve();            
        },

        changeLoadedVal() {
            this.country_detail_dataLoaded=false;
            this.region_detail_dataLoaded = false;
            this.study_dest_dataLoaded = false;
            this.search_dataLoaded = false;
        }
    }
});