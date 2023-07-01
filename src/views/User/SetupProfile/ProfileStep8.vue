<template>
  <setup-profile-layout step="8">
    <template #header>{{ $t('Pick Your Hobbies') }}</template>
    <ion-grid>
      <ion-row v-for="i in 5" :key="`item-${i}`">
        <ion-col>
          <searchable-select v-model="form[(i-1)]" :items="all_hobbies" text-property="name" value-property="id"
                             label="Select Hobby" :loading="!all_hobbies.length"
                             clearable/>
          <input-error :message="error[`hobbies.${(i-1)}`]"/>
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
import {close} from 'ionicons/icons';
import {IonButton, IonCol, IonGrid, IonRow,} from "@ionic/vue";
import {computed, defineComponent, onBeforeMount, ref, watch} from "vue";
import InputError from "@/components/InputError.vue";
import {usePages, useToast} from "@/shared";
import SetupProfileLayout from "@/views/User/SetupProfile/layout/SetupProfileLayout.vue";
import SearchableSelect from "@/components/SearchableSelect.vue";

export default defineComponent({
  components: {
    SearchableSelect,
    SetupProfileLayout,
    InputError,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
  },
  setup() {
    const store = useSetupProfileStore();
    const commonDataStore = useCommonDataStore();
    const all_hobbies = computed(() => commonDataStore.hobbies);
    const userStore = useAuthStore();
    const userHobbies = computed(() => userStore.user?.profile_data?.hobbies);
    const {setProfileData} = userStore;
    const {showLoading, hideLoading} = useLoadingStore();
    const {checkoutSetupProfileStep} = usePages();
    const {showToast} = useToast();
    const error = computed(() => store.error);
    const form = ref([]);
    const next = async () => {
      showLoading();
      let hobbies = Object.values(form.value).filter((value) => !!value);
      await store.submitStepEight({hobbies}).then((res) => {
        hideLoading()
        if (!res) {
          return;
        }
        const {data} = res;
        setProfileData(data);
        showToast({message: 'Info Updated!', color: 'primary', position: 'bottom'});
        return checkoutSetupProfileStep(9);
      });
    };
    onBeforeMount(() => {
      form.value = userHobbies?.value || [];
    })
    watch(userHobbies, () => {
      form.value = userHobbies?.value || []
    })
    return {
      form, all_hobbies,
      next,
      error,
      close,
    };
  },
});
</script>
<style scoped>
.ion-no-shadow {
  --box-shadow: 0 !important;
}
</style>