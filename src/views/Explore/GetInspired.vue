<template>
    <ion-page>
        <ion-header class="ion-no-border" mode="ios" collapse="fade" :translucent="true">
            <ion-toolbar>
                <ion-title class="ion-text-center" color="primary"></ion-title>
                <ion-img :src='imgUrl'/>
                <ion-searchbar></ion-searchbar>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="ion-padding-top">
            <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
                <ion-row class="ion-padding-top">
                    <ion-col size="12" style="margin-top: 25px; width: 100%; justify-content: center">
                        <ion-text class="big-title">
                        <p class="ion-text-center" style="margin-bottom: 0;">{{ $t('Get Inspired') }}</p>
                        </ion-text>
                    </ion-col>
                    <ion-col  style="display: flex; flex-flow: column;">
                        
                        <img :src="inspired" style="height: 89px;width: 98%; border-radius: 15px;"/>
                        <p class="title">
                            Essential Tips for Choosing the Right University and Major
                        </p> 

                        <ion-card>
                            <img :src="inspired" style="height: 89px;width: 100%;"/>
                            <ion-card-content>
                                <p  class="title">Article 1 Essential Tips for Choosing the Right University and Major</p>
                                <ion-img :src='nextImgUrl' style="float: right;" />
                            </ion-card-content>
                        </ion-card>
                        <ion-card>
                            <img :src="inspired" style="height: 89px;width: 100%;"/>
                            <ion-card-content>
                                <p class="title">Article 2 Essential Tips for Choosing the Right University and Major</p>
                                <ion-img :src='nextImgUrl' style="float: right;" />
                            </ion-card-content>
                        </ion-card>
                        <ion-card>
                            <img :src="inspired" style="height: 89px;width: 100%;"/>
                            <ion-card-content>
                                <p class="title">Article 3 Essential Tips for Choosing the Right University and Major</p>
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
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonPage,
    IonRow,
    IonText,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonImg,
    IonSearchbar,
} from "@ionic/vue";
import {computed, defineComponent, ref, onBeforeMount} from "vue";
// import {useRouter} from "vue-router";
import {useLoadingStore} from "@/store/loading";
import {useComingSoonAlert} from "@/shared/comingSoonAlert";
import HeaderSection from "@/components/explore/HeaderSection.vue";
import FooterSection from "@/components/explore/FooterSection.vue";
import {useRoute, useRouter} from "vue-router";


export default defineComponent({
  name: "StudyDestinationRegion",
  props:['id'],
  components: {
    // HeaderSection,
    FooterSection,
    // IonButton,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonImg,
    IonSearchbar,
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    // IonCol,
    // IonText
  },
  setup() {
    const store = useExploreDataStore();
    const route = useRoute();
    const {loadStudyDestDataDetail} = store;
    const dataLoaded = computed(() => store.region_detail_dataLoaded);
    const region_detail_data = computed(() => store.region_detail_data);
    // console.log(dataLoaded.value)
    const {showLoading, hideLoading} = useLoadingStore();
    const router = useRouter();
    const doLogin = async () => {
      showLoading();
    };
    const imgUrl = '/assets/images/header.svg';
    const inspired = '/assets/images/inspiration2 (1).png';
    const nextImgUrl = '/assets/images/Chevron.svg';

    return {
      doLogin,
    //   comingSoon,
      imgUrl,
      inspired,
      nextImgUrl,

      region_detail_data,
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

ion-toolbar {
    position: absolute;
    background: #1c345a;
    text-align: center;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  }

ion-searchbar {

    width: 346px;
    height: 49.6px;

    border-color: #7fc4fd;
    border-width: 1px;
    border-style: solid;
    border-radius: 15px;

    background: #ffffff;
    margin-left: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    text-align: center;
    padding-top: 15px;
}
ion-card {
    width: 366px;
    height: 189px;

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