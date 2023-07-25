<template>
    <ion-page>
        <header-section />
        <ion-content :fullscreen="true" >
            <ion-grid style="padding-left: 18px;padding-right: 18px;">
                <ion-row class="flex-col " style="margin-top: 8%;">
                    <ion-col size="12" style="text-align: center;">
                        <ion-text class="intro-name">{{$t(`Events List`)}}</ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <ion-text class="intro-pos">{{$t(`Right here is where you'll discover a treasure trove of current and upcoming events. It's also the place where you'll come face to face with the perfect study options that match your aspirations.`)}}</ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <ion-card class="program-detail-card">
                            <ion-card-content class="flex-row" style=" margin: 4px;">
                                <ion-img :src='uni_url' class="leftImg" style="width: 15%;"/>
                                <div class="flex-col" style=" margin-left:9px; width: 85%;">
                                    <div @click="toDetail">
                                        <ion-text class="university-name" style="float:left;">{{ $t("University of Michigan") }}</ion-text>
                                        <ion-img :src='nextImgUrl' class="next-img" style="float:right;  margin-top: 6px;"></ion-img>
                                    </div>
                                    <ion-text class="university-ranking">{{ $t(`Dubai International School`) }}</ion-text>
                                    <ion-text class="university-country" style="float: left;">{{ $t(`Today | in Campus`) }}</ion-text>
                                </div>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="12">
                        <ion-card class="program-detail-card">
                            <ion-card-content class="flex-row" style=" margin: 4px;">
                                <ion-img :src='uni_url' class="leftImg" style="width: 15%;"/>
                                <div class="flex-col" style=" margin-left:9px; width: 85%;">
                                    <div @click="toDetail">
                                        <ion-text class="university-name" style="float:left;">{{ $t("University of Michigan") }}</ion-text>
                                        <ion-img :src='nextImgUrl' class="next-img" style="float:right;  margin-top: 6px;"></ion-img>
                                    </div>
                                    <ion-text class="university-ranking">{{ $t(`Dubai International School`) }}</ion-text>
                                    <ion-text class="university-country" style="float: left;">{{ $t(`Today | in Campus`) }}</ion-text>
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

        const toDetail = () => {
            router.push('/events/detail');
        }
        const toQrMain = () => {
            router.push('/profile/qrmain');
        }

        return {
          uni_url,
          nextImgUrl,
          toDetail,
          toQrMain
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
        border-radius: 6px;
        filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
        background: #ffffff;
        margin: 0px;
        padding:9px;
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
        color: #00aeef;
        margin-right: 10%;
    }
    .university-ranking {
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        text-align: left;
        color: #203456;;
    }
    .university-country{
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        text-align: left;
        color: #606060;
    }
    .next-img {
        width: 7.7px;
    }
  </style>