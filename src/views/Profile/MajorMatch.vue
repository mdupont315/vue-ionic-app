<template>
    <ion-page>
        <header-section />
        <ion-content :class="current_step>3?'edit-content':''">
            <ion-grid>
                <ion-row v-if="current_step==1" class="flex-col" style="margin-top: 10%; justify-content: center;">
                  <ion-col size="12">
                    <ion-text class="log-title">
                        <p class="ion-text-center" style="margin:0px">{{ $t(`College Major Match Quiz`) }}</p>
                      </ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <ion-text class="gray-title">
                            <b>{{ $t(`Share your preference`)}}</b><br />{{ $t(`including your likes and dislikes. We'll then help you find a university major that aligns perfectly with your personality.`) }}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12" style="margin-top:5%">
                        <ion-text class="gray-title" style="color: #ff0000;;">
                            {{ $t(`To initiate the assessment, please ensure that you have completed your profile setup by selecting at least one Major and Destination.`) }}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12" style="margin-top:5%">
                        <ion-button expand="block" style="width: 100%;" class="blue-button" @click="toNext">
                            <ion-text class="bt-text">{{ $t(`Complete your profile`) }}</ion-text>
                        </ion-button>
                    </ion-col>
                    <ion-col size="12" style="margin-top: 45%;text-align: center;">
                        <ion-text class="major-title">
                            {{ $t(`College Major Match Quiz`)}}<br />{{ $t(`in partner with`) }}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <ion-img src="assets/images/careerone.png" class="centerImg" style="width: 40%;"></ion-img>
                    </ion-col>
                </ion-row>
                <ion-row v-if="current_step==2" class="flex-col" style="margin-top: 10%; justify-content: center;">
                  <ion-col size="12">
                    <ion-text class="log-title">
                        <p class="ion-text-center" style="margin:0px">{{ $t(`College Major Match Quiz`) }}</p>
                      </ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <ion-text class="gray-title">
                            <b>{{ $t(`Share your preference`)}}</b><br />{{ $t(`including your likes and dislikes. We'll then help you find a university major that aligns perfectly with your personality.`) }}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12" style="margin-top:5%">
                        <ion-text class="gray-title" style="color: #1C345A;;">
                            {{ $t(`Read each question carefully and decide how you would feel about doing each type of work:`) }}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12" class="flex-row">
                        <ion-img src="assets/images/strongly-like.png"></ion-img>
                        <ion-text class="emo-title">{{ $t(`= Strongly Like`) }}</ion-text>
                    </ion-col>
                    <ion-col size="12" class="flex-row">
                        <ion-img src="assets/images/like.png"></ion-img>
                        <ion-text class="emo-title">{{ $t(`= Like`) }}</ion-text>
                    </ion-col>
                    <ion-col size="12" class="flex-row">
                        <ion-img src="assets/images/unsure.png"></ion-img>
                        <ion-text class="emo-title">{{ $t(`= Unsure`) }}</ion-text>
                    </ion-col>
                    <ion-col size="12" class="flex-row">
                        <ion-img src="assets/images/dislike.png"></ion-img>
                        <ion-text class="emo-title">{{ $t(`= Dislike`) }}</ion-text>
                    </ion-col>
                    <ion-col size="12" class="flex-row">
                        <ion-img src="assets/images/strongly-dislike.png"></ion-img>
                        <ion-text class="emo-title">{{ $t(`= Strongly Dislike`) }}</ion-text>
                    </ion-col>
                    <ion-col size="12" style="margin-top:5%">
                        <ion-button expand="block" style="width: 100%;" class="blue-button" @click="toNext">
                            <ion-text class="bt-text">{{ $t(`Start The Assessment`) }}</ion-text>
                        </ion-button>
                    </ion-col>
                    <ion-col size="12">
                        <ion-img src="assets/images/careerone2.png" class="centerImg" style="width: 40%;"></ion-img>
                    </ion-col>
                </ion-row>
                <ion-row v-if="current_step==3" class="flex-col" style="margin-top: 10%; justify-content: center;">
                  <ion-col size="12">
                    <ion-text class="log-title">
                        <p class="ion-text-center" style="margin:0px">{{ $t(`College Major Match Quiz`) }}</p>
                      </ion-text>
                    </ion-col>
                    <ion-col size="12" class="ion-text-center">
                        <ion-text class="log-title" style="font-size: 32px;">
                            {{ $t(`NOTE!`)}}
                        </ion-text>
                    </ion-col>                    
                    <ion-col size="12">
                        <ion-text class="log-title" style="font-weight: normal;">
                            {{ $t(`As you answer the questions`)}}<br />
                            {{ $t(`Try NOT to think about`) }}<br /><br />
                            {{ $t(`- If you have enough education or training to do the work or`) }}<br /><br />
                            {{ $t(`- How much money you would make doing the work.`) }}<br /><br />
                            {{ $t(`Just think about if you would like or dislike doing the work.`) }}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12" style="margin-top:5%">
                        <ion-button expand="block" style="width: 100%;" class="blue-button" @click="toNext">
                            <ion-text class="bt-text">{{ $t(`Start The Assessment`) }}</ion-text>
                        </ion-button>
                    </ion-col>
                    <ion-col size="12">
                        <ion-img src="assets/images/careerone2.png" class="centerImg" style="width: 40%;"></ion-img>
                    </ion-col>
                </ion-row>
                <ion-row v-if="current_step==4 || current_step==5" class="flex-col" style="margin-top: 10%; justify-content: center;">
                  <ion-col size="12">
                    <ion-text class="log-title">
                        <p class="ion-text-center" style="margin:0px">{{ $t(`College Major Match Quiz`) }}</p>
                      </ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <ion-range aria-label="Volume" :value="current_step==4?'20':'40'"></ion-range>
                    </ion-col>
                    <ion-col size="12">
                        <ion-text class="gray-title" style="text-align: left;">
                            {{ $t(`Indicate your interest level for each activity below.!`)}}
                        </ion-text>
                    </ion-col>
                    <ion-col v-for="dt in data1" :key="dt.id" size="12" class="emo-div flex-col">
                        <ion-text class="major-title" style="text-align: left;">
                            <b v-if="current_step==4">{{ $t(`${dt.id}. `) }}</b>
                            <b v-else>{{ $t(`${10 + dt.id}. `) }}</b>
                            {{ $t(`${dt.title}`)}}
                        </ion-text>
                        <div class="flex-row centerImg">
                            <ion-img v-for="img in emo_imgs" :key="img.id" :src="img.src" :style="img.id!=5?'margin-right:18px':''"></ion-img>
                        </div>
                    </ion-col>
                    <ion-col size="12">
                        <ion-img src="assets/images/careerone2.png" class="centerImg" style="width: 40%;"></ion-img>
                    </ion-col>
                </ion-row>
                <ion-row v-if="current_step==6" class="flex-col" style="margin-top: 10%; justify-content: center;">
                    <ion-col size="12">
                        <ion-text class="log-title">
                            <p class="ion-text-center" style="margin:0px">{{ $t(`Your Assessment Result`) }}</p>
                        </ion-text>
                    </ion-col>
                    <ion-col size="12" style="background-color: #FFFFFF; border-radius: 25px; margin-bottom: 18px;">
                        <ion-img src="assets/images/assess_result.png" class="centerImg" ></ion-img>
                    </ion-col>                    
                    <ion-col size="12">
                        <ion-text class="major-title" style="text-align: left;">
                            {{ $t(`Based on your scores in the College Major Match Quiz, let's analyze your personality traits and suggest some potential majors that align with your results`)}}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12" class="flex-col">
                        <ion-text class="log-title">
                            {{ $t(`Realistic (5/12)`) }}
                        </ion-text>
                        <ion-range aria-label="Volume" :value="35"></ion-range>
                        <ion-text class="major-title" style="font-size: 16px;text-align: left;">
                            {{ $t(`Your moderate score in the Realistic category suggests that you have some practical and hands-on tendencies. You may enjoy working with tools, machinery, or physical materials.`) }}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12" class="flex-col">
                        <ion-text class="log-title">
                            {{ $t(`Investigative (0/12)`) }}
                        </ion-text>
                        <ion-range aria-label="Volume" :value="1"></ion-range>
                        <ion-text class="major-title" style="font-size: 16px;text-align: left;">
                            {{ $t(`Your low score in the Investigative category indicates that you may have less interest in scientific research, data analysis, or in-depth exploration of complex subjects.`) }}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12" class="flex-col">
                        <ion-text class="log-title">
                            {{ $t(`Artistic (0/12)`) }}
                        </ion-text>
                        <ion-range aria-label="Volume" :value="1"></ion-range>
                        <ion-text class="major-title" style="font-size: 16px;text-align: left;">
                            {{ $t(`Similarly, your low score in the Artistic category suggests that you may have less inclination towards creative expression, visual arts, or performing arts.`) }}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12" class="flex-col">
                        <ion-text class="log-title">
                            {{ $t(`Social (3/12):`) }}
                        </ion-text>
                        <ion-range aria-label="Volume" :value="30"></ion-range>
                        <ion-text class="major-title" style="font-size: 16px;text-align: left;">
                            {{ $t(`Your moderate score in the Social category indicates that you have some interest in working with and helping others. You may enjoy collaborative environments and value human interaction.`) }}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12" class="flex-col">
                        <ion-text class="log-title">
                            {{ $t(`Enterprising (10/12)`) }}
                        </ion-text>
                        <ion-range aria-label="Volume" :value="70"></ion-range>
                        <ion-text class="major-title" style="font-size: 16px;text-align: left;">
                            {{ $t(`Your high score in the Enterprising category suggests that you have a strong desire for leadership, sales, entrepreneurship, and the ability to take charge of projects or business ventures.`) }}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12" class="flex-col">
                        <ion-text class="log-title">
                            {{ $t(`Conventional (7/12)`) }}
                        </ion-text>
                        <ion-range aria-label="Volume" :value="60"></ion-range>
                        <ion-text class="major-title" style="font-size: 16px;text-align: left;">
                            {{ $t(`Your above-average score in the Conventional category indicates that you have a preference for structured environments, attention to detail, and following established rules and procedures.`) }}
                        </ion-text>
                    </ion-col>
                    <hr class="under_line" />
                    <ion-col size="12">
                        <ion-text class="log-title">
                            <p class="ion-text-center" style="margin:0px">{{ $t(`Based on your scores`) }}</p>
                        </ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <ion-text class="major-title" style="text-align: left;">
                            {{ $t(`majors that may be a good fit for you include`)}}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12" class="emo-div flex-col ion-margin-bottom" >
                        <ion-text class="major-title ion-margin-bottom" style="text-align: left; font-weight: bold;">
                            {{ $t(`Business Administration or Management`)}}
                        </ion-text>  
                        <ion-text class="major-title ion-margin-bottom" style="text-align: left; font-size: 16px;">
                            {{ $t(`These majors can provide you with the skills to excel in leadership roles, entrepreneurship, and strategic decision-making.`)}}
                        </ion-text>  
                        <ion-button expand="block" style="width: 80%;" class="blue-button centerImg">
                            <ion-text class="bt-text">{{ $t(`Find Matching Programs`) }}</ion-text>
                        </ion-button>
                    </ion-col>
                    <ion-col size="12" class="emo-div flex-col ion-margin-bottom" >
                        <ion-text class="major-title ion-margin-bottom" style="text-align: left; font-weight: bold;">
                            {{ $t(`Marketing or Sales`)}}
                        </ion-text>  
                        <ion-text class="major-title ion-margin-bottom" style="text-align: left; font-size: 16px;">
                            {{ $t(`These majors can tap into your enterprising nature and allow you to develop effective marketing campaigns, sales strategies, and communication skills.`)}}
                        </ion-text>  
                        <ion-button expand="block" style="width: 80%;" class="blue-button centerImg">
                            <ion-text class="bt-text">{{ $t(`Find Matching Programs`) }}</ion-text>
                        </ion-button>
                    </ion-col>
                    <ion-col size="12" class="emo-div flex-col ion-margin-bottom" >
                        <ion-text class="major-title ion-margin-bottom" style="text-align: left; font-weight: bold;">
                            {{ $t(`Finance or Accounting`)}}
                        </ion-text>  
                        <ion-text class="major-title ion-margin-bottom" style="text-align: left; font-size: 16px;">
                            {{ $t(`These majors can leverage your conventional tendencies, offering opportunities in financial analysis, risk management, or auditing.`)}}
                        </ion-text>  
                        <ion-button expand="block" style="width: 80%;" class="blue-button centerImg">
                            <ion-text class="bt-text">{{ $t(`Find Matching Programs`) }}</ion-text>
                        </ion-button>
                    </ion-col>
                    <hr class="under_line" />
                    <ion-col size="12">
                        <ion-text class="log-title">
                            {{ $t(`Remember`) }}
                        </ion-text>  
                    </ion-col>
                    <ion-col size="12">
                        <ion-text class="major-title" style="font-size: 16px; text-align: left;">
                            {{ $t(`these suggestions are based on your quiz results, but it's important to explore these options further, consider your personal interests and goals, and seek guidance from academic advisors or career counselors. They can provide more tailored recommendations based on your specific strengths and aspirations.`) }}
                        </ion-text>  
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <bt-footer-section v-if="current_step==4 || current_step==5" back="Discard" forward="Next" @save="toNext"/>
        <footer-section v-else/>
    </ion-page>
