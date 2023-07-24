<template>
  <ion-page>
    <header-section />
    <ion-content :fullscreen="true" class="no-padding">
      <ion-grid  class="no-padding" style="display:flex; flex-flow: column; justify-content: center;">
          <ion-row class="ion-padding-top" style="margin-top: 8%; margin-bottom: 18px;">
              <ion-col class="no-padding">
                  <ion-card class="intro-card">
                      <ion-card-content class="flex-col" style="justify-content: center; padding: 9px 18px 9px 18px;">
                          <div class="flex-row" style="justify-content: center">
                              <ion-img :src='userImgUrl' class="user-Img"/>
                              <div class="flex-col" style=" margin-left: 18px; width: 100%;">
                                  <div>
                                      <ion-text class="intro-name" style="float: left;">{{$t(`Majdi Alhaj`)}}</ion-text>
                                      <ion-icon :src="detail_flag ? chevronUpSharp : chevronForward" style="float: right;" size="large" @click="changeDetail"></ion-icon>
                                  </div>
                                  <ion-text class="intro-pos">{{$t(`Dubai, United Arab Emirates`)}}</ion-text>
                              </div>
                          </div>
                          <ion-text v-if="detail_flag" class="intro-act" style="text-align: left;">{{$t(`Looking for Undergraduate Course in Computer Sciences and 3 other Courses, at Havard and 2 other universities by Febryary 2024 in the United States and 4 other countries`)}}</ion-text>
                          <ion-button v-if="detail_flag" @click="toEditProfile" >{{$t(`View or Edit The Profile`)}}</ion-button>
                      </ion-card-content>
                  </ion-card>
              </ion-col>
          </ion-row>
          <ion-row class="flex-col" >
              <ion-col size="12">
                  <ion-card class="three_sum">
                      <ion-card-content>
                          <ion-list>
                              <ion-item lines="full" @click='toHigherSecondaryModal("Higher Secondary")'>
                                  <ion-icon :src="qrCodeOutline"></ion-icon>
                                  <ion-label class="card-label" style="float: left;">{{ $t("Higher Secondary") }}</ion-label>
                                  <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                              </ion-item>
                              <ion-item v-if="detail_flag" lines="full"  @click='toHigherSecondaryModal("Undergraduate")'>
                                  <ion-icon :src="scanOutline"></ion-icon>
                                  <ion-label class="card-label" style="float: left;">{{ $t("Undergraduate") }}</ion-label>
                                  <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                              </ion-item>
                              <ion-item lines="none"  @click='toHigherSecondaryModal("Postgraduate")'>
                                  <ion-icon src="assets/images/Icon-material-event.svg"></ion-icon>
                                  <ion-label class="card-label" style="float: left;">{{ $t("Postgraduate") }}</ion-label>
                                  <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                              </ion-item>
                          </ion-list>
                      </ion-card-content>
                  </ion-card>
              </ion-col>
              <ion-col size="12">
                  <ion-card class="three_sum">
                      <ion-card-content>
                          <ion-list>
                              <ion-item lines="full">
                                  <ion-icon :src="searchOutline"></ion-icon>
                                  <ion-label class="card-label" style="float: left;">{{ $t("Explore based on my profile") }}</ion-label>
                                  <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                              </ion-item>
                              <ion-item lines="full" >
                                  <ion-icon :src="playSkipForward"></ion-icon>
                                  <ion-label class="card-label" style="float: left;">{{ $t("Step by Step Profile") }}</ion-label>
                                  <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                              </ion-item>
                              <ion-item lines="none" @click="toMajorMatch">
                                  <ion-icon :src="discOutline"></ion-icon>
                                  <ion-label class="card-label" style="float: left;">{{ $t("College Major Match Quiz") }}</ion-label>
                                  <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                              </ion-item>
                          </ion-list>
                      </ion-card-content>
                  </ion-card>
              </ion-col>
              <ion-col size="12">
                  <ion-card class="three_sum">
                      <ion-card-content>
                          <ion-list>
                              <ion-item lines="full" @click="toCounselor">
                                  <ion-icon :src="today"></ion-icon>
                                  <ion-label class="card-label" style="float: left;">{{ $t("Remote Counselling") }}</ion-label>
                                  <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                              </ion-item>
                              <ion-item lines="full" @click="toDocument">
                                  <ion-icon :src="document"></ion-icon>
                                  <ion-label class="card-label" style="float: left;">{{ $t("Documents") }}</ion-label>
                                  <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                              </ion-item>
                              <ion-item lines="none">
                                  <ion-icon src="assets/images/bookmark.svg"></ion-icon>
                                  <ion-label class="card-label" style="float: left;">{{ $t("Bookmark") }}</ion-label>
                                  <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                              </ion-item>
                          </ion-list>
                      </ion-card-content>
                  </ion-card>
              </ion-col>
              <ion-col size="12">
                  <ion-card class="three_sum">
                      <ion-card-content>
                          <ion-list>
                              <ion-item lines="full">
                                  <ion-icon src="assets/images/feedback.svg"></ion-icon>
                                  <ion-label class="card-label" style="float: left;">{{ $t("Give us a feedback") }}</ion-label>
                                  <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                              </ion-item>
                              <ion-item lines="full" >
                                  <ion-icon src="assets/images/university.svg"></ion-icon>
                                  <ion-label class="card-label" style="float: left;">{{ $t("Rate an institution") }}</ion-label>
                                  <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                              </ion-item>
                              <ion-item lines="none">
                                  <ion-icon src="assets/images/rate-agent.svg"></ion-icon>
                                  <ion-label class="card-label" style="float: left;">{{ $t("Rate an Agent") }}</ion-label>
                                  <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                              </ion-item>
                          </ion-list>
                      </ion-card-content>
                  </ion-card>
              </ion-col>
              <ion-col size="12">
                  <ion-card class="three_sum">
                      <ion-card-content>
                          <ion-list>
                              <ion-item lines="full" @click="toChangeCurrency('Language')">
                                  <ion-icon src="assets/images/change-language.svg"></ion-icon>
                                  <ion-label class="card-label" style="float: left;">{{ $t("Change Language") }}</ion-label>
                                  <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                              </ion-item>
                              <ion-item lines="full" @click='toChangeCurrency("Currency")'>
                                  <ion-icon src="assets/images/material-moneti.svg"></ion-icon>
                                  <ion-label class="card-label" style="float: left;">{{ $t("Change Currency") }}</ion-label>
                                  <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                              </ion-item>
                              <ion-item v-if="!detail_flag" lines="full" @click='toHigherSecondaryModal("Settings")'>
                                  <ion-icon :src="notifications"></ion-icon>
                                  <ion-label class="card-label" style="float: left;">{{ $t("Notifications") }}</ion-label>
                                  <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                              </ion-item>
                              <ion-item lines="none" @click='toSetting'>
                                  <ion-icon :src="settingsSharp"></ion-icon>
                                  <ion-label class="card-label" style="float: left;">{{ $t("Settings") }}</ion-label>
                                  <ion-img src="assets/images/Chevron.svg" style="float: right;"></ion-img>
                              </ion-item>
                          </ion-list>
                      </ion-card-content>
                  </ion-card>
              </ion-col>
          </ion-row>
          <ion-row class="flex-col">
              <ion-col size="12">
                  <ion-text class="txt-15">{{ $t('Legal') }}</ion-text>
              </ion-col>
              <ion-col size="12" class="flex-row">
                  <ion-item lines="none" class="btn-get-start button-2">
                      <ion-img src='assets/images/icons/bar.svg'/>
                      <ion-text class="ion-padding-start">{{ $t('Terms of Service') }}</ion-text>
                      <ion-icon :icon="chevronForwardOutline" class="p-icon" />
                  </ion-item>
              </ion-col>
              <ion-col size="12" class="flex-row">
                  <ion-item lines="none" class="btn-get-start button-2">
                      <ion-img src='assets/images/icons/bar.svg'/>
                      <ion-text class="ion-padding-start">{{ $t('Privacy Policy') }}</ion-text>
                      <ion-icon :icon="chevronForwardOutline" class="p-icon" />
                  </ion-item>
              </ion-col>
              <ion-col size="12" @click="toLogout">
                  <ion-text class="txt-15">{{ $t('Log Out') }}</ion-text>
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
        IonButton,
        IonIcon,
        modalController
    } from "@ionic/vue";
    import { defineComponent, ref } from "vue";
    import {useRouter} from "vue-router";
    import HeaderSection from "@/components/HeaderSection.vue";
    import FooterSection from "@/components/explore/FooterSection.vue";
    import { qrCodeOutline, scanOutline, searchOutline, document, playSkipForward, discOutline, today, settingsSharp, chevronUpSharp, notifications, chevronForward } from "ionicons/icons"

    import ProfileIntroModal from "@/components/modal/profilemodal/ProfileIntroModal.vue";
    import ChangeCurrencyModal from "@/components/modal/profilemodal/ChangeCurrencyModal.vue";
    import SettingModal from "@/components/modal/profilemodal/SettingModal.vue";
    import SignupModal from "@/components/modal/SignupModal.vue";
    import LogOutModal from "@/components/modal/profilemodal/LogOutModal.vue";
    import HigherSecondaryModal from "@/components/modal/profilemodal/HigherSecondaryModal.vue";

  export default defineComponent({
    name: "ProfileMain",
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
      IonButton,
      IonIcon,
    },
    setup() {
        const detail_flag = ref(true);
        const router = useRouter();
        const userImgUrl = '/assets/images/usr-radius.svg';
        const qrImgUrl = '/assets/images/qrcodesample.svg';
        const toHigherSecondaryModal = async(title) => {
                const modal = await modalController.create({
                    component: HigherSecondaryModal,
                    componentProps: {
                        title: title
                    },
                    initialBreakpoint: 0.9,
                });
                modal.present();
            }
        const toDocument = () => {
            router.push("/profile/mydocument");
        }
        const toCounselor = () => {
            router.push("/counselors");
        }
        const toMajorMatch = () => {
            router.push("/profile/majormatch");
        }
        const toProfileIntro = async () => {
            const modal = await modalController.create({
                component: ProfileIntroModal,
                initialBreakpoint: 0.9,
            });
            modal.present();
        }
        const toChangeCurrency = async (title) => {
            const modal = await modalController.create({
                component: ChangeCurrencyModal,
                componentProps: {
                    title: title
                },
                initialBreakpoint: 0.6,
            });
            modal.present();
        }
        const toSetting = async () => {
            const modal = await modalController.create({
                component: SettingModal,
                initialBreakpoint: 0.4,
            });
            modal.present();            
        }
        const toEditProfile = async () => {
            const modal = await modalController.create({
                component: SignupModal,
                componentProps: {
                    title: "edit"
                },
                initialBreakpoint: 0.9,
            });
            modal.present();            
        }
        const changeDetail = () => {
            detail_flag.value = !detail_flag.value;
        }
        const toLogout = async () => {
            const modal = await modalController.create({
                component: LogOutModal,
                initialBreakpoint: 0.6,
            });
            modal.present();    
        }
        return {
            userImgUrl,
            qrImgUrl,
            qrCodeOutline,
            scanOutline,
            searchOutline,
            document,
            playSkipForward,
            discOutline,
            today,
            settingsSharp,
            chevronUpSharp,
            notifications,
            chevronForward,

            detail_flag,
            changeDetail,
            toProfileIntro,
            toChangeCurrency,
            toSetting,
            toEditProfile,
            toDocument,
            toLogout,
            toMajorMatch,
            toCounselor,
            toHigherSecondaryModal,
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
      margin-bottom: 18px;
  }
  ion-card-content {
    justify-content: center;
    text-align: left;
    padding: 0%;
  }
  ion-button {
      --border-radius: 15px;
      width: 70%;
      margin-left:auto;
      margin-right:auto;
  }
  ion-icon {
      margin-right: 9px;
      color: black;
  }
  ion-item {
      width: 100%;
  }
  .intro-card {
    width: 100%;
    height:auto;
    border-color: #bcbcbc;
    border-width: 1px;
    border-style: solid;
    border-radius: 25px;
    filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
    background: #ffffff;
    margin:0;
    margin-top: 25px;
    padding: 0;
  }
  .no-padding {
    padding: 0 9px 0 9px;
  }
 .user-Img {
    width: 43.1px;
    height: 43.1px;
    margin-top: 15px;
    margin-left: 9px;
 }
 .intro-name {
    font-family: "Calibri";
    font-size: 26px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    color: #203456;
 }
 .intro-pos {
    font-family: "Calibri";
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #1c345a;
 }
 .intro-act {
    font-family: "Calibri";
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: center;
    color: #606060;
 } 
 .three_sum {
      width: 100%;
      height: auto;
      border-color: #bcbcbc;
      border-width: 1px;
      border-style: solid;
      border-radius: 25px;
      filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
      background: #ffffff;
      margin:0;
      margin-bottom: 18px;
 }
</style>