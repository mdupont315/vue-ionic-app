<template>
  <setup-profile-layout step="6">
    <template #header>{{ $t('Where do you want to study?') }}</template>
    <ion-grid>
      <ion-row v-for="i in 5" :key="`item-${i}`">
        <ion-col>
          <searchable-select v-model="form[(i-1)]" :items="countries" label="Your Preferred Destination"
                             text-property="country_name"
                             value-property="id" :loading="!countries.length" clearable/>
          <input-error :message="error[`destinations.${(i-1)}`]"/>
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
import {useAuthStore, useLoadingStore, useSetupProfileStore} from "@/store";
import {IonButton, IonCol, IonGrid, IonRow,} from "@ionic/vue";
import {computed, defineComponent, onBeforeMount, ref, watch} from "vue";
import InputError from "@/components/InputError.vue";
import {useLocation, usePages, useToast} from "@/shared";
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
    const userStore = useAuthStore();
    const userDestinations = computed(() => userStore.user?.profile_data?.destinations);
    const {setProfileData} = userStore;
    const {showLoading, hideLoading} = useLoadingStore();
    const {checkoutSetupProfileStep} = usePages();
    const {showToast} = useToast();
    const {countries} = useLocation();
    const error = computed(() => store.error);
    const form = ref([])

    const next = async () => {
      showLoading();
      let destinations = Object.values(form.value).filter((value) => !!value);
      await store.submitStepSix({destinations}).then((res) => {
        hideLoading()
        if (!res) {
          return;
        }
        const {data} = res;
        // console.log(res);
        setProfileData(data);
        showToast({message: 'Info Updated!', color: 'primary', position: 'bottom'});
        return checkoutSetupProfileStep(7);
      });
    };

    onBeforeMount(async () => {
      form.value = userDestinations.value || [];
    })

    watch(userDestinations, () => {
      form.value = userDestinations.value || [];
    })
    return {
      form,
      countries,
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