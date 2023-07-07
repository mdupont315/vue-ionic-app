import {computed, ref} from "vue";
import {appConst, fetchWrapper} from "@/helpers";
import {useCommonDataStore} from "@/store";
const {BASE_URL} = appConst;

export function useLocation(){
    const commonDataStore = useCommonDataStore();
    const country_id = ref('');
    const city_id = ref('');
    const countries = computed(()=>commonDataStore.countries);
    const cities = ref([]);
    const loading_countries = ref(false);
    const loading_cities = ref(false);
    const national_id = ref('');
    const nationalities = computed(()=>commonDataStore.nationalities);
    const loading_nationalities = ref(false);
    const dialCodes = computed(()=>commonDataStore.dialCodes);
    const loadCities = async ()=> {
        if(!country_id.value) return;
        loading_cities.value  = true;
        cities.value = [];
        await fetchWrapper.get(`${BASE_URL}/cities/${country_id.value}`)
            .then((response)=> {
                loading_cities.value = false;
                return response.json()
            }).then(({data})=>cities.value = data)
            .catch(() => {
                //TODO:Add ERROR TOAST
            });
    }
    return {country_id,city_id,countries,cities,loading_cities,loading_countries,loadCities,national_id,nationalities,loading_nationalities,dialCodes}
}