<template>
    <ion-page>
        <header-section />
        <ion-content :fullscreen="true" class="ion-padding-top">
            <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
                <ion-row class="ion-padding-top">
                <ion-col size="12" style="margin-top: 25px; width: 100%; justify-content: center">
                    <ion-text class="big-title">
                    <p class="ion-text-left" style="margin-bottom: 0;">{{ $t('Design Your Future') }}</p>
                    </ion-text>
                </ion-col>
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
                            <!-- <ion-label>{universities.value}</ion-label> -->
                            <div style="display: flex; flex-flow: row;">
                              <ion-img :src='university.logo_url' class="leftImg"/>
                              <div style="display: flex; flex-flow: column;" class="university-header">
                                <p>{{`Local #${university.local_position} | Global #${university.global_position}`}}</p>
                                <p>Top University</p>
                              </div>
                            </div>
                            <hr style="border-top: 1px solid #606060;"/>
                            <div style="display: flex; flex-flow: column;">
                              <p class="university-name">{{ university.university_name }}</p>
                              <p class="university-country-name">{{ university.country }}</p>
                            </div>
                            <hr style="border-top: 1px solid #606060;"/>
                            <p class="university-status">{{ university.status }}</p>
                        </ion-card-content>
                    </ion-card>
                  </div>
                </ion-col>
                <ion-col size="12" style="display: flex; flex-flow: row;">
                    <ion-img :src='stuImgUrl' class="leftImg"/>
                    <ion-text class="mid-title">
                        <p class="ion-text-left" style="margin:0px">{{ $t(`Programs | ${total_programs}`) }}</p>
                    </ion-text>
                    <ion-img :src='nextImgUrl' class="rightImg" style="margin-right:10px"/>
                </ion-col>
                <ion-col class="scrolling">
                  <div v-for="program in programs" :key="program.id">
                    <ion-card @click="toProgramDetail(uni_url, program.university.university_name)">
                        <ion-card-content>
                            <!-- <ion-label>{universities.value}</ion-label> -->
                            <p class="program-name" style="height:42px">{{ program.title }}</p>
                            <hr style="border-top: 1px solid #606060;"/>
                            <div style="display: flex; flex-flow: row;">
                              <ion-img :src="uni_url" class="leftImg"/>                                
                              <p class="program-university-name">{{ program.university.university_name }}</p>
                            </div>
                            <hr style="border-top: 1px solid #606060;"/>
                            <p style="display: inline; margin-right: 60%;" class="program-fee">UK</p>
                            <p style="display: inline;" class="program-fee">$500</p>
                        </ion-card-content>
                    </ion-card>
                  </div>
                </ion-col>
                <ion-col size="12" style="margin-top: 10px; width: 100%; justify-content: center">
                    <ion-text class="big-title">
                    <p class="ion-text-left" style="margin-bottom: 0; margin-top: 0;">{{ $t('Your Unique Adventure') }}</p>
                    </ion-text>
                </ion-col>
                <ion-col>
                  <ion-row>
                    <ion-col>
                      <ion-card class="unique-image-first-card" @click="toStudyDestination">
                        <!-- <ion-img alt="Silhouette of mountains" :src='study_dest' /> -->
                        <ion-img :src='study_dest' class="unique-first-img"/>
                        <ion-card-header>
                          <ion-card-title class="unique-title">Study Destinations</ion-card-title>
                        </ion-card-header>

                        <ion-card-content class="unique-content">
                          Find your own ideal study destination
                        </ion-card-content>
                      </ion-card>
                      <ion-card class="unique-image-first-card" @click="toUnlockingSec">
                        <ion-img :src='unlock_sec' class="unique-first-img"/>
                        <ion-card-header>
                          <ion-card-title  class="unique-title">Unlocking the Secrets</ion-card-title>
                        </ion-card-header>

                        <ion-card-content class="unique-content">
                          to a Successful Study Abroad Experience
                        </ion-card-content>
                      </ion-card>
                    </ion-col>
                    <ion-col>
                      <ion-card class="unique-image-second-card"  @click="toUniversityMore">
                        <!-- <ion-img alt="Silhouette of mountains" :src='study_dest' /> -->
                        <ion-img :src='top_unis' class="unique-second-img"/>
                        <ion-card-header>
                          <ion-card-title class="unique-title">Top Universities</ion-card-title>
                        </ion-card-header>

                        <ion-card-content class="unique-content ">
                          Exploring UNIRANKS Top Universities
                        </ion-card-content>
                      </ion-card>
                      <ion-card class="unique-image-second-card" @click="toGetInspired">
                        <ion-img :src='inspiration' class="unique-second-img"/>
                        <ion-card-header>
                          <ion-card-title  class="unique-title">Get Inspired</ion-card-title>
                        </ion-card-header>

                        <ion-card-content class="unique-content">
                          Essential Tips for Choosing the Right University and Major
                        </ion-card-content>
                      </ion-card>
                      <ion-card class="unique-image-second-card" @click="toTopArticles">
                        <ion-img :src='news' class="unique-second-img"/>
                        <ion-card-header>
                          <ion-card-title  class="unique-title">Top Articles</ion-card-title>
                        </ion-card-header>

                        <ion-card-content class="unique-content" style="justify-content: center;">
                          Stay updated with our fascinating news and articles.
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
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonPage,
    IonRow,
    IonText,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonImg,
    IonSearchbar,
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
  setup() {
    const store = useExploreDataStore();
    const {loadData} = store;
    const dataLoaded = computed(() => store.dataLoaded);
    const total_universities = computed(() => store.total_universities);
    const universities = computed(() => store.universities);
    const total_programs = computed(() => store.total_programs);
    const programs = computed(() => store.programs);
    // console.log(dataLoaded.value)
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
          // breakpoints: [0, 0.5, 1],
        });
        modal.present();
    }
    const toUniversityDetailModal = async(id) => {
      const modal = await modalController.create({
          component: UniversityDetailModal,
          componentProps: {
              id:id
          },
          initialBreakpoint: 0.95,
          // breakpoints: [0, 0.5, 1],
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
    //   comingSoon,
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
.unique-image-first-card {
  width: 164px;
  height: 300px;

  border-radius: 10px;

  filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));

  background: #ffffff;
  margin-bottom: 18px;
}
.unique-title{
  font-family: "Calibri";
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  text-align: left;
  color: #1c345a;
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
.unique-first-img {
  width: 163px;
height: 187px;

}
.unique-image-second-card {
  width: 165px;
  height: 193px;

  border-radius: 10px;

  filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));

  background: #ffffff;
  margin-bottom: 18px;
}
.unique-second-img {
  width: 165px; 
  height: 89px;
}

/* ion-searchbar.searchbar-input-container.sc-ion-searchbar-ios {
    height: 36px;
    margin-top: 16px !important;
} */
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