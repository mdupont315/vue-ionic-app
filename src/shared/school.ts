import {computed, ref, watch} from "vue";
import {appConst, fetchWrapper} from "@/helpers";
import {useToast} from "@/shared/toast";
import {useTranslationStore} from "@/store";
import {onIonViewWillEnter} from "@ionic/vue";

const {BASE_URL} = appConst;

export function useSchool() {
    const loading_schools = ref(false);
    const schools = ref([]);
    const {showToast} = useToast();
    const langStore = useTranslationStore();
    const lang = computed(() => langStore.locale);

    const loadSchools = async () => {
        loading_schools.value = true;
        schools.value = [];
        try {
            await fetchWrapper.get(`${BASE_URL}/schools`)
                .then((response) => {
                    loading_schools.value = false;
                    return response.json()
                }).then(({data}) => schools.value = data)
                .catch(() => {
                    //TODO:Add ERROR TOAST
                })
        } catch (e: any) {
            showToast({message: "Something Went Wrong!", color: "danger", position: "bottom"})
        }
    }
    onIonViewWillEnter(() => loadSchools());
    watch(lang, async () => await loadSchools())

    return {schools, loading_schools, loadSchools}
}