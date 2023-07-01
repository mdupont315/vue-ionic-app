import {useTranslationStore} from "@/store";
import {computed} from "vue";

export function useI18nHelpers(){
    const translation = useTranslationStore();
    const dir = computed(()=>translation.locale == 'ar' ? 'rtl':'ltr')
    return {dir};
}