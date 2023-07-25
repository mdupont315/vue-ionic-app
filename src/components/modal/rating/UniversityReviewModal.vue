<template>
    <ion-page style="height: 96%;">
        <ion-content :fullscreen="true" class="ion-padding">
            <ion-grid class="no-padding" style="display:flex; flex-flow: column; justify-content: center;">
                <ion-row class="ion-padding-top flex-col">
                    <ion-col class="no-padding" size="12" style="text-align: center;">
                        <ion-text class="title-big" >{{$t(`Help other Students`)}}<br /> {{ $t("with your Review")}}</ion-text>
                    </ion-col>
                    <ion-col size="12" class="flex-row">
                        <ion-img :src="uni_url" style="width: 50px;"></ion-img>
                        <ion-text class="university-name">{{ $t("University of Michigan") }}</ion-text>
                    </ion-col>
                    <ion-col size="12" class="flex-row"  style="margin-top: 18px; justify-content: center;">
                        <ion-icon :src="star" style="font-size: 44px; color:#FFD500"></ion-icon>
                        <ion-icon :src="star" style="font-size: 44px; color:#FFD500"></ion-icon>
                        <ion-icon :src="star" style="font-size: 44px; color:#FFD500"></ion-icon>
                        <ion-icon :src="star" style="font-size: 44px; color:#FFD500"></ion-icon>
                        <ion-icon :src="star" style="font-size: 44px; color:#BCBCBC"></ion-icon>
                    </ion-col>
                    <ion-col size="12">
                        <ion-textarea
                            label="Outline textarea"
                            label-placement="floating"
                            fill="outline"
                            placeholder="Give your feedback"
                        ></ion-textarea>
                    </ion-col>

                </ion-row>
            </ion-grid>
        </ion-content>
        <footer-section title="Send" @next="backModal"/>
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
      IonTextarea,
      IonIcon,
      IonImg,
      modalController
    } from "@ionic/vue";
    import { defineComponent, ref } from "vue";
    import FooterSection from "@/components/profile/OnlyButtonFooter.vue";
    import { star } from 'ionicons/icons';
    
    export default defineComponent({
      name: "UniversityReview",
      components: {
            FooterSection,
            IonPage,
            IonContent,
            IonGrid,
            IonRow,
            IonCol,
            IonImg,
            IonTextarea,
            IonText,
            IonIcon,
        },
      setup() {    
        const uni_url = 'https://d73ojsnoesnuw.cloudfront.net/images/universities-logos/university-of-washington-logo.png'
        const backModal = () => {
            modalController.dismiss({
                dismissed: true
            })
        }
        return {
            star,
            uni_url,
            backModal,
        };
      },
    });
  </script>
  <style scoped>
    ion-content {
      --background:#F5F5F5;
      padding:9px
    }
    ion-toolbar {
        --border: none !important;
    }
    ion-textarea {
        --background: #FFFFFF;
        border-radius: 15px;
        height:150px
    }
    ion-icon {
        margin-left: 9px;;
    }
    .no-padding {
        padding:0px
    }
    .center-img {
        margin-left: auto;
        margin-right: auto;
    }
    .title-big {
        font-size: 30px;
        font-weight: bold;
        font-style: normal;
        text-align: left;
        color: #1c345a;
    }
    .title-small {
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        text-align: left;
        color: #606060;
    }
    .university-name {
        font-size: 20px;
        font-weight: normal;
        font-style: normal;
        text-align: left;
        color: #203456;
    }
</style>