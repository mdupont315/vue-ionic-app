<template>
  <ion-page>
    <ion-header class="ion-no-border" collapse="fade" :translucent="true" mode="ios">
      <ion-toolbar mode="ios">
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title style="display:grid;" class="ion-justify-content-center">
          <school-master-logo-horizontal/>
        </ion-title>
        <language-switch slot="end"/>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col style="display: flex" class="ion-justify-content-center">
            <ion-img :src="`assets/images/${$root.$i18n.locale.toLowerCase()}-scan-qr.svg`" @click="scan"
                     style="cursor: pointer; width: 300px"/>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent, onUnmounted} from 'vue';
import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useBackButton,
  // useIonRouter,
} from '@ionic/vue';
import {useAuthStore} from "@/store";
import SchoolMasterLogoHorizontal from "@/components/SchoolMasterLogoHorizontal.vue";
import {useScanQR} from "@/shared";
import LanguageSwitch from "@/components/LanguageSwitch.vue";

// declare let window: any; // Don't forget this part!
export default defineComponent({
  components: {
    LanguageSwitch,
    IonButtons,
    SchoolMasterLogoHorizontal,
    IonImg, IonGrid, IonRow, IonCol,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  setup() {
    const {user} = useAuthStore();
    const {stopScan, scan} = useScanQR()
    // const router = useIonRouter();
    useBackButton(10, () => {
       stopScan();
       // if (router.canGoBack()){
       //   router.back();
       // }
    });
    onUnmounted(() => stopScan());
    return {user, scan,}
  },
});
</script>

<style scoped>
ion-thumbnail {
  --size: 200px;
  /*--border-radius: 14px;*/
}

body.scanner-active {
  --background: transparent;
  --ion-background-color: transparent;
}
</style>
