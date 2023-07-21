<template>
  <ion-page>
    <header-section />
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
        <ion-row class="ion-padding-top">
          <ion-col size="12" style="display: flex; width: 100%; justify-content: center">
            <ion-text color="light">
              <p class="ion-text-center txt-37">{{ $t('Chat Page') }}</p>
            </ion-text>
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
  name: "ChatPage",
  components: {
    HeaderSection,
    FooterSection,
    // IonButton,
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