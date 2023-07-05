<template>
  <ion-page>
    <header-section />
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
        <ion-row class="ion-padding-top">
          <ion-col size="12" style="display: flex; width: 100%; justify-content: center">
            <ion-text color="light">
              <p class="ion-text-center txt-2">{{ $t('Beam ME up') }}</p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" style="display: flex; width: 100%; justify-content: center">
            <ion-img src='assets/images/beam.svg'/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-text color="light">
              <p class="ion-text-center txt-1">{{ $t('We\'re all set to make magic happen. So, buckle up, hold on tight, and let\'s launch your application adventure!') }}</p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" style="display: flex; width: 100%; justify-content: center;">
            <ion-button class="btn-get-start button-1"  @click="doLogin">{{ $t('Step-by-Step Application') }}</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" style="display: flex; width: 100%; justify-content: center;">
            <ion-button class="btn-get-start button-1"  @click="doLogin">{{ $t('OR Explore Courses') }}</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <footer-section />
  </ion-page>
</template>

<script>
import {useAuthStore} from "@/store";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/vue";
import {computed, defineComponent, ref} from "vue";
import {useRouter} from "vue-router";
import {useFormErrorAlert} from "@/shared/userError";
import {useLoadingStore} from "@/store/loading";
import {useComingSoonAlert} from "@/shared/comingSoonAlert";
import SchoolMasterLogo from "@/components/SchoolMasterLogo.vue";
import InputPassword from "@/components/InputPassword.vue";
import InputField from "@/components/InputField.vue";
import LanguageSwitch from "@/components/LanguageSwitch.vue";
import HeaderSection from "@/components/HeaderSection.vue";
import FooterSection from "@/components/FooterSection.vue";
import { personOutline } from 'ionicons/icons';

export default defineComponent({
  name: "ApplicationPage",
  components: {
    HeaderSection,
    FooterSection,
    IonButton,
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonText
  },
  setup() {
    const store = useAuthStore();
    const {login} = store;
    const {showFormUserFormError} = useFormErrorAlert();
    const {showLoading, hideLoading} = useLoadingStore();
    const {comingSoon} = useComingSoonAlert();
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const error = computed(() => store.error);
    const doLogin = async () => {
      showLoading();
      await login(email.value, password.value).then(res => {

        return !res ? showFormUserFormError() : setTimeout(() => router.replace('/home'), 300);
      }).finally(() => hideLoading());

    };
    return {
      email,
      password,
      doLogin,
      comingSoon,
      error,
      personOutline,
    };
  },
});
</script>
<style scoped>
ion-content {
  --background: #1C345A;
}
</style>