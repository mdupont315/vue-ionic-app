<template>
    <ion-page>
        <header-section />
        <ion-content :fullscreen="true" class="ion-padding-top">
            <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
              <ion-row class="ion-padding-top">
                <ion-col size="12" style="margin-top: 8%; width: 100%; justify-content: center">
                    <ion-text class="big-title">
                      <p class="ion-text-center" style="margin-bottom: 0;">{{ $t(`${region_detail_data.name}`) }}</p>
                    </ion-text>
                </ion-col>
              </ion-row>
              <ion-row class="ion-padding-top">
                <ion-col>
                  <ion-card>
                      <ion-card-content>
                        <p>{{ $t(`Unlock a world of educational opportunities in North America. Experience top-quality education, vibrant campus life, and diverse cultural experiences. Embark on a transformative journey that will shape your future. Start your study abroad adventure today!`) }}</p>
                      </ion-card-content>
                    </ion-card>
                </ion-col>
              </ion-row>
              <ion-row class="ion-padding-top">
                <ion-col size="12" style="display: flex; flex-flow: row;">
                  <ion-img :src='cupImgUrl' class="leftImg"/>
                  <ion-text class="mid-title">
                    <p class="ion-text-left" style="margin:0px">{{ $t(`Ranking by `) }}</p>
                  </ion-text>
                  <ion-img :src='nextImgUrl' class="rightImg"/>
                </ion-col>
                <ion-col  style="display: flex; flex-flow: column;">
                  <ion-card style="border-radius: 6px;">
                    <ion-card-content style="padding-top: 0;">
                      <p style="float:left; margin-top: 7px;">{{ $t(`${region_detail_data.number_of_elite_universities} Listed as an Elite University`)}}</p>
                      <ion-img :src='uniImgUrl' style="float: right; width: 50.8px;height: 32.6px; padding-top:0"/>
                    </ion-card-content>
                  </ion-card>
                  <ion-card style="border-radius: 6px;">
                    <ion-card-content style="padding-top: 0;">
                      <p style="float:left; margin-top: 7px;">{{ $t(`${region_detail_data.number_of_top_universities} Listed as Top universities`) }}</p>
                      <ion-img :src='unlock_sec' style="float: right; width: 50.8px;height: 32.6px; padding-top:0"/>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
              </ion-row>
              <ion-row class="ion-padding-top">  
                <ion-col size="12" style="margin-top: 10px; width: 100%; justify-content: center">
                    <ion-text class="mid-title">
                      <p class="ion-text-left" style="margin-bottom: 0; margin-top: 0;">{{ $t(`${region_detail_data.name} | ${region_detail_data.number_of_universities} Universities`) }}</p>
                    </ion-text>
                </ion-col>
              </ion-row>
              <ion-row class="ion-padding-top" style="display: flex;flex-flow: row;">  
                <ion-col size="6" style="margin-right:30px">
                  <div v-for="country in firstHalf" :key="country.id">
                    <div class="div-size" @click="()=>toDetailCountry(country.id)">
                      <ion-img :src='country.flag_url' class="flag-img"/>
                      <p class="country-name" style="margin-top: 0px; margin-bottom: 0px;">{{ $t(`country.country_name`) }}</p>
                      <p class="university-count" style="margin-top: 0px; margin-bottom: 0px;">{{$t(`${country.number_of_universities} Universities`)}}</p>
                    </div>
                  </div>
                </ion-col>
                <ion-col size="6" >
                  <div v-for="country in secondHalf" :key="country.id">
                    <div class="div-size" @click="()=>toDetailCountry(country.id)">
                      <ion-img :src='country.flag_url' class="flag-img"/>
                      <p class="country-name" style="margin-top: 0px; margin-bottom: 0px;">{{ $t(`country.country_name`) }}</p>
                      <p class="university-count" style="margin-top: 0px; margin-bottom: 0px;">{{$t(`${country.number_of_universities} Universities`) }}</p>
                    </div>
                  </div>
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
  IonImg,
  IonText,
  modalController,
} from "@ionic/vue";
import {computed, defineComponent, ref, onBeforeMount} from "vue";
import {useLoadingStore} from "@/store/loading";
import HeaderSection from "@/components/explore/HeaderSection.vue";
import FooterSection from "@/components/explore/FooterSection.vue";
import {useRoute, useRouter} from "vue-router";
import StudyDestinationCountryModal from "@/components/modal/StudyDestinationCountry.vue"

export default defineComponent({
  name: "StudyDestinationRegion",
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
    IonImg,
    IonText,
  },
  setup() {
    const store = useExploreDataStore();
    const route = useRoute();
    const {loadStudyDestDataDetail, changeLoadedVal} = store;
    const dataLoaded = computed(() => store.region_detail_dataLoaded);
    const region_detail_data = computed(() => store.region_detail_data);
    const {showLoading, hideLoading} = useLoadingStore();
    const router = useRouter();
    const imgUrl = '/assets/images/header.svg';
    const uniImgUrl = 'assets/images/urstar5.svg';
    const nextImgUrl = 'assets/images/uniranks.svg';
    const cupImgUrl = 'assets/images/cup.svg';
    const unlock_sec = 'assets/images/Icon-awesome-globe-a.svg';
    const firstHalf = ref([]);
    const secondHalf = ref([]);
    const toDetailCountry = async (id) => {
      const modal = await modalController.create({
        component: StudyDestinationCountryModal,
        componentProps: {
            id: id,
        },
        initialBreakpoint: 0.96,
        // breakpoints: [0, 0.5, 1],
      });
      modal.present();
    }

    onBeforeMount(() => {
      const id = route.params.id;
      if (!dataLoaded.value) {
        showLoading();
        Promise.all([loadStudyDestDataDetail(id)]).then(() => {
            let items = region_detail_data.value.countries;
            secondHalf.value = items.slice(0, Math.floor(items.length / 2));
            firstHalf.value = items.slice(Math.floor(items.length/2));
            changeLoadedVal()
            hideLoading();
        })
      }
    });

    return {
      imgUrl,
      uniImgUrl,
      nextImgUrl,
      unlock_sec,
      cupImgUrl,

      region_detail_data,
      firstHalf,
      secondHalf,

      toDetailCountry
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
  width: 100%;
  height: auto;
  border-radius: 15px;
  filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
  padding-top:5px;
  padding-bottom: 5px;
  margin-bottom: 5px;
  margin-left:0px;
  margin-top:0px;
  margin-right:0px;
  background: #ffffff
}
ion-card-header {
  padding-left: 10px;
  padding-top:0px;
  padding-bottom: 0;
}
.leftImg {
  width: 25px;
  margin-right: 10px;
}
.rightImg {
  margin-left: 3px;
  margin-top: 4px;
  width: 146.5px;
  height: 17.4px;
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
.div-size {
  width: 100%;
  height: auto;
  margin-bottom: 13px;
}
.flag-img {
  width: 100%;
  height: auto;  
}
</style>