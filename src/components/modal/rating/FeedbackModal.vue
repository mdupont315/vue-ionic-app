<template>
    <ion-page style="height: 60%;">
        <ion-content :fullscreen="true" class="ion-padding">
            <ion-grid class="no-padding" style="display:flex; flex-flow: column; justify-content: center;">
                <ion-row class="ion-padding-top flex-col">
                    <ion-col class="no-padding" size="12">
                        <ion-text class="title-big" >{{$t(`We're all ears!`)}}<br /> {{ $t("Give it to us straight")}}</ion-text>
                    </ion-col>
                    <ion-col class="no-padding" size="12" style="margin-top: 18px;">
                        <ion-text class="title-small" >{{$t("We want to deliver the absolute best experience possible, which is why your feedback is like gold to us. Let us know what's rocking your world and what's not quite hitting the mark. Together, we'll keep raising the bar!")}}</ion-text>
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
      modalController
    } from "@ionic/vue";
    import { defineComponent, ref } from "vue";
    import FooterSection from "@/components/profile/OnlyButtonFooter.vue";
    import { star } from 'ionicons/icons';
    
    export default defineComponent({
      name: "FeedbackModal",
      components: {
            FooterSection,
            IonPage,
            IonContent,
            IonGrid,
            IonRow,
            IonCol,
            IonTextarea,
            IonText,
            IonIcon,
        },
      setup() {    
        const backModal = () => {
            modalController.dismiss({
                dismissed: true
            })
        }
        return {
            star,
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
</style>