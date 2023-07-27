<template>
    <ion-page>
        <header-section />
        <ion-content :fullscreen="true" class="ion-padding-top">
            <ion-grid style="margin-top: 20%;">
                <ion-row>
                    <ion-col size="12">
                        <ion-text class="txt-16 color-5">
                            {{ $t(`Rate and gain deeper insights into your education agent's services`) }}
                        </ion-text>
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col">
                    <ion-col size="12" style="padding-top: 0px;">
                        <ion-card>
                            <ion-card-content>
                                <ion-img :src='uni_url' class="leftImg float-left"/>
                                <ion-text class="txt-20 color-7" style="float:center;">
                                    {{ "idp International Education" }}<br />
                                    {{ "Specialists" }}
                                </ion-text>
                                <ion-img :src='nextImgUrl' class="next-img float-right"></ion-img>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="12" class="no-padding">
                        <ion-card>
                            <ion-card-content>
                                <ion-img :src='uni_url' class="leftImg float-left"/>
                                <ion-text class="txt-20 color-7" style="float:center;">
                                    {{ "idp International Education" }}<br />
                                    {{ "Specialists" }}
                                </ion-text>
                                <ion-img :src='nextImgUrl' class="next-img float-right"></ion-img>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="12" class="no-padding">
                        <ion-card>
                            <ion-card-content>
                                <ion-img :src='uni_url' class="leftImg float-left"/>
                                <ion-text class="txt-20 color-7" style="float:center;">
                                    {{ "idp International Education" }}<br />
                                    {{ "Specialists" }}
                                </ion-text>
                                <ion-img :src='nextImgUrl' class="next-img float-right"></ion-img>
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
    IonCard,
    IonCardContent,
    IonText,
    IonImg,
    modalController,
} from "@ionic/vue";
import {computed, defineComponent, ref, onBeforeMount} from "vue";
import {useRouter} from "vue-router";
import {useLoadingStore} from "@/store/loading";
import HeaderSection from "@/components/explore/HeaderSection.vue";
import FooterSection from "@/components/explore/FooterSection.vue";
import UniversityDetailModal from "@/components/modal/UniversityDetailModal.vue";

export default defineComponent({
  name: "UniversityMore",
  components: {
    HeaderSection,
    FooterSection,
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonText,
    IonImg,
  },
  setup() {
    const uni_url = 'https://d73ojsnoesnuw.cloudfront.net/images/universities-logos/university-of-washington-logo.png'
    const nextImgUrl = 'assets/images/Chevron.svg';
    
    return {
        nextImgUrl,
        uni_url
    };
  },
});
</script>
<style scoped>
ion-content {
    --background: #f5f5f5;
}
ion-text {
    padding:0%;
}
ion-col {
    padding:6px;
}
ion-card {
    width: 100%;
    height: auto;
    border-radius: 6px;
    filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
    background: #ffffff;
    margin: 0px;
}
ion-card-content {
    padding:0;
}
.leftImg {
    width: 50px;
    height: 50.6px;
    margin: 6px 5px 6px 10px ;
}
.next-img {
    width: 7.7px;
    position: absolute;
    right: 8px;
    top: 8px;
}
</style>