<template>
    <ion-page>
      <header-section />
      <ion-content :fullscreen="true" class="no-padding">
        <ion-grid  class="no-padding" style="display:flex; flex-flow: column; justify-content: center;">
          <ion-row class="ion-padding-top" style="margin-top: 8%; margin-left: 18px;">
            <ion-col class="no-padding" style="text-align: center;">
              <ion-text class="title-big">{{$t("Applications")}}</ion-text>
            </ion-col>
          </ion-row>
          <ion-row v-if="applications">
            <ion-col size="12" v-for="item in applications" :key="item.id" @click="toProgramDetail(item.id)">
                <ion-card class="program-card">
                    <ion-card-content class="flex-col" style=" margin-top: 4px;">
                        <div class="flex-row">
                            <ion-text>
                                <p class="program-title">{{ $t(`${item.program_title}`) }}</p>
                            </ion-text>
                            <ion-img :src='nextImgUrl' class="rightImg"/>
                        </div>
                        <ion-text>
                            <p class="program-count">{{ $t(`${item.university}`) }}</p>
                        </ion-text>
                        <div class="flex-row">
                          <ion-text>
                            <p class="program-status">{{ $t(`Status: ${item.status}`) }}</p>
                          </ion-text>
                          <ion-text v-if="item.sub-status">
                            <p class="program-status" style="color:#FFB300; margin-left: 9px;">{{ $t(`${item.sub-status}`) }}</p>
                          </ion-text>
                        </div>
                    </ion-card-content>
                </ion-card>
            </ion-col>
          </ion-row>
          <ion-row v-else>
            <ion-col size="12">
              <ion-text>
                  <p class="program-title ion-text-center">{{ $t(`You haven't applied for any program yet`) }}</p>
              </ion-text>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
      <footer-section />
    </ion-page>
  </template>
    
  <script>
    import {useAuthStore} from "@/store";
    import {
      IonPage,
      IonContent,
      IonGrid,
      IonRow,
      IonCol,
      IonCard,
      IonCardContent,
      IonText,
      modalController
    } from "@ionic/vue";
    import { defineComponent, computed, ref, onBeforeMount } from "vue";
    import HeaderSection from "@/components/HeaderSection.vue";
    import FooterSection from "@/components/explore/FooterSection.vue";
    import {useApplicationStore} from "@/store";
    import {useLoadingStore} from "@/store/loading";
    import ProgramDetailModal from "@/components/modal/ProgramDetailModal.vue";
  
  
    export default defineComponent({
      name: "ProfileMainPage",
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
      },
      setup() {
        const store = useApplicationStore();
        const {showLoading, hideLoading} = useLoadingStore();
        const { loadApplications, changeFlag } = store;
        const applications = computed(()=>store.applications);
        const dataLoaded = computed(()=>store.dataLoaded);
        const nextImgUrl = 'assets/images/Chevron.svg';
        const toProgramDetail = async(id) => {
            const modal = await modalController.create({
                component: ProgramDetailModal,
                componentProps: {
                    id:id
                },
                initialBreakpoint: 0.9,
            });
            modal.present();
        }
        onBeforeMount(() => {
            if (!dataLoaded.value) {
                showLoading();
                Promise.all([loadApplications()]).then(() => {
                    hideLoading();
                    changeFlag();
                })
            }
        });
  
        return {
          nextImgUrl, 
          applications,
          toProgramDetail
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
    .title-big {
        font-size: 30px;
        font-weight: bold;
        font-style: normal;
        text-align: left;
        color: #1c345a;
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
        font-size: 16px;
        font-weight: bold;
        font-style: normal;
        color: #203456;
    }
    .program-status {
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        text-align: left;
        color: #00aeef;
    }
  </style>