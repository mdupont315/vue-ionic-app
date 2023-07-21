<template>
  <ion-page>
    <header-section />
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-grid class="d-grid">
        <ion-row class="ion-padding-top">
          <ion-col size="12" class="d-flex">
            <ion-text color="light">
              <p class="ion-text-center txt-37 txt-bold">{{ $t('WANT TO TALK!') }}</p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="d-flex">
            <ion-img src='assets/images/login.svg'/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-text color="light">
              <p class="ion-text-center txt-20 ion-no-margin ion-padding-horizontal">{{ $t('Time to bust out your login moves! Ready to dive into the chat?') }}</p>
              <p class="ion-text-center txt-26 ion-no-margin ion-margin-bottom">{{ $t('Please Login to Start to Chat') }}</p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="d-flex ion-margin-top">
            <ion-button class="btn-get-start button-1 txt-20" @click="openModal">{{ $t('Log in or Sign up') }}</ion-button>
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
  modalController
} from "@ionic/vue";
import {computed, defineComponent, ref} from "vue";
import {useRouter} from "vue-router";
import {useLoadingStore} from "@/store/loading";
import {useComingSoonAlert} from "@/shared/comingSoonAlert";
import HeaderSection from "@/components/HeaderSection.vue";
import FooterSection from "@/components/FooterSection.vue";
import LoginModal from "@/components/modal/LoginModal.vue"

export default defineComponent({
  name: "ChatLoginPage",
  components: {
    HeaderSection,
    FooterSection,
    IonButton,
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
  },
  setup() {
    const store = useAuthStore();
    const {login} = store;
    const {comingSoon} = useComingSoonAlert();
    const router = useRouter();
    const openModal = async () => {
      const modal = await modalController.create({
        component: LoginModal,
        initialBreakpoint: 0.5,
        breakpoints: [0, 0.5, 0.6],
      });
      modal.present();
    };
    return {
      comingSoon,
      openModal
    };
  },
});
</script>
<style scoped>
ion-content {
  --background: #1C345A;
}

</style>