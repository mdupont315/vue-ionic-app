import {appConst, fetchWrapper} from "@/helpers";
import {reactive, ref} from "vue";
import {useToast} from "@/shared/toast";
import {useLoadingStore} from "@/store";
import {useRoute, useRouter} from "vue-router";

export function useLeads() {
    const route = useRoute();
    const router = useRouter();
    const loading_student = ref(false);
    const student_data = ref('');
    const {showToast} = useToast();
    const {showLoading, hideLoading} = useLoadingStore();
    const {BASE_URL} = appConst;
    const form = reactive({
        student_id: "",
        notes: "",
    })

    const checkLead = async () => {
        loading_student.value = true;
        await fetchWrapper.post(`${BASE_URL}/university/check-lead`, {student_id: route.params.id})
            .then((response) => {
                loading_student.value = false;
                const json = response.json();
                return !response.ok ? Promise.reject(json) : json
            }).then(({student}) => {
                student_data.value = student
                form.student_id = student.id;
            }).catch((reason) => {
                reason.then((reason: any) => {
                    showToast({
                        message: reason?.message || "Something went wrong!",
                        color: "danger",
                        position: "bottom"
                    })
                })
                router.replace('/rep-home');
            });
    }

    const saveLead = async () => {
        showLoading()
        await fetchWrapper.post(`${BASE_URL}/university/save-lead`, form).then((response) => {
            const json = response.json();
            return !response.ok ? Promise.reject(json) : json
        }).then(() => {
            showToast({message: 'Saved Successfully!', color: 'success',position:'bottom'});
        }).catch((reason) => {
            reason.then((reason: any) => {
                showToast({
                    message: reason?.message || "Something went wrong!",
                    color: "danger",
                    position: "bottom"
                });
            })
        }).finally(() => {
            hideLoading();
            setTimeout(() => {
                router.replace('/rep-home');
            }, 300);
        });
    }

    return {
        saveLead,checkLead, student_data, form, loading_student
    }

}