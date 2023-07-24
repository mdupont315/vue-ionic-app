import {defineStore} from "pinia";
import {appConst, fetchWrapper} from "@/helpers";
const {BASE_URL} = appConst;

export const useCounselorData = defineStore({
    id:'counselor-data',
    state: () => ({
        dataLoaded: false,
        counselors: [],
        dialogs:[{}],
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
        sendText(text="") {
            const count = this.dialogs.length + 1;
            const mess = {id: count, text: text }
            this.dialogs.push(mess);
        },

        changeFlag() {
            this.dataLoaded=false;
        }
    }
})