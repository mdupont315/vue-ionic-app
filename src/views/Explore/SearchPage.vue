<template>
    <ion-page>
        <header-section />
        <ion-content :fullscreen="true" class="ion-padding-top">
            <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
                <ion-row v-if="programs?.data?.length || institutes?.data?.length" class="ion-padding-top" style="margin-top: 65px;">
                  <ion-col size="12" style="display: flex; flex-flow: row; ">
                      <ion-text class="mid-title">
                          <p class="ion-text-left" style="margin:0px">{{ $t(`Recent Searches`) }}</p>
                      </ion-text>
                      <ion-text class="mid-small-title">
                          <p class="ion-text-right" style="margin:0px">{{ $t(`Clear all`) }}</p>
                      </ion-text>
                  </ion-col>
                  <ion-col  style="display: flex; flex-flow: column;">
                    <ion-card class="recent-card">
                        <ion-card-content style="display: flex; flex-flow: row; margin-top: 10px;">
                          <ion-icon :src='timeOutline' style="margin-top: 1px;margin-left:  18px;margin-right: 18px ;"></ion-icon>
                          <ion-text>
                            <p>{{ $t(`Computer`) }}</p>
                          </ion-text>
                          <ion-img :src='nextImgUrl' class="rightImg"/>
                        </ion-card-content>
                    </ion-card>
                    <ion-card class="recent-card">
                        <ion-card-content style="display: flex; flex-flow: row; margin-top: 10px;">
                          <ion-icon :src='timeOutline' style="margin-top: 1px;margin-left:  18px;margin-right: 18px ;"></ion-icon>
                          <ion-text>
                            <p>{{ $t(`Harvard`) }}</p>
                          </ion-text>
                          <ion-img :src='nextImgUrl' class="rightImg"/>
                        </ion-card-content>
                    </ion-card>
                  </ion-col>                  
                  <ion-col size="12" style="display: flex; flex-flow: row; margin-top: 5px;">
                    <ion-text class="mid-title">
                        <p class="ion-text-left" style="margin:0px">{{ $t(`Recommended Programs`) }}</p>
                    </ion-text>
                    <ion-text class="mid-small-title" @click="toSearchDetail">
                        <p class="ion-text-right" style="margin:0px">{{ $t(`View all`) }}</p>
                    </ion-text>
                  </ion-col>
                  <ion-col  style="display: flex; flex-flow: column;">
                    <ion-card v-for="program in programs.data" :key="program.id" class="program-card">
                        <ion-card-content style="display: flex; flex-flow: column; margin-top: 4px;">
                          <ion-text>
                            <p class="program-title">{{ $t(`${program.title}`) }}</p>
                          </ion-text>
                          <div style="display: flex; flex-flow: row;">
                            <ion-text>
                              <p class="program-count">{{ $t(`Match with ${program.matched_with_institutes} institutions`) }}</p>
                            </ion-text>
                            <ion-img :src='nextImgUrl' class="rightImg"/>
                          </div>
                        </ion-card-content>
                    </ion-card>
                  </ion-col>                  
                  <ion-col size="12" style="display: flex; flex-flow: row; margin-top: 5px;">
                    <ion-text class="mid-title">
                        <p class="ion-text-left" style="margin:0px">{{ $t(`Recommended Institutions`) }}</p>
                    </ion-text>
                    <ion-text class="mid-small-title" @click="toSearchDetail">
                        <p class="ion-text-right" style="margin:0px">{{ $t(`View all`) }}</p>
                    </ion-text>
                  </ion-col>
                  <ion-col  style="display: flex; flex-flow: column;">
                      <ion-card v-for="institute in institutes.data" :key="institute.id" class="institute-card">
                          <ion-card-content style="display: flex; flex-flow: column; margin-top: 4px;">
                              <div style="display: flex; flex-flow: row;">
                                  <ion-img :src='institute.logo_url' class="leftImg" style="width: 15%;"/>
                                  <div style="display: flex; flex-flow: column; margin-top: 3%; margin-left:1px; width: 85%;">
                                      <div>
                                          <p class="university-name" style="float:left;">{{ short_name(institute.university_name) }}</p>
                                          <ion-img :src='nextImgUrl' class="next-img" style="float:right;  margin-top: 6px;"></ion-img>
                                      </div>
                                      <p class="university-ranking">{{ $t(`Local #${institute.local_position} | Global #${institute.global_position} | Score ${institute.score}`) }}</p>
                                      <div>
                                          <p class="university-country" style="float: left;">{{ $t(`institute.country`) }}</p>
                                          <p class="university-status" style="float: right">{{ $t(`institute.status`) }}</p>
                                      </div>
                                  </div>
                              </div>
                          </ion-card-content>
                      </ion-card>
                    </ion-col>
                </ion-row>

                <ion-row v-else style="margin-top: 65px; justify-content: center;display: flex; flex-flow: column;">
                  <ion-text class="center-title">
                    <p class="ion-text-center" style="margin:0px">{{ $t(`Oops, looks like we hit a void`) }}</p>
                  </ion-text>
                  <ion-img :src='noSearchData' class="centerImg"/>
                  <ion-text class="nomatch-title">
                    <p class="ion-text-center" style="margin:0px">{{ $t(`no matching records found!`) }}</p>
                  </ion-text>
                </ion-row>
            </ion-grid>
        </ion-content>
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
} from "@ionic/vue";
import {computed, defineComponent, ref, onBeforeMount} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useLoadingStore} from "@/store/loading";
import {useComingSoonAlert} from "@/shared/comingSoonAlert";
import HeaderSection from "@/components/explore/HeaderSection.vue";
import { timeOutline } from 'ionicons/icons';

