<template>
  <ion-page>
    
    <ion-content :fullscreen="true" class="ion-padding ion-cont">
      <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
        <ion-row>
          <ion-col size="12" style="display: flex; width: 100%; justify-content: center">
            <school-master-logo/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" style="display: flex; width: 100%; justify-content: center; margin-top: 15%;">
            <ion-img src='assets/images/get-start.svg' style="width: 12rem"/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" style="display: flex; width: 100%; justify-content: center;">
            <ion-img :src='introUrl' style="width: 12rem"/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" style="display: flex; width: 100%; justify-content: center;">
            <ion-button class="btn-get-start"  @click="getStart">{{ $t('GET STARTED') }}</ion-button>
          </ion-col>
        </ion-row>
        <ion-row style="position: absolute; bottom: 0; left: 0; width: 100%;">
          <ion-col size="12" style="display: flex; width: 100%; justify-content: center; margin-top: 15%;">
            <language-switch />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {useAuthStore} from "@/store";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonImg
} from "@ionic/vue";
import {personOutline} from 'ionicons/icons';
import {computed, defineComponent, ref} from "vue";
import {useRouter} from "vue-router";
import {useLoadingStore} from "@/store/loading";
import {useComingSoonAlert} from "@/shared/comingSoonAlert";
import SchoolMasterLogo from "@/components/SchoolMasterLogo.vue";
import LanguageSwitch from "@/components/LanguageSwitch.vue";
import {useI18n} from "vue-i18n";
import {userDarkModeStore} from "@/store";

export default defineComponent({
  name: "LoginPage",
  components: {
    LanguageSwitch,
    SchoolMasterLogo,
    IonButton,
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonImg
  },
  setup() {
    const {showLoading, hideLoading} = useLoadingStore();
    const {comingSoon} = useComingSoonAlert();
    const router = useRouter();
    const getStart = async () => {
      showLoading();
    };
    const {locale} = useI18n();
    const darkMode = userDarkModeStore();
    const is_dark_mode = computed(() => darkMode.prefersDark);
    const lang = computed(()=>locale.value);
    const introUrl = computed(() => {
      let addLang = ['tr','ar'].includes(lang.value) ? `${lang.value}-` : '';
      return is_dark_mode.value ? 'assets/logos/intro-light.svg' : `assets/logos/${addLang}intro.svg`;
    });
    return {
      getStart,
      comingSoon,
      personOutline,
      introUrl
    };
  },
});
</script>
<style scoped>
ion-content {
  --background: #1C345A;
}
.btn-get-start {
  font-size: 1.3rem;
  font-weight: bold;
  color: #1c345a;
  --background: #fff;
  --border-radius: 12.5px;
  height: 3.2rem;
  width: 13rem;
}
</style>