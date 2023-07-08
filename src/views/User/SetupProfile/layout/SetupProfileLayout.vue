<template>
  <ion-page>
    <header-section />
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-item lines="none">
        <ion-text class="ion-text-center ion-no-padding" color="dark1 txt-2" >
          {{ descriptions[current_step] }} 
        </ion-text>
      </ion-item>
      <slot></slot>
    </ion-content>
    <footer-section />
  </ion-page>
</template>

<script>
import {computed, defineComponent, onBeforeMount} from 'vue';
import {
  IonLabel,
  IonIcon,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonMenuButton,
  IonPage,
  IonText, IonTitle,
  IonToolbar,
} from '@ionic/vue';
import {chevronBack,chevronForward,checkmarkCircle,radioButtonOff,radioButtonOn} from 'ionicons/icons';
import {usePages} from "@/shared/pages";
import LanguageSwitch from "@/components/LanguageSwitch";
import SchoolMasterLogoHorizontal from "@/components/SchoolMasterLogoHorizontal";
import {useAuthStore, useCommonDataStore, useLoadingStore} from "@/store";
import HeaderSection from "@/components/HeaderSection.vue";
import FooterSection from "@/components/explore/FooterSection.vue";

export default defineComponent({
  components: {
    HeaderSection,
    FooterSection,
    // IonLabel,
    // IonIcon,
    // LanguageSwitch,
    // SchoolMasterLogoHorizontal,
    // IonButtons,
    // IonHeader,
    // IonMenuButton,
    IonPage,
    // IonToolbar,
    // IonTitle,
    IonItem,
    IonContent,
    IonText,
    // IonButton
  },
  props:{
    step:{
      require:true,
    }
  },
  setup(props) {
    const descriptions = [
      "",
      "Step 1: More about your biography",
      "Step 2: Where do you want to study?",
      "Step 3: What do you want to study?",
      "Step 4: Your Hobbies",
      "Step 5: Support the Application"
    ]
    const {isStepActive,checkoutSetupProfileStep} = usePages();
    const store = useAuthStore();
    const {loadUserData} = store;
    const commonDataStore = useCommonDataStore()
    const {loadData} = commonDataStore;
    const loaded = computed(() => commonDataStore.dataLoaded);
    const current_step = computed(()=>parseInt(props.step))
    const gotoNextStep = ()=>{
      if (current_step.value == 9) return;
      let step = parseInt(props.step)+1
      checkoutSetupProfileStep(step);
    }
    const gotoPreviousStep = ()=>{
      if (current_step.value == 1) return;
      let step = parseInt(props.step)-1;
      checkoutSetupProfileStep(step);
    }

    const {showLoading, hideLoading} = useLoadingStore();
    onBeforeMount(() => {
      if (!loaded.value) {
        showLoading();
        Promise.all([loadUserData(), loadData()]).then(() => {
          hideLoading();
        })
      }
    });
    return {isStepActive,descriptions,current_step,gotoPreviousStep,gotoNextStep,chevronBack,chevronForward,checkmarkCircle,radioButtonOff,radioButtonOn}
  }

});
</script>
<style scoped>
ion-content {
  --padding-top: 4rem;
}
.active {
  --background: green;
  --color: white;
}
.step-btn {
  --box-shadow: 0;
  --border-radius: 0;
}
</style>
