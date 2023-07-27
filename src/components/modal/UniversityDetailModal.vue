<template>
  <ion-page style="height:95%">
      <ion-content :fullscreen="false" class="ion-padding">
          <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
              <ion-row style="justify-content: center; display:flex; flex-flow: column; ">
                <div style="display: flex; flex-flow: row; justify-content: center;">
                  <ion-img :src='university_detail_datas.logo_url' class="uni-img"/>
                  <ion-text class="uni-name">
                    <p>{{ $t(`${university_detail_datas.university_name}`) }}</p>
                  </ion-text>
                </div>
                <ion-text class="uni-country-name">
                    <p style="margin:0px">{{ $t(`${university_detail_datas.country}`) }}</p>
                </ion-text>
                
                <hr class="under_line">
                <p class="gradient-text" v-if="university_detail_datas.description" style="margin-left: 8px; margin-right: 20px;">{{ university_detail_datas.description }}</p>
              </ion-row>
              <ion-row style="display:flex; flex-flow: column; ">
                <ion-text class="read-more-title" style="font-size: 20px;">
                  {{ $t(`Read more`) }}
                </ion-text>
                <ion-card class="detail_card">
                    <ion-card-content>
                      <ion-list>
                        <ion-item style="display: flex; flex-flow: row; padding-top: 5px;">
                          <ion-img :src='userImgUrl' class="list-item-img"/>
                          <div style="display: flex; flex-flow: column; margin-bottom: 5px;">
                            <ion-text>
                                <p  class="list-item-title">{{ $t(`Approx. `) }}{{ university_detail_datas.number_of_students }}</p>
                            </ion-text>
                            <ion-text>
                                <p  class="list-item-content">{{ $t(`Number of international students`) }}</p>
                            </ion-text>
                          </div>
                        </ion-item>
                        <ion-item lines="none"  style="display: flex; flex-flow: row; padding-top: 5px; padding-bottom: 5px;">
                          <ion-img :src='moneyUrl' class="list-item-img"/>
                          <div class="flex-col">
                            <ion-text>
                                <p class="list-item-title">{{ $t(`Approx. `) }}{{ university_detail_datas.avg_annual_fee }}</p>
                            </ion-text>
                            <ion-text>
                                <p class="list-item-content">{{ $t(`Annual fees`) }}</p>
                            </ion-text>
                          </div>
                        </ion-item>
                      </ion-list>
                    </ion-card-content>
                </ion-card>
              </ion-row>
              <ion-row style="margin-top: 16px; margin-bottom: 16px;">
                <ion-col size="12" style="display: flex; flex-flow: row;">
                  <ion-img :src='cupImgUrl' class="leftImg"/>
                  <ion-text class="rank-title">
                      <p class="ion-text-left" style="margin:0px">{{ $t(`Ranking by `) }}</p>
                  </ion-text>
                  <ion-img :src='uniRankUrl' class="rankingImg"/>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col  class="flex-col ion-no-padding">
                  <ion-card class="rank-card">
                    <ion-card-content style="padding-top: 0;" class="flex-col">
                      <div>
                        <div class="flex-col float-left">
                          <ion-text  class="txt-20 color-3">
                            {{ $t(`${university_detail_datas.is_elite?"Listed as an ":"Not Listed as an "}`)}}
                            <b>
                              {{$t(`Elite`)}}
                            </b>
                            {{ $t(` University`)}}
                          </ion-text>
                          <ion-text class="txt-14 color-2">{{$t(`Only ${university_detail_datas.total_elite} Elite universities listed in UNIRANKS®`)}}</ion-text>
                        </div>
                        <ion-img :src='urImgUrl'  class="global-img"/>
                      </div>
                    </ion-card-content>
                  </ion-card>
                  <ion-card class="rank-card ion-margin-bottom">
                    <ion-card-content style="padding-top: 0;">
                      <div>
                        <div class="flex-col float-left">
                          <ion-text  class="txt-20 color-3">
                            {{ $t(`Rank`) }} 
                            <b>{{ $t(`#7`) }}</b>
                            {{ $t(` as Top 10 Universities`)}}
                          </ion-text>
                          <ion-text class="txt-14 color-2">
                            {{$t(`List as one of the`)}}
                            <b>{{$t(`TOP 10`)}}</b>
                            {{ $t(`in UNIRANKS®`)}}
                          </ion-text>
                        </div>
                        <ion-img :src='globalUrl'  class="global-img"/>
                      </div>
                    </ion-card-content>
                  </ion-card>
                  <ion-card class="rank-card">
                      <ion-card-content style="padding-top: 0;">
                        <div>
                            <div class="flex-col float-left">
                              <ion-text>
                                  <p class="txt-20 color-3">
                                    {{ $t(`Rank `) }}
                                    <b>{{`#${university_detail_datas.global_position}`}}</b>
                                    {{ $t(` Globally`)}}
                                  </p>
                              </ion-text>
                              <ion-text class="txt-14 color-2" >{{$t(`${university_detail_datas.global_position} out of ${university_detail_datas.number_of_universities_listed} universities in UNIRANKS®`)}}</ion-text>
                            </div>
                            <ion-img :src='globalUrl'  class="global-img" />
                        </div>
                      </ion-card-content>
                  </ion-card>
                  <ion-card class="rank-card">
                    <ion-card-content style="padding-top: 0;">
                      <div>
                        <div style="display: flex; flex-flow: column; float: left;">
                          <ion-text class="txt-20 color-3">
                              {{ $t(`Rank`) }}
                              <b>{{`#${university_detail_datas.local_position}`}}</b>
                              {{ $t(`In ${university_detail_datas.country}`)}}
                          </ion-text>
                          <ion-text class="txt-14 color-2" style="font-size: 10px;">
                            {{$t(`${university_detail_datas.local_position} out of ${university_detail_datas.number_of_universities_in_country} universities listed in the UNIRANKS`)}}</ion-text>
                        </div>
                        <ion-img :src='globalUrl'  class="global-img"/>
                      </div>
                    </ion-card-content>
                  </ion-card>
                  <ion-card class="rank-card">
                    <ion-card-content style="padding-top: 0;">
                      <div>
                        <div style="display: flex; flex-flow: column; float: left;">
                          <ion-text>
                              <p class="txt-20 color-3">{{ `${university_detail_datas.verified != 'Under Review'?'Verified & Recognized': `Under Review`}` }}</p>
                          </ion-text>
                          <ion-text class="txt-14 color-2" >
                            {{ $t(`University is`) }}
                            <span :class="university_detail_datas.verified != 'Under Review'?'color-4':'color-3'">
                              {{ `${university_detail_datas.verified != 'Under Review'?'Verified & Recognized': `Under Review`}` }}
                            </span>
                            <b>{{ ` in ${university_detail_datas.country}` }}</b>
                          </ion-text>
                        </div>
                        <ion-img :src='verified' class="global-img"/>
                      </div>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col size="12" style="display: flex; flex-flow: row;">
                    <ion-img :src='stuImgUrl' class="leftImg"/>
                    <ion-text class="mid-title">
                        {{ $t(`Programs | ${university_detail_datas.number_of_programs}`) }}
                    </ion-text>
                    <ion-img :src='nextImgUrl' class="rightImg"/>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col class="scrolling">
                  <div v-for="program in university_detail_datas.programs" :key="program.id">
                    <ion-card @click="toProgramDetail(university_detail_datas.logo_url, program.university.university_name)">
                      <ion-card-content>
                          <!-- <ion-label>{universities.value}</ion-label> -->
                          <p class="program-name" style="height:42px">{{ $t(`program.title`) }}</p>
                          <hr style="border-top: 1px solid #606060;"/>
                          <div style="display: flex; flex-flow: row;">
                            <ion-img :src="university_detail_datas.logo_url" class="leftImg"/>                                
                            <p class="program-university-name">{{ $t(`program.university.university_name`) }}</p>
                          </div>
                          <hr style="border-top: 1px solid #606060;"/>
                          <p style="display: inline; margin-right: 60%;" class="program-fee">UK</p>
                          <p style="display: inline;" class="program-fee">$500</p>
                      </ion-card-content>
                    </ion-card>
                  </div>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-button class="greenBT flex-row" color="#00aeef">
                  <ion-text class="bt-text" style="margin-right:8%">{{ $t("Rate This University") }}</ion-text>
                  <ion-icon :src="star" :style="university_detail_datas.score>20?'color:yellow':''"></ion-icon>
                  <ion-icon :src="star" :style="university_detail_datas.score>40?'color:yellow':''"></ion-icon>
                  <ion-icon :src="star" :style="university_detail_datas.score>60?'color:yellow':''"></ion-icon>
                  <ion-icon :src="star" :style="university_detail_datas.score>80?'color:yellow':''"></ion-icon>
                  <ion-icon :src="star" :style="university_detail_datas.score>95?'color:yellow':''"></ion-icon>
                </ion-button>
              </ion-row>
              <ion-row>
                <ion-button class="greenBT" color="#00aeef">
                  <p class="bt-text">{{ $t(`View Full university profile in UNIRANKS`) }}</p>
                </ion-button>
              </ion-row>
          </ion-grid>
      </ion-content>
      <country-detail-footer-section :id="id"/>
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
  IonButton,
  IonText,
  IonImg,
  IonCard,
  IonIcon,
  IonCardContent,
} from "@ionic/vue";
import {computed, defineComponent, ref, onBeforeMount} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useLoadingStore} from "@/store/loading";
import HeaderSection from "@/components/explore/HeaderSection.vue";
import CountryDetailFooterSection from "@/components/explore/CountryDetailFooterSection.vue";
import { star } from 'ionicons/icons'

