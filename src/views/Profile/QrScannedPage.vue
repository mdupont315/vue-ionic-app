<template>
    <ion-page>
      <header-section />
      <ion-content :fullscreen="true" class="ion-padding-top">
        <ion-grid  class="ion-padding" style="display:flex; flex-flow: column; justify-content: center;">
          <ion-row style="display: flex; flex-flow: column;">
            <ion-col style="text-align: center; margin-top: 18px;">
                <ion-text class="qr-title">QR Code Scanned Leads</ion-text>
            </ion-col>
            <ion-col style="text-align: center; margin-top: 28px;">
                <ion-text class="qr-mid-title">15 Students QR code has been scanned</ion-text>
            </ion-col>
            <ion-col style="text-align: left; margin-top: 28px;">
                <ion-text class="qr-text-title">We're saving those leads right in the university dashboard for safekeeping. They'll be removed from here within 24 hours after you click <p style="display:inline;font-weight: bold;">Email me The Leads.</p></ion-text>
            </ion-col>
            <ion-col style="margin-top: 68px; margin-bottom: 18px; justify-content: left;">
                <ion-card class="intro-card">
                    <ion-card-content style="display: flex; flex-flow: row;">
                        <ion-img :src='userImgUrl' class="user-Img"/>                                
                        <div style="display: flex; flex-flow: column;">
                            <ion-text class="intro-name">Jennifer William</ion-text>
                            <ion-text class="intro-pos">jennifer.lopez@gmail.com</ion-text>
                            <ion-text class="intro-pos">00971123456789</ion-text>
                        </div>
                    </ion-card-content>
                </ion-card>
            </ion-col>
            <ion-col v-for="name in names" :key="name" style="margin-top: 58px; justify-content: left;">
                <ion-card class="intro-card">
                    <ion-card-content style="display: flex; flex-flow: row;">
                        <ion-img :src='userImgUrl' class="user-Img"/>                                
                        <div style="display: flex; flex-flow: column;">
                            <ion-text class="intro-name">{{ `${name}` }}</ion-text>
                            <ion-text class="intro-pos">jennifer.lopez@gmail.com</ion-text>
                            <ion-text class="intro-pos">00971123456789</ion-text>
                        </div>
                    </ion-card-content>
                </ion-card>
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
  import { defineComponent } from "vue";
  import HeaderSection from "@/components/HeaderSection.vue";
  import FooterSection from "@/components/profile/OnlyButtonFooter.vue";
  
  export default defineComponent({
    name: "QrScanned",
    components: {
      HeaderSection,
      FooterSection,
      IonContent,
      IonPage,
      IonGrid,
      IonRow,
      IonCol,
      IonText,
    },
    setup() {

        const userImgUrl = '/assets/images/indv.png';
        const qrImgUrl = '/assets/images/qrcodesample.svg';
        const names = [
          "Oliver William", "Elijah Benjamin",
          "James Theodore", "William Lopez", "Lucas Henry",
          "Oliver William", "Elijah Benjamin",
          "James Theodore", "William Lopez",
      ]
      return {
        userImgUrl,
        qrImgUrl,
        names,
      };
    },
  });
  </script>
  <style scoped>
  ion-content {
    --background:#F5F5F5;
  }
  ion-item::part(native) .item-inner {
    background-color: red;
    border: none !important;;
  }
  footer-section {
    background: #ffffff;
  }
  ion-card-content {
    padding: 0;
  }
  /* ion-card {
    padding: 0;
  } */

  .intro-card {
    width: 346px;
    border-radius: 6px;
    filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
    background: #ffffff;
    margin: 0;
    padding-left: 8px;
  }
  .no-padding {
    padding: 0;
  }
 .user-Img {
    width: 43.1px;
    height: 43.1px;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 8px;
 }
 .intro-name {
    font-family: "SF UI Display";
    font-size: 15px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    color: #203456;
 }
 .intro-pos {
  font-family: "SF UI Display";
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  text-align: left;
  color: #203456;
 }
 .intro-act {
    font-family: "Calibri";
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #606060;
    margin-left: 20px;
 }
 .qr-title {
    font-family: "Calibri";
    font-size: 30px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    color: #1c345a;
 }
 .qr-mid-title {
    font-family: "Calibri";
    font-size: 20px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    color: #606060;
 }
 .qr-text-title {
    font-family: "Calibri";
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #606060;
 }

  </style>