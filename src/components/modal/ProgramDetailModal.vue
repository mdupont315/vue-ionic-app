<template>
    <ion-page style="height:90%">
        <ion-content :fullscreen="false" class="ion-padding-top">
            <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
                <ion-row class="ion-padding-top">
                    <ion-col size="12" class="ion-text-center" style=" width: 100%;">
                        <ion-text class="big-title" style="margin-bottom: 0;">
                            {{ $t(`${program_detail.title}`) }}
                        </ion-text>
                    </ion-col>
                </ion-row>
                <hr v-if="step == 0" class="under_line">
                <ion-row style="justify-content: center;">
                    <ion-img :src='program_detail?.university?.logo_url' class="leftImg" style="width: 15%;"/>
                    <ion-text class="uni-name">
                        {{ $t(`${program_detail?.university?.university_name}`) }}
                    </ion-text>
                </ion-row>
                <ion-row v-if="step == 0" class="margin-y-9">
                    <ion-card class="detail_card">
                        <ion-card-content style="padding: 0;">
                        <ion-list>
                            <ion-item lines="full" class="flex-row" style="padding-top: 5px; width: 100vw;">
                                <ion-img :src='moneyUrl' class="list-item-img"/>
                                <div class="flex-col" style=" margin-bottom: 5px; width: 100%;">
                                    <ion-text class="list-item-title">
                                        {{ $t(`${program_detail?.currency?.toUpperCase()} ${program_detail.fee} ${program_detail.fee_term}`)}}
                                    </ion-text>
                                    <ion-text class="list-item-content">
                                        {{ $t(`International student tuition fee`)}}
                                    </ion-text>
                                </div>
                            </ion-item>
                            <ion-item lines="full" class="flex-row" style="padding-top: 5px; width: 100vw;">
                                <ion-img :src='calenderUrl' class="list-item-img"/>
                                <div class="flex-col" style=" margin-bottom: 5px;">
                                    <ion-text class="list-item-title">
                                        {{ $t(`August 2023`)}}
                                    </ion-text>
                                    <ion-text class="list-item-content">
                                        {{ $t(`Start date`)}}
                                    </ion-text>
                                </div>
                            </ion-item>

                            <ion-item lines="full" class="flex-row" style="padding-top: 5px; width: 100vw;" >
                                <ion-img :src='hourglaUrl' class="list-item-img"/>
                                <div class="flex-col" style=" margin-bottom: 5px;">
                                    <ion-text class="list-item-title">
                                        {{ $t(`Jul 2023`)}}
                                    </ion-text>
                                    <ion-text class="list-item-content">
                                        {{ $t(`Application deadline`)}}
                                    </ion-text>
                                </div>
                            </ion-item>

                            <ion-item lines="none"  class="flex-row" style="padding-top: 5px; padding-bottom: 5px;">
                                <ion-img :src='uniImgUrl' class="list-item-img"/>
                                <div class="flex-col" style="">
                                    <ion-text class="list-item-title">
                                        {{ $t(`${program_detail.duration}`)}}
                                    </ion-text>
                                    <ion-text class="list-item-content">
                                        {{ $t(`Duration`)}}
                                    </ion-text>
                                </div>
                            </ion-item>
                        </ion-list>
                        </ion-card-content>
                    </ion-card>
                </ion-row>
                <ion-row  v-if="step == 0">
                    <ion-col size="12" style="display: flex; flex-flow: row;margin-top: 5px;">
                        <ion-img :src='calenderUrl' class="leftImg"/>
                        <ion-text class="big-title txt-26 ion-text-left" style="margin:0px">
                            {{ $t(`Upcoming Intakes`) }}
                        </ion-text>
                    </ion-col>
                </ion-row>
                <ion-row  v-if="step == 0">
                    <ion-col size="12" style="margin-left: 10px;">
                    <select-item v-model="intake_id" :items="program_detail.upcoming_intakes"
                        text-property="title" value-property="id"/>
                    </ion-col>
                </ion-row>
                <ion-row class="flex-row"  v-if="step > 0">
                    <ion-col size="12" style="text-align: center;">
                        <ion-text>{{ $t(`Undergraduate | 4 years | January 2024 intake`)}}</ion-text> 
                    </ion-col>
                </ion-row>
                <ion-row v-if="step > 0" style="margin-top: 18px;">
                    <section id="cd-timeline" class="cd-container">
                        <div class="cd-timeline-block">
                            <div class="cd-timeline-picture" style="background-color: #007A00; border-color: #007A00;">
                                <ion-icon :src="checkmark" size="large" style="color: white;"/>
                            </div>
                            <!-- cd-timeline-img -->
                            <div class="cd-timeline-content dark flex-col" style="margin-bottom: 18px;">
                                <div>
                                    <ion-text class="title-step" style="float: left;">{{$t("Inisiated")}}</ion-text>
                                    <ion-text class="title-step" style="color: #606060; float: right;">{{$t("11 Jun 2023")}}</ion-text>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="cd-timeline1" class="cd-container">
                        <div class="cd-timeline-block">
                            <div class="cd-timeline-picture dark" :style="{background: firstStepC.color, border: firstStepC.color}">
                                <ion-icon :src="firstStepC.img" size="large" :style="{color:firstStepC.iconColor}"/>
                            </div>
                            <!-- cd-timeline-img -->
                            <div class="cd-timeline-content dark flex-col" style="margin-bottom: 18px;">
                                <div>
                                    <ion-text class="title-step" style="float: left;">{{$t("Submit")}}</ion-text>
                                    <ion-text class="title-step" style="color: #606060; float: right;">{{$t("11 Jun 2023")}}</ion-text>
                                </div>
                                <ion-text v-if="step<3" class="descript-text" style="margin-top: 9px;">{{$t("Please upload the documents here to begin your application. The university requires these to process your application")}}</ion-text>
                                <ion-card v-if="step<3" style="margin:18px 0 0 0; filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
