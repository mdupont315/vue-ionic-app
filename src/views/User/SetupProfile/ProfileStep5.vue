<template>
  <setup-profile-layout step="5">
    <ion-grid>
      <ion-row class="ion-padding-top">
        <ion-col size="12">
          <ion-text class="d-optoin"><p style="margin-bottom: 0;">{{  $t('Fees Range: ') }}</p></ion-text>
          <select-item v-model="form.fee_range_id" :items="feeRanges"
                        text-property="range" value-property="id" 
                        :loading="!feeRanges"/>
          <input-error :message="error?.errors?.fee_range_id"/>
        </ion-col>
      </ion-row>
      <ion-row class="ion-padding-top">
        <ion-col size="12">
          <ion-txt class="d-optoin"><p style="margin-bottom: 7px;">{{  $t('Mode of Study') }}</p></ion-txt>
          <select-item v-model="form.study_mode_id" :items="studyModes"
                        text-property="title" value-property="id" 
                        :loading="!studyModes"/>
          <input-error :message="error?.errors?.study_mode_id"/>
        </ion-col>
      </ion-row>
      <ion-row class="ion-padding-top">
        <ion-col size="12">
          <ion-txt class="d-optoin"><p style="margin-bottom: 7px;">{{  $t('Language Requirements') }}</p></ion-txt>
          <select-item v-model="form.language_requirement_id" :items="languageRequirements"
                        text-property="title" value-property="id" 
                        :loading="!languageRequirements"/>
          <input-error :message="error?.errors?.language_requirement_id"/>
        </ion-col>
      </ion-row>
      <ion-row class="ion-padding-top">
        <ion-col size="12">
          <ion-txt class="d-optoin"><p style="margin-bottom: 7px;">{{  $t('Intake year') }}</p></ion-txt>
          <select-item v-model="form.intake_year" :items="intakeYear"
                        text-property="id" value-property="id" 
                        :loading="!intakeYear"/>
          <input-error :message="error?.errors?.intake_year"/>
        </ion-col>
      </ion-row>
      <ion-row class="ion-padding-top">
        <ion-col size="12">
          <ion-txt class="d-optoin"><p style="margin-bottom: 7px;">{{  $t('Intake Months') }}</p></ion-txt>
          <select-item v-model="form.intake_month_id" :items="intakeMonths"
                        text-property="title" value-property="id" 
                        :loading="!intakeMonths"/>
          <input-error :message="error?.errors?.intake_month_id"/>
        </ion-col>
      </ion-row>
      <ion-row class="ion-padding-top">
        <ion-col size="12">
          <ion-txt class="d-optoin"><p style="margin-bottom: 7px;">{{  $t('Course Duration') }}</p></ion-txt>
          <select-item v-model="form.course_duration_id" :items="courseDurations"
                        text-property="title" value-property="id" 
                        :loading="!courseDurations"/>
          <input-error :message="error?.errors?.course_duration_id"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="ion-padding-top w-100">
          <ion-button class="border-20" expand="block" @click="next">{{ $t('Mission Accomplished') }}</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </setup-profile-layout>
</template>

<script lang="ts">
import {useAuthStore, useCommonDataStore, useLoadingStore, useSetupProfileStore} from "@/store";
import {chevronDownOutline} from 'ionicons/icons';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
  IonRange 
} from "@ionic/vue";
import {computed, defineComponent, reactive} from "vue";
import InputError from "@/components/InputError.vue";
import {usePages, useToast} from "@/shared";
import SetupProfileLayout from "@/views/User/SetupProfile/layout/SetupProfileLayout.vue";
import SelectItem from "@/components/SelectItem.vue";
import SelectRange from "@/components/SelectRange.vue";

export default defineComponent({
  components: {
    SelectItem,
    SetupProfileLayout,
    // SelectRange,
    InputError,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    // IonRange 
  },
  setup() {
    
    const commonDataStore = useCommonDataStore();
    const feeRanges = computed(() => commonDataStore.fee_ranges);
    const studyModes = computed(() => commonDataStore.studyModes);
    const languageRequirements = computed(() => commonDataStore.languageRequirements);
    const intakeYear = computed(() => commonDataStore.intakeYear);
    const intakeMonths = computed(() => commonDataStore.intakeMonths);
    const courseDurations = computed(() => commonDataStore.courseDurations);
    const store = useSetupProfileStore();
    const userStore = useAuthStore();
    const {setProfileData} = userStore;
    const {showLoading, hideLoading} = useLoadingStore();
    const {checkoutSetupProfileStep} = usePages();
    const {showToast} = useToast();
    const error = computed(() => store.error);

    const form = reactive({
      fee_range_id: "",
      intake_year: "",
      intake_month_id: "",
      course_duration_id: "",
      study_mode_id: "",
      language_requirement_id: ""
    })

    const next = async () => {
      showLoading();
      await store.submitStepTwo({
        hobbies: form
      }).then((res) => {
        hideLoading()
        if (!res) {
          return;
        }
        const {data} = res;
        setProfileData(data);
        showToast({message: 'Info Updated!', color: 'primary', position: 'bottom'});
        return checkoutSetupProfileStep(3);
      });
    };

    return {
      feeRanges,
      studyModes,
      languageRequirements,
      intakeYear,
      intakeMonths,
      courseDurations,
      next,
      error,
      chevronDownOutline,
      form
    };
  },
});
</script>
<style scoped>
ion-col {
  border-top: 1px solid #1c345a;;
}
ion-range {
  --bar-background: #e6e6e6;
  --bar-background-active: #1c345a;
  --bar-height: 5px;
  --bar-border-radius: 5px;
  --knob-background: #1c345a;
  --knob-size: 25px;
  --pin-background: #ffafcc;
  --pin-color: #fff;
}
.d-optoin {
  font-weight: bold;
  color: #1c345a;
}
</style>