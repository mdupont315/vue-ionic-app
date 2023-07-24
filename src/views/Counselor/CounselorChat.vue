<template>
    <ion-page>
        <header-section></header-section>
        <div class="flex-row static-header">
                <ion-icon :src="arrowBackOutline" style="color:black; font-size: 30px; margin-top: auto; margin-bottom: auto; width: 15%;" @click="toPrev"></ion-icon>
                <div class="flex-row" style="width: 70%;">
                    <ion-img src="assets/images/indv.png" style="width: 80px; margin-right:9px"/>
                    <div class="flex-col" style="width: 100%;">
                        <ion-text style="float: left;">
                            <p class="counselor-title">{{ $t(`David Gorge`) }}</p>
                        </ion-text>
                        <ion-text>
                            <p class="counselor-status">{{ $t(`From University of Michigan`) }}</p>
                        </ion-text>
                    </div>
                </div>
                <div style="width: 15%;">
                    <ion-img src="assets/images/Icon-material-video-.svg" style="width:50%;margin-top: 15%; margin-left: auto; margin-right: auto;"></ion-img>
                </div>
        </div>
        <ion-content>
            <ion-grid>
                <ion-row style="margin-top: 65px; justify-content: center;display: flex; flex-flow: column;">
                  <ion-text class="log-title">
                    <p class="ion-text-center" style="margin:0px">{{ $t(`6/12/2023`) }}</p>
                  </ion-text>
                </ion-row>
                <ion-row class="flex-col">
                    <ion-col size="12" class="flex-row" style="justify-content: right;">
                        <div class="flex-col send-dialog" style="margin-right: 4px;">
                            <ion-text>{{ $t(`Hello there`) }}</ion-text>
                            <ion-text>{{ $t(`4:25 PM`) }}</ion-text>
                        </div>
                        <div>
                            <ion-img src="assets/images/indv.png"></ion-img>
                        </div>
                    </ion-col>
                    <ion-col size="12" class="flex-row" style="justify-content: left;">
                        <div>
                            <ion-img src="assets/images/indv.png" style="margin-right: 4px;"></ion-img>
                        </div>
                        <div class="flex-col receive-dialog" style="width: 70%;">
                            <ion-text>{{ $t(`Thanks for trusting in UNIRANKS and downloading our App, Can you please book a free remote counselling session via the App with me to discuss more your plan and your journey to study abroad or you can chat with me here with your inquiry `) }}</ion-text>
                            <ion-text>{{ $t(`4:25 PM`) }}</ion-text>
                        </div>
                    </ion-col>
                    
                    <ion-col v-for="message in dialogs" :key="message.id" size="12" class="flex-row" style="justify-content: right;">
                        <div  v-if="message.id" class="flex-col send-dialog" style="margin-right: 4px;">
                            <ion-text>{{ $t(`${message.text}`) }}</ion-text>
                            <ion-text>{{ $t(`4:25 PM`) }}</ion-text>
                        </div>
                        <div  v-if="message.id">
                            <ion-img src="assets/images/indv.png"></ion-img>
                        </div>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <footer-section  @save="postData" @discard="discardData"/>
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
    IonIcon,
} from "@ionic/vue";
import { defineComponent, computed } from "vue";
import {useCounselorData} from '@/store';
import {useRouter} from "vue-router";
import HeaderSection from "@/components/counselor/ChatHeader.vue";
import FooterSection from "@/components/counselor/ChatFooter.vue";
import { arrowBackOutline } from 'ionicons/icons';

export default defineComponent({
    name:"CounselorChat",
    components: {
        HeaderSection,
        FooterSection,
        IonPage,
        IonImg,
        IonIcon,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonText,
    },
    setup() {
        const router = useRouter();
        const store = useCounselorData();
        const dialogs = computed(() => store.dialogs);
        const toPrev = () => {
            router.push("/counselors");
        }

        return {
            arrowBackOutline,
            toPrev,
            dialogs
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
p {
    margin: 0px;
}
ion-grid {
    position: absolute;
    bottom: 0;
}
.log-title {
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    text-align: center;
    color: #606060;
}
.static-header {
    background-color: #f5f5f5; 
    height: 100px;
    padding-top: 50px;
    padding-bottom: 9px;
}
.send-dialog {
    padding: 8px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    color: white; 
    background-color: #1C345A;
}
.receive-dialog {
    padding: 8px;
    border-top-right-radius: 15px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    color: black; 
    background-color: #F5F5F5;
}
</style>