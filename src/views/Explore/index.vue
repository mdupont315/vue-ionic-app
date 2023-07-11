<template>
    <ion-page>
        <header-section />
        <ion-content :fullscreen="true" class="ion-padding-top">
            <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
              <ion-row class="ion-padding-top">
                <ion-col size="12" style="margin-top: 8%; width: 100%; justify-content: center">
                    <ion-text class="big-title">
                      <p class="ion-text-left" style="margin-bottom: 0;">{{ $t('Design Your Future') }}</p>
                    </ion-text>
                </ion-col>
              </ion-row>
              <ion-row class="ion-padding-top">
                <ion-col size="12" style="display: flex; flex-flow: row;"  @click="toUniversityMore">
                    <ion-img :src='uniImgUrl' class="leftImg"/>
                    <ion-text class="mid-title">
                        <p class="ion-text-left" style="margin:0px">{{ $t(`University Rankings | ${total_universities}`) }}</p>
                    </ion-text>
                    <ion-img :src='nextImgUrl' class="rightImg" style="margin-right:10px"/>
                </ion-col>
                <ion-col class="scrolling">
                  <div v-for="university in universities" :key="university.id">
                    <ion-card @click="toUniversityDetailModal(university.id)">
                        <ion-card-content>
                            <div style="display: flex; flex-flow: row;">
                              <ion-img :src='university.logo_url' class="leftImg"/>
                              <div style="display: flex; flex-flow: column;" class="university-header">
                                <ion-text>{{`Local #${university.local_position} | Global #${university.global_position}`}}</ion-text>
                                <ion-text>Top University</ion-text>
                              </div>
                            </div>
                            <hr style="border-top: 1px solid #606060;"/>
                            <div style="display: flex; flex-flow: column;">
                              <ion-text class="university-name">{{ short_name(university.university_name) }}</ion-text>
                              <ion-text class="university-country-name">{{ university.country }}</ion-text>
                            </div>
                            <hr style="border-top: 1px solid #606060;"/>
                            <ion-text class="university-status">{{ university.status }}</ion-text>
                        </ion-card-content>
                    </ion-card>
                  </div>
                </ion-col>
              </ion-row>
              <ion-row class="ion-padding-top">
                <ion-col size="12" style="display: flex; flex-flow: row;">
                    <ion-img :src='stuImgUrl' class="leftImg"/>
                    <ion-text class="mid-title">
                        <p class="ion-text-left" style="margin:0px">{{ $t(`Programs | ${total_programs}`) }}</p>
                    </ion-text>
                    <ion-img :src='nextImgUrl' class="rightImg" style="margin-right:10px"/>
                </ion-col>
                <ion-col class="scrolling">
                  <div v-for="program in programs" :key="program.id" style="height: max-content;">
                    <ion-card @click="toProgramDetail(uni_url, program.university.university_name)">
                        <ion-card-content style="height: max-content;">
                            <ion-text class="program-name" style="height:30%">{{ short_name(program.title) }}</ion-text>
                            <hr style="border-top: 1px solid #606060;"/>
                            <div style="display: flex; flex-flow: row;">
                              <ion-img :src="uni_url" class="leftImg"/>                                
                              <ion-text class="program-university-name">{{ short_name(program.university.university_name) }}</ion-text>
                            </div>
                            <hr style="border-top: 1px solid #606060;"/>
                            <ion-text style="display: inline; margin-right: 60%;" class="program-fee">UK</ion-text>
                            <ion-text style="display: inline;" class="program-fee">$500</ion-text>
                        </ion-card-content>
                    </ion-card>
                  </div>
                </ion-col>
              </ion-row>
              <ion-row class="ion-padding-top">
                <ion-col size="12" style="margin-top: 10px; width: 100%; justify-content: center">
                    <ion-text class="big-title">
                    <p class="ion-text-left" style="margin-bottom: 0; margin-top: 0;">{{ $t('Your Unique Adventure') }}</p>
                    </ion-text>
                </ion-col>
                <ion-col size="12">
                  <ion-row>
                    <ion-col size="6">
                      <ion-card class="unique-image-content" @click="toStudyDestination">
                        <ion-img :src='study_dest' class="unique-img"/>
                        <ion-card-header>
                          <ion-card-title class="unique-title">
                            <ion-text>Study Destinations</ion-text>
                          </ion-card-title>
                        </ion-card-header>
                        <ion-card-content class="unique-content">
                          <ion-text>Find your own ideal study destination</ion-text>
                        </ion-card-content>
                      </ion-card>
                      <ion-card class="unique-image-content" @click="toUnlockingSec">
                        <ion-img :src='unlock_sec' class="unique-img"/>
                        <ion-card-header>
                          <ion-card-title  class="unique-title">
                            <ion-text>Unlocking the Secrets</ion-text>
                          </ion-card-title>
                        </ion-card-header>
                        <ion-card-content class="unique-content">
                          <ion-text>to a Successful Study Abroad Experience</ion-text>
                        </ion-card-content>
                      </ion-card>
                    </ion-col>
                    <ion-col size="6">
                      <ion-card class="unique-image-content"  @click="toUniversityMore">
                        <ion-img :src='top_unis' class="unique-img"/>
                        <ion-card-header>
                          <ion-card-title class="unique-title">
                            <ion-text>Top Universities</ion-text>
                          </ion-card-title>
                        </ion-card-header>

                        <ion-card-content class="unique-content ">
                        <ion-text>Exploring UNIRANKS Top Universities</ion-text>
                        </ion-card-content>
                      </ion-card>
                      <ion-card class="unique-image-content" @click="toGetInspired">
                        <ion-img :src='inspiration' class="unique-img"/>
                        <ion-card-header>
                          <ion-card-title  class="unique-title">
                            <ion-text>Get Inspired</ion-text>
                          </ion-card-title>
                        </ion-card-header>
                        <ion-card-content class="unique-content">
                          Essential Tips for Choosing the Right University and Major
                        </ion-card-content>
                      </ion-card>
                      <ion-card class="unique-image-content" @click="toTopArticles">
                        <ion-img :src='news' class="unique-img"/>
                        <ion-card-header>
                          <ion-card-title  class="unique-title">
                            <ion-text>Top Articles</ion-text>
                          </ion-card-title>
                        </ion-card-header>
                        <ion-card-content class="unique-content" style="justify-content: center;">
                          <ion-text>Stay updated with our fascinating news and articles.</ion-text>
                        </ion-card-content>
                      </ion-card>
                    </ion-col>
                  </ion-row>
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
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle,
  modalController,
} from "@ionic/vue";
import {computed, defineComponent, ref, onBeforeMount} from "vue";
import {useRouter} from "vue-router";
import {useLoadingStore} from "@/store/loading";
import {useComingSoonAlert} from "@/shared/comingSoonAlert";
import HeaderSection from "@/components/explore/HeaderSection.vue";
import FooterSection from "@/components/explore/FooterSection.vue";
import ProgramDetailModal from "@/components/modal/ProgramDetailModal.vue";
import UniversityDetailModal from "@/components/modal/UniversityDetailModal.vue";

