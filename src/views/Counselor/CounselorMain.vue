<template>
    <ion-page>
      <header-section />
      <ion-content :fullscreen="true" class="ion-padding">
        <ion-grid  class="no-padding" style="display:flex; flex-flow: column; justify-content: center;">
          <ion-row class="ion-padding-top flex-col" style="margin-top: 8%;">
            <ion-col class="no-padding" style="text-align: center;" size="12">
              <ion-text class="title-big">{{$t("Available Counselors")}}</ion-text>
            </ion-col>
            <ion-col class="no-padding" style="text-align: center;"  size="12">
                <ion-text class="title-small">{{ $t("List of Available Counselors that match your needs") }}</ion-text>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12">
                <ion-card class="counselor-card">
                    <ion-card-content class="flex-col" style=" margin-top: 4px;">
                        <div class="flex-row">
                            <ion-img :src="nextImgUrl" style="width: 80px; margin-right:9px"/>
                            <div class="flex-col" style="width: 100%;">
                                <div>
                                    <ion-text style="float: left;">
                                        <p class="counselor-title">{{ $t(`David Gorge`) }}</p>
                                    </ion-text>
                                    <ion-icon :src='chevronDownOutline' size="large" style="float: right;"  @click="changeDetailFlag"/>
                                </div>
                                <div>
                                    <div class="flex-col" style="float:left">
                                        <ion-text>
                                            <p class="counselor-status">{{ $t(`From University of Michigan`) }}</p>
                                        </ion-text>
                                        <ion-text>
                                            <p class="counselor-status">{{ $t(`Located in Dubau, UAE`) }}</p>
                                        </ion-text>
                                    </div>
                                    <div v-if="!detail_flag" class="flex-col" style="float:right" @click="toChatPage">
                                        <ion-icon :icon="logoWechat" size="large"/>
                                        <ion-label>{{ $t("Chat") }}</ion-label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="detail_flag&&!isZoom" class="flex-col">
                            <ion-text class="detail-text">{{$t("Right here is where you'll discover a treasure trove of current and upcoming events. It's also the place where you'll come face to face with the perfect study options that match your aspirations.")}}</ion-text>
                            <div>
                                <div class="flex-col" style="float:left; margin-left: 10px;" @click="toChatPage">
                                    <ion-icon :icon="logoWechat" size="large"/>
                                    <ion-label>{{ $t("Chat") }}</ion-label>
                                </div>
                                <ion-button expand="block" class="blue-button" style="float: right;" @click="toBookSession(0)">
                                    <ion-text>{{ $t(`Book a Session`) }}</ion-text>
                                </ion-button>
                            </div>
                        </div>
                        <div v-if="detail_flag&&isZoom" class="flex-col">
                            <div class="flex-row">
                                <div class="flex-col" style="float:left; margin-left: 10px;">
                                    <ion-icon :icon="videocam" size="large" class="margin-auto"/>
                                    <ion-label>{{ $t("ZOOM") }}</ion-label>
                                </div>
                                <div class="flex-col" style="float:left; margin-left: 10px;">
                                    <ion-text class="counselor-title" style="text-align: center;">{{$t("Remote Counselling Session")}}</ion-text>
                                    <ion-text class="congr-text" style="text-align: left;">{{$t("June 20, 2023 12:30 PM")}}</ion-text>
                                </div>
                            </div>
                            <div>
                                <div class="flex-col" style="float:left; margin-left: 10px;" @click="toChatPage">
                                    <ion-icon :icon="logoWechat" size="large"/>
                                    <ion-label>{{ $t("Chat") }}</ion-label>
                                </div>
                                <ion-button expand="block" class="blue-button" style="float: right;" @click="toBookSession(0)">
                                    <ion-icon :src="videocam" style="color: white; margin-right: 9px;" size="large"></ion-icon>
                                    <ion-text class="join-meet">{{ $t(`Join Meeting`) }}</ion-text>
                                </ion-button>
                            </div>
                            <ion-text class="detail-text" style="text-align: center;">{{$t("Make sure to have Zoom installed in your device to join the meeting")}}</ion-text>
                        </div>
                    </ion-card-content>
                </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
    </ion-content>
      
        <ion-modal :is-open="isOpen" ref="modal" :keep-contents-mounted="true">
            <div class="flex-col">
                <ion-text class="congr-title" style="text-align: center;">{{ $t(`Congratulations`) }}</ion-text>
                <ion-text class="congr-text" style="text-align: center;">{{ $t(`your meeting has been created Successfully`) }}</ion-text>
                <ion-button v-if="isOpen" expand="block" class="blue-button" style="margin-left: auto; margin-right: auto;" @click="changeOpen">
                    <ion-text>{{ $t(`OK!`) }}</ion-text>
                </ion-button>
            </div>            
        </ion-modal>
    <footer-section back="Back" forward="My Sessions" @save="toCheckSession"/>
    </ion-page>
  </template>
    
  <script>
    import {
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonCard,
        IonCardContent,
        IonText,
        IonIcon,
        IonLabel,
        IonButton,
        IonImg,
        IonModal,
        modalController
    } from "@ionic/vue";
    import { defineComponent, onBeforeMount, computed, ref } from "vue";
    import {useRouter} from "vue-router";
    import {useCounselorData} from "@/store";
    import HeaderSection from "@/components/HeaderSection.vue";
    import FooterSection from "@/components/modal/profilemodal/FooterSection.vue";
    import { chevronDownOutline, logoWechat, videocam } from 'ionicons/icons';
    import {useLoadingStore} from "@/store/loading";
    import BookSessionModal from "@/components/modal/counselor/BookSessionModal.vue";
    import CheckSessionModal from "@/components/modal/counselor/CheckSessionModal.vue";
  
    export default defineComponent({
        name: "ProfileLoginPage",
        components: {
            HeaderSection,
            FooterSection,
            IonPage,
            IonContent,
            IonGrid,
            IonRow,
            IonCol,
            IonCard,
            IonCardContent,
            IonText,
            IonIcon,
            IonLabel,
            IonButton,
            IonModal,
            IonImg,
      },
      setup() {    
        const store = useCounselorData();
        const {showLoading, hideLoading} = useLoadingStore();
        const router = useRouter();
        const {loadCounselors, changeFlag} = store;
        const dataLoaded = computed(() => store.dataLoaded);    
        const counselors = computed(() => store.counselors);   
        const detail_flag = ref(false);
        const isOpen = ref(false);
        const isZoom = ref(false);

        const nextImgUrl = 'assets/images/indv.png';
        const changeDetailFlag = () => {
            detail_flag.value = !detail_flag.value;
        }
        const toBookSession = async(id) => {
            const modal = await modalController.create({
                component: BookSessionModal,
                componentProps: {
                    id: id
                },
                initialBreakpoint: 0.9,
            });
            await modal.present();
            const res = await modal.onDidDismiss()
            if(res.data.intake)
            {
                isOpen.value = true;
                isZoom.value = true;
            }
        }
        const toCheckSession = async() => {
            const modal = await modalController.create({
                component: CheckSessionModal,
                initialBreakpoint: 0.9,
            });
            modal.present();
        }
        const toChatPage = () => {
            router.push('/counselors/chat')
        }
        const changeOpen = () => {
            isOpen.value = !isOpen.value;
        }
        onBeforeMount(() => {
            if (!dataLoaded.value) {
                showLoading();
                Promise.all([loadCounselors()]).then(() => {
                    hideLoading();
                    console.log(counselors.value);
                    changeFlag();
                })
            }
        });
        return {
          nextImgUrl, 
          chevronDownOutline,
          logoWechat,
          counselors,
          isOpen,
          detail_flag,
          isZoom,
          videocam,
          changeDetailFlag,
          toBookSession,
          changeOpen,
          toChatPage,
          toCheckSession
        };
      },
    });
  </script>
  <style scoped>
    ion-content {
      --background:#F5F5F5;
    }
    ion-item::part(native) .item-inner {
      background-color: red;
      border: none !important;;
    }
    footer-section {
      background: #ffffff;
    }
    ion-card {
        margin: 0px;
    }
    ion-card-content {
      padding: 0;
      justify-content: center;
    }
    ion-icon {
        color: black
    }
    ion-modal {
        --width: 290px;
        --height: auto;
        --border-radius: 8px;
    }

    p {
        margin: 0px;
    }
    .margin-auto {
        margin-left: auto;
        margin-right: auto;
    }
    .no-padding {
        padding:0px
    }
    .title-big {
        font-size: 30px;
        font-weight: bold;
        font-style: normal;
        text-align: left;
        color: #1c345a;
    }
    .title-small {
        font-size: 16px;
        font-weight: 300;
        font-style: normal;
        text-align: left;
        color: #606060;
    }
    .counselor-card {
        width: 100%;
        height: auto;
        border-radius: 6px;
        filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
        background: #ffffff;
        padding-left: 9px;
        padding-right: 9px;
        margin-top: 0px;
    }
    .counselor-title {
        font-size: 20px;
        font-weight: bold;
        font-style: normal;
        text-align: left;
        color: #203456;
    }
    .counselor-status {
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        text-align: left;
        color: #1c345a;
    }
    .blue-button {
        --border-radius: 15px;
        --background: linear-gradient(-72deg, #436fb2 0.00%, #1c345a 100.00%);
        width: 80%;
        height: 50px;
    }
    .detail-text {
        font-size: 16px;
        font-weight: 300;
        font-style: normal;
        text-align: left;
        color: #606060;
    }
    .congr-title {
        font-size: 26px;
        font-weight: bold;
        font-style: normal;
        text-align: center;
        color: #1c345a;
    }
    .congr-text {
        font-size: 20px;
        font-weight: normal;
        font-style: normal;
        text-align: center;
        color: #606060;
    }
    .join-meet {
        font-size: 20px;
        font-weight: normal;
        font-style: normal;
        text-align: center;
        color: #ffffff; 
    }
</style>