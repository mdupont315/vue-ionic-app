<template>
    <ion-page style="height:75%">
        <ion-content :fullscreen="false" class="ion-padding-top">
            <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
                <ion-row class="ion-padding-top">
                <ion-col size="12" style=" width: 100%; justify-content: center">
                    <ion-text class="big-title">
                        <p class="ion-text-center" style="margin-bottom: 0;">{{ $t(`BS Software Engineering`) }}</p>
                    </ion-text>
                </ion-col>
                </ion-row>
                <hr style="border-top: 1px solid gray; width: 250px;">
                <ion-row>
                    <ion-img :src='url' class="leftImg" style="width: 15%;"/>
                    <ion-text class="uni-name">
                        <p>{{ name }}</p>
                    </ion-text>
                </ion-row>
                <ion-row>
                    <ion-card class="detail_card">
                        <ion-card-content>
                        <ion-list>
                            <ion-item style="display: flex; flex-flow: row; padding-top: 5px;">
                                <ion-img :src='moneyUrl' class="list-item-img"/>
                                <div style="display: flex; flex-flow: column; margin-bottom: 5px;">
                                    <ion-text class="list-item-title">
                                        <p>USD 31,449 per year</p>
                                    </ion-text>
                                    <ion-text class="list-item-content">
                                        <p>International student tuition fee</p>
                                    </ion-text>
                                </div>
                                
                            </ion-item>

                            <ion-item style="display: flex; flex-flow: row; padding-top: 5px;">
                                <ion-img :src='calenderUrl' class="list-item-img"/>
                                <div style="display: flex; flex-flow: column; margin-bottom: 5px;">
                                    <ion-text class="list-item-title">
                                        <p>August 2023</p>
                                    </ion-text>
                                    <ion-text class="list-item-content">
                                        <p>Start date</p>
                                    </ion-text>
                                </div>
                            </ion-item>

                            <ion-item style="display: flex; flex-flow: row; padding-top: 5px;" >
                                <ion-img :src='hourglaUrl' class="list-item-img"/>
                                <div style="display: flex; flex-flow: column; margin-bottom: 5px;">
                                    <ion-text class="list-item-title">
                                        <p>Jul 2023</p>
                                    </ion-text>
                                    <ion-text class="list-item-content">
                                        <p>Application deadline</p>
                                    </ion-text>
                                </div>
                            </ion-item>

                            <ion-item lines="none"  style="display: flex; flex-flow: row; padding-top: 5px; padding-bottom: 5px;">
                                <ion-img :src='uniImgUrl' class="list-item-img"/>
                                <div style="display: flex; flex-flow: column;">
                                    <ion-text class="list-item-title">
                                        <p>4 years</p>
                                    </ion-text>
                                    <ion-text class="list-item-content">
                                        <p>Duration</p>
                                    </ion-text>
                                </div>
                            </ion-item>
                        </ion-list>
                        </ion-card-content>
                    </ion-card>
                </ion-row>
                <ion-row>
                    <ion-col size="12" style="display: flex; flex-flow: row;margin-top: 5px;">
                        <ion-img :src='calenderUrl' class="leftImg"/>
                        <ion-text class="mid-title">
                            <p class="ion-text-left" style="margin:0px">{{ $t(`Upcoming Intakes`) }}</p>
                        </ion-text>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12" style="display: flex; flex-flow: column;">
                        <div style="display: flex; flex-flow: row;">
                            <ion-card class="date_card">
                                <ion-card-content>
                                   <ion-text>August 2023</ion-text> 
                                </ion-card-content>
                            </ion-card>
                            <ion-card>
                                <ion-card-content>
                                   <ion-text>January 2024</ion-text> 
                                </ion-card-content>
                            </ion-card>
                        </div>
                        <div style="display: flex; flex-flow: row;">
                            <ion-card>
                                <ion-card-content>
                                   <ion-text>May 2024</ion-text> 
                                </ion-card-content>
                            </ion-card>
                            <ion-card>
                                <ion-card-content>
                                   <ion-text>August 2024</ion-text> 
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
    // IonHeader,
    // IonTitle,
    // IonToolbar,
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
  name: "ProgramDetailModal",
  components: {
    // HeaderSection,
    CountryDetailFooterSection,
    // IonButton,
    // IonHeader,
    // IonTitle,
    // IonToolbar,
    IonImg,
    // IonSearchbar,
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    // IonCol,
    IonText
  },
  props: {
    url: String,
    name: String
  },
  setup(props) {
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
    const calenderUrl = 'assets/images/awesome-calenda.svg';
    const hourglaUrl = 'assets/images/awesome-hourgla.svg';
    const moneyUrl = 'assets/images/awesome-money-c.svg';
  
    onBeforeMount(() => {
        // const id = route.params.id;
        console.log(2)
        if (!dataLoaded.value) {
            showLoading();
            Promise.all([loadStudyDestCountry(2)]).then(() => {
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
      calenderUrl,
      moneyUrl,
      hourglaUrl,
  
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
  .list-item-img {
    width: 27.3px;
    margin-right: 5px;
  }
  .list-item-title {
    font-family: "Calibri";
    font-size: 20px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    color: #203456;
  }
  .list-item-content {
    font-family: "Calibri";
    font-size: 20px;
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
  .uni-name {
    font-family: "Calibri";
    font-size: 26px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #1c345a;
  }
  </style>