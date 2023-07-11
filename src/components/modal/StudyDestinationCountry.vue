<template>
  <ion-page style="height:96%">
    <ion-content :fullscreen="false" class="ion-padding-top">
      <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
        <ion-row class="ion-padding-top">
          <ion-col size="12" style=" width: 100%; justify-content: center">
            <ion-text class="big-title">
                <p class="ion-text-center" style="margin-bottom: 0;">{{ $t(`${country_detail_data?.data?.country_name}`) }}</p>
            </ion-text>
            <ion-text class="few-title">
                <p class="ion-text-center" style="margin:0px">{{ $t(`${country_detail_data?.data?.number_of_universities} Universities`) }}</p>
            </ion-text>
            <img :src='country_detail_data?.data?.flag_url' class="main-img"/>
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
          <ion-col class="scrolling" style="display: flex; flex-flow: row;">
            <div v-for="university in country_detail_data.universities" :key="university.id">
              <ion-card @click="toUniversityDetailModal(university.id)">
                <ion-card-content>
                  <div style="display: flex; flex-flow: row;">
                    <ion-img :src='university.logo_url' class="leftImg"/>
                    <div style="display: flex; flex-flow: column;" class="university-header">
                      <p>{{$t(`Local #${university.local_position} | Global #${university.global_position}`)}}</p>
                      <p>Top University</p>
                    </div>
                  </div>
                  <hr style="border-top: 1px solid #606060;"/>
                  <div style="display: flex; flex-flow: column;">
                    <p class="university-name">{{ $t(`university.university_name`) }}</p>
                    <p class="university-country-name">{{ $t(`university.country`) }}</p>
                  </div>
                  <hr style="border-top: 1px solid #606060;"/>
                  <p class="university-status">{{ $t(`university.status`) }}</p>
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
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonImg,
  IonCard,
  IonCardContent,
  modalController
} from "@ionic/vue";
import {computed, defineComponent, ref, onBeforeMount} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useLoadingStore} from "@/store/loading";
import {useComingSoonAlert} from "@/shared/comingSoonAlert";
import HeaderSection from "@/components/explore/HeaderSection.vue";
import CountryDetailFooterSection from "@/components/explore/CountryDetailFooterSection.vue";
import UniversityDetailModal from "@/components/modal/UniversityDetailModal.vue";

export default defineComponent({
  name: "StudyDestinationCountryModal",
  components: {
    CountryDetailFooterSection,
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonImg,
    IonCard,
    IonCardContent,
  },
  props: {
    id: String
  },
  setup(props) {
    const store = useExploreDataStore();
    const route = useRoute();
    const {loadStudyDestCountry, changeLoadedVal} = store;
    const dataLoaded = computed(() => store.country_detail_dataLoaded);
    const country_detail_data = computed(() => store.country_detail_data);
    const {showLoading, hideLoading} = useLoadingStore();
    const router = useRouter();
    
    const imgUrl = '/assets/images/header.svg';
    const uniImgUrl = 'assets/images/university.svg';
    const nextImgUrl = 'assets/images/Chevron.svg';
    
    const toUniversityDetailModal = async(id) => {
      const modal = await modalController.create({
        component: UniversityDetailModal,
        componentProps: {
            id:id
        },
        initialBreakpoint: 0.95,
        breakpoints: [0, 0.95],
      });
      modal.present();
    }
    onBeforeMount(() => {
      if (!dataLoaded.value) {
        showLoading();
        Promise.all([loadStudyDestCountry(props.id)]).then(() => {
          changeLoadedVal();
          hideLoading();
        })
      }
    });

    return {
      imgUrl,
      uniImgUrl,
      nextImgUrl,
      country_detail_data,
      toUniversityDetailModal
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
  width: 100%;
  height: auto;
  border-radius: 15px !important;
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
.scrolling {
  display: flex; 
  flex-flow: row;
  overflow-x: scroll;
  overflow-y: hidden;
}
.scrolling::-webkit-scrollbar {
  display: none;
}
</style>