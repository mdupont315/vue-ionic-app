<template>
    <ion-page style="height: 96%;">
        <ion-content :fullscreen="true" class="ion-padding">
            <ion-grid class="no-padding" style="display:flex; flex-flow: column; justify-content: center;">
                <ion-row class="ion-padding-top flex-col">
                    <ion-col class="no-padding" size="12" style="text-align: center;">
                        <ion-text class="title-big" >{{$t(`Help other Students`)}}<br /> {{ $t("with your Review")}}</ion-text>
                    </ion-col>
                    <ion-col size="12" class="flex-row">
                        <ion-img :src="uni_url" style="width: 50px;"></ion-img>
                        <ion-text class="university-name ion-margin" style="margin-left: 9px;">{{ $t("idp International Education Specialists") }}</ion-text>
                    </ion-col>
                    <ion-col size="12" class="flex-row">
                        <ion-text class="txt-16 color-5">
                            {{ $t("Share your feedback and rate the")}}
                            <b>{{ $t("idp International Education Specialists") }}</b>
                        </ion-text>
                    </ion-col>
                    <hr class="under_line" style="width: 90%;"/>
                    <ion-col size="12" class="flex-col">
                        <ion-text class="txt-19 color-3">
                            {{ $t("Reputation and Experience")}}
                        </ion-text>
                        <ion-text class="txt-16 color-2 txt-bold-300">
                            {{ $t("Reputation and experience of the education agent, expertise, knowledge of the education system, and relationships with universities or institutions.")}}
                        </ion-text>
                        <div class="flex-row" style="margin-top: 9px;">
                            <div :class="number.id>7?'circle-number-white':'circle-number-black'" v-for="number in numbers" :key="number.id"
                            :style="number.id != 10?'margin-right: 5vw':''">{{number.number}}</div>
                        </div>
                        <ion-range aria-label="Volume" value="66"></ion-range>
                    </ion-col>
                    <ion-col size="12" class="flex-col">
                        <ion-text class="txt-19 color-3">
                            {{ $t("Knowledge of Study Destinations")}}
                        </ion-text>
                        <ion-text class="txt-16 color-2 txt-bold-300">
                            {{ $t("agent's familiarity with the study destinations you are interested in. information about universities, programs, entry requirements, and visa regulations.")}}
                        </ion-text>
                        <div class="flex-row" style="margin-top: 9px;">
                            <div :class="number.id>7?'circle-number-white':'circle-number-black'" v-for="number in numbers" :key="number.id"
                            :style="number.id != 10?'margin-right: 5vw':''">{{number.number}}</div>
                        </div>
                        <ion-range aria-label="Volume" value="66"></ion-range>
                    </ion-col>
                    <ion-col size="12" class="flex-col">
                        <ion-text class="txt-19 color-3">
                            {{ $t("Services and Support")}}
                        </ion-text>
                        <ion-text class="txt-16 color-2 txt-bold-300">
                            {{ $t("Range of services provided by the agent, assistance with university selection, application process, document preparation, visa application.")}}
                        </ion-text>
                        <div class="flex-row" style="margin-top: 9px;">
                            <div :class="number.id>7?'circle-number-white':'circle-number-black'" v-for="number in numbers" :key="number.id"
                            :style="number.id != 10?'margin-right: 5vw':''">{{number.number}}</div>
                        </div>
                        <ion-range aria-label="Volume" value="66"></ion-range>
                    </ion-col>
                    <ion-col size="12" class="flex-col">
                        <ion-text class="txt-19 color-3">
                            {{ $t("Ethical Practices")}}
                        </ion-text>
                        <ion-text class="txt-16 color-2 txt-bold-300">
                            {{ $t("Ethically and follows professional standards, Prioritize your best interests, provide unbiased advice, and disclose any potential conflicts.")}}
                        </ion-text>
                        <div class="flex-row" style="margin-top: 9px;">
                            <div :class="number.id>7?'circle-number-white':'circle-number-black'" v-for="number in numbers" :key="number.id"
                            :style="number.id != 10?'margin-right: 5vw':''">{{number.number}}</div>
                        </div>
                        <ion-range aria-label="Volume" value="66"></ion-range>
                    </ion-col>
                    <ion-col size="12" class="flex-col">
                        <ion-text class="txt-19 color-3">
                            {{ $t("Transparency and Communication")}}
                        </ion-text>
                        <ion-text class="txt-16 color-2 txt-bold-300">
                            {{ $t("Clearly explain their services, fees, and any contractual obligations, Responsive and timely communication, keep you informed about process.")}}
                        </ion-text>
                        <div class="flex-row" style="margin-top: 9px;">
                            <div :class="number.id>7?'circle-number-white':'circle-number-black'" v-for="number in numbers" :key="number.id"
                            :style="number.id != 10?'margin-right: 5vw':''">{{number.number}}</div>
                        </div>
                        <ion-range aria-label="Volume" value="66"></ion-range>
                    </ion-col>
                    <ion-col size="12" class="flex-col">
                        <ion-text class="txt-19 color-3">
                            {{ $t("Knowledge of Scholarships and Funding")}}
                        </ion-text>
                        <ion-text class="txt-16 color-2 txt-bold-300">
                            {{ $t("Ability to provide guidance on available scholarships and assist you in applying for financial support.")}}
                        </ion-text>
                        <div class="flex-row" style="margin-top: 9px;">
                            <div :class="number.id>7?'circle-number-white':'circle-number-black'" v-for="number in numbers" :key="number.id"
                            :style="number.id != 10?'margin-right: 5vw':''">{{number.number}}</div>
                        </div>
                        <ion-range aria-label="Volume" value="66"></ion-range>
                    </ion-col>
                    <ion-col size="12" class="flex-col">
                        <ion-text class="txt-19 color-3">
                            {{ $t("Transparency and Communication")}}
                        </ion-text>
                        <ion-text class="txt-16 color-2 txt-bold-300">
                            {{ $t("Clearly explain their services, fees, and any contractual obligations, Responsive and timely communication, keep you informed about process.")}}
                        </ion-text>
                        <div class="flex-row" style="margin-top: 9px;">
                            <div :class="number.id>7?'circle-number-white':'circle-number-black'" v-for="number in numbers" :key="number.id"
                            :style="number.id != 10?'margin-right: 5vw':''">{{number.number}}</div>
                        </div>
                        <ion-range aria-label="Volume" value="66"></ion-range>
                    </ion-col>
                    <ion-col size="12" class="flex-col">
                        <ion-text class="txt-19 color-3">
                            {{ $t("Compliance with Laws and Regulations")}}
                        </ion-text>
                        <ion-text class="txt-16 color-2 txt-bold-300">
                            {{ $t("awareness of visa regulations, privacy laws, and other legal requirements to protect your interests.")}}
                        </ion-text>
                        <div class="flex-row" style="margin-top: 9px;">
                            <div :class="number.id>7?'circle-number-white':'circle-number-black'" v-for="number in numbers" :key="number.id"
                            :style="number.id != 10?'margin-right: 5vw':''">{{number.number}}</div>
                        </div>
                        <ion-range aria-label="Volume" value="66"></ion-range>
                    </ion-col>
                    <ion-col size="12" class="flex-col">
                        <ion-text class="txt-19 color-3">
                            {{ $t("Location and Campus Safety")}}
                        </ion-text>
                        <ion-text class="txt-16 color-2 txt-bold-300">
                            {{ $t("The location of the university and the surrounding area. Consider factors such as safety, accessibility, climate, and cultural opportunities.")}}
                        </ion-text>
                        <div class="flex-row" style="margin-top: 9px;">
                            <div :class="number.id>7?'circle-number-white':'circle-number-black'" v-for="number in numbers" :key="number.id"
                            :style="number.id != 10?'margin-right: 5vw':''">{{number.number}}</div>
                        </div>
                        <ion-range aria-label="Volume" value="66"></ion-range>
                    </ion-col>
                    <ion-col size="12" class="flex-col">
                        <ion-text class="txt-19 color-3">
                            {{ $t("Research Opportunities")}}
                        </ion-text>
                        <ion-text class="txt-16 color-2 txt-bold-300">
                            {{ $t("The university's emphasis on research and opportunities for undergraduate or graduate research involvement.")}}
                        </ion-text>
                        <div class="flex-row" style="margin-top: 9px;">
                            <div :class="number.id>7?'circle-number-white':'circle-number-black'" v-for="number in numbers" :key="number.id"
                            :style="number.id != 10?'margin-right: 5vw':''">{{number.number}}</div>
                        </div>
                        <ion-range aria-label="Volume" value="66"></ion-range>
                    </ion-col>
                    <ion-col size="12" class="flex-col">
                        <ion-text class="txt-19 color-3">
                            {{ $t("Research Opportunities")}}
                        </ion-text>
                        <ion-text class="txt-16 color-2 txt-bold-300">
                            {{ $t("University's commitment to diversity and inclusion, efforts to create an inclusive campus environment and support diverse student populations.")}}
                        </ion-text>
                        <div class="flex-row" style="margin-top: 9px;">
                            <div :class="number.id>7?'circle-number-white':'circle-number-black'" v-for="number in numbers" :key="number.id"
                            :style="number.id != 10?'margin-right: 5vw':''">{{number.number}}</div>
                        </div>
                        <ion-range aria-label="Volume" value="66"></ion-range>
                    </ion-col>
                    <hr class="under_line">
                    <ion-col size="12" class="flex-col">
                        <ion-text class="txt-20 color-6">
                            {{ $t("Pros:")}}
                        </ion-text>
                        <ion-textarea
                            label="Outline textarea"
                            label-placement="floating"
                            fill="outline"
                            rows="10" cols="5"
                        ></ion-textarea>
                    </ion-col>
                    <ion-col size="12" class="flex-col">
                        <ion-text class="txt-20 color-6">
                            {{ $t("Cons:")}}
                        </ion-text>
                        <ion-textarea
                            label="Outline textarea"
                            label-placement="floating"
                            fill="outline"
                            rows="10" cols="5"
                        ></ion-textarea>
                    </ion-col>
                    <ion-col size="12" class="flex-col">
                        <ion-text class="txt-20 color-6">
                            {{ $t("Suggestions:")}}
                        </ion-text>
                        <ion-textarea
                            label="Outline textarea"
                            label-placement="floating"
                            fill="outline"
                            rows="10" cols="5"
                        ></ion-textarea>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <footer-section title="Submit Review" @next="backModal"/>
    </ion-page>
