<template>
  <ion-page>
    <header-section />
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-grid class="d-grid">
        <ion-row class="ion-padding-top">
          <ion-col size="12" class="d-flex">
            <ion-text color="light">
              <p class="ion-text-center txt-37 txt-bold" style="margin-bottom: 10px;">{{ $t('HOP ON BOARD!') }}</p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="d-flex">
            <ion-img src='assets/images/profile.svg'/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-text color="light">
              <p class="ion-text-center txt-16" style="margin: 5px 0;">{{ $t("We'd love to have you join our community. Just sign up and polish up your profile, so we can hook you up with an awesome study option experience.") }}</p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="d-flex">
            <ion-button class="btn-get-start button-1 txt-20" @click="openModal">{{ $t('Log in or Sign up') }}</ion-button>
          </ion-col>
        </ion-row>
        <ion-row class="p-bottom">
          <ion-col size="12" class="d-flex p-txt">
            <ion-text class="txt-20 ion-color-dark1">{{ $t('Legal') }}</ion-text>
          </ion-col>
          <ion-col size="12" class="d-flex">
            <ion-item lines="none" class="btn-get-start button-2" @click="goTermsService">
                <ion-img src='assets/images/icons/bar.svg'/>
                <ion-text class="ion-padding-start txt-16 ion-color-dark1">{{ $t('Terms of Service') }}</ion-text>
                <ion-icon :icon="chevronForwardOutline" class="p-icon" />
            </ion-item>
          </ion-col>
          <ion-col size="12" class="d-flex">
            <ion-item lines="none" class="btn-get-start button-2" @click="goPolicy">
                <ion-img src='assets/images/icons/bar.svg'/>
                <ion-text class="ion-padding-start txt-16 ion-color-dark1">{{ $t('Privacy Policy') }}</ion-text>
                <ion-icon :icon="chevronForwardOutline" class="p-icon" />
            </ion-item>
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
  IonIcon,
  IonItem,
  modalController
} from "@ionic/vue";
import {computed, defineComponent, ref} from "vue";
import {useRouter} from "vue-router";
import {useLoadingStore} from "@/store/loading";
import {useComingSoonAlert} from "@/shared/comingSoonAlert";
import HeaderSection from "@/components/HeaderSection.vue";
import FooterSection from "@/components/FooterSection.vue";
import LoginModal from "@/components/modal/LoginModal.vue"
import {chevronForwardOutline} from "ionicons/icons";

export default defineComponent({
  name: "ProfileLoginPage",
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
    IonIcon,
    IonItem,
  },
  setup() {
    const store = useAuthStore();
    const {login} = store;
    const {comingSoon} = useComingSoonAlert();
    const router = useRouter();
    const openModal = async () => {
      const modal = await modalController.create({
        component: LoginModal,
        initialBreakpoint: 0.6,
        breakpoints: [0, 0.6, 0.7],
      });
      modal.present();
    };
    const goTermsService = () => {
      router.replace('/explore');
    };
    const goPolicy = () => {
      router.replace('/explore');
    };

    return {
      comingSoon,
      openModal,
      chevronForwardOutline,
      goTermsService,
      goPolicy
    };
  },
});
</script>
<style scoped>
ion-content {
  --background: #1C345A;
}
ion-item::part(native) .item-inner {
  background-color: red;
  border: none !important;;
}
.p-bottom {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0px;
  padding-top: 25px;
  padding-bottom: 55px;
  background: #fff;
  border-top-right-radius: 35px;
  border-top-left-radius: 35px;
}
.p-txt {
  justify-content: left;
  padding-left: 1.5rem;
}
.p-icon {
  position: absolute;
  right: 10px;
}
</style>