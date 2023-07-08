import {ref} from "vue";
import {appConst, fetchWrapper} from "@/helpers";
const {BASE_URL} = appConst;

export async function getCities( country_id: number ){
    if(!country_id) return;
    const loading_city  = ref(false);
    const city_array = ref([]);
    loading_city.value  = true;
    // const res = await fetchWrapper.get(`${BASE_URL}/cities/${country_id}`)
    // cities.value = await res.json()
    // cities.value = data
    await fetchWrapper.get(`${BASE_URL}/cities/${country_id}`)
        .then((response)=> {
            loading_city.value = false;
            return response.json()
        }).then(({data})=>city_array.value = data)
        .catch(() => {
            //TODO:Add ERROR TOAST
        });
    return {city_array, loading_city}
}
