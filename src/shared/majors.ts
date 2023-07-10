import {appConst, fetchWrapper} from "@/helpers";
const {BASE_URL} = appConst;

export async function useMajors( discipline_id: string ){
    if(!discipline_id) return;
    const res = await fetchWrapper.get(`${BASE_URL}/discipline-majors/${discipline_id}`)
    const data = await res.json();
    
    return data.data;
}