export default defineComponent({
  name: "ExplorePage",
  components: {
    HeaderSection,
    FooterSection,
    IonPage,
    IonContent,
    IonImg,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardTitle
  },
  setup() {
    const store = useExploreDataStore();
    const {loadData} = store;
    const dataLoaded = computed(() => store.dataLoaded);
    const total_universities = computed(() => store.total_universities);
    const universities = computed(() => store.universities);
    const total_programs = computed(() => store.total_programs);
    const programs = computed(() => store.programs);
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
    const uni_url = 'https://d73ojsnoesnuw.cloudfront.net/images/universities-logos/university-of-washington-logo.png'

    const toStudyDestination = () => {
      router.push("/explore/studydestination");
    }
    const toGetInspired = () => {
      router.push("/explore/getinspired");
    }
    const toTopArticles = () => {
      router.push("/explore/toparticles");
    }
    const toUnlockingSec = () => {
      router.push("/explore/unlockingsec");
    }
    const toUniversityMore = () => {
      router.push('/explore/universitymore');
    }
    const handleInput = (event) => {
      router.push(`/explore/searchpage/${event.target.value}`);
    }

    const toProgramDetail = async(url, name) => {
      const modal = await modalController.create({
        component: ProgramDetailModal,
        componentProps: {
            url: url,
            name:name
        },
        initialBreakpoint: 0.75,
        breakpoints: [0, 0.75],
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
        Promise.all([loadData()]).then(() => {
            console.log(total_universities.value);
            console.log(dataLoaded.value);
            // console.log(universities.value[0]);
          hideLoading();
        })
      }
    });

    return {
      doLogin,
      imgUrl,
      uniImgUrl,
      nextImgUrl,
      study_dest,
      unlock_sec,
      top_unis,
      inspiration,
      news,
      uni_url,

      total_universities,
      universities,
      stuImgUrl,
      total_programs,
      programs,

      toStudyDestination,
      toGetInspired,
      toTopArticles,
      toUnlockingSec,
      toUniversityMore,
      handleInput,
      toProgramDetail,
      toUniversityDetailModal,
      short_name,
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

ion-toolbar {
  position: absolute;
  background: #1c345a;
  text-align: center;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
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
.program-name {
  font-family: "Calibri";
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: #203456;
}
.program-university-name {
  font-family: "Calibri";
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: #203456;
}
.program-fee {
  font-family: "Calibri";
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: #606060;
}
.unique-title{
  font-family: "Calibri";
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  text-align: left;
  color: #1c345a;
  padding-top: 10px;
}
.unique-content {
  font-family: "Calibri";
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: #606060;
  padding-left:8px;
}
.unique-image-content {
  width: 100%;
  height: auto;
  border-radius: 10px;
  filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
  background: #ffffff;
  margin-bottom: 18px;
}
.unique-img {
  width: 100%; 
  height: auto;
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
ion-searchbar ion-icon {
  right: 16px !important;
  left: auto !important;
}
.sc-ion-searchbar-md .searchbar-search-icon.sc-ion-searchbar-md {
  left: unset;
  right: unset;
  right: 16px;
}
</style>