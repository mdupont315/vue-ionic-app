<template>
    <ion-page>
        <ion-content :fullscreen="false" class="ion-padding-top">
            <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
                <ion-row>
                <ion-col size="12" style=" width: 100%; justify-content: center">
                    <ion-text class="big-title">
                        <p class="ion-text-center" style="margin-top: 0px; margin-bottom: 8px;">{{ $t("Successfully Sent") }}</p>
                    </ion-text>
                    <ion-text class="text-title">
                        <p class="ion-text-left" style="margin:0px">An email has been dispatched to your designated address, <b class="mid-text">majdi@uni.edu</b> containing the comprehensive details of the lead list. Kindly be informed that you may also access and review the leads via the UNIRANKS Dashboard. However, please be aware that these leads will be expunged from this page within 24 hours from the present moment.</p>
                    </ion-text>
                </ion-col>
                <ion-col>
                    <ion-button>Scan more QR Codes</ion-button>
                </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import {defineComponent} from 'vue';
  import {
    IonCol,
    IonContent,
    IonGrid,
    IonPage,
    IonRow,
    IonText,
  } from "@ionic/vue";
  
  export default defineComponent({
  name: "SentSuccessModal",
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonText,
    IonCol,
  },
  });
  </script>
  <style scoped>
  ion-content {
  --background: #ffffff;
  }
  ion-text {
    padding:0%;
  }
  .big-title {
    font-family: "Calibri";
  font-size: 30px;
  font-weight: bold;
  font-style: normal;
  text-align: left;
  color: #1c345a;
  }
  .text-title {
    font-family: "Calibri";
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #606060;
  }
  .mid-text {
    font-family: "Calibri";
    font-size: 16px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    color: #606060;
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
    width: 90%;
    height: 50px;
    margin-left: 18px;
    margin-top: 18px;
  }
  </style>