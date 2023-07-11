<template>
  <ion-page style="height:95%">
    <ion-content :fullscreen="false" class="ion-padding-top">
      <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
        <hr style="border-top: 1px solid gray;">
        <ion-row style="justify-content: center;display: flex; flex-flow: column;">
          <div style="display: flex; flex-flow: row; justify-content: center;">
              <ion-img :src='unipro_detail_datas.logo_url' class="uni-img"/>
              <ion-text class="uni-name">
                <p>{{ $t(`${unipro_detail_datas.university_name}`) }}</p>
              </ion-text>
          </div>
          <ion-text class="uni-country-name">
            <p style="margin:0px">{{ $t(`${unipro_detail_datas.country_name}`)  }}</p>
          </ion-text>  
        </ion-row>
        <hr style="border-top: 1px solid gray; width: 250px;">
        <ion-row>
        <ion-col  style="display: flex; flex-flow: column;">
          <ion-card v-for="program in unipro_detail_datas.programs" :key="program.id" style="border-radius: 6px;">
            <ion-card-content style="padding-top: 0;">
              <div style="display: flex; flex-flow: column;">
                <ion-text>
                  <p class="list-item-title">{{ $t(`${program.title}`) }}</p>
                </ion-text>
                <div>
                  <ion-text style="font-size: 12px; float: left;">{{$t(`${program.fee} / ${program.fee_term}`) }}</ion-text>
                  <ion-text style="font-size: 12px; float: right;">{{$t(`${program.duration}`) }}</ion-text>
                </div>
              </div>
            </ion-card-content>
          </ion-card>
        </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <country-detail-footer-section/>
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
    modalController
  } from "@ionic/vue";
  import {computed, defineComponent, ref, onBeforeMount} from "vue";
  import {useRouter, useRoute} from "vue-router";
  import {useLoadingStore} from "@/store/loading";
  import {useComingSoonAlert} from "@/shared/comingSoonAlert";
  import HeaderSection from "@/components/explore/HeaderSection.vue";
  import CountryDetailFooterSection from "@/components/explore/CountryDetailFooterSection.vue";
  
  export default defineComponent({
    name: "UniversityDetailModal",
    components: {
      CountryDetailFooterSection,
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
    props: {
      id: Number,
    },
    setup(props) {
      const store = useExploreDataStore();
      const route = useRoute();
      const {loadUniProDetailSearch, changeLoadedVal} = store;
      const dataLoaded = computed(() => store.unipro_detail_dataLoaded);
      const unipro_detail_datas = computed(() => store.unipro_detail_datas);
      const {showLoading, hideLoading} = useLoadingStore();
      const router = useRouter();

      onBeforeMount(() => {
        if (!dataLoaded.value) {
            showLoading();
            Promise.all([loadUniProDetailSearch(props.id)]).then(() => {
              changeLoadedVal();
              hideLoading();
            })
        }
      });
    
      return {
        unipro_detail_datas,
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
    margin-top: 0px;
    margin-bottom: 5px;
  }
  ion-card-content {
    padding: 5px;
  }
  .leftImg {
    width: 25px;
    margin-right: 10px;
    margin-left: 15px;
  }
  .rightImg {
    width: 7.7px;
    margin-left: auto;
    margin-right: 13px;
  }
  .uni-img {
    width: 50px;
  }
  .list-item-img {
    width: 27.3px;
    margin-right: 5px;
  }
  .list-item-title {
    font-family: "Calibri";
    font-size: 18px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    color: #203456;
  }
  .list-item-content {
    font-family: "Calibri";
    font-size: 17px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #606060;
  }
  .detail_card {
    width: 346px;
    height: max-content;

    border-radius: 15px;
    background: #ffffff;
    margin-top:0px
  }
  .date_card {
    width: max-content;
    height: 36px;
    border-radius: 15px;
    background: #ffffff 
  }
  .rank-title {
    font-family: "Calibri";
    font-size: 26px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    color: #1c345a; 
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
  .read-more-title {
    font-family: "Calibri";
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #1c345a;
    margin-bottom: 8px;
  }
  .gradient-text {
    font-size: 16px;
    font-weight: normal;
    background: linear-gradient(to bottom, #606060, white);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .uni-name {
    font-family: "Calibri";
    font-size: 26px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #1c345a;
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
  .rankingImg {
    width: 146.5px;
    height: 17.4px;
    margin-top: 8px;
    margin-left: 5px;
  }
  .uni-country-name {
    font-family: "Calibri";
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: center;
    color: #00aeef; 
    margin-left: auto;
    margin-right: auto;
  }
  .greenBT {
    width: 346px;
    height: 39px;
    border-radius: 15px;
    filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
    background: #00aeef ;
    margin-left: auto;
    margin-right: auto;
  }
</style>