export default defineComponent({
  name: "SearchPage",
  components: {
    HeaderSection,  
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
    const store = useExploreDataStore();
    const route = useRoute();
    const {loadSearchData, changeLoadedVal} = store;
    const dataLoaded = computed(() => store.search_dataLoaded);
    const institutes = computed(() => store.search_institutes_data);
    const programs = computed(() => store.search_programs_data);
    const {showLoading, hideLoading} = useLoadingStore();
    const router = useRouter();
    const imgUrl = '/assets/images/header.svg';
    const uniImgUrl = 'assets/images/university.svg';
    const nextImgUrl = 'assets/images/Chevron.svg';
    const noSearchData = 'assets/images/NoSearchResult.png'
    
    const short_name = (name) => {
      let newname = name;
      if (name.length>32) {
          newname = name.substring(0, 32);
          newname = `${newname}...`;
      }
      return newname;
    }
    
    const toSearchDetail = () => {
      router.push(`/explore/searchdetailpage/${route.params.keyword}`);
    }

    onBeforeMount(() => {
      const keyword = route.params.keyword
      if (!dataLoaded.value) {
        showLoading();
        Promise.all([loadSearchData(keyword)]).then(() => {
            changeLoadedVal();
            hideLoading();
        })
      }
    });

    return {
      imgUrl,
      uniImgUrl,
      nextImgUrl,
      noSearchData,
      institutes,
      programs,
      timeOutline,
      short_name,
      toSearchDetail
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
ion-card {
  width: 100%;
  height: auto;
  margin-bottom: 8px;
}
ion-card-content {
  padding: 0;
}
ion-col {
  margin-right:18px;
}
.mid-title {
  font-family: "Calibri";
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: #606060;
  margin-left: 7px;
  margin-right: auto;
}
.mid-small-title {
  font-family: "Calibri";
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  text-align: right;
  color: #1c345a;
  margin-top: auto;
  margin-right: 18px;
}
.center-title {
  font-family: "Calibri";
  font-size: 37px;
  font-weight: bold;
  font-style: normal;
  text-align: center;
  color: #1c345a;
  margin-top:62px;
  margin-left:66px;
  margin-right:67px;
}
.leftImg {
  width: 25px;
  margin-right: 10px;
}
.rightImg {
  width: 7.7px;
  margin-left: auto;
  margin-right: 3px;
}
.centerImg {
  margin-left: auto;
  margin-right: auto;
}

.recent-card {
  border-radius: 6px;
  filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
  background: #ffffff
}
.program-card {
  border-radius: 6px;
  filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
  background: #ffffff;
  padding-left: 5px;
  margin-top: 0px;
}
.program-title {
  font-family: "Calibri";
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  text-align: left;
  color: #203456;
}

.program-count {
  font-family: "Calibri";
  font-size: 16px;
  font-weight: normal;
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
  margin-right: 10%;
}
.university-ranking {
  font-family: "Calibri";
  font-size: 12px;
  font-weight: 300;
  font-style: normal;
  text-align: left;
  color: #203456;
}
.university-country{
  font-family: "Calibri";
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  color: #606060;
}
.university-status {
  font-family: "Calibri";
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  color: #007a00;
}
.institute-card {
  border-radius: 6px;
  filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
  background: #ffffff;
  padding-left: 5px;
  padding-right: 5px;
}
.nomatch-title {
  font-family: "Calibri";
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  text-align: center;
  color: #1c345a;
  margin-top: 14px;
}
</style>