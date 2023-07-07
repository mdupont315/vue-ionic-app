import {defineStore} from "pinia";
import {appConst, fetchWrapper} from "@/helpers";
import {useAuthStore} from "@/store/auth";
const {BASE_URL} = appConst;
export const useCommonDataStore = defineStore({
    id: 'common-data',
    state: () => ({
        dataLoaded:false,
        countries: [],
        nationalities: [],
        curriculums: [],
        fee_ranges: [],
        funding_sources: [],
        scales: [],
        studyLevels:[],
        hobbies: [],
        majors: [],
        schools: [],
        universities: [],
        dialCodes: [],
        study_statuses:[{id:0,title:'I have graduated'},{id:1,title:'I am still studying'}]
    }),
    actions: {
        async loadData(loadWithoutCheck = false) {
            // console.log("loading common Data...");
            const {isLoggedIn} = useAuthStore();
            // if ((!isLoggedIn || this.dataLoaded) && !loadWithoutCheck) return ;
            await fetchWrapper.get(`${BASE_URL}/get-all-required-data`)
                .then((response) => {
                    if (!response.ok){
                        return Promise.reject();
                    }
                    return response.json()
                }).then(({data}) => {
                    this.countries = data.countries;
                    this.nationalities = data.nationalities;
                    this.curriculums = Object.values(data.curriculums);
                    this.fee_ranges = data.ranges;
                    this.funding_sources = data.studyFunding;
                    this.universities = data.universities;
                    this.hobbies = data.hobbies;
                    this.majors = data.majors;
                    this.scales = data.gradeScales;
                    this.studyLevels = data.studyLevels;
                    this.universities = data.universities;
                    this.schools = data.schools;
                    this.dataLoaded = true;
                    this.dialCodes = data.dialCodes;
                }).catch(()=>{
                    return;
                })
           return  Promise.resolve();
        },
        async loadCountries() {
            await fetchWrapper.get(`${BASE_URL}/countries`)
                .then((response) => {
                    return response.json()
                }).then(({data}) => this.countries = data)
                .catch(() => {
                    //TODO:Add ERROR TOAST
                });
        },
        async loadCurriculum() {
            await fetchWrapper.get(`${BASE_URL}/curriculum`)
                .then((response) => {
                    return response.json()
                }).then(({data}) => this.curriculums = data)
                .catch(() => {
                    //TODO:Add ERROR TOAST
                });
        },
        async loadRanges() {
            await fetchWrapper.get(`${BASE_URL}/feesRange`)
                .then((response) => {
                    return response.json()
                }).then(({data}) => this.fee_ranges = data)
                .catch(() => {
                    //TODO:Add ERROR TOAST
                });
        },
        async loadFundingSources() {
            await fetchWrapper.get(`${BASE_URL}/studyFunding`)
                .then((response) => {
                    return response.json()
                }).then(({data}) => this.funding_sources = data)
                .catch(() => {
                    //TODO:Add ERROR TOAST
                });
        },
        async loadScales() {
            await fetchWrapper.get(`${BASE_URL}/gradeScales`)
                .then((response) => {
                    return response.json()
                }).then(({data}) => this.scales = data)
                .catch(() => {
                    //TODO:Add ERROR TOAST
                });
        },
        async loadHobbies() {
            await fetchWrapper.get(`${BASE_URL}/hobbies`)
                .then((response) => {
                    return response.json()
                }).then(({data}) => this.hobbies = data)
                .catch(() => {
                    //TODO:Add ERROR TOAST
                });
        },
        async loadMajors() {
            await fetchWrapper.get(`${BASE_URL}/majors`)
                .then((response) => {
                    return response.json()
                }).then(({data}) => this.majors = data)
                .catch(() => {
                    //TODO:Add ERROR TOAST
                });
        },
        async loadUniversities() {
            await fetchWrapper.get(`${BASE_URL}/universities`)
                .then((response) => {
                    return response.json()
                }).then(({data}) => this.universities = data)
                .catch(() => {
                    //TODO:Add ERROR TOAST
                });
        },
        async loadSchools() {
            await fetchWrapper.get(`${BASE_URL}/schools`)
                .then((response) => {
                    return response.json()
                }).then(({data}) => this.schools = data)
                .catch(() => {
                    //TODO:Add ERROR TOAST
                });
        },
        async loadDialCodes() {
            await fetchWrapper.get(`${BASE_URL}/dialCodes`)
                .then((response) => {
                    return response.json()
                }).then(({data}) => this.schools = data)
                .catch(() => {
                    //TODO:Add ERROR TOAST
                });
        },

    }
});