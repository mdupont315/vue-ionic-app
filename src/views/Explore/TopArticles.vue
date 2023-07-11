<template>
    <ion-page>
        <header-section />
        <ion-content :fullscreen="true" class="ion-padding-top">
            <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
                <ion-row class="ion-padding-top">
                    <ion-col size="12" style="margin-top: 8%; width: 100%; justify-content: center">
                        <ion-text class="big-title">
                            <p class="ion-text-center" style="margin-bottom: 0;">{{ $t('Top Articles') }}</p>
                        </ion-text>
                    </ion-col>
                    <ion-col  style="display: flex; flex-flow: column;">
                        <ion-img :src="inspired" style="height: auto;width: 100%; border-radius: 15px;"/>
                        <ion-text class="title">
                            {{ $t(`Essential Tips for Choosing the Right University and Major`) }}
                        </ion-text> 

                        <ion-card>
                            <ion-img :src="inspired" style="height: auto;width: 100%;"/>
                            <ion-card-content>
                                <ion-text  class="title">{{ $t(`Article 1 Essential Tips for Choosing the Right University and Major`) }}</ion-text>
                                <ion-img :src='nextImgUrl' style="float: right;" />
                            </ion-card-content>
                        </ion-card>
                        <ion-card>
                            <ion-img :src="inspired" style="height: auto;width: 100%;"/>
                            <ion-card-content>
                                <ion-text class="title">{{ $t(`Article 2 Essential Tips for Choosing the Right University and Major`)}}</ion-text>
                                <ion-img :src='nextImgUrl' style="float: right;" />
                            </ion-card-content>
                        </ion-card>
                        <ion-card>
                            <ion-img :src="inspired" style="height: auto;width: 100%;"/>
                            <ion-card-content>
                                <ion-text class="title">{{ $t(`Article 3 Essential Tips for Choosing the Right University and Major`)}}</ion-text>
                                <ion-img :src='nextImgUrl' style="float: right;" />
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <footer-section />
    </ion-page>
</template>

<script>
import {useExploreDataStore} from "@/store";
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
import HeaderSection from "@/components/explore/HeaderSection.vue";
import FooterSection from "@/components/explore/FooterSection.vue";

export default defineComponent({
    name: "TopArticles",
    components: {
        HeaderSection,
        FooterSection,
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonText,
        IonImg,
        IonCard,
        IonCardContent
    },
    setup() {
        const imgUrl = '/assets/images/header.svg';
        const inspired = '/assets/images/inspiration2 (1).png';
        const nextImgUrl = '/assets/images/Chevron.svg';

        return {
            imgUrl,
            inspired,
            nextImgUrl,
        };
    },
});
</script>
<style scoped>
ion-header {
    --opacity-scale: 0 !important;
}
ion-content {
    --background: #ffffff;
}
ion-text {
    padding:0%;
}
ion-card {
    width: 100%;
    height: auto;
    border-radius: 15px;
    filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
    margin-bottom: 15px;
    margin-left:0px;
    margin-top:0px;
    margin-right:0px;
    background: #ffffff
}
.title {
    font-family: "Calibri";
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #1c345a;
}
.big-title {
    font-family: "Calibri";
    font-size: 30px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    color: #1c345a;
}
</style>