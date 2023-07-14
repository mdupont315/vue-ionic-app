<template>
  <setup-profile-layout step="2">
    <ion-grid>
      <ion-row>
        <ion-col size="12">
          <ion-text>{{  $t('Select up to 5 countries where you would like to study in.') }}</ion-text>
        </ion-col>
      </ion-row>
      <ion-row v-for="(item, index) in form" :key="index">
        <ion-col size="12">
          <ion-text class="d-optoin"><p>{{  $t(`${orderText[index]} Description Option`) }}</p></ion-text>
          <searchable-select sClass="f-item" v-model="form[index].country_id" :items="countries"
                             text-property="country_name" value-property="id" 
                             label="Country of residence" stitle="Select Country"
                             :loading="!countries" :icon-end="chevronDownOutline" @change="getEachCities(index)"/>
          <searchable-select sClass="s-item" v-model="form[index].city_id" :items="cities_arry[index]"
                             text-property="city_name" value-property="id" 
                             label="City of residence" stitle="Select City"
                             :loading="(!form[index].cityLoading || !cities_arry[index].length)" :icon-end="chevronDownOutline" />
          <input-error :message="error?.errors?.[`destinations.${index}.country_id`] || error?.errors?.[`destinations.${index}.city_id`]"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="ion-padding-top w-100">
          <ion-button class="border-20" expand="block" @click="next">{{ $t('Step 3 select Program') }}</ion-button>
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
  IonText
} from "@ionic/vue";
import {computed, defineComponent, onBeforeMount, reactive, watch} from "vue";
import InputError from "@/components/InputError.vue";
import {usePages, useToast, useCities} from "@/shared";
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
    IonText
  },
  setup() {

    const commonDataStore = useCommonDataStore();
    const countries = computed(() => commonDataStore.countries);
    const store = useSetupProfileStore();
    const userStore = useAuthStore();
    const {setProfileData} = userStore;
    const {showLoading, hideLoading} = useLoadingStore();
    const {checkoutSetupProfileStep} = usePages();
    const {showToast} = useToast();
    const error = computed(() => store.error);
    const orderText = reactive([
      "1st", "2nd", "3rd", "4th", "5th"
    ]);

    const form = reactive([
      {country_id: "", city_id: "", cityLoading: true},
      {country_id: "", city_id: "", cityLoading: true},
      {country_id: "", city_id: "", cityLoading: true},
      {country_id: "", city_id: "", cityLoading: true},
      {country_id: "", city_id: "", cityLoading: true}
    ]);
    const cities_arry = reactive([
      [], [], [], [], []
    ])

    const getEachCities =async (id: number) => {
      cities_arry[id] = await useCities(form[id].country_id);
      form[id].cityLoading = true;
    }
    const next = async () => {
      showLoading();
      const nForm = new FormData();
      form.forEach((element, index) => {
        nForm.append(`destination[${index}].country_id`, element.country_id)
        nForm.append(`destination[${index}].city_id`, element.city_id)
      });
      await store.submitStepTwo(nForm).then((res) => {
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
      countries,
      next,
      error,
      chevronDownOutline,
      form,
      cities_arry,
      getEachCities,
      orderText
    };
  },
});
</script>
<style scoped>
.d-optoin {
  font-weight: bold;
  color: #1c345a;
}
</style>