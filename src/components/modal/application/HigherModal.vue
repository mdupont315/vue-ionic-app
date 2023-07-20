<template>
    <ion-page  style="height:35%" >
        <ion-content class="edit-content">
            <ion-grid>
                <ion-row style="margin-top: 18px; justify-content: center;display: flex; flex-flow: column;">
                    <ion-text class="log-title">
                        <p class="ion-text-center" style="margin:0px">{{ $t(`Higher Secondary`) }}</p>
                    </ion-text>
                    <ion-text class="log-mid-title">
                        <p class="ion-text-center" style="margin:0px">{{ $t(`Please choose your preferred intake. By default, the earliest intake is chosen`) }}</p>
                    </ion-text>
                    <ion-img :src='logOutImg' class="centerImg"/>
                </ion-row>
            </ion-grid>
        </ion-content>
        <footer-section @back="backModal" title="Upload"/>
    </ion-page>
</template>
<script>
import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonText,
    IonImg,
    modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import FooterSection from "@/components/modal/profilemodal/PrevSaveFooter.vue";

export default defineComponent({
    name:"HigherModal",
    components: {
        FooterSection,
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonImg,
        IonText,
    },
    setup() {

        const logOutImg = "assets/images/higerSec.png";

        const backModal = () => {
            modalController.dismiss({
                'dismissed': true
            })
        }

        return {
            backModal,
            logOutImg,
        };
    }
})
</script>
<style scoped>
ion-grid {
    padding:3%;
}
ion-text {
    font-family: "Calibri";
}
.centerImg {
  margin-left: auto;
  margin-right: auto;
}
.log-title {
    font-size: 30px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    color: #1c345a;
}
.edit-content {
    --ion-background-color: #F5F5F5 !important;
}
.log-mid-title {
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    text-align: center;
    color: #1c345a; 
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 19px;
    margin-bottom: 19px;
}
</style>