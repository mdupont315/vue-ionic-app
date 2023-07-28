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
              <ion-row class="ion-padding-top" v-if="region_detail_data.description">
                <ion-col>
                  <ion-card>
                      <ion-card-content>
                        <p class="txt-16 color-2">{{ region_detail_data.description }}</p>
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
                  <ion-card>
                    <ion-card-content style="padding-top: 0;">
                      <p class="txt-20 color-3 float-left">
                        {{region_detail_data.number_of_elite_universities}}
                        {{ $t(`Listed as an `)}}
                        <b>{{ $t(`Elite `)}}</b>
                        {{ $t(`University`)}}
                      </p>
                      <div class="float-right rank-img">
                        <ion-img :src='uniImgUrl'/>
                      </div>
                    </ion-card-content>
                  </ion-card>
                  <ion-card>
                    <ion-card-content style="padding-top: 0;">
                      <p class="txt-20 color-3 float-left">
                        {{region_detail_data.number_of_top_universities}}
                        {{ $t(`Listed as `)}}
                        <b>{{ $t(`Top `)}}</b>
                        {{ $t(`universities`)}}
                      </p>
                      <div class="float-right rank-img">
                        <ion-img :src='unlock_sec' class=""/>
                      </div>
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
              <ion-row class="ion-padding-top d-flex-start">  
                <ion-col size="6" class="ion-padding" v-for="country in region_detail_data.countries" :key="country.id">
                    <div class="div-size" @click="()=>toDetailCountry(country.id)">
                      <ion-img :src='country.thumbnail_url' class="flag-img ion-padding"/>
                      <p class="country-name txt-26 color-3 ion-no-margin">{{ $t(`${country.country_name}`) }}</p>
                      <p class="university-count txt-20 color-3 ion-no-margin">{{$t(`${country.number_of_universities} Universities`)}}</p>
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
      toDetailCountry
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
ion-img.flag-img::part(image) {
  border-radius: 50%;
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
  border-radius: 6px;
  filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
  margin: 10px 0 5px;
  padding: 10px 0;
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
}
.flag-img {
  width: 100%;
  height: auto;  
}
.rank-img {
  width: 50px;
  height: 32px;
  position: absolute;
  right: 8px;
}
.rank-img ion-img::part(image) {
  width: auto;
  height: auto;
  margin: auto;
}
</style>