</template>
<script>
import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonText,
    IonCol,
    IonImg,
    IonRange,
    modalController,
} from "@ionic/vue";
import { defineComponent, ref, computed } from "vue";
import {useRouter} from "vue-router";
import { useAuthStore } from "@/store";
import HeaderSection from "@/components/HeaderSection.vue";
import FooterSection from "@/components/explore/FooterSection.vue";
import BtFooterSection from "@/components/modal/profilemodal/FooterSection.vue";
import {useLoadingStore} from "@/store/loading";

export default defineComponent({
    name:"MajorMatch",
    components: {
        BtFooterSection,
        HeaderSection,
        FooterSection,
        IonPage,
        IonContent,
        IonGrid,
        IonRange,
        IonRow,
        IonCol,
        IonImg,
        IonText,
    },
    setup() {
        const emo_imgs = ref([
            {"id":1, "src": "assets/images/strongly-dislike.png"},
            {"id":2, "src": "assets/images/dislike.png"},
            {"id":3, "src": "assets/images/unsure.png"},
            {"id":4, "src": "assets/images/like.png"},
            {"id":5, "src": "assets/images/strongly-like.png"},
        ])
        const data1 = ref([
            {"id":1, "title":"Build kitchen cabinets"},
            {"id":2, "title":"Develop a new medicine"},
            {"id":3, "title":"Write books or plays"},
            {"id":4, "title":"Help people with personal or emotional problems"},
            {"id":5, "title":"Manage a department within a large company"},
            {"id":6, "title":"Install software across computers on a large network"},
            {"id":7, "title":"Repair household appliances"},
            {"id":8, "title":"Study ways to reduce water pollution"},
            {"id":9, "title":"Compose or arrange music."},
            {"id":10, "title":"Give career guidance to people."},
        ])
        const current_step = ref(1)
        const toNext = () => {
            current_step.value += 1;
        }
        return {
            current_step,
            toNext,
            emo_imgs,
            data1,
        };
    }
})
</script>
<style scoped>
ion-grid {
    padding:3%;
}
ion-text {
    font-family: "Calibri";
}
ion-range {
    --knob-size: 0px;
    --bar-height: 6px;
    padding:0px;
}
.centerImg {
  margin-left: auto;
  margin-right: auto;
}
.log-title {
    font-size: 30px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    color: #1c345a;
}
.gray-title {
    font-size: 20px;
    font-weight: normal;
    line-height: 24px;
    font-style: normal;
    text-align: left;
    color: #606060; 
}
.blue-button {
    --border-radius: 15px;
    --background: linear-gradient(-72deg, #436fb2 0.00%, #1c345a 100.00%);
    --background-activated: #1c345a !important;
    width: 100%;
    height: 50px;
}
.bt-text {
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: center;
    color: #ffffff;
}
.major-title {
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: center;
    color: #1c345a;
}
.emo-title {
    margin-left:7%;
    margin-top: auto;
    margin-bottom: auto;
    font-size: 26px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #1c345a;  
}
.edit-content {
    --ion-background-color: #F5F5F5 !important;
}
.emo-div {
    border-radius: 10px;
    background: #ffffff;
    padding:8px;
    margin-bottom: 18px;
}
</style>