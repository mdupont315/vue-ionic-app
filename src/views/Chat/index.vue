<template>
  <ion-page>
    <header-section />
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
        <ion-row class="ion-padding-top">
          <ion-col size="12" style="display: flex; width: 100%; justify-content: center">
            <ion-text color="light">
              <p class="ion-text-center txt-2">{{ $t('want to talk!') }}</p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" style="display: flex; width: 100%; justify-content: center">
            <ion-img src='assets/images/login.svg'/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-text color="light">
              <p class="ion-text-center txt-1">{{ $t('Time to bust out your login moves! Ready to dive into the chat?') }}</p>
              <p class="ion-text-center txt-15">{{ $t('Please Login to Start to Chat') }}</p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" style="display: flex; width: 100%; justify-content: center;">
            <ion-button class="btn-get-start button-1"  @click="doLogin">{{ $t('Log in or Sign up') }}</ion-button>
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
import {useLoadingStore} from "@/store/loading";
import {useComingSoonAlert} from "@/shared/comingSoonAlert";
import HeaderSection from "@/components/HeaderSection.vue";
import FooterSection from "@/components/FooterSection.vue";

export default defineComponent({
  name: "LoginPage",
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
    const {showLoading, hideLoading} = useLoadingStore();
    const {comingSoon} = useComingSoonAlert();
    const router = useRouter();
    const doLogin = async () => {
      // showLoading();
      router.replace('/application');
    };
    return {
      doLogin,
      comingSoon,
    };
  },
});
</script>
<style scoped>
ion-content {
  --background: #1C345A;
}
</style>