<template>
    <ion-page>
      <header-section />
      <ion-content :fullscreen="true" class="no-padding">
        <ion-grid  class="no-padding" style="display:flex; flex-flow: column; justify-content: center;">
          <ion-row class="ion-padding-top" style="margin-top: 18px; margin-left: 18px;">
            <ion-col class="no-padding">
                <ion-card class="intro-card">
                    <ion-card-content class="unique-content" style="justify-content: center;">
                        <div style="display: flex; flex-flow: column;">
                            <div style="display: flex; flex-flow: row;">
                                <ion-img :src='userImgUrl' class="user-Img"/>
                                <div style="display: flex; flex-flow: column; margin-left: 18px;">
                                    <ion-text class="intro-name">Majdi Alhaj</ion-text>
                                    <ion-text class="intro-pos">Dubai, United Arab Emirates</ion-text>
                                </div>
                            </div>
                        </div>
                        <ion-text class="intro-act">Looking for Undergraduate Course</ion-text>
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
  import FooterSection from "@/components/profile/ProfileFooterSection.vue";
  
  export default defineComponent({
    name: "ProfileLoginPage",
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
  }
  .p-bottom {
    /* position: absolute; */
    width: 100%;
    padding-top: 25px;
    padding-bottom: 55px;
    background: #fff;
    border-top-right-radius: 35px;
    border-top-left-radius: 35px;
  }
  .p-txt {
    justify-content: left;
    padding-left: 1.5rem;
    font-family: "Calibri";
    font-size: 26px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    color: #1c345a;
  }
  .p-icon {
    position: absolute;
    right: 10px;
  }
  .intro-card {
    width: 350px;
    height:max-content;

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
    text-align: left;
    color: #606060;
    margin-left: 20px;
 }
 .city-name {
    margin-top: 3px;
    margin-left: 5px;
    font-family: "Calibri";
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color:#00AEEF;
 }
 .country-card {
    width: max-content;
    height: 36px;
    margin-left: 18px;
    /* border-color: #000000; */
    /* border-width: 1px;/
    border-style: dashed; */
    border-radius: 15px;
    background:#f5f5f5;
    display: flex;
    flex-flow: row;
    /* padding: 6px; */
    padding-left: 5px;
    padding-right: 5px;
}
 .country-flag{
    width: 23.1px;
    height: 23.1px;
    margin-top: auto;
    margin-bottom: auto;
 }
 .country-name {
    margin-left: 3px;
    margin-top: 3px;
    font-family: "Calibri";
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #1C345A;
 }
 .leftImg {
    width: 50px;
    height: 50.6px;
    margin-top: 5%;
    margin-left: 3px;
}
.university-name {
    font-family: "Calibri";
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #203456;
    margin-right: 10%;
}
.university-ranking {
    font-family: "Calibri";
    font-size: 12px;
    font-weight: 300;
    font-style: normal;
    text-align: left;
    color: #203456;
}
.university-country{
    font-family: "Calibri";
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    color: #606060;
    /* float: left; */
}
.university-status {
    font-family: "Calibri";
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    color: #007a00;
    margin-right: 8px;
    /* float: right; */
}
.option-card {
    width: max-content;
    height: 36px;
    padding: 5px;
    border-radius: 15px;
    background: #1c345a;
    margin-right:9px  
}
.option-name {
    font-family: "Calibri";
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #ffffff;
}
  </style>