import {createApp} from 'vue'
import App from './App.vue'
import router from './router';

import {IonicVue} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import i18n from "@/i18n/i18n";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SplashScreen } from '@capacitor/splash-screen';
import { Network } from '@capacitor/network';
import { App as ionicApp } from '@capacitor/app';



// const logCurrentNetworkStatus = async () => {
//     const status = await Network.getStatus();
//     return status.connected;
// };
//
// logCurrentNetworkStatus();
/* Theme variables */
import './theme/variables.css';

import {createPinia} from "pinia";
import {useAuthStore, userDarkModeStore, useCommonDataStore,useTranslationStore} from "./store";
import {defineCustomElements} from '@ionic/pwa-elements/loader';

const pina = createPinia();


const app = createApp(App)
    .use(IonicVue)
    .use(router).use(i18n).use(pina);

const {setDarkMode, removeDarkMode} = userDarkModeStore();
const {loadUserData} = useAuthStore();
const {loadData} = useCommonDataStore();
const {locale}  = useTranslationStore();
import {alertController} from "@ionic/vue";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
i18n.global.locale.value = locale;

const darkModeCheck = window.matchMedia('(prefers-color-scheme: dark)');

if (darkModeCheck.matches) {
    setDarkMode();
} else {
    removeDarkMode();
}

const presentAlert = async (header: any, subHeader: string | undefined, message: string | undefined)=>{
    const alert = await alertController.create({
        header: i18n.global.t(header||''),
        subHeader: i18n.global.t(subHeader||''),
        message: i18n.global.t(message||''),
        backdropDismiss:false,
        mode: "ios",
        buttons: [{
            text: i18n.global.t('OK'),
            role: 'confirm',
            handler: ()=> Network.getStatus().then((network)=>{
                if(network.connected) return;
                return ionicApp.exitApp();
            }),
        }],
    });

    await alert.present();
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
darkModeCheck?.addEventListener('change', event => event.matches ? setDarkMode() : removeDarkMode());

Network.addListener('networkStatusChange', status => {
    if(status.connected) return;
    presentAlert('You are not connected','Internet Connection Lost','Please Check Your connection');
});

Network.getStatus().then((status)=>{
    if (!status.connected){
        SplashScreen.hide();
        app.mount('#app');
        defineCustomElements(window);
        presentAlert('You are not connected','','Please Check Your connection')
        return;
    }
    loadUserData().then(()=>{
        router.isReady().then(() => {
            loadData();
            SplashScreen.hide();
            app.mount('#app');
            defineCustomElements(window);
        });
    });
});

// router.isReady().then(() => {
//     SplashScreen.hide();
//     app.mount('#app');
//     defineCustomElements(window);
// });