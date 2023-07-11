<template>
    <ion-page>
      <header-section />
      <ion-content :fullscreen="true" class="ion-padding-top">
        <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
          <ion-row class="ion-padding-top">
            <ion-col size="12" style="margin-top: 8%; width: 100%; justify-content: center">
                <ion-text class="big-title">
                <p class="ion-text-center" style="margin-bottom: 0;">{{ $t('Study Destination') }}</p>
                </ion-text>
                <p class="ion-text-center study-middle-title" style="margin-bottom: 0;margin-top: 0%;">{{ $t('Find your own ideal study destination') }}</p>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col v-for="study_dest_data in study_dest_datas" :key="study_dest_data.id" style="display: flex; flex-flow: column;">
              <ion-row>
                <ion-col>
                  <ion-text class="mid-title" style="float: left;" @click="()=>toDetailRegion(study_dest_data.id)">
                      <p class="ion-text-left" style="margin:0px">{{ $t(`${study_dest_data.name} | ${study_dest_data.number_of_universities} Universities`) }}</p>
                  </ion-text>
                  <ion-img :src='nextImgUrl' class="rightImg"/>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col  class=" scrolling">
                  <div v-for="country in study_dest_data.countries" :key="country.id">
                      <div class="div-size" @click="()=>toDetailCountry(country.id)">
                          <ion-img :src='country.flag_url' class="leftImg"/>
                          <p class="country-name" style="margin-top: 0px; margin-bottom: 0px;">{{ country.country_name }}</p>
                          <p class="university-count" style="margin-top: 0px; margin-bottom: 0px;">150 Universities</p>
                      </div>
                  </div>
                </ion-col>
              </ion-row>
              <hr class="under_line"/>
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
  modalController
} from "@ionic/vue";
import {computed, defineComponent, ref, onBeforeMount} from "vue";
import {useRouter} from "vue-router";
import {useLoadingStore} from "@/store/loading";
import HeaderSection from "@/components/explore/HeaderSection.vue";
import FooterSection from "@/components/explore/FooterSection.vue";
import StudyDestinationCountryModal from "@/components/modal/StudyDestinationCountry.vue"

export default defineComponent({
  name: "StudyDestination",
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
  },
  setup() {
    const store = useExploreDataStore();
    const {loadStudyDestDatas} = store;
    const dataLoaded = computed(() => store.study_dest_dataLoaded);
    const study_dest_datas = computed(() => store.study_dest_datas);
    const {showLoading, hideLoading} = useLoadingStore();
    const router = useRouter();
    const imgUrl = '/assets/images/header.svg';
    const nextImgUrl = 'assets/images/Chevron.svg';
    const toDetailRegion = (id) => {
      router.push(`/explore/studydestination/${id}`)
    }
    const toDetailCountry = async(id) => {
      const modal = await modalController.create({
        component: StudyDestinationCountryModal,
        componentProps: {
            id: id,
        },
        initialBreakpoint: 0.96,
        breakpoints: [0, 0.96],
      });
      modal.present();
    }

    onBeforeMount(() => {
      if (!dataLoaded.value) {
        showLoading();
        Promise.all([loadStudyDestDatas()]).then(() => {
          hideLoading();
        })
      }
    });

    return {
      imgUrl,
      nextImgUrl,    
      study_dest_datas,
      toDetailRegion,
      toDetailCountry
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
.div-size {
  width: 120px;
  height: auto;
}
.leftImg {
  width: 110px;
  height: 110px;
  border-radius: 50%;
}
.rightImg {
  width: 7.7px;
  float: right; 
  margin-right: 10px;
  margin-top: 5px;
}
.university-header{
  font-family: "Calibri";
  font-size: 12px;
  font-weight: 300;
  font-style: normal;
  text-align: left;
  color: #203456;
}
.country-name {
    font-family: "Open Sans";
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: center;
    color: #1c345a;
}
.university-count {
  font-family: "Open Sans";
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  text-align: center;
  color: #1c345a;
}
.study-middle-title{
  font-family: "Calibri";
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: #606060;
}
.under_line {
  width:80%;
  border-top: 1px solid #606060;
  margin-top:0px;
  margin-bottom:0px;
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