" @click="toHigherModal">
                                    <ion-card-content>
                                        <ion-icon :src="cloudUpload" size="large" style="float: left; color: black; margin-right: 9px;"></ion-icon>
                                        <ion-text class="cardu-title" style="float: center;">{{ $t("Higher Secondary") }}</ion-text>
                                        <ion-text class="upload-title" style="float: right;">{{ $t("Upload") }}</ion-text>
                                    </ion-card-content>
                                </ion-card>
                            </div>
                        </div>
                    </section>
                    
                    <section id="cd-timeline2" class="cd-container">
                        <div class="cd-timeline-block">
                            <div class="cd-timeline-picture dark" :style="{background: secStepC.color, border: secStepC.color}">
                                <ion-icon :src="secStepC.img" size="large" :style="{color:secStepC.iconColor}"/>
                            </div>
                            <!-- cd-timeline-img -->
                            <div class="cd-timeline-content dark flex-col" style="margin-bottom: 18px;">
                                <div>
                                    <ion-text class="title-step" style="float: left;">{{$t("Apply")}}</ion-text>
                                    <ion-text v-if="step>2" class="title-step" style="color: #606060; float: right;">{{$t("11 Jun 2023")}}</ion-text>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="cd-timeline3" class="cd-container">
                        <div class="cd-timeline-block">
                            <div class="cd-timeline-picture dark" :style="{background: thrStepC.color, border: thrStepC.color}">
                                <ion-icon :src="thrStepC.img" size="large" :style="{color:thrStepC.iconColor}"/>
                            </div>
                            <!-- cd-timeline-img -->
                            <div class="cd-timeline-content dark flex-col" style="margin-bottom: 18px;">
                                <div>
                                    <ion-text class="title-step" style="float: left;">{{$t("Offer")}}</ion-text>
                                    <ion-text v-if="step>2" class="title-step" style="color: #606060; float: right;">{{$t("11 Jun 2023")}}</ion-text>
                                </div>
                                <ion-text v-if="step==3" class="descript-text" style="margin-top: 9px;">{{$t("Congrats! You've got an offer in your hands. Take a peek at the attachment, and when you're happy with what you see, hit that satisfying accept button. Check the offer")}}</ion-text>
                            </div>
                        </div>
                    </section>
                    <section id="cd-timeline4" class="cd-container">
                        <div class="cd-timeline-block">
                            <div class="cd-timeline-picture dark" :style="{background: fourStepC.color, border: fourStepC.color}">
                                <ion-icon :src="fourStepC.img" size="large" :style="{color:fourStepC.iconColor}"/>
                            </div>
                            <!-- cd-timeline-img -->
                            <div class="cd-timeline-content dark flex-col" style="margin-bottom: 18px;">
                                <div>
                                    <ion-text class="title-step" style="float: left;">{{$t("Deposit")}}</ion-text>
                                    <ion-text v-if="step>3" class="title-step" style="color: #606060; float: right;">{{$t("11 Jun 2023")}}</ion-text>
                                </div>
                                <ion-text v-if="step==4" class="descript-text" style="margin-top: 9px;">{{$t("Once the agent or the university receives the deposit for the Application fees, this step will be automatically marked as complete, but you can upload a proof of payment for us to follow up.")}}</ion-text>
                            </div>
                        </div>
                    </section>
                    <section id="cd-timeline5" class="cd-container">
                        <div class="cd-timeline-block">
                            <div class="cd-timeline-picture dark" :style="{background: fiveStepC.color, border: fiveStepC.iconColor}">
                                <ion-icon :src="fiveStepC.img" size="large" :style="{color:fiveStepC.iconColor}"/>
                            </div>
                            <!-- cd-timeline-img -->
                            <div class="cd-timeline-content dark flex-col" style="margin-bottom: 18px;">
                                <div>
                                    <ion-text class="title-step" style="float: left;">{{$t("Visa")}}</ion-text>
                                    <ion-text v-if="step>4" class="title-step" style="color: #606060; float: right;">{{$t("11 Jun 2023")}}</ion-text>
                                </div>
                                <ion-text v-if="step==5" class="descript-text" style="margin-top: 9px;">{{$t("Once your study visa is prepared by the agent, we'll shoot you a notification to download it. If you happen to have the visa already in your possession, feel free to upload it here and we can proceed with the enrollment process.")}}</ion-text>
                            </div>
                        </div>
                    </section>
                    <section class="cd-container">
                        <div class="cd-timeline-block">
                            <div class="cd-timeline-picture dark" :style="{background: sixStepC.color, border: sixStepC.color}">
                                <ion-icon :src="sixStepC.img" size="large" :style="{color:sixStepC.iconColor}"/>
                            </div>
                            <!-- cd-timeline-img -->
                            <div class="cd-timeline-content dark flex-col" style="margin-bottom: 18px;">
                                <div>
                                    <ion-text class="title-step" style="float: left;">{{$t("Enrole")}}</ion-text>
                                    <ion-text v-if="step>5" class="title-step" style="color: #606060; float: right;">{{$t("11 Jun 2023")}}</ion-text>
                                </div>
                                <ion-text v-if="step==6" class="descript-text" style="margin-top: 9px;">{{$t("Hang tight, partner! Your application is currently in the works, and we're hustling to get it processed. Don't worry, we'll keep you in the loop with updates real soon. Sit tight and stay tuned!")}}</ion-text>
                                <ion-text v-if="step==7" class="descript-text" style="margin-top: 9px;">{{$t("Hot diggity dog! You've made it, my friend! Congratulations, you are now officially enrolled. Go ahead and check out the attachment below to revel in the confirmation of your enrollment. Let the celebration begin!")}}</ion-text>
                            </div>
                        </div>
                    </section>
                </ion-row>
            </ion-grid>
        </ion-content>
        <footer-section v-if="step==1 || step==2" title="Upload" @back="backStep" @save="nextStep"/>
        <footer-section v-if="step==3" title="Accept Offer" @back="backStep" @save="nextStep"/>
        <footer-section v-if="step==4" title="Proof of Payment" @back="backStep" @save="nextStep"/>
        <footer-section v-if="step==5" title="Upload Study Visa" @back="backStep" @save="nextStep"/>
        <footer-section v-if="step>5" title="Enrollment Confirmation" @back="backStep" @save="nextStep"/>
        <country-detail-footer-section v-if="step==0"  text="View All Programs" @openModal="openModal"/>
    </ion-page>
  </template>
  
