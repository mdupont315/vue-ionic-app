import {defineStore} from 'pinia';
import {fetchWrapper} from "@/helpers";
import {appConst} from "@/helpers";
const {BASE_URL} = appConst;
export const useSetupProfileStore = defineStore({
    id: 'SetupProfile',
    state: () => ({
        error: {
            message: null,
        },
    }),
    actions: {
        async getData(url:string){
            return await fetchWrapper.get(`${BASE_URL}/user/${url}`).then((res)=>{
                return res.json()
            }).then((data)=>{
                return data;
            }).catch((err)=>{
                return Promise.reject(err)
            });
        },

        async submitFrom(step:string,formData:any) {
            this.resetErrors();
            const response = await fetchWrapper.post(`${BASE_URL}/user/profile/setup/${step}`, formData);

            if (!response.ok) {
                return response.json().then((res) => {
                    this.error = res;
                    return false;
                });
            }
            return response.json().then((data) => {
                return data;
            });
        },
        resetErrors() {
            this.error = {
                message: null,
            };
        },
        async submitStepOne(fromData:any){
            return await this.submitFrom('step1',fromData);
        },
        async submitStepTwo(fromData:any){
            return await this.submitFrom('step2',fromData);
        },
        async submitStepThree(fromData:any){
            return await this.submitFrom('step3',fromData);
        },
        async submitStepFour(fromData:any){
            return await this.submitFrom('step4',fromData);
        },
        async submitStepFive(fromData:any){
            return await this.submitFrom('step5',fromData);
        },
        async submitStepSix(fromData:any){
            return await this.submitFrom('step6',fromData);
        },
        async submitStepSeven(fromData:any){
            return await this.submitFrom('step7',fromData);
        },
        async submitStepEight(fromData:any){
            return await this.submitFrom('step8',fromData);
        },
        async submitStepNine(fromData:any){
            return await this.submitFrom('step9',fromData);
        }
    }
});
