import {computed, ref, watch} from "vue";
import {appConst, fetchWrapper} from "@/helpers";
import {useToast} from "@/shared/toast";
import {useTranslationStore} from "@/store";
import {onIonViewWillEnter} from "@ionic/vue";

const {BASE_URL} = appConst;

export function useUniversities() {
    const {showToast} = useToast();
    const loading_universities = ref(false);
    const universities = ref([]);
    const loadUniversities = async () => {
        // console.log('loading unis');
        loading_universities.value = true;
        universities.value = [];
        try {
            await fetchWrapper.get(`${BASE_URL}/universities`)
                .then((response) => {
                    loading_universities.value = false;
                    const json = response.json();
                    return !response.ok ? Promise.reject(json) : json
                }).then(({data}) => {
                    universities.value = data
                }).catch((reason) => {
                    reason.then((reason: any) => {
                        showToast({
                            message: reason?.message || "Something Went Wrong!",
                            color: "danger",
                            position: "bottom"
                        })
                    })
                });
        } catch (e: any) {
            showToast({message: "Something Went Wrong!", color: "danger", position: "bottom"})
        }
    }
    // onBeforeMount(() => loadUniversities());
    onIonViewWillEnter(() => loadUniversities());

    // onIonViewDidEnter(() => loadUniversities());

    // onDeactivated(()=>{
    //     console.log('sleeping')
    // })


    const langStore = useTranslationStore();
    const lang = computed(() => langStore.locale);
    watch(lang, async () => await loadUniversities());
    return {universities, loading_universities, loadUniversities}
}