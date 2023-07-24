<template>
    <ion-page style="height: 95%;">
      <ion-content :fullscreen="true" >
        <ion-grid style="padding-left: 18px;padding-right: 18px;">
          <ion-row class="flex-col" style="margin-top: 8px;">
            <ion-col size="12">
                <ion-text class="intro-name">{{$t(`Bookmarks`)}}</ion-text>
            </ion-col>
            <ion-col size="12">
                <ion-text class="intro-pos">{{$t(`Time to kickstart your study adventure! Begin mapping out your journey by bookmarking your favorite courses. Just hit that trusty bookmark button, and voila! Your chosen courses will be right here`)}}</ion-text>
            </ion-col>
            <ion-col v-if="!flag" size="12" style="text-align: center;">
                <ion-text class="intro-act">{{$t(`You Haven't bookmark any courses for now`)}}</ion-text>
            </ion-col>
            <ion-col v-if="!flag" size="12" class="d-flex" style="margin-top: 18px; margin-bottom: 18px;">
              <ion-img :src='bookmarkimg'/>
            </ion-col>
            <ion-col v-if="flag" size="12">
                <ion-card class="program-detail-card">
                    <ion-card-content style="display: flex; flex-flow: column; margin: 4px;">
                        <ion-text>
                            <ion-text class="program-title-name" style="margin:0px">{{ $t(`BS Software Engineering`) }}</ion-text>
                        </ion-text>
                        <div style="display: flex; flex-flow: row;">
                            <ion-img :src='uni_url' class="leftImg" style="width: 15%;"/>
                            <div style="display: flex; flex-flow: column; margin-top: 3%; margin-left:1px; width: 85%;">
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
      <footer-section :title="!flag?'Explore Courses':'Explore More Courses'" @next="changeFlag"/>
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
    import { defineComponent, ref } from "vue";
    import FooterSection from "@/components/profile/OnlyButtonFooter.vue";
    
    export default defineComponent({
      name: "BookMark",
      components: {
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
        const flag=ref(false);
        const bookmarkimg = '/assets/images/book-mark.png';
        const uni_url = 'https://d73ojsnoesnuw.cloudfront.net/images/universities-logos/university-of-washington-logo.png';    
        const nextImgUrl = 'assets/images/Chevron.svg';
        const changeFlag = () => {
            flag.value = true;
        }
        return {
          bookmarkimg,
          flag,
          uni_url,
          nextImgUrl,
          changeFlag,
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
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        text-align: left;
        color: #606060;
   }
   .intro-act {
        font-size: 30px;
        font-weight: bold;
        font-style: normal;
        text-align: center;
        color: #606060;
   } 
   .program-detail-card {
        width: 100%;
        height: auto;
        border-radius: 6px;
        filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
        background: #ffffff
    }
    .program-title-name {
        font-family: "Calibri";
        font-size: 16px;
        font-weight: bold;
        font-style: normal;
        text-align: left;
        color: #203456;
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
    }
    .university-status {
        font-family: "Calibri";
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        color: #007a00;
    }
    .next-img {
        width: 7.7px;
    }
  </style>