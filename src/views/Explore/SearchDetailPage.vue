<template>
    <ion-page>
        <header-section />
        <ion-content :fullscreen="true" class="ion-padding-top">
            <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
                <ion-row class="ion-padding-top">
                    <ion-col style="margin-top: 65px; display: flex; flex-flow: row; margin-left: 18px;">
                        <div v-for="tabTitle in tabTitles" :key="tabTitle">
                            <ion-card :class="btpos === tabTitle? 'selected-tab' : 'more-tab'" @click="changeTabColor(tabTitle)">
                                <p :class="btpos === tabTitle?'selected-tab-title':'tab-title'">{{ $t(`${tabTitle }`)}}</p>
                            </ion-card>
                        </div>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col style=" display: flex; flex-flow: row; ">
                        <ion-text v-if="btpos === tabTitles[0]">
                            <p class="title-name" style="margin:0px">{{ $t(`${total} Results Found`) }}</p>
                        </ion-text>
                        <ion-text v-if="btpos === tabTitles[1] && !program_detail_visible">
                            <p class="title-name" style="margin:0px">{{ $t(`${programs.data.length} Programs has been Found`) }}</p>
                        </ion-text>
                        <ion-text v-if="btpos === tabTitles[1] && program_detail_visible">
                            <p class="title-name" style="margin:0px">{{ $t(`${program_detail_count} Results ${program_detail_title}`) }}</p>
                        </ion-text>
                        <ion-text v-if="btpos === tabTitles[2] && !institute_detail_visible">
                            <p class="title-name" style="margin:0px">{{ $t(`${institutes.data.length} Institutions has been Found`) }}</p>
                        </ion-text>
                        <ion-text v-if="btpos === tabTitles[2] && institute_detail_visible">
                            <p class="title-name" style="margin:0px">{{ $t(`2 Programs has been Found`) }}</p>
                        </ion-text>
                    </ion-col>
                </ion-row>
                <ion-row style="margin-left: 8px;">
                    <ion-col v-if="btpos === tabTitles[0] || btpos === tabTitles[2]" style="display: flex; flex-flow: column;">
                        <div v-if="!institute_detail_visible">                    
                            <ion-card v-for="institute in institutes.data" :key="institute.id" class="institute-card">
                                <ion-card-content style="display: flex; flex-flow: column; margin-top: 4px;">
                                    <div style="display: flex; flex-flow: row;">
                                        <ion-img :src='institute.logo_url' class="leftImg" style="width: 15%;"/>
                                        <div style="display: flex; flex-flow: column; margin-top: 3%; margin-left:1px; width: 85%;">
                                            <div>
                                                <p class="university-name" style="float:left;">{{ short_name(institute.university_name) }}</p>
                                                <ion-img :src='nextImgUrl' class="next-img" style="float:right;  margin-top: 6px;" @click="instituteDetail"></ion-img>
                                            </div>
                                            <p class="university-ranking">{{ $t(`Local #${institute.local_position} | Global #${institute.global_position} | Score ${institute.score}`) }}</p>
                                            <div>
                                                <p class="university-country" style="float: left;">{{ $t(`${institute.country}`) }}</p>
                                                <p class="university-status" style="float: right">{{ $t(`${institute.status}`) }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </ion-card-content>
                            </ion-card>
                        </div>
                        <div v-else>
                            <ion-card class="institute-card" style="margin-left: 8px;">
                                <ion-card-content style="display: flex; flex-flow: column; margin-top: 4px;">
                                    <div style="display: flex; flex-flow: row;">
                                        <ion-img :src='institutes.data[0].logo_url' class="leftImg" style="width: 15%;"/>
                                        <div style="display: flex; flex-flow: column; margin-top: 3%; margin-left:1px; width: 85%;">
                                            <div>
                                                <p class="university-name" style="float:left;">{{ short_name(institutes.data[0].university_name) }}</p>
                                                <ion-img :src='nextImgUrl' class="next-img" style="float:right;  margin-top: 6px;"></ion-img>
                                            </div>
                                            <p class="university-ranking">{{ $t(`Local #${institutes.data[0].local_position} | Global #${institutes.data[0].global_position} | Score ${institutes.data[0].score}`) }}</p>
                                            <div>
                                                <p class="university-country" style="float: left;">{{ $t(`institutes.data[0].country`) }}</p>
                                                <p class="university-status" style="float: right">{{ $t(`institutes.data[0].status`) }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </ion-card-content>
                            </ion-card>
                            <ion-card v-for="program in programs.data" :key="program.id" class="program-card">
                                <ion-card-content style="display: flex; flex-flow: column; margin-top: 4px;">
                                    <ion-text>
                                    <p class="program-title">{{ $t(`${program.title}`) }}</p>
                                    </ion-text>
                                    <div style="display: flex; flex-flow: row;">
                                    <ion-text>
                                        <p class="program-count">{{ $t(`Match with ${program.matched_with_institutes} institutions`) }}</p>
                                    </ion-text>
                                    <ion-img :src='nextImgUrl' class="rightImg"  @click="programmesDetail(program.matched_with_institutes, program.title)"/>
                                    </div>
                                </ion-card-content>
                            </ion-card>
                        </div>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col v-if="btpos === tabTitles[0] || btpos === tabTitles[1] "  style="display: flex; flex-flow: column;">
                        <div v-if="!program_detail_visible" >
                            <ion-card v-for="program in programs.data" :key="program.id" class="program-card">
                                <ion-card-content style="display: flex; flex-flow: column; margin-top: 4px;">
                                    <ion-text>
                                    <p class="program-title">{{ $t(`${program.title}`) }}</p>
                                    </ion-text>
                                    <div style="display: flex; flex-flow: row;">
                                    <ion-text>
                                        <p class="program-count">{{ $t(`Match with ${program.matched_with_institutes} institutions`) }}</p>
                                    </ion-text>
                                    <ion-img :src='nextImgUrl' class="rightImg"  @click="programmesDetail(program.matched_with_institutes, program.title)"/>
                                    </div>
                                </ion-card-content>
                            </ion-card>
                        </div>
                        <div v-else>
                            <ion-card  v-for="search_program_detail_data in search_program_detail_datas" :key="search_program_detail_data.id" class="program-detail-card">
                                <ion-card-content style="display: flex; flex-flow: column; margin: 4px;">
                                    <ion-text>
                                        <p class="program-title-name" style="margin:0px">{{ $t(`${program_detail_title}`) }}</p>
                                    </ion-text>
                                    <div style="display: flex; flex-flow: row;">
                                        <ion-img :src='search_program_detail_data.logo_url' class="leftImg" style="width: 15%;"/>
                                        <div style="display: flex; flex-flow: column; margin-top: 3%; margin-left:1px; width: 85%;">
                                            <div>
                                                <p class="university-name" style="float:left;">{{ short_name(search_program_detail_data.university_name) }}</p>
                                                <ion-img :src='nextImgUrl' class="next-img" style="float:right;  margin-top: 6px;" @click="openProgramDetailModal(search_program_detail_data.logo_url, search_program_detail_data.university_name)"></ion-img>
                                            </div>
                                            <p class="university-ranking">{{ $t(`Local #${search_program_detail_data.local_position} | Global #${search_program_detail_data.global_position} | Score ${search_program_detail_data.score}`) }}</p>
                                            <div>
                                                <p class="university-country" style="float: left;">{{ $t(`${search_program_detail_data.country}`) }}</p>
                                                <p class="university-status" style="float: right">{{ $t(`${search_program_detail_data.status}`) }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </ion-card-content>
                            </ion-card>
                        </div>
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
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonImg,
    IonCard,
    IonCardContent,
    modalController,
} from "@ionic/vue";
import {computed, defineComponent, ref, onBeforeMount} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useLoadingStore} from "@/store/loading";
import {useComingSoonAlert} from "@/shared/comingSoonAlert";
import HeaderSection from "@/components/explore/HeaderSection.vue";
import FilterFooterSection from "@/components/explore/FilterFooterSection.vue";
import ProgramDetailModal from "@/components/modal/ProgramDetailModal.vue"

export default defineComponent({
  name: "SearchDetail",
  components: {
    HeaderSection,
    FilterFooterSection,
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
  setup() {
    const store = useExploreDataStore();
    const route = useRoute();
    const {loadSearchData, changeLoadedVal, loadProgramDetailSearch} = store;
    const dataLoaded = computed(() => store.search_dataLoaded);
    const institutes = computed(() => store.search_institutes_data);
    const programs = computed(() => store.search_programs_data);
    const search_program_detail_datas = computed(() => store.search_program_detail_datas);
    const {showLoading, hideLoading} = useLoadingStore();
    const router = useRouter();

    const tabTitles = ['Results', 'Programmes', 'Institutions'];
    const imgUrl = '/assets/images/header.svg';
    const nextImgUrl = 'assets/images/Chevron.svg';

    const btpos = ref(tabTitles[0]);
    const total = ref(0);
    const program_detail_visible = ref(false);
    const institute_detail_visible = ref(false);
    const program_detail_count = ref(0);
    const program_detail_title = ref("");

    onBeforeMount(() => {
      const keyword = route.params.keyword
      if (!dataLoaded.value) {
        showLoading();
        Promise.all([loadSearchData(keyword)]).then(() => {
            total.value = programs.value.data.length + institutes.value.data.length;
            changeLoadedVal();
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
        program_detail_visible.value = false;
        institute_detail_visible.value = false;
        btpos.value = title;
    }

    const programmesDetail = (program_count, program_title) => {
        program_detail_visible.value = true;
        program_detail_count.value = program_count;
        program_detail_title.value = program_title;
        showLoading();
        Promise.all([loadProgramDetailSearch(program_title)]).then(() => {
            hideLoading();
        })
    }

    const instituteDetail = () => {
        institute_detail_visible.value = true;
    }

    const openProgramDetailModal = async(url, name) => {
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

    return {
        imgUrl,
        nextImgUrl,

        tabTitles,      
        institutes,
        programs,
        btpos,
        total,
        program_detail_visible,
        program_detail_count,
        program_detail_title,
        search_program_detail_datas,
        institute_detail_visible,

        short_name,
        changeTabColor,
        programmesDetail,
        instituteDetail,
        openProgramDetailModal
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
ion-card {
    margin-bottom: 8px;
}
ion-card-content {
    padding: 0;
}
div {
  margin-right: 8px;  
}
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
  width: 100%;
  height: auto;
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
  width: 100%;
  height: auto;
  border-radius: 6px;
  filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
  background: #ffffff;
  padding-left: 5px;
  padding-right: 5px;
  margin: 0 !important;
  margin-bottom: 18px !important;
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
.program-detail-card {
    width: 100%;
    height: auto;
    border-radius: 6px;
    filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
    background: #ffffff
}
.program-title-name {
    font-family: "Calibri";
    font-size: 16px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    color: #203456;
}
</style>