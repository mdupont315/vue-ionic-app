<template>
  <setup-profile-layout step="5">
    <ion-grid>
      <hr>
      <ion-row>
        <ion-col size="12">
          <ion-text class="d-optoin"><p style="margin-bottom: 0;">{{  $t('Fees Range: ') }}</p></ion-text>
          <ion-range :dual-knobs="true" :value="{ lower: form.fee_range_from, upper: form.fee_range_to }" :max="300000" :min="0"  @ionChange="setRange"></ion-range>
          <select-range v-model:min="form.fee_range_from" v-model:max="form.fee_range_to"/>
          <input-error :message="error?.errors?.fee_range_id"/>
        </ion-col>
      </ion-row>
      <hr>
      <ion-row>
        <ion-col size="12">
          <ion-txt class="d-optoin"><p style="margin-bottom: 7px;">{{  $t('Mode of Study') }}</p></ion-txt>
          <select-item v-model="form.study_mode_id" :items="studyModes"
                        text-property="title" value-property="id" 
                        :loading="!studyModes"/>
          <input-error :message="error?.errors?.study_mode_id"/>
        </ion-col>
      </ion-row>
      <hr>
      <ion-row>
        <ion-col size="12">
          <ion-txt class="d-optoin"><p style="margin-bottom: 7px;">{{  $t('Language Requirements') }}</p></ion-txt>
          <select-item v-model="form.language_requirement_id" :items="languageRequirements"
                        text-property="title" value-property="id" 
                        :loading="!languageRequirements"/>
          <input-error :message="error?.errors?.language_requirement_id"/>
        </ion-col>
      </ion-row>
      <hr>
      <ion-row>
        <ion-col size="12">
          <ion-txt class="d-optoin"><p style="margin-bottom: 7px;">{{  $t('Intake year') }}</p></ion-txt>
          <select-item v-model="form.intake_year" :items="intakeYear"
                        text-property="id" value-property="id" 
                        :loading="!intakeYear"/>
          <input-error :message="error?.errors?.intake_year"/>
        </ion-col>
      </ion-row>
      <hr>
      <ion-row>
        <ion-col size="12">
          <ion-txt class="d-optoin"><p style="margin-bottom: 7px;">{{  $t('Intake Months') }}</p></ion-txt>
          <select-item v-model="form.intake_month_id" :items="intakeMonths"
                        text-property="title" value-property="id" 
                        :loading="!intakeMonths"/>
          <input-error :message="error?.errors?.intake_month_id"/>
        </ion-col>
      </ion-row>
      <hr>
      <ion-row>
        <ion-col size="12">
          <ion-txt class="d-optoin"><p style="margin-bottom: 7px;">{{  $t('Course Duration') }}</p></ion-txt>
          <select-item v-model="form.course_duration_id" :items="courseDurations"
                        text-property="title" value-property="id" 
                        :loading="!courseDurations"/>
          <input-error :message="error?.errors?.course_duration_id"/>
        </ion-col>
      </ion-row>
      <hr>
      <ion-row>
        <ion-col size="12" class="w-100">
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
import router from "@/router";

export default defineComponent({
  components: {
    SelectItem,
    SetupProfileLayout,
    SelectRange,
    InputError,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonRange 
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
      fee_range_from: 10000,
      fee_range_to: 50000,
      intake_year: "",
      intake_month_id: "",
      course_duration_id: "",
      study_mode_id: "",
      language_requirement_id: ""
    })

    const setRange = (e: any) => {
      form.fee_range_from = e.detail.value.lower;
      form.fee_range_to = e.detail.value.upper;
    }

    const next = async () => {
      showLoading();
      await store.submitStepFive({
        form
      }).then((res) => {
        hideLoading()
        if (!res) {
          return;
        }
        const {data} = res;
        setProfileData(data);
        showToast({message: 'Info Updated!', color: 'primary', position: 'bottom'});
        router.replace('/explore');
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
      form,
      setRange
    };
  },
});
</script>
<style scoped>
ion-range {
  --bar-background: #e6e6e6;
  --bar-background-active: #1c345a;
  --bar-height: 2px;
  --bar-border-radius: 2px;
  --knob-background: #1c345a;
  --knob-size: 15px;
  --pin-background: #ffafcc;
  --pin-color: #fff;
}
.d-optoin {
  font-weight: bold;
  color: #1c345a;
}
hr {
  width: 85%;
  height: 1px;
  background: #bcbcbc;
  margin-top: 20px;
  margin-bottom: 0;
}
</style>