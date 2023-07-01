<template>
  <setup-profile-layout step="5">
    <template #header>{{ $t('Study Budget') }}</template>
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-item lines="full" fill="outline" mode="md">
            <ion-label color="medium" position="stacked">
              {{ $t('Your Fee Range') }}
            </ion-label>
            <ion-spinner v-if="!fee_ranges.length" slot="end" color="secondary"/>
            <ion-select v-else mode="ios" interface="action-sheet"
                        :interface-options="{header:$t('Pick a range')}" v-model="form.fee_range_id">
              <ion-select-option v-for="(range,index) in fee_ranges" :key="`range-${index}`" :value="range.id">
                {{ range.currency_range }}
              </ion-select-option>
            </ion-select>
          </ion-item>
          <input-error :message="error?.errors?.fee_range_id"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-item lines="full" fill="outline" mode="md">
            <ion-label position="stacked" color="medium">
              {{ $t('University study budget source') }}
            </ion-label>
            <ion-spinner v-if="!funding_sources.length" slot="end" color="secondary"/>
            <ion-select v-if="funding_sources.length" mode="ios" interface="action-sheet"
                        :interface-options="{header:$t('University study budget source')}"
                        v-model="form.study_fundings">
              <ion-select-option v-for="source in funding_sources" :key="`source-${source.id}`"
                                 :value="source.id.toString()">
                {{ source.translated_name || source.funding_source }}
              </ion-select-option>
            </ion-select>
          </ion-item>
          <input-error :message="error?.errors?.study_fundings"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-button expand="block" @click="next">{{ $t('Next') }}</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </setup-profile-layout>
</template>

<script lang="ts">
import {useAuthStore, useCommonDataStore, useLoadingStore, useSetupProfileStore} from "@/store";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
} from "@ionic/vue";
import {computed, defineComponent, onBeforeMount, reactive, watch} from "vue";
import InputError from "@/components/InputError.vue";
import {usePages, useToast} from "@/shared";
import SetupProfileLayout from "@/views/User/SetupProfile/layout/SetupProfileLayout.vue";

export default defineComponent({
  components: {
    SetupProfileLayout,
    IonSpinner,
    IonSelect,
    IonSelectOption,
    InputError,
    IonLabel,
    IonButton,
    IonItem,
    IonGrid,
    IonRow,
    IonCol,
  },
  setup() {
    const store = useSetupProfileStore();
    const userStore = useAuthStore();
    const user = computed(() => userStore.user);
    const {setProfileData} = userStore;
    const commonDataStore = useCommonDataStore();
    const fee_ranges = computed(() => commonDataStore.fee_ranges);
    const funding_sources = computed(() => commonDataStore.funding_sources);
    const {showLoading, hideLoading} = useLoadingStore();
    const {checkoutSetupProfileStep} = usePages();
    const {showToast} = useToast();
    const error = computed(() => store.error);
    const form = reactive({
      fee_range_id: '',
      study_fundings: '',
    });
    const initFromData = () => {
      form.fee_range_id = user.value?.user_bio?.fee_range_id;
      form.study_fundings = user.value?.user_bio?.study_fundings;
    }
    const next = async () => {
      showLoading();
      await store.submitStepFive(form).then((res) => {
        hideLoading()
        if (!res) {
          return;
        }
        const {data} = res;
        setProfileData(data);
        showToast({message: 'Info Updated!', color: 'primary', position: 'bottom'});
        return checkoutSetupProfileStep(6);
      });
    };
    onBeforeMount(async () => {
      initFromData();
    })
    watch(user, () => {
      initFromData();
    })
    return {
      form,
      fee_ranges,
      funding_sources,
      next,
      error,
    };
  },
});
</script>
<style scoped>
.ion-no-shadow {
  --box-shadow: 0 !important;
}
</style>