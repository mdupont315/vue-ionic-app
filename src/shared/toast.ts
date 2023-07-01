import {toastController} from '@ionic/vue';
import {} from "@ionic/core"
import type {Color} from '@ionic/core/dist/types/interface';
import {useI18n} from "vue-i18n";
interface NamedParameters{
    message: string,
    color?:Color,
    duration?:number,
    position?: 'top' | 'bottom' | 'middle'
}

export function useToast() {
    const {t} = useI18n({useScope:"global"});
    const showToast = async ({message, color = 'primary', duration = 2000,position = 'top'}:NamedParameters) => {
        const toast = await toastController
            .create({
                message: t(message),
                duration: duration,
                color: color,
                // mode:'ios',
                // translucent:true,
                position: position,
                buttons: [
                    {
                        text: t("Dismiss"),
                        role: 'cancel'
                    }
                ],
            })
        return toast.present();
    }
    return {showToast};
}