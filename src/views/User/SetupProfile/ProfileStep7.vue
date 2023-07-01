<template>
  <setup-profile-layout step="7">
    <template #header>{{ $t('Select preferred university') }}</template>
    <ion-grid>
      <ion-row v-for="i in 5" :key="`item-${i}`">
        <ion-col>
          <searchable-select v-model="form[(i-1)]" :items="universities" text-property="university_name" value-property="id"
                             label="Preferred University" :loading="loading_universities || (universities.length < 1)"
                             clearable/>
          <input-error :message="error[`universities.${(i-1)}`]"/>
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
import {useAuthStore, useLoadingStore, useSetupProfileStore, useTranslationStore} from "@/store";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/vue";
import {computed, defineComponent, onBeforeMount, ref, watch} from "vue";
import InputError from "@/components/InputError.vue";
import {usePages, useToast, useUniversities} from "@/shared";
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
    const langStore = useTranslationStore();
    const lang = computed(() => langStore.locale);
    const store = useSetupProfileStore();
    const userStore = useAuthStore();
    const userUniversities = computed(() => userStore?.user?.profile_data?.universities);
    const {setProfileData} = userStore;
    const {showLoading, hideLoading} = useLoadingStore();
    const {checkoutSetupProfileStep} = usePages();
    const {showToast} = useToast();
    const {universities, loading_universities,loadUniversities} = useUniversities();
    const error = computed(() => store.error);
    const form = ref([]);

    const next = async () => {
      showLoading();
      let selected_unis  = Object.values(form.value).filter((value) => !!value);
      await store.submitStepSeven({universities:selected_unis}).then((res) => {
        hideLoading()
        if (!res) {
          return;
        }
        const {data} = res;
        // console.log(res);
        setProfileData(data);
        showToast({message: 'Info Updated!', color: 'primary', position: 'bottom'});
        return checkoutSetupProfileStep(8);
      });
    };
    onBeforeMount(async () => {
      form.value = userUniversities?.value || []
    })

    watch(userUniversities, () => {
      form.value = userUniversities?.value || []
    })
    watch(lang, async () => {
      await loadUniversities()
    });

    return {
      form,
      universities,
      loading_universities,
      next,
      error,
    };
  },
});
</script>
<style scoped>
</style>