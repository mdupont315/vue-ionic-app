<template>
    <ion-page style="height: 90%;">
      <ion-content :fullscreen="true" class="ion-padding">
        <ion-grid  class="no-padding" style="display:flex; flex-flow: column; justify-content: center;">
          <ion-row class="ion-padding-top flex-col">
            <ion-col class="no-padding" style="text-align: center;" size="12">
              <ion-text class="title-big">{{$t("Remote Counselling")}}</ion-text>
            </ion-col>
            <ion-col class="no-padding margin-18" style="text-align: center;"  size="12">
                <ion-text class="title-small">{{ $t("Get the inside scoop and expert guidance on all your study options.") }}</ion-text>
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
                                </div>
                            </div>
                        </div>
                    </ion-card-content>
                </ion-card>
            </ion-col>
            
            <ion-col size="12" class="no-padding margin-18" style="text-align: center;">
                <ion-text class="title-small">{{ $t("Pick the time slot that suits you best") }}</ion-text>
            </ion-col>
            <ion-col v-if="!next_flag" size="12"  class="no-padding">
                <ion-datetime 
                    id="datetime" :locale="`${$root.$i18n.locale == 'ar'?'ar-ae': $root.$i18n.locale}`"
                    presentation="date" mode="ios"
                    v-model="cal_date" style="margin-left: auto; margin-right: auto;">
                </ion-datetime>
            </ion-col>
            <ion-col v-if="next_flag" size="12"  class="no-padding" style="text-align: center;">
                <ion-text class="title-big">{{$t(`${cal_date}`)}}</ion-text>
            </ion-col>
            <ion-col v-if="next_flag" size="12"  class="no-padding" style="text-align: center;">
                <select-item v-model="intake_id" :items="intakses"
                        text-property="title" value-property="id"/>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
      <footer-section back="Back" :forward="next_flag?'Confirm':'Next'" @save="nextS" @discard="backModal"/>
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
      IonImg,
      IonDatetime,
      modalController
    } from "@ionic/vue";
    import { defineComponent, ref, watch } from "vue";
    import FooterSection from "@/components/modal/profilemodal/FooterSection.vue";
    import SelectItem from "@/components/SelectItem.vue";
    import {format, parseISO} from 'date-fns';

    export default defineComponent({
      name: "ProfileLoginPage",
      components: {
        SelectItem,
        FooterSection,
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonCard,
        IonCardContent,
        IonText,
        IonDatetime,
        IonImg,
      },
      setup() {    
        const next_flag = ref(false);
        const cal_date = ref("");
        const count = ref(0);
        const intakses=ref([
            {id:0, title:"12:00 PM"},
            {id:1, title:"12:30 PM"},
            {id:2, title:"01:00 PM"},
            {id:3, title:"01:30 PM"},
        ])
        const intake_id=ref("");
        const nextImgUrl = 'assets/images/indv.png';

        const nextS = () => {
            if(count.value>1) {
                modalController.dismiss({
                    dismissed: true,
                    intake:intake_id.value
                })
            }
            if(!next_flag.value && cal_date.value)
            {
                cal_date.value = format(parseISO(cal_date.value), 'MMM d, yyyy, EEEE')
                next_flag.value = !next_flag.value;
                count.value +=1;
            }
            if(next_flag.value) {
                count.value +=1;
            }
        }
        const backModal = () => {
            if(next_flag.value)
            {
                cal_date.value="";
                next_flag.value = !next_flag.value;
            }
            else
                modalController.dismiss({
                    dismissed: true
                })
        }
        return {
          nextImgUrl, 
          next_flag,
          backModal,
          nextS,
          cal_date,
          intakses,
          intake_id,
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
    ion-datetime {
        border-radius: 6px;
        filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
        background: #f5f5f5
    }
    .margin-18 {
        margin-top: 18px;
        margin-bottom: 18px;
    }
    p {
        margin: 0px;
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
        font-size: 20px;
        font-weight: normal;
        font-style: normal;
        text-align: center;
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
</style>