<script>
    import {useExploreDataStore, useApplicationStore} from "@/store";
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
        IonItem,
        IonList,
        modalController
    } from "@ionic/vue";
    import {computed, defineComponent, ref, onBeforeMount, watch} from "vue";
    import {useRouter, useRoute} from "vue-router";
    import {useAuthStore} from "@/store";
    import {useLoadingStore} from "@/store/loading";
    import {useComingSoonAlert} from "@/shared/comingSoonAlert";
    import HeaderSection from "@/components/explore/HeaderSection.vue";
    import CountryDetailFooterSection from "@/components/explore/CountryDetailFooterSection.vue";
    import IntakeModal from "@/components/modal/application/IntakeModal.vue";
    import HigherModal from "@/components/modal/application/HigherModal.vue";
    import FooterSection from "@/components/modal/profilemodal/PrevSaveFooter.vue";
    import { checkmark, ellipse, cloudUpload } from 'ionicons/icons';
    import UniProDetailModal from "@/components/modal/UniProDetailModal.vue";
    import SelectItem from "@/components/SelectItem.vue";
   
    export default defineComponent({
    name: "ProgramDetailModal",
    components: {
        CountryDetailFooterSection,
        FooterSection,
        SelectItem,
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonCard,
        IonCardContent,
        IonText,
        IonImg,
        IonItem,
        IonList,
    },
    props: {
        id:String
    },
    setup(props) {
        const { isLoggedIn } = useAuthStore();
        const store = useExploreDataStore();
        const appStore = useApplicationStore();
        const route = useRoute();
        const {programDetails, changeLoadedVal} = store;
        const {applyData} = computed(() => appStore.applyData);
        const dataLoaded = computed(() => store.dataLoaded);
        const program_detail = computed(() => store.program_detail);
        const {showLoading, hideLoading} = useLoadingStore();
        const router = useRouter();
        const step=ref(0);
        const intake_id = ref("");
        const firstStepC=ref({color:"#FFB300", img:ellipse, iconColor:"#FFB300"});
        const secStepC=ref({color:"#BCBCBC", img:ellipse, iconColor:"#BCBCBC"});
        const thrStepC=ref({color:"#BCBCBC", img:ellipse, iconColor:"#BCBCBC"});
        const fourStepC=ref({color:"#BCBCBC", img:ellipse, iconColor:"#BCBCBC"});
        const fiveStepC=ref({color:"#BCBCBC", img:ellipse, iconColor:"#BCBCBC"});
        const sixStepC=ref({color:"#BCBCBC", img:ellipse, iconColor:"#BCBCBC"});
        
        const imgUrl = '/assets/images/header.svg';
        const uniImgUrl = 'assets/images/university.svg';
        const calenderUrl = 'assets/images/awesome-calenda.svg';
        const hourglaUrl = 'assets/images/awesome-hourgla.svg';
        const moneyUrl = 'assets/images/awesome-money-c.svg';
        const openModal = async () => {
            const modal = await modalController.create({
                component: UniProDetailModal,
                componentProps: {
                    id:program_detail.value.university.id
                },
                initialBreakpoint: 0.95,
                breakpoints: [0, 0.95],
            });
            modal.present();
        }
        const toIntakeModal = async(intake) => {
            step.value +=1;
            const modal = await modalController.create({
                component: IntakeModal,
                componentProps: {
                    id: intake.id,
                    title: intake.title,
                    program_id: props.id,
                },
                initialBreakpoint: 0.4,
            });
            modal.present();
        }
        const nextStep = () => {
            step.value += 1;
            if(step.value>1) {
                firstStepC.value.img=checkmark;
                firstStepC.value.color="#007A00";
                firstStepC.value.iconColor="white";
                secStepC.value.color="#FFB300";
                secStepC.value.iconColor="#FFB300";
            }
            if(step.value>2) {
                secStepC.value.img=checkmark;
                secStepC.value.color="#007A00";
                secStepC.value.iconColor="white";
                thrStepC.value.color="#FFB300";
                thrStepC.value.iconColor="#FFB300";
            }
            if(step.value>3) {
                thrStepC.value.img=checkmark;
                thrStepC.value.color="#007A00";
                thrStepC.value.iconColor="white";
                fourStepC.value.color="#FFB300";
                fourStepC.value.iconColor="#FFB300";
            }
            if(step.value>4) {
                fourStepC.value.img=checkmark;
                fourStepC.value.color="#007A00";
                fourStepC.value.iconColor="white";
                fiveStepC.value.color="#FFB300";
                fiveStepC.value.iconColor="#FFB300";
            }
            if(step.value>5) {
                fiveStepC.value.img=checkmark;
                fiveStepC.value.color="#007A00";
                fiveStepC.value.iconColor="white";
                sixStepC.value.color="#FFB300";
                sixStepC.value.iconColor="#FFB300";
            }
            if(step.value>6) {
                sixStepC.value.img=checkmark;
                sixStepC.value.iconColor="white";
                sixStepC.value.color="#007A00";
            }
        }
        const backStep = () => {
            step.value -= 1;
            if(step.value==1) {
                firstStepC.value.img=ellipse;
                firstStepC.value.color="#FFB300";
                firstStepC.value.iconColor="#FFB300";
                secStepC.value.img=ellipse;
                secStepC.value.color="#BCBCBC";
                secStepC.value.iconColor="#BCBCBC";
                thrStepC.value.img=ellipse;
                thrStepC.value.color="#BCBCBC";
                thrStepC.value.iconColor="#BCBCBC";
                fourStepC.value.img=ellipse;
                fourStepC.value.color="#BCBCBC";
                fourStepC.value.iconColor="#BCBCBC";
                fiveStepC.value.img=ellipse;
                fiveStepC.value.color="#BCBCBC";
                fiveStepC.value.iconColor="#BCBCBC";
                sixStepC.value.img=ellipse;
                sixStepC.value.color="#BCBCBC";
                sixStepC.value.iconColor="#BCBCBC";
            }
            if(step.value==2) {
                firstStepC.value.img=checkmark;
                firstStepC.value.color="#007A00";
                firstStepC.value.iconColor="white";
                secStepC.value.img=ellipse;
                secStepC.value.color="#FFB300";
                secStepC.value.iconColor="#FFB300";
                thrStepC.value.img=ellipse;
                thrStepC.value.color="#BCBCBC";
                thrStepC.value.iconColor="#BCBCBC";
                fourStepC.value.img=ellipse;
                fourStepC.value.color="#BCBCBC";
                fourStepC.value.iconColor="#BCBCBC";
                fiveStepC.value.img=ellipse;
                fiveStepC.value.color="#BCBCBC";
                fiveStepC.value.iconColor="#BCBCBC";
                sixStepC.value.img=ellipse;
                sixStepC.value.color="#BCBCBC";
                sixStepC.value.iconColor="#BCBCBC";
            }
            if(step.value==3) {
                firstStepC.value.img=checkmark;
                firstStepC.value.color="#007A00";
                firstStepC.value.iconColor="white";
                secStepC.value.img=checkmark;
                secStepC.value.color="#007A00";
                secStepC.value.iconColor="white";
                thrStepC.value.img=ellipse;
                thrStepC.value.color="#FFB300";
                thrStepC.value.iconColor="#FFB300";
                fourStepC.value.img=ellipse;
                fourStepC.value.color="#BCBCBC";
                fourStepC.value.iconColor="#BCBCBC";
                fiveStepC.value.img=ellipse;
                fiveStepC.value.color="#BCBCBC";
                fiveStepC.value.iconColor="#BCBCBC";
                sixStepC.value.img=ellipse;
                sixStepC.value.color="#BCBCBC";
                sixStepC.value.iconColor="#BCBCBC";
            }
            if(step.value==4) {
                firstStepC.value.img=checkmark;
                firstStepC.value.color="#007A00";
                firstStepC.value.iconColor="white";
                secStepC.value.img=checkmark;
                secStepC.value.color="#007A00";
                secStepC.value.iconColor="white";
                thrStepC.value.img=checkmark;
                thrStepC.value.color="#007A00";
                thrStepC.value.iconColor="white";
                fourStepC.value.img=ellipse;
                fourStepC.value.color="#FFB300";
                fourStepC.value.iconColor="#FFB300";
                fiveStepC.value.img=ellipse;
                fiveStepC.value.color="#BCBCBC";
                fiveStepC.value.iconColor="#BCBCBC";
                sixStepC.value.img=ellipse;
                sixStepC.value.color="#BCBCBC";
                sixStepC.value.iconColor="#BCBCBC";
            }
            if(step.value==5) {
                firstStepC.value.img=checkmark;
                firstStepC.value.color="#007A00";
                firstStepC.value.iconColor="white";
                secStepC.value.img=checkmark;
                secStepC.value.color="#007A00";
                secStepC.value.iconColor="white";
                thrStepC.value.img=checkmark;
                thrStepC.value.color="#007A00";
                thrStepC.value.iconColor="white";
                fourStepC.value.img=checkmark;
                fourStepC.value.color="#007A00";
                fourStepC.value.iconColor="white";
                fiveStepC.value.img=ellipse;
                fiveStepC.value.color="#FFB300";
                fiveStepC.value.iconColor="#FFB300";
                sixStepC.value.img=ellipse;
                sixStepC.value.color="#BCBCBC";
                sixStepC.value.iconColor="#BCBCBC";
            }
            if(step.value==6) {
                firstStepC.value.img=checkmark;
                firstStepC.value.color="#007A00";
                firstStepC.value.iconColor="white";
                secStepC.value.img=checkmark;
                secStepC.value.color="#007A00";
                secStepC.value.iconColor="white";
                thrStepC.value.img=checkmark;
                thrStepC.value.color="#007A00";
                thrStepC.value.iconColor="white";
                fourStepC.value.img=checkmark;
                fourStepC.value.color="#007A00";
                fourStepC.value.iconColor="white";
                fiveStepC.value.img=checkmark;
                fiveStepC.value.color="#007A00";
                fiveStepC.value.iconColor="white";
                sixStepC.value.img=ellipse;
                sixStepC.value.color="#FFB300";
                sixStepC.value.iconColor="#FFB300";
            }
        }
        const toHigherModal=async()=> {
            const modal = await modalController.create({
                component: HigherModal,
                initialBreakpoint: 0.35,
            });
            modal.present();
        }
        onBeforeMount(() => {
            if (!dataLoaded.value) {
                showLoading();
                Promise.all([programDetails(props.id)]).then(() => {
                    changeLoadedVal();
                    hideLoading();
                })
            }
        });
        watch(intake_id, async (new_date) => {
            if (!new_date) return;
            if(!isLoggedIn) {
                window.location = '/profile/login';
                return;
            }
            const intakes = program_detail.value.upcoming_intakes;
            let intake = {};
            for (const key in intakes) {
                if(intakes[key].id == new_date)
                intake = intakes[key];
            }
            const modal = await modalController.create({
                component: IntakeModal,
                componentProps: {
                    id: intake.id,
                    title: intake.title,
                    program_id: props.id,
                },
                initialBreakpoint: 0.4,
            });
            await modal.present();
            const res = await modal.onDidDismiss()
            if(res.data.dismissed)
            step.value += 1;
        });
        return {
            imgUrl,
            uniImgUrl,
            calenderUrl,
            moneyUrl,
            hourglaUrl,
            program_detail,
            toIntakeModal,
            applyData,
            step,
            checkmark,
            ellipse,
            firstStepC,
            secStepC,
            thrStepC,
            fourStepC,
            fiveStepC,
            sixStepC,
            nextStep,
            cloudUpload,
            toHigherModal,
            intake_id,
            backStep,
            openModal
        };
    },
    });
