<template>
    <ion-page  style="height:90%">
        <ion-content>
            <ion-grid>
                <ion-row class="flex-col" style="margin-bottom: 0px; padding-bottom: 0px;">
                    <ion-col size="12" style="text-align: center;">
                        <ion-text class="modal-title">{{ $t(`Complete Your Profile`)}}</ion-text>
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col" style="margin-bottom:0;">
                    <ion-col size="12">
                        <ion-text class="small-title">
                            {{$t("It looks like your profile is still in progress. We totally get it - completing forms can be a bit tedious. But hey, we're here to make your life easier! To provide you with the best study options and unlock our magical assistance, we need to know a bit more about your preferences. So, grab a snack, take a moment, and complete your profile. Trust us, it'll be worth it! We've got your back!")}}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <ion-button>
                            <ion-text class="button-title">
                                {{ $t("Complete Your Profile") }}
                            </ion-text>
                        </ion-button>
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col" style="margin-bottom: 0px; padding-bottom: 0px;">
                    <ion-col size="12" style="text-align: center;">
                        <ion-text class="modal-title">{{ $t(`College Major Match Quiz`)}}</ion-text>
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col" style="margin-bottom:0;">
                    <ion-col size="12">
                        <ion-text class="small-title">
                            {{$t("Still unsure about what you want to study and where to go, huh? We've got your back, and we've got the perfect solution for you. Take our epic College Major Match Quiz, and let the magic happen. We'll analyze your answers and work our mystical powers to find the best major that suits your unique personality. So sit back, relax, and let us do the hard work.")}}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <ion-button>
                            <ion-text class="button-title">
                                {{ $t("Start the Match Quiz") }}
                            </ion-text>
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <footer-section @back="backModal"/>
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
    modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import FooterSection from "@/components/modal/profilemodal/BackFooterSection.vue";

export default defineComponent({
    name:"ProfileIntroModal",
    components: {
        FooterSection,
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonText,
        IonCol,
        IonButton
    },
    setup() {

        const backModal = () => {
            modalController.dismiss({
                'dismissed': true
            })
        }

        return {
            backModal,
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
ion-col {
    margin-bottom: 9px;
}
ion-button {
    --border-radius: 15px;
    --background: linear-gradient(-72deg, #436fb2 0.00%, #1c345a 100.00%);
    width: 100%;
    height: 50px;
}
ion-item {
  width: 100%;
  --min-height: 35px !important;
  --border-color: black;
  --ion-color-base: gray !important;
}
ion-item::part(native) {
  border-radius: 15px !important;
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
.small-title {
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #606060;
}
</style>