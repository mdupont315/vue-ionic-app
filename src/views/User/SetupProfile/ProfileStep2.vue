<template>
  <setup-profile-layout step="2">
    <ion-grid>
      <ion-row>
        <ion-col size="12">
          <ion-text>{{  $t('Select up to 5 countries where you would like to study in.') }}</ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-text class="d-optoin"><p>{{  $t('1st Description Option') }}</p></ion-text>
          <searchable-select sClass="f-item" v-model="form[0].country_id" :items="countries"
                             text-property="country_name" value-property="id" 
                             label="Country of residence" stitle="Select Country"
                             :loading="!countries" :icon-end="chevronDownOutline" @change="getEachCities(0)"/>
          <searchable-select sClass="s-item" v-model="form[0].city_id" :items="cities_arry[0]"
                             text-property="city_name" value-property="id" 
                             label="City of residence" stitle="Select City"
                             :loading="(!form[0].cityLoading || !cities_arry[0].length)" :icon-end="chevronDownOutline" />
          <input-error :message="error?.errors?.country_id || error?.errors?.city_id"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-txt class="d-optoin"><p>{{  $t('2nd Description Option') }}</p></ion-txt>
          <searchable-select sClass="f-item" v-model="form[1].country_id" :items="countries"
                             text-property="country_name" value-property="id" 
                             label="Country of residence" stitle="Select Country"
                             :loading="!countries" :icon-end="chevronDownOutline" @change="getEachCities(1)"/>
          <searchable-select sClass="s-item" v-model="form[1].city_id" :items="cities_arry[1]"
                             text-property="city_name" value-property="id" 
                             label="City of residence" stitle="Select City"
                             :loading="(!form[1].cityLoading || !cities_arry[1].length)" :icon-end="chevronDownOutline" />
          <input-error :message="error?.errors?.country_id || error?.errors?.city_id"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-txt class="d-optoin"><p>{{  $t('3rd Description Option') }}</p></ion-txt>
          <searchable-select sClass="f-item" v-model="form[2].country_id" :items="countries"
                             text-property="country_name" value-property="id" 
                             label="Country of residence" stitle="Select Country"
                             :loading="!countries" :icon-end="chevronDownOutline" @change="getEachCities(2)"/>
          <searchable-select sClass="s-item" v-model="form[2].city_id" :items="cities_arry[2]"
                             text-property="city_name" value-property="id" 
                             label="City of residence" stitle="Select City"
                             :loading="(!form[2].cityLoading || !cities_arry[2].length)" :icon-end="chevronDownOutline" />
          <input-error :message="error?.errors?.country_id || error?.errors?.city_id"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-txt class="d-optoin"><p>{{  $t('4th Description Option') }}</p></ion-txt>
          <searchable-select sClass="f-item" v-model="form[3].country_id" :items="countries"
                             text-property="country_name" value-property="id" 
                             label="Country of residence" stitle="Select Country"
                             :loading="!countries" :icon-end="chevronDownOutline" @change="getEachCities(3)"/>
          <searchable-select sClass="s-item" v-model="form[3].city_id" :items="cities_arry[3]"
                             text-property="city_name" value-property="id" 
                             label="City of residence" stitle="Select City"
                             :loading="(!form[3].cityLoading || !cities_arry[3].length)" :icon-end="chevronDownOutline" />
          <input-error :message="error?.errors?.country_id || error?.errors?.city_id"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-txt class="d-optoin"><p>{{  $t('5th Description Option') }}</p></ion-txt>
          <searchable-select sClass="f-item" v-model="form[4].country_id" :items="countries"
                             text-property="country_name" value-property="id" 
                             label="Country of residence" stitle="Select Country"
                             :loading="!countries" :icon-end="chevronDownOutline" @change="getEachCities(4)"/>
          <searchable-select sClass="s-item" v-model="form[4].city_id" :items="cities_arry[3]"
                             text-property="city_name" value-property="id" 
                             label="City of residence" stitle="Select City"
                             :loading="(!form[4].cityLoading || !cities_arry[4].length)" :icon-end="chevronDownOutline" />
          <input-error :message="error?.errors?.country_id || error?.errors?.city_id"/>
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
      await store.submitStepTwo({
        destinations: form
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
      countries,
      next,
      error,
      chevronDownOutline,
      form,
      cities_arry,
      getEachCities,
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