</script>
<style scoped>
ion-content {
    --background: #f5f5f5;
}
ion-text {
    padding:0%;
}
ion-col {
    margin-bottom:9px;
    padding-top:0px;
    padding-bottom:0px;
}
no-padding {
    padding: 0;
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
ion-card {
    margin-top: 0px;
    margin-bottom: 5px;
}
ion-card-content {
    padding: 5px;
}
.leftImg {
    width: 25px;
    margin-right: 10px;
    margin-left: 15px;
}
.list-item-img {
    width: 27.3px;
    margin-right: 5px;
}
.list-item-title {
    font-family: "Calibri";
    font-size: 20px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    color: #203456;
}
.list-item-content {
    font-family: "Calibri";
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #606060;
}
.detail_card {
    width: 100%;
    height: auto;
    border-radius: 15px;
    background: #ffffff;
    margin-top:0px
}
.date_card {
    width: max-content;
    height: 36px;
    border-radius: 15px;
    margin-top: 9px;
    background: #ffffff 
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
.few-title {
    font-family: "Calibri";
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #606060;
}
.main-img {
    width: 346px;
    height: 165px;
    border-radius: 15px;
    filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
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
    margin: auto 0 auto 0;
}
.title-step {
    font-size: 20px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    color: #203456;
    margin-top:0px;
}
.descript-text {
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #606060;
}
.upload-title {
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #00aeef; 
}
.cardu-title {
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #203456;
}
.cd-container {
  /* this class is used to give a max-width to the element it is applied to, and center it horizontally when it reaches that max-width */
  width: 93%;
  max-width: 1170px;
  margin: 0 auto;
}

.cd-container::after {
  /* clearfix */
  content: '';
  display: table;
  clear: both;
}


/* -------------------------------- 

Main components 

-------------------------------- */

.timelineText {
  color: black;
}

.timelineIcon {
  font-size: 25px;
  color: white;
}

.cd-author {
  color: gray;
}

#cd-timeline {
  position: relative;
  margin-left: 10px !important;
}

#cd-timeline::before {
  /* this is the vertical line */
  content: '';
  position: absolute;
  top: 0;
  left: 18px;
  height: 100%;
  width: 4px;
  background: #007A00;
}

