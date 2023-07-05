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
                    <ion-col style="margin-top: 65px; display: flex; flex-flow: row; ">
                        <div v-for="tabTitle in tabTitles" :key="tabTitle">
                            <ion-card class="more-tab">
                                <p class="tab-title">{{ tabTitle }}</p>
                            </ion-card>
                        </div>
                    </ion-col>
                    <ion-col style=" display: flex; flex-flow: row; ">
                        <ion-text>
                            <p class="title-name" style="margin:0px">{{ $t(`Elite Universities 425`) }}</p>
                        </ion-text>
                    </ion-col>
                    <div v-for="elite in elite_datas" :key="elite.id">
                        <ion-card style="margin:0px; margin-left: 10px; margin-top: 10px;">
                            <ion-card-content>
                                <!-- <ion-label>{universities.value}</ion-label> -->
                                <div style="display: flex; flex-flow: row;">
                                    <ion-img :src='elite.logo_url' class="leftImg" style="width: 15%;"/>
                                    <div style="display: flex; flex-flow: column; margin-top: 3%; margin-left:1px; width: 85%;">
                                        <div>
                                            <p class="university-name" style="float:left;">{{ short_name(elite.university_name) }}</p>
                                            <ion-img :src='nextImgUrl' class="next-img" style="float:right;  margin-top: 6px;"></ion-img>
                                        </div>
                                        <p class="university-ranking">{{ `Local #${elite.local_position} | Global #${elite.global_position} | Score ${elite.score}` }}</p>
                                        <div>
                                            <p class="university-country" style="float: left;">{{ elite.country }}</p>
                                            <p class="university-status" style="float: right">{{ elite.status }}</p>
                                        </div>
                                    </div>
                                </div>
                            </ion-card-content>
                        </ion-card>
                    </div>
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
import {useRouter} from "vue-router";
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
    const {loadEliteData} = store;
    const dataLoaded = computed(() => store.elite_dataLoaded);
    const elite_datas = computed(() => store.elite_datas);
    // console.log(dataLoaded.value)
    const {showLoading, hideLoading} = useLoadingStore();
    const router = useRouter();
    const doLogin = async () => {
      showLoading();
    };

    const tabTitles = ['Elite Institues', 'World Top Institutes', ' Top Region Institutes', 'Top Country Institutes', 'Verified Institutes'];
    const imgUrl = '/assets/images/header.svg';
    const nextImgUrl = 'assets/images/Chevron.svg';
    // const maxNameLength = 32;

    onBeforeMount(() => {
      if (!dataLoaded.value) {
        showLoading();
        Promise.all([loadEliteData()]).then(() => {
            console.log(elite_datas.value);
            console.log(dataLoaded.value);
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

    return {
        doLogin,
    //   comingSoon,
        imgUrl,
        nextImgUrl,

        tabTitles,
        dataLoaded,
        elite_datas,

        short_name,
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

ion-toolbar {
    position: absolute;
    background: #1c345a;
    text-align: center;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  }
  ion-header {
  --opacity-scale: 0 !important;
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
    width: 346px;
    height: 90px;

    border-radius: 6px;

    filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));

    background: #ffffff
}
ion-card-content {
    padding-top:5px;
}
.more-tab {
    width: 179px;
    height: 36px;
    border-radius: 15px;
    margin: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
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
    width: 50px;
    height: 50.6px;
    margin-top: 5%;
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
.next-img {
    width: 7.7px;
}
</style>