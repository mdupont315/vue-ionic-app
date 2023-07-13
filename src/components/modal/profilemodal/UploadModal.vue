<template>
    <ion-page  style="height:90%">
        <ion-content>
            <ion-grid>
                <ion-row class="flex-col" style="margin-bottom: 9px;">
                    <ion-col size="12" style="text-align: center;">
                        <ion-text class="modal-title">{{ $t(`${title}`)}}</ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <ion-text class="modal-intro-text">{{ $t("Document name: IMG-202545424Whg.jpg")}}</ion-text>
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col">
                    <ion-col size="12">
                        <hr class="under_line" />
                    </ion-col>
                    <ion-col size="12">
                        <ion-img src="assets/images/upload.png"></ion-img>
                    </ion-col>
                    <ion-col size="12">
                        <hr class="under_line" />
                    </ion-col>
                    <ion-col size="12">
                        <ion-button>
                            <ion-text class="button-title">
                                {{ $t("Close") }}
                            </ion-text>
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <footer-section />
    </ion-page>
</template>
<script>
import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonText,
    IonCol,
    IonButton,
    IonImg,
    modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
    name:"HigherModal",
    components: {
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonText,
        IonCol,
        IonButton,
        IonImg
    },
    props: {
      title: String,
    },
    // setup() {
    //     return {
    //         chevronDownOutline,
    //         trashBin,
    //     };
    // }
})
</script>
<style scoped>
ion-grid {
    padding:3%;
}
ion-text {
    font-family: "Calibri";
}
ion-col {
    margin-bottom: 9px;
}
ion-button {
    --border-radius: 15px;
    --background: linear-gradient(-72deg, #436fb2 0.00%, #1c345a 100.00%);
    width: 100%;
    height: 50px;
}
ion-img {
    width: 60%;
    height: 70%;
    margin-right: auto;
    margin-left: auto;
}
.modal-title {
    font-size: 30px;
    font-weight: bold;
    font-style: normal;
    text-align: center;
    color: #1c345a;
}
.modal-intro-text {
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: center;
    color: #606060;
}
.button-title {
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: center;
    color: #ffffff;
}
</style>