</template>
    
<script>
    import {
      IonPage,
      IonContent,
      IonGrid,
      IonRow,
      IonCol,
      IonText,
      IonTextarea,
      IonIcon,
      IonImg,
      modalController
    } from "@ionic/vue";
    import { defineComponent, ref } from "vue";
    import FooterSection from "@/components/profile/OnlyButtonFooter.vue";
    import { star } from 'ionicons/icons';
    
    export default defineComponent({
      name: "UniversityReview",
      components: {
            FooterSection,
            IonPage,
            IonContent,
            IonGrid,
            IonRow,
            IonCol,
            IonImg,
            IonTextarea,
            IonText,
            // IonIcon,
        },
      setup() {
        const numbers=ref([ 
            {id:1, number:1}, {id:2, number:2},
            {id:3, number:3}, {id:4, number:4},
            {id:5, number:5}, {id:6, number:6},
            {id:7, number:7}, {id:8, number:8},
            {id:9, number:9}, {id:10, number:10},
        ])    
        const uni_url = 'https://d73ojsnoesnuw.cloudfront.net/images/universities-logos/university-of-washington-logo.png'
        const backModal = () => {
            modalController.dismiss({
                dismissed: true
            })
        }
        return {
            star,
            uni_url,
            numbers,
            backModal,
        };
      },
    });
  </script>
  <style scoped>
    ion-content {
      --background:#F5F5F5;
      padding:9px
    }
    ion-toolbar {
        --border: none !important;
    }
    ion-textarea {
        --background: #FFFFFF;
        border-radius: 15px;
        --height:120px;
        border-color: #c6c6c6;
        border-width: 2px;
        border-style: solid;
    }
    ion-icon {
        margin-left: 9px;;
    }
    ion-range {
        --knob-size: 0px;
        --bar-height: 6px;
        padding:0px;
    }
    .no-padding {
        padding:0px
    }
    .center-img {
        margin-left: auto;
        margin-right: auto;
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
        font-weight: normal;
        font-style: normal;
        text-align: left;
        color: #606060;
    }
    .university-name {
        font-size: 20px;
        font-weight: normal;
        font-style: normal;
        text-align: left;
        color: #203456;
    }
    .circle-number-black {
        width: 5vw;
        height: 5vw;
        color: #FFFFFF;
        background-color: #1C345A;
        border-radius: 50%;
        text-align: center;
    }
    .circle-number-white {
        width: 5vw;
        height: 5vw;
        color: #1C345A;
        background-color: #FFFFFF;
        border-radius: 50%;
        text-align: center;
        border: solid 1px #1C345A;
    }
</style>