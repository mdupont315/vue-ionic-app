<template>
    <ion-page>
        <header-section />
        <ion-content>
            <ion-grid  style="margin-top: 8%;">
                <ion-row class="flex-col" style="margin-bottom: 9px;">
                    <ion-col size="12" style="margin-bottom: 9px;">
                        <ion-text class="page-title">{{ $t("My Documents")}}</ion-text>
                    </ion-col>
                    <ion-col size="12" class="text-center">
                        <ion-text class="page-intro-text">{{ $t("This platform knows no boundaries, making it a seamless space for you to submit everything you need.")}}</ion-text>
                    </ion-col>
                    <ion-col>
                        <hr class="under_line">
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col" >
                    <ion-col size="12" style="margin-bottom: 9px;">
                        <ion-text class="item-title">{{ $t("Education")}}</ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <ion-card>
                            <ion-card-content>
                                <ion-list>
                                    <ion-item lines="full" @click='toHigherSecondaryModal("Higher Secondary")'>
                                        <ion-label class="card-label" style="float: left;">{{ $t("Higher Secondary") }}</ion-label>
                                        <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                                    </ion-item>
                                    <ion-item lines="full" @click='toHigherSecondaryModal("Undergraduate")'>
                                        <ion-label class="card-label" style="float: left;">{{ $t("Undergraduate") }}</ion-label>
                                        <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                                    </ion-item>
                                    <ion-item lines="none" @click='toHigherSecondaryModal("Postgraduate")'>
                                        <ion-label class="card-label" style="float: left;">{{ $t("Postgraduate") }}</ion-label>
                                        <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                                    </ion-item>
                                </ion-list>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="12">
                        <hr class="under_line">
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col">
                    <ion-col size="12" class="flex-col" @click="toEnglishModal('English Language')">
                        <div>
                            <ion-text class="item-title" style="float: left;">{{ $t("English Tests")}}</ion-text>
                            <ion-icon :icon="addOutline" style="float: right" size="large"/>
                        </div>
                        <ion-text class="gray-text">
                            {{ $t("Add your English Language Tests here") }}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <hr class="under_line">
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col">
                    <ion-col size="12" class="flex-col" @click="toEnglishModal('Entrance')">
                        <div>
                            <ion-text class="item-title" style="float: left;">{{ $t("Entrance Tests")}}</ion-text>
                            <ion-icon :icon="addOutline" style="float: right" size="large"/>
                        </div>
                        <ion-text class="gray-text">
                            {{ $t("Add your Entrance Tests here") }}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <hr class="under_line">
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col">
                    <ion-col size="12" class="flex-col" @click="toWorkExp">
                        <div>
                            <ion-text class="item-title" style="float: left;">{{ $t("Work Experience")}}</ion-text>
                            <ion-icon :icon="addOutline" style="float: right" size="large"/>
                        </div>
                        <ion-text class="gray-text">
                            {{ $t("Add your Professional Experience documents here") }}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <hr class="under_line">
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col">
                    <ion-col size="12" style="margin-bottom: 9px;">
                        <ion-text class="item-title">{{ $t("Travel")}}</ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <ion-card>
                            <ion-card-content>
                                <ion-list>
                                    <ion-item lines="full" @click="toVisa('Visa')">
                                        <ion-label class="card-label" style="float: left;">{{ $t("Visa") }}</ion-label>
                                        <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                                    </ion-item>
                                    <ion-item lines="none" @click="toVisa('Passport')">
                                        <ion-label class="card-label" style="float: left;">{{ $t("Passport") }}</ion-label>
                                        <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                                    </ion-item>
                                </ion-list>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="12">
                        <hr class="under_line">
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col">
                    <ion-col size="12" class="flex-col"  @click="toVisa('Finance Documents')">
                        <div>
                            <ion-text class="item-title" style="float: left;">{{ $t("Finance")}}</ion-text>
                            <ion-icon :icon="addOutline" style="float: right" size="large"/>
                        </div>
                        <ion-text class="gray-text">
                            {{ $t("Add your Finance document here") }}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <hr class="under_line">
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col">
                    <ion-col size="12" class="flex-col"  @click="toVisa('Health Documents')">
                        <div>
                            <ion-text class="item-title" style="float: left;">{{ $t("Health")}}</ion-text>
                            <ion-icon :icon="addOutline" style="float: right" size="large"/>
                        </div>
                        <ion-text class="gray-text">
                            {{ $t("Add your Health document here") }}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <hr class="under_line">
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col">
                    <ion-col size="12" class="flex-col" @click="toExtracur">
                        <div>
                            <ion-text class="item-title" style="float: left;">{{ $t("Extracurricular")}}</ion-text>
                            <ion-icon :icon="addOutline" style="float: right" size="large"/>
                        </div>
                        <ion-text class="gray-text">
                            {{ $t("Add your Extracurricular document here") }}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <hr class="under_line">
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col">
                    <ion-col size="12" class="flex-col"  @click="toVisa('Recommendations Letter')">
                        <div>
                            <ion-text class="item-title" style="float: left;">{{ $t("Recommendations Letters")}}</ion-text>
                            <ion-icon :icon="addOutline" style="float: right" size="large"/>
                        </div>
                        <ion-text class="gray-text">
                            {{ $t("Add your Recommendations Letters here") }}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <hr class="under_line">
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col">
                    <ion-col size="12" class="flex-col" @click="toVisa('Other Documents')">
                        <div>
                            <ion-text class="item-title" style="float: left;">{{ $t("Others")}}</ion-text>
                            <ion-icon :icon="addOutline" style="float: right" size="large"/>
                        </div>
                        <ion-text class="gray-text">
                            {{ $t("Add your other documents here") }}
                        </ion-text>
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
    IonCard,
    IonCardContent,
    IonText,
    IonImg,
    IonList,
    IonItem,
    IonLabel,
    modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import HeaderSection from "@/components/HeaderSection.vue";
