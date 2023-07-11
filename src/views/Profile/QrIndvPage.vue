<template>
  <ion-page>
    <header-section />
    <ion-content :fullscreen="true" class="no-padding">
      <ion-grid  class="no-padding" style="display:flex; flex-flow: column; justify-content: center;">
        <ion-row class="ion-padding-top" style="margin-top: 8%; margin-left: 18px;">
          <ion-col class="no-padding">
            <ion-card class="intro-card">
              <ion-card-content style="justify-content: center;">
                <div style="display: flex; flex-flow: column;">
                  <div style="display: flex; flex-flow: row;justify-content: center;">
                    <ion-img :src='userImgUrl' class="user-Img"/>
                    <div style="display: flex; flex-flow: column; margin-left: 18px;">
                      <ion-text class="intro-name">{{$t(`Majdi Alhaj`)}}</ion-text>
                      <ion-text class="intro-pos">{{$t(`Dubai, United Arab Emirates`)}}</ion-text>
                    </div>
                  </div>
                </div>
                <ion-text class="intro-act" style="text-align: center;">{{$t(`Looking for Undergraduate Course`)}}</ion-text>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="d-flex" style="margin-top: 18px; margin-bottom: 18px;">
            <ion-img :src='qrImgUrl'/>
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
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonText,
    modalController
  } from "@ionic/vue";
  import { defineComponent } from "vue";
  import HeaderSection from "@/components/HeaderSection.vue";
  import FooterSection from "@/components/profile/ProfileFooterSection.vue";
  
  export default defineComponent({
    name: "ProfileLoginPage",
    components: {
      HeaderSection,
      FooterSection,
      IonPage,
      IonContent,
      IonGrid,
      IonRow,
      IonCol,
      IonCard,
      IonCardContent,
      IonText,
    },
    setup() {
      const userImgUrl = '/assets/images/indv.png';
      const qrImgUrl = '/assets/images/qrcodesample.svg';
      return {
        userImgUrl,
        qrImgUrl,
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
    justify-content: center;
  }
  .intro-card {
    width: 100%;
    height:auto;
    border-color: #bcbcbc;
    border-width: 1px;
    border-style: solid;
    border-radius: 25px;
    filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
    background: #ffffff;
    margin:0;
    margin-top: 25px;
    padding: 0;
  }
  .no-padding {
    padding: 0;
  }
 .user-Img {
    width: 43.1px;
    height: 43.1px;
    margin-top: 15px;
    margin-left: 9px;
 }
 .intro-name {
    font-family: "Calibri";
    font-size: 26px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    color: #203456;
 }
 .intro-pos {
    font-family: "Calibri";
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #1c345a;
 }
 .intro-act {
    font-family: "Calibri";
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: center;
    color: #606060;
    margin-left: 35%;
 } 
</style>