.cd-timeline-block {
  position: relative;
  margin: 2em 0;
}

.cd-timeline-block:after {
  content: "";
  display: table;
  clear: both;
}

.cd-timeline-block:first-child {
  margin-top: 0;
}

.cd-timeline-block:last-child {
  margin-bottom: 0;
}

.cd-timeline-picture {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border-color: #4a87ee;
  border-style: solid;
  border-width: 2px;
  background: white;
}

.cd-timeline-picture ion-icon {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 50%;
}

.cd-timeline-content {
  position: relative;
  margin-left: 45px;
  background: white;
  border-radius: 0.25em;
  border-width: 2px;
  margin-bottom: 10px;
  padding: 10px;
}


.dark {
  border-color: #444;
}

.dark i {
  color: #444;
}

#cd-timeline1 {
  position: relative;
  margin-left: 10px !important;
}

#cd-timeline1::before {
  /* this is the vertical line */
  content: '';
  position: absolute;
  top: 0;
  left: 18px;
  height: 100%;
  width: 4px;
  background: v-bind('firstStepC.color');
}
#cd-timeline2 {
  position: relative;
  margin-left: 10px !important;
}

#cd-timeline2::before {
  /* this is the vertical line */
  content: '';
  position: absolute;
  top: 0;
  left: 18px;
  height: 100%;
  width: 4px;
  background: v-bind('secStepC.color');
}
#cd-timeline3 {
  position: relative;
  margin-left: 10px !important;
}

#cd-timeline3::before {
  /* this is the vertical line */
  content: '';
  position: absolute;
  top: 0;
  left: 18px;
  height: 100%;
  width: 4px;
  background: v-bind('thrStepC.color');
}

#cd-timeline4 {
  position: relative;
  margin-left: 10px !important;
}

#cd-timeline4::before {
  /* this is the vertical line */
  content: '';
  position: absolute;
  top: 0;
  left: 18px;
  height: 100%;
  width: 4px;
  background: v-bind('fourStepC.color');
}

#cd-timeline5 {
  position: relative;
  margin-left: 10px !important;
}

#cd-timeline5::before {
  /* this is the vertical line */
  content: '';
  position: absolute;
  top: 0;
  left: 18px;
  height: 100%;
  width: 4px;
  background: v-bind('fiveStepC.color');
}

</style>