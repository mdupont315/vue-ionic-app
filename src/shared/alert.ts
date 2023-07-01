import {alertController} from "@ionic/vue";
import {useI18n} from "vue-i18n";

export function useAlert() {
    const {t} = useI18n({useScope:"global"});

    const presentAlert = async (header: any, subHeader: string | undefined, message: string | undefined, callback: () => void = () => "",oky_btn_text = 'OK',) => {
        const alert = await alertController.create({
            header: t(header || ''),
            subHeader: t(subHeader || ''),
            message: t(message || ''),
            mode: "ios",
            buttons: [{
                text: t(oky_btn_text),
                role: 'confirm',
                handler: callback,
            },{
                text: t('Cancel'),
                role: 'cancel',
            }],
        });

        await alert.present();
    }
    return {presentAlert}
}