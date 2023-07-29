<template>
  <ion-page style="height:96%">
    <ion-content :fullscreen="false">
      <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
        <ion-row>
          <ion-col size="12" style=" width: 100%; justify-content: center">
            <ion-text class="big-title">
                <p class="ion-text-center" style="margin-bottom: 0;">{{ $t(`${country_detail_data?.data?.country_name}`) }}</p>
            </ion-text>
            <ion-text class="few-title">
                <p class="ion-text-center" style="margin:0px">{{ $t(`${country_detail_data?.data?.number_of_universities} Universities`) }}</p>
            </ion-text>
            <ion-img :src='country_detail_data?.data?.thumbnail_url' class="main-img"/>
            <p class="plain-text" style="margin-bottom: 5px;" v-if="country_detail_data?.data?.description">{{ description }}</p>
            <ion-text class="mid-title" v-if="flag">
                <p class="ion-text-left" style="margin-top:0px"  @click="readMore">{{ $t(`${txt_more}`) }}</p>
            </ion-text>
          </ion-col>
          <ion-col size="12" class="flex-row" @click="toUniversityMore()">
            <ion-img :src='uniImgUrl' class="leftImg"/>
            <ion-text class="mid-title">
                <p class="ion-text-left" style="margin:0px">{{ $t(`University Rankings | ${country_detail_data?.data?.number_of_universities}`) }}</p>
            </ion-text>
            <ion-img :src='nextImgUrl' class="rightImg"/>
          </ion-col>
          <ion-col class="scrolling flex-row" style="margin-bottom: 10%;">
            <div v-for="university in country_detail_data.universities" :key="university.id">
              <ion-card @click="toUniversityDetailModal(university.id)">
                <ion-card-content>
                  <div class="flex-row">
                    <ion-img :src='university.logo_url' class="leftImg"/>
                    <div class="university-header flex-col">
                      <p>{{$t(`Local #${university.local_position} | Global #${university.global_position}`)}}</p>
                      <p>{{ $t("Top University") }}</p>
                    </div>
                  </div>
                  <hr class="under_line" style="width: 90%;"/>
                  <div>
                    <p class="university-name">{{ short_name(university.university_name) }}</p>
                    <p class="university-country-name">{{ university.country }}</p>
                  </div>
                  <hr class="under_line" style="width: 90%;"/>
                  <p class="university-status">{{ university.status }}</p>
                </ion-card-content>
              </ion-card>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <country-detail-footer-section text="View all Universities" @openModal="toUniversityMore"/>
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
    const flag=ref(false);
    const description = ref("");
    const txt_more = ref("Read more");
    
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
      });
      modal.present();
    }
    const short_name = (name) => {
      let newname = name;
      if (name.length>19) {
        newname = name.substring(0, 20);
        newname = `${newname}...`;
      }
      return newname;
    }
    const readMore = () => {
      const desc_str = country_detail_data.value.data.description;
      if(txt_more.value == "Read more") {
        description.value = desc_str;
        txt_more.value="Read less";
      }
      else {
        description.value = desc_str.substring(0,250);
        txt_more.value="Read more";
      }
    }
    const toUniversityMore = () => {
      modalController.dismiss({
        'dismissed': false
      })
      router.push(`/explore/universitymore/${country_detail_data.value.data.id}`);
    }
    onBeforeMount(() => {
      if (!dataLoaded.value) {
        showLoading();
        Promise.all([loadStudyDestCountry(props.id)]).then(() => {
          changeLoadedVal();
          const data=country_detail_data.value.data;
          if(data.description.length>250){
            flag.value = true;
            description.value = data.description.substring(0,250);
          }
          else {
            description.value = data.description;
          }
          hideLoading();
        })
      }
    });

    // const readMore = () => {
    //   flag.value=!flag.value
    // }
    return {
      imgUrl,
      uniImgUrl,
      nextImgUrl,
      short_name,
      country_detail_data,
      toUniversityDetailModal,
      readMore,
      flag,
      description,
      txt_more,
      toUniversityMore
    };
  },
});
</script>
<style scoped>
ion-content {
  --background: #f5f5f5;
}
ion-grid {
  padding: 0 10px 0 10px;
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
  margin: 0 25px 0 0;
  background: #ffffff
}
ion-card-content {
  padding: 8px;
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
ion-img::part(image) {
  border-radius: 15px;
}
.main-img {
  width: 100%;
  height: 40vw;
  object-fit: fill;
}
.gradient-text {
  font-size: 16px;
  font-weight: normal;
  background: linear-gradient(to bottom, #606060, white);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.plain-text {
  font-size: 16px;
  font-weight: normal;
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