export default defineComponent({
  name: "UniversityDetailModal",
  components: {
    CountryDetailFooterSection,
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonText,
    IonImg,
    IonIcon,
    IonCard,
    IonCardContent,
  },
  props: {
    id: Number,
  },
  setup(props) {
    const store = useExploreDataStore();
    const route = useRoute();
    const {loadUniversityDetailSearch, changeLoadedVal} = store;
    const dataLoaded = computed(() => store.university_detail_dataLoaded);
    const university_detail_datas = computed(() => store.university_detail_datas);
    const {showLoading, hideLoading} = useLoadingStore();
    const router = useRouter();
    
    const imgUrl = '/assets/images/header.svg';
    const uniImgUrl = 'assets/images/university.svg';
    const calenderUrl = 'assets/images/awesome-calenda.svg';
    const hourglaUrl = 'assets/images/awesome-hourgla.svg';
    const moneyUrl = 'assets/images/awesome-money-c.svg';
    const stuImgUrl = 'assets/images/student-hat.svg';
    const nextImgUrl = 'assets/images/Chevron.svg';
    const cupImgUrl = 'assets/images/cup.svg';
    const globalUrl = 'assets/images/Icon-awesome-globe-a.svg';
    const uniRankUrl = 'assets/images/uniranks.svg';
    const urImgUrl = 'assets/images/urstar5.svg';
    const userImgUrl = 'assets/images/awesome-user-al.svg';
    const rateUniImg = 'assets/images/rateUni.svg';
    const verified = 'assets/images/verified.png'
    onBeforeMount(() => {
      if (!dataLoaded.value) {
          showLoading();
          Promise.all([loadUniversityDetailSearch(props.id)]).then(() => {
            changeLoadedVal();
            hideLoading();
          })
      }
    });
  
    return {
      imgUrl,
      uniImgUrl,
      calenderUrl,
      moneyUrl,
      hourglaUrl,
      stuImgUrl,
      nextImgUrl,
      cupImgUrl,
      globalUrl,
      uniRankUrl,
      urImgUrl,
      userImgUrl,
      rateUniImg,
      star,
      verified,
      university_detail_datas,
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
ion-col {
  padding-left: 0px;
}
ion-card {
  margin-left:0px;
  margin-right:0px;
}
ion-icon {
  margin-right: 5px;
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
.uni-img {
  width: 50px;
  margin-right: 9px;
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
  border-radius: 15px;
  background: #ffffff;
  margin-top:0px
}
.date_card {
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
  text-decoration: underline #00aeef;
}
.greenBT {
  width: 100%;
  border-radius: 15px;
  filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
  background: #00aeef ;
  margin-left: auto;
  margin-right: auto;
}
.rank-card {
  border-radius: 6px;
  margin: 5px 0 10px;
  padding: 5px;
}
.mid-title {
  font-size: 26px;
  font-weight: bold;
  font-style: normal;
  text-align: left;
  color: #1c345a;
}
.bt-text {
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: #ffffff;
}
.global-img {
  width: 50px;
  height: 32px;
  margin-top: 7px;
  position: absolute;
  right: 0;
}
</style>