import FooterSection from "@/components/explore/FooterSection.vue";
import { addOutline } from 'ionicons/icons';

import HigherSecondaryModal from "@/components/modal/profilemodal/HigherSecondaryModal.vue";
import EnglishTestModal from "@/components/modal/profilemodal/EnglishTestModal.vue";
import WorkExperienceModal from "@/components/modal/profilemodal/WorkExperienceModal.vue";
import VisaModal from "@/components/modal/profilemodal/VisaModal.vue";
import ExtracurModal from "@/components/modal/profilemodal/ExtracurModal.vue";

export default defineComponent({
    name:"MyDocument",
    components: {
        HeaderSection,
        FooterSection,
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonCard,
        IonCardContent,
        IonText,
        IonImg,
        IonList,
        IonItem,
        IonLabel,
    },
    setup() {
        const toHigherSecondaryModal = async(title) => {
            const modal = await modalController.create({
                component: HigherSecondaryModal,
                componentProps: {
                    title: title
                },
                initialBreakpoint: 0.9,
            });
            modal.present();
        }
        const toEnglishModal = async(title) => {
            const modal = await modalController.create({
                component: EnglishTestModal,
                componentProps: {
                    title: title
                },
                initialBreakpoint: 0.9,
            });
            modal.present();
        }
        const toWorkExp = async(title) => {
            const modal = await modalController.create({
                component: WorkExperienceModal,
                initialBreakpoint: 0.9,
            });
            modal.present();
        }
        const toVisa = async(title) => {
            const modal = await modalController.create({
                component: VisaModal,
                componentProps: {
                    title: title
                },
                initialBreakpoint: 0.4,
            });
            modal.present();
        }
        const toExtracur = async() => {
            const modal = await modalController.create({
                component: ExtracurModal,
                // componentProps: {
                //     title: title
                // },
                initialBreakpoint: 0.9,
            });
            modal.present();
        }
        return {
            addOutline,
            toHigherSecondaryModal,
            toEnglishModal,
            toWorkExp,
            toVisa,
            toExtracur,
        };
    }
})
</script>
<style scoped>
ion-grid {
    padding:5%;
}
ion-text {
    font-family: "Calibri";
}
ion-card {
    width: 100%;
    height: auto;
    border-color: #bcbcbc;
    border-width: 1px;
    border-style: solid;
    border-radius: 25px;
    filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
    background: #ffffff;
    margin:0;
    margin-bottom:8px;
}
ion-card-content {
    padding: 0;
}
ion-col {
    padding: 0;
}
.text-center {
    text-align: center;
    padding-left: 5%;
    padding-right: 5%;
}
.page-title {
    font-size: 30px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    color: #1c345a;
}
.page-intro-text {
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: center;
    color: #606060;
}
.item-title {
    font-size: 26px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    color: #1c345a;
}
.card-label {
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #203456;
}
.gray-text {
    font-size: 16px;
    font-weight: 300;
    font-style: normal;
    text-align: left;
    color: #606060;
}
</style>