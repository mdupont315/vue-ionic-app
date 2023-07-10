import {appConst, fetchWrapper} from "@/helpers";
const {BASE_URL} = appConst;

export async function useCities( country_id: string ){
    if(!country_id) return;
    const res = await fetchWrapper.get(`${BASE_URL}/cities/${country_id}`)
    const data = await res.json();
    
    return data.data;
}
