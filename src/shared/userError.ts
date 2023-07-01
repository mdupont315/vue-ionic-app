import {useAlert} from "@/shared/alert";
import {useAuthStore} from "@/store";
import {computed} from "vue";
import {useToast} from "@/shared/toast";

export function useFormErrorAlert(){
    const {presentAlert} = useAlert();
    const {showToast} = useToast();
    const authStore = useAuthStore();
    const error = computed(()=>authStore.error);
    function showFormUserFormError() {
        if (error.value?.message) {
            presentAlert('Oops!', "Something went wrong!", error.value.message);
            return;
        }
        showToast({message:'Invalid Form Data!',color:"danger",position:"bottom"});
        return;
    }
    return {showFormUserFormError};
}