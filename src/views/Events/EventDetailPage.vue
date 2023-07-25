<template>
    <ion-page>
        <header-section />
        <ion-content :fullscreen="true" >
            <ion-grid style="padding-left: 18px;padding-right: 18px;">
                <ion-row class="flex-col " style="margin-top: 8%;">
                    <ion-col size="12" style="text-align: left;">
                        <ion-text class="intro-name">{{$t(`Dubai International School University Fair`)}}</ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <ion-text class="intro-pos">{{$t(`Bellow list of Institutions that match your needs`)}}</ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <ion-card class="program-detail-card">
                            <ion-card-content style="display: flex; flex-flow: column; margin: 4px;">
                                <ion-text>
                                    <ion-text class="program-title-name" style="margin:0px">{{ $t(`BS Software Engineering`) }}</ion-text>
                                </ion-text>
                                <div style="display: flex; flex-flow: row;">
                                    <ion-img :src='uni_url' class="leftImg" style="width: 15%;"/>
                                    <div class="flex-col" style="margin-left:5px; width: 85%;">
                                        <div>
                                            <ion-text class="university-name" style="float:left;">{{ $t("University of Michigan") }}</ion-text>
                                            <ion-img :src='nextImgUrl' class="next-img" style="float:right;  margin-top: 6px;"></ion-img>
                                        </div>
                                        <ion-text class="university-ranking">{{ $t(`Local #1 | Global #5 | Score 96.24`) }}</ion-text>
                                        <div>
                                            <ion-text class="university-country" style="float: left;">{{ $t(`United States of America`) }}</ion-text>
                                            <ion-text class="university-status" style="float: right">{{ $t(`Recognized in Jordan`) }}</ion-text>
                                        </div>
                                    </div>
                                </div>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="12">
                        <ion-card class="program-detail-card">
                            <ion-card-content style="display: flex; flex-flow: column; margin: 4px;">
                                <ion-text>
                                    <ion-text class="program-title-name" style="margin:0px">{{ $t(`BS Software Engineering`) }}</ion-text>
                                </ion-text>
                                <div style="display: flex; flex-flow: row;">
                                    <ion-img :src='uni_url' class="leftImg" style="width: 15%;"/>
                                    <div class="flex-col" style="margin-left:5px; width: 85%;">
                                        <div>
                                            <ion-text class="university-name" style="float:left;">{{ $t("University of Michigan") }}</ion-text>
                                            <ion-img :src='nextImgUrl' class="next-img" style="float:right;  margin-top: 6px;"></ion-img>
                                        </div>
                                        <ion-text class="university-ranking">{{ $t(`Local #1 | Global #5 | Score 96.24`) }}</ion-text>
                                        <div>
                                            <ion-text class="university-country" style="float: left;">{{ $t(`United States of America`) }}</ion-text>
                                            <ion-text class="university-status" style="float: right">{{ $t(`Recognized in Jordan`) }}</ion-text>
                                        </div>
                                    </div>
                                </div>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
      <footer-section title="Show my QR Code" icon="qr" @next="toQrMain"/>
    </ion-page>
  </template>
    
  <script>
    import {
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonText,
        IonImg,
        IonCard,
        IonCardContent
    } from "@ionic/vue";
    import { defineComponent } from "vue";
    import {useRouter} from "vue-router";
    import HeaderSection from "@/components/HeaderSection.vue"
    import FooterSection from "@/components/profile/OnlyButtonFooter.vue";
    
    export default defineComponent({
      name: "EventsList",
      components: {
        HeaderSection,
        FooterSection,
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonImg,
        IonCol,
        IonText,
        IonCard,
        IonCardContent
      },
      setup() {
        const router = useRouter();
        const uni_url = 'https://d73ojsnoesnuw.cloudfront.net/images/universities-logos/university-of-washington-logo.png';    
        const nextImgUrl = 'assets/images/Chevron.svg';
        const toQrMain = () => {
            router.push('/profile/qrmain');
        }
        return {
          uni_url,
          nextImgUrl,
          toQrMain,
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
   .program-detail-card {
        width: 100%;
        height: auto;
        border-radius: 15px;
        filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
        background: #ffffff;
        margin: 0px;
        padding:9px;
    }
    .intro-pos {
      font-size: 16px;
      font-weight: 300;
      font-style: normal;
      text-align: left;
      color: #606060;
    }
    .intro-name {
      font-size: 30px;
      font-weight: bold;
      font-style: normal;
      text-align: left;
      color: #1c345a;
   }
    .university-name {
      font-size: 16px;
      font-weight: normal;
      font-style: normal;
      text-align: left;
      color: #203456;
    }
    .university-ranking {
      font-size: 12px;
      font-weight: 300;
      font-style: normal;
      text-align: left;
      color: #203456;
    }
    .university-country{
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      text-align: left;
      color: #606060;
    }
    .university-status {
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      text-align: left;
      color: #007a00;
    }
    .next-img {
        width: 7.7px;
    }
    .program-title-name {
      font-size: 16px;
      font-weight: normal;
      font-style: normal;
      text-align: left;
      color: #00aeef;
    }
  </style>