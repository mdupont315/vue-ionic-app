<template>
    <ion-footer class="ion-no-border">
      <ion-toolbar>
        <ion-tabs>
          <ion-router-outlet></ion-router-outlet>
          <ion-tab-bar slot="bottom" style="display: flex; flex-flow: row;">
            <div>
                <ion-img :src="groupImgUrl" class="group-img"></ion-img>
                <ion-text style="margin-right:55px">Loads | 15</ion-text>
            </div>
            <ion-tab-button style="width: 50%; border-radius: 55px; border-: none;">
                <ion-button @click="toScannedPage">Scan QR Code</ion-button>
            </ion-tab-button>
        </ion-tab-bar>
        </ion-tabs>
      </ion-toolbar>
    </ion-footer>
  </template>
  
  <script lang="ts">
  import {defineComponent} from 'vue';
  import { 
    IonFooter, 
    IonToolbar, 
    IonTabs, 
    IonRouterOutlet, 
    IonTabBar, 
    IonTabButton, 
  } from '@ionic/vue';
  import {useRouter} from "vue-router";
  
  export default defineComponent({
    components: {
      IonFooter, 
      IonToolbar, 
      IonTabs, 
      IonRouterOutlet, 
      IonTabBar, 
    },
    setup() {
      const router = useRouter();
      const toScannedPage = () => {
        router.push("/profile/qrscanned");
      }
      const groupImgUrl = '/assets/images/Icon-awesome-user-fr.png';
      return {groupImgUrl, toScannedPage};
    }
  });
  </script>
  
  <style scoped>
  ion-toolbar {
    --background: transparent;
  }
  ion-tab-bar {
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
  }
.group-img {
    width: 32.1px;
    height: 22.5px;
    margin-left: 24px;
}
ion-button {
    --background: linear-gradient(-73deg, 
    #436FB2 0.00%, 
    #1C345A 100.00%);
    --background-hover: #9ce0be;
    --background-activated: #88f4be;
    --background-focused: #88f4be;
    --color: white;
    --border-radius: 15px;
    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
    --ripple-color: deeppink;
    --padding-top: 10px;
    --padding-bottom: 10px;
    width: 190px;
  }
  </style>