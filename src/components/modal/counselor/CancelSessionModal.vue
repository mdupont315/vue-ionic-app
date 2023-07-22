<template>
    <ion-page style="height: 40%;">
        <ion-content :fullscreen="true" class="ion-padding">
            <ion-grid class="no-padding" style="display:flex; flex-flow: column; justify-content: center;">
                <ion-row class="ion-padding-top flex-col">
                    <ion-col class="no-padding" size="12" style="padding-left: 9px;">
                        <ion-text class="title-big" >{{$t("Why are you cancelling the session?")}}</ion-text>
                    </ion-col>
                    <ion-col>
                        <ion-textarea
                            label="Outline textarea"
                            label-placement="floating"
                            fill="outline"
                            placeholder="Enter text"
                        ></ion-textarea>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <footer-section cancel="Discard" confirm="Cancel Meeting" @discard="backModal"/>
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
      modalController
    } from "@ionic/vue";
    import { defineComponent, ref } from "vue";
    import FooterSection from "@/components/modal/profilemodal/LogOutFooter.vue";
    import { videocam, calendar } from 'ionicons/icons';
    
    export default defineComponent({
      name: "CancelSession",
      components: {
            FooterSection,
            IonPage,
            IonContent,
            IonGrid,
            IonRow,
            IonCol,
            IonTextarea,
            IonText,
        },
      setup() {    
        const isHistory = ref(true);
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
        height:60px
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