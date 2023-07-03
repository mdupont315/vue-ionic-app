import {onBeforeMount, ref} from "vue";
import {appConst, fetchWrapper} from "@/helpers";
const {BASE_URL} = appConst;

export function useCountries(){
    const countries = ref([]);
    const loading_countries = ref(false);
    const loadCountries = async ()=> {
        loading_countries.value  = true;
        await fetchWrapper.get(`${BASE_URL}/dialCodes`)
            .then((response)=> {
                loading_countries.value = false;
                return response.json()
            }).then(({data})=> {
                countries.value = data.filter((value: any) => value.country_code);
            })
            .catch(() => {
                //TODO:Add ERROR TOAST
            });
    }
    onBeforeMount(()=>{loadCountries()});
    return {countries,loading_countries,loadCountries}
}