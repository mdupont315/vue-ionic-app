<template>
    <ion-page>
        <ion-header class="ion-no-border" mode="ios" collapse="fade" :translucent="true">
            <ion-toolbar>
                <ion-title class="ion-text-center" color="primary"></ion-title>
                <ion-img :src='imgUrl'/>
                <!-- <ion-searchbar></ion-searchbar> -->
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="ion-padding-top">
            <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
                <ion-row class="ion-padding-top">
                <ion-col size="12" style="margin-top: 25px; width: 100%; justify-content: center">
                    <ion-text class="big-title">
                        <p class="ion-text-center" style="margin-bottom: 0;">{{ $t(`${country_detail_data?.data?.country_name}`) }}</p>
                    </ion-text>
                    <ion-text class="few-title">
                        <p class="ion-text-center" style="margin:0px">{{ $t(`${country_detail_data?.data?.number_of_universities} Universities`) }}</p>
                    </ion-text>
                    <ion-img :src='country_detail_data?.data?.flag_url' class="main-img"/>
                    <p class="gradient-text">Located in Ann Arbor, Michigan, the University of Michigan is a renowned institution known for its academic excellence, innovative research, and vibrant campus community. As one of the top public universities in the United States, Michigan offers a wide range of programs and opportunities for students to pursue their passions and achieve their academic and professional goals.</p>
                    <ion-text class="mid-title">
                        <p class="ion-text-left" style="margin:0px">Read more</p>
                    </ion-text>
                </ion-col>
                <ion-col size="12" style="display: flex; flex-flow: row;">
                    <ion-img :src='uniImgUrl' class="leftImg"/>
                    <ion-text class="mid-title">
                        <p class="ion-text-left" style="margin:0px">{{ $t(`University Rankings | ${country_detail_data?.data?.number_of_universities}`) }}</p>
                    </ion-text>
                    <ion-img :src='nextImgUrl' class="rightImg"/>
                </ion-col>
                <ion-col  style="display: flex; flex-flow: row;">
                  <div v-for="university in country_detail_data.universities" :key="university.id">
                    <ion-card>
                        <ion-card-content>
                            <!-- <ion-label>{universities.value}</ion-label> -->
                            <div style="display: flex; flex-flow: row;">
                              <ion-img :src='university.logo_url' class="leftImg"/>
                              <div style="display: flex; flex-flow: column;" class="university-header">
                                <p>{{`Local #${university.local_position} | Global #${university.global_position}`}}</p>
                                <p>Top University</p>
                              </div>
                            </div>
                            <hr style="border-top: 1px solid #606060;"/>
                            <div style="display: flex; flex-flow: column;">
                              <p class="university-name">{{ university.university_name }}</p>
                              <p class="university-country-name">{{ university.country }}</p>
                            </div>
                            <hr style="border-top: 1px solid #606060;"/>
                            <p class="university-status">{{ university.status }}</p>
                        </ion-card-content>
                    </ion-card>
                  </div>
                </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <country-detail-footer-section />
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
import {useRouter, useRoute} from "vue-router";
import {useLoadingStore} from "@/store/loading";
import {useComingSoonAlert} from "@/shared/comingSoonAlert";
import HeaderSection from "@/components/explore/HeaderSection.vue";
import CountryDetailFooterSection from "@/components/explore/CountryDetailFooterSection.vue";

export default defineComponent({
  name: "ExplorePage",
  components: {
    // HeaderSection,
    CountryDetailFooterSection,
    // IonButton,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonImg,
    // IonSearchbar,
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    // IonCol,
    IonText
  },
  setup() {
    const store = useExploreDataStore();
    const route = useRoute();
    const {loadStudyDestCountry, changeLoadedVal} = store;
    const dataLoaded = computed(() => store.country_detail_dataLoaded);
    const country_detail_data = computed(() => store.country_detail_data);
    // console.log(dataLoaded.value)
    const {showLoading, hideLoading} = useLoadingStore();
    const router = useRouter();
    const doLogin = async () => {
      showLoading();
    };
    const imgUrl = '/assets/images/header.svg';
    const uniImgUrl = 'assets/images/university.svg';
    const nextImgUrl = 'assets/images/Chevron.svg';
    const stuImgUrl = 'assets/images/student-hat.svg';
    const study_dest = 'assets/images/Study-DIstenation.png';
    const unlock_sec = 'assets/images/Unlocking-the-Secret.png';
    const top_unis= 'assets/images/top-unis.png';
    const inspiration = 'assets/images/inspiration2.png';
    const news = 'assets/images/news.png';

    onBeforeMount(() => {
        const id = route.params.id;
        console.log(id)
        if (!dataLoaded.value) {
            showLoading();
            Promise.all([loadStudyDestCountry(id)]).then(() => {
                // console.log(total_universities.value);
                console.log(dataLoaded.value);
                console.log(country_detail_data.value);
                changeLoadedVal();
                // console.log(universities.value[0]);
            hideLoading();
            })
        }
    });

    return {
      doLogin,
    //   comingSoon,
      imgUrl,
      uniImgUrl,
      nextImgUrl,

      country_detail_data,
    };
  },
});
</script>
<style scoped>
ion-content {
  --background: #ffffff;
}
ion-text {
    padding:0%;
}
.big-title {
    font-family: "Calibri";
font-size: 30px;
font-weight: bold;
font-style: normal;
text-align: left;
color: #1c345a;
}
.mid-title {
    font-family: "Calibri";
    font-size: 20px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    color: #1c345a;
}

ion-toolbar {
    position: absolute;
    background: #1c345a;
    text-align: center;
    /* border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px; */
  }
  ion-header {
  --opacity-scale: 0 !important;
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
    width: 189px;
    height: 169px;

    border-radius: 15px;

    filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
    margin: 0 10px 0 0;
    background: #ffffff
}
ion-card-header {
  padding-left: 10px;
  padding-top:0px;
  padding-bottom: 0;
}
ion-card-content {
    padding: 5px;
}
.leftImg {
    width: 25px;
    margin-right: 10px;
}
.rightImg {
    width: 7.7px;
    margin-left: auto;
}
.university-header{
  font-family: "Calibri";
  font-size: 12px;
  font-weight: 300;
  font-style: normal;
  text-align: left;
  color: #203456;
}
.university-name {
  font-family: "Calibri";
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: #203456; 
}
.university-country-name {
  font-family: "Calibri";
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: #606060;
}
.university-status {
  font-family: "Calibri";
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: #007a00;
}
.few-title {
    font-family: "Calibri";
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #606060;
}
.main-img {
    width: 346px;
    height: 165px;

    border-radius: 15px;

    filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
}
.gradient-text {
  font-size: 16px;
  font-weight: normal;
  background: linear-gradient(to bottom, #606060, white);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>