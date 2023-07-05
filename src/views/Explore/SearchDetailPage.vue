<template>
    <ion-page>
        <ion-header class="ion-no-border" mode="ios" collapse="fade" :translucent="true">
            <ion-toolbar>
                <ion-title class="ion-text-center" color="primary"></ion-title>
                <ion-img :src='imgUrl'/>
                <ion-searchbar></ion-searchbar>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="ion-padding-top">
            <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
                <ion-row class="ion-padding-top">
                    <ion-col style="margin-top: 65px; display: flex; flex-flow: row; margin-left: 18px;">
                        <div v-for="tabTitle in tabTitles" :key="tabTitle">
                            <ion-card :class="btpos === tabTitle? 'selected-tab' : 'more-tab'" @click="changeTabColor(tabTitle)">
                                <p :class="btpos === tabTitle?'selected-tab-title':'tab-title'">{{ tabTitle }}</p>
                            </ion-card>
                        </div>
                    </ion-col>
                    <ion-col style=" display: flex; flex-flow: row; ">
                        <ion-text v-if="btpos === tabTitles[0]">
                            <p class="title-name" style="margin:0px">{{ $t(`${total} Results Found`) }}</p>
                        </ion-text>
                        <ion-text v-if="btpos === tabTitles[1]">
                            <p class="title-name" style="margin:0px">{{ $t(`${programs.data.length} Programs has been Found`) }}</p>
                        </ion-text>
                        <ion-text v-if="btpos === tabTitles[2]">
                            <p class="title-name" style="margin:0px">{{ $t(`${institutes.data.length} Institutions has been Found`) }}</p>
                        </ion-text>
                    </ion-col>
                    <ion-col v-if="btpos === tabTitles[0] || btpos === tabTitles[2]" style="display: flex; flex-flow: column;">
                        <ion-card v-for="institute in institutes.data" :key="institute.id" class="institute-card">
                            <ion-card-content style="display: flex; flex-flow: column; margin-top: 4px;">
                                <div style="display: flex; flex-flow: row;">
                                    <ion-img :src='institute.logo_url' class="leftImg" style="width: 15%;"/>
                                    <div style="display: flex; flex-flow: column; margin-top: 3%; margin-left:1px; width: 85%;">
                                        <div>
                                            <p class="university-name" style="float:left;">{{ short_name(institute.university_name) }}</p>
                                            <ion-img :src='nextImgUrl' class="next-img" style="float:right;  margin-top: 6px;"></ion-img>
                                        </div>
                                        <p class="university-ranking">{{ `Local #${institute.local_position} | Global #${institute.global_position} | Score ${institute.score}` }}</p>
                                        <div>
                                            <p class="university-country" style="float: left;">{{ institute.country }}</p>
                                            <p class="university-status" style="float: right">{{ institute.status }}</p>
                                        </div>
                                    </div>
                                </div>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    
                    <ion-col v-if="btpos === tabTitles[0] || btpos === tabTitles[1]"  style="display: flex; flex-flow: column;">
                        <ion-card v-for="program in programs.data" :key="program.id" class="program-card">
                            <ion-card-content style="display: flex; flex-flow: column; margin-top: 4px;">
                                <ion-text>
                                <p class="program-title">{{ `${program.title}` }}</p>
                                </ion-text>
                                <div style="display: flex; flex-flow: row;">
                                <ion-text>
                                    <p class="program-count">{{ `Match with ${program.matched_with_institutes} institutions` }}</p>
                                </ion-text>
                                <ion-img :src='nextImgUrl' class="rightImg"/>
                                </div>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>  
                </ion-row>
            </ion-grid>
        </ion-content>
        <filter-footer-section />
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
} from "@ionic/vue";
import {computed, defineComponent, ref, onBeforeMount} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useLoadingStore} from "@/store/loading";
import {useComingSoonAlert} from "@/shared/comingSoonAlert";
import HeaderSection from "@/components/explore/HeaderSection.vue";
import FilterFooterSection from "@/components/explore/FilterFooterSection.vue";

export default defineComponent({
  name: "UniversityMore",
  components: {
    // HeaderSection,
    FilterFooterSection,
    // IonButton,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonImg,
    IonSearchbar,
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    // IonCol,
    IonText
  },
  setup() {
    const store = useExploreDataStore();
    const route = useRoute();
    const {loadSearchData, changeLoadedVal} = store;
    const dataLoaded = computed(() => store.search_dataLoaded);
    const institutes = computed(() => store.search_institutes_data);
    const programs = computed(() => store.search_programs_data);
    // console.log(dataLoaded.value)
    const {showLoading, hideLoading} = useLoadingStore();
    const router = useRouter();
    const doLogin = async () => {
      showLoading();
    };

    const tabTitles = ['Results', 'Programmes', 'Institutions'];
    const imgUrl = '/assets/images/header.svg';
    const nextImgUrl = 'assets/images/Chevron.svg';
    // const maxNameLength = 32;

    const btpos = ref(tabTitles[0]);
    const total = ref(0);

    onBeforeMount(() => {
      const keyword = route.params.keyword
      if (!dataLoaded.value) {
        showLoading();
        Promise.all([loadSearchData(keyword)]).then(() => {
            // console.log(elite_datas.value);
            // console.log(dataLoaded.value);
            total.value = programs.value.data.length + institutes.value.data.length;
            changeLoadedVal();
            // console.log(universities.value[0]);
          hideLoading();
        })
      }
    });

    const short_name = (name) => {
        let newname = name;
        if (name.length>32) {
            newname = name.substring(0, 32);
            newname = `${newname}...`;
        }
        return newname;
    }

    const changeTabColor = (title) => {
        btpos.value = title;
    }

    return {
        doLogin,
    //   comingSoon,
        imgUrl,
        nextImgUrl,

        tabTitles,      
        institutes,
        programs,
        btpos,
        total,

        short_name,
        changeTabColor
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

ion-toolbar {
    position: absolute;
    background: #1c345a;
    text-align: center;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  }
ion-card-content {
  padding: 0;
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
  margin-left: auto;
  margin-top: auto;
  margin-bottom: 8px;
}
/* ion-card-content {
    padding-top:5px;
} */
.more-tab {
    width: max-content;
    height: 36px;
    border-radius: 15px;
    margin: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    padding-left: 10px;
    padding-right: 10px;
}
.tab-title{
    background: #ffffff;
    font-family: "Calibri";
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    color: #1c345a;
    text-align: center;
}
.title-name {
    font-family: "Calibri";
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #1c345a;
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
.program-card {
  width: 346px;
  height: 53px;

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
    /* float: left; */
}
.university-status {
    font-family: "Calibri";
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    color: #007a00;
    /* float: right; */
}
.institute-card {
  width: 346px;
  height: 78px;

  border-radius: 6px;

  filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));

  background: #ffffff;
  padding-left: 5px;
  padding-right: 5px;
}
.next-img {
    width: 7.7px;
}
.selected-tab {
    width: max-content;
    height: 36px;
    border-radius: 15px;
    margin: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    padding-left: 10px;
    padding-right: 10px;

    background: #1c345a
}
.selected-tab-title {
    font-family: "Calibri";
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: center;
    color: #ffffff;
}
</style>