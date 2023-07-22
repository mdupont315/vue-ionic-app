<template>
    <ion-page style="height: 90%;">
        <ion-content :fullscreen="true" class="ion-padding">
            <ion-grid  class="no-padding" style="display:flex; flex-flow: column; justify-content: center;">
                <ion-row class="ion-padding-top flex-col">
                    <ion-col class="no-padding" style="text-align: center;" size="12">
                    <ion-text class="title-big">{{$t("Remote Counselling")}}</ion-text>
                    </ion-col>
                </ion-row>
                <ion-row style="margin-top:18px">
                    <ion-col class="flex-row" size="12">
                        <ion-button expand="block" style="width: 40%; margin-right: 15%;" class="white-button" @click="history">
                            <ion-text class="bt-text" style="color: #1c345a;">{{ $t(`History`) }}</ion-text>
                        </ion-button>

                        <ion-button expand="block" style="width: 40%;" class="blue-button" @click="upcoming">
                            <ion-text class="bt-text" style="color: #FFFFFF">{{ $t(`Upcoming`) }}</ion-text>
                        </ion-button>
                    </ion-col>
                </ion-row>
                <ion-row v-if="isHistory" class="flex-col" style="margin-top:18px">
                    <ion-col size="12" style="background-color:#F5F5F5 ;">
                        <div class="flex-row" >
                            <ion-icon :src="videocam" style="color:black"></ion-icon>
                            <ion-text class="counselor-bold" style="color: #203456;">{{$t("David Gorge")}}</ion-text>
                        </div>
                        <div class="flex-row" >
                            <ion-icon :src="calendar"></ion-icon>
                            <ion-text class="counselor-date">{{$t("Jun 20, 2023 12:30 PM")}}</ion-text>
                        </div>
                        <div class="flex-row"  style="width: 100%; margin-top: 5%;">
                            <ion-text class="counselor-bold" style="color: #203456; text-align: center; width: 50%;">{{ $t("Reschedule") }}</ion-text>
                            <ion-text class="counselor-bold" style="color: #ff0000; text-align: center; width: 50%;" @click="toCancelSession">{{$t("Cancel")}}</ion-text>
                        </div>
                    </ion-col>
                </ion-row>
                <ion-row v-else style="margin-top:30%">
                    <ion-col class="flex-col">
                        <ion-img src="assets/images/sitting-man.png" class="center-img" style="width: 50%;"></ion-img>
                        <ion-text class="title-big" style="text-align: center;">{{$t("You currently have no sessions scheduled.")}}</ion-text>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <footer-section back="Back" forward="Book a Session" @discard="backModal"/>
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
      IonButton,
      IonIcon,
      modalController
    } from "@ionic/vue";
    import { defineComponent, ref } from "vue";
    import FooterSection from "@/components/modal/profilemodal/FooterSection.vue";
    import { videocam, calendar } from 'ionicons/icons';
    import CancelSessionModal from "@/components/modal/counselor/CancelSessionModal.vue";
    
    export default defineComponent({
      name: "CheckSession",
      components: {
        FooterSection,
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonButton,
        IonText,
        IonIcon,
      },
      setup() {    
        const isHistory = ref(true);
        const toCancelSession = async () => {
            const modal = await modalController.create({
                component: CancelSessionModal,
                initialBreakpoint: 0.4,
            });
            modal.present();
        }
        const upcoming = () => {
            isHistory.value=false;
        }
        const history = () => {
            isHistory.value=true;
        }
        const backModal = () => {
            modalController.dismiss({
                dismissed: true
            })
        }
        return {
            isHistory,
            upcoming,
            history,
            videocam,
            calendar,
            backModal,
            toCancelSession
        };
      },
    });
  </script>
  <style scoped>
    ion-content {
      --background:#FFFFFF;
    }
    ion-item::part(native) .item-inner {
      background-color: red;
      border: none !important;;
    }
    ion-icon {
        margin-top:4px;
        margin-left: 3%;
        margin-right: 3%;
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
    .counselor-date {
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        text-align: left;
        color: #606060;
    }
    .counselor-bold {
        font-size: 20px;
        font-weight: bold;
        font-style: normal;
        text-align: left;
    }
    .bt-text {
        font-size: 20px;
        font-weight: normal;
        font-style: normal;
        text-align: center;
    }
    .blue-button {
        --border-radius: 15px;
        --background: linear-gradient(-72deg, #436fb2 0.00%, #1c345a 100.00%);
        --background-activated: #1c345a !important;
        width: 100%;
        height: 50px;
    }
    .white-button {
        --border-radius: 15px;
        filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.15 ));
        --background: #e6e6e6;
        --background-activated: #F5F5F5 !important;
        width: 100%;
        height: 49px;
    }
</style>