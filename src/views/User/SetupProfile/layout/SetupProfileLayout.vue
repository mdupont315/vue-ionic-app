<template>
  <ion-page>
    <ion-header class="ion-no-border" collapse="fade" :translucent="true" mode="ios">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title style="display:grid;" class="ion-justify-content-center">
          <school-master-logo-horizontal/>
        </ion-title>
        <ion-buttons slot="end">
          <language-switch slot="end"/>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>

      <ion-content :fullscreen="true" class="ion-padding">
        <ion-text color="medium"><p class="ion-text-center"><b>{{ $t('Start your higher-ed journey') }}</b></p></ion-text>
        <ion-item lines="none">
          <ion-icon slot="start"  @click="gotoPreviousStep"  :icon="chevronBack" :color="current_step > 1 ? 'primary':'light'" />
          <ion-label class="ion-text-center ion-no-padding" color="primary" >
            STEP {{current_step}} OF 9
            <p>
              <span v-for="stp of 9" :key="stp">
                <ion-icon v-if="stp < current_step" :icon="checkmarkCircle" color="primary" />
                <ion-icon v-else-if="stp == current_step" :icon="radioButtonOn" color="success" />
                <ion-icon v-else :icon="radioButtonOff" />
              </span>
            </p>
          </ion-label>

          <ion-icon slot="end"
                    @click="gotoNextStep" :icon="chevronForward" :color="current_step < 9 ? 'primary':'light'" />
        </ion-item>
        <ion-item lines="none">
          <ion-label class="ion-text-center ion-no-padding" color="primary">
            0{{current_step}} <slot name="header"></slot>
          </ion-label>
        </ion-item>
        <slot></slot>
      </ion-content>
    </ion-content>
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

export default defineComponent({
  components: {
    IonLabel,
    IonIcon,
    LanguageSwitch,
    SchoolMasterLogoHorizontal,
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonToolbar,
    IonTitle,
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
    return {isStepActive,current_step,gotoPreviousStep,gotoNextStep,chevronBack,chevronForward,checkmarkCircle,radioButtonOff,radioButtonOn}
  }

});
</script>
<style scoped>
.active {
  --background: green;
  --color: white;
}

.step-btn {
  --box-shadow: 0;
  --border-radius: 0;
}
</style>
