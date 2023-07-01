<template>
  <setup-profile-layout step="2">
    <template #header>{{ $t('Which country do you live in?') }}</template>
    <ion-grid>
      <ion-row>
        <ion-col>
          <searchable-select v-model="country_id" label="Your Country" :items="countries"
                             text-property="country_name" value-property="id"
                             :loading="!countries" @change="loadCities"/>
          <input-error :message="error?.errors?.country_id"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <searchable-select v-model="city_id" label="Your City" :items="cities"
                             text-property="city_name" value-property="id"
                             :loading="(loading_cities || !cities.length)"/>
          <input-error :message="error?.errors?.city_id"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button color="secondary" fill="outline" shape="round" mode="ios" size="small" @click="findMyLocation">
            <ion-icon :icon="locate"/>
            {{ $t('Detect My Country') }}
          </ion-button>
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
import {useAuthStore, useSetupProfileStore, useTranslationStore} from "@/store";
import {close, locate} from 'ionicons/icons';

import {IonButton, IonCol, IonGrid, IonIcon, IonRow,} from "@ionic/vue";
import {computed, defineComponent, nextTick, onMounted, watch} from "vue";
import {useLoadingStore} from "@/store/loading";
import InputError from "@/components/InputError.vue";
import {useLocation} from "@/shared/location";
import {useGoogleMap, usePages, useToast} from "@/shared";
import SetupProfileLayout from "@/views/User/SetupProfile/layout/SetupProfileLayout.vue";
import SearchableSelect from "@/components/SearchableSelect.vue";

export default defineComponent({
  components: {
    SearchableSelect,
    SetupProfileLayout,
    IonIcon,
    InputError,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
  },
  setup() {
    const store = useSetupProfileStore();
    const langStore = useTranslationStore();
    const lang = computed(() => langStore.locale);
    const userStore = useAuthStore();
    const user = computed(() => userStore.user);
    const {setProfileData} = userStore;
    const {showLoading, hideLoading} = useLoadingStore();
    const {checkoutSetupProfileStep} = usePages();
    const {showToast} = useToast();
    const {address, detectUser} = useGoogleMap();
    const error = computed(() => store.error);
    const {loading_cities, country_id, city_id, countries, cities, loadCities} = useLocation();
    const findMyLocation = async () => {
      showLoading()
      const country = await detectUser()
          .then(async () => {
            return countries.value.find((country: any) => country.country_name == address.country);
          })
          .catch((err) => {
            console.log(err);
            showToast({
              message: err?.message || 'GPS is off, please turn on your device GPS.', color: "danger", position: "top"
            })
          })
          .finally(() => hideLoading());
      if (!country) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (country_id.value != country.id) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        country_id.value = country.id;
        const city = await loadCities().then(() => {
          return cities.value.find((city: any) => city.city_name == address.city);
        });
        if (!city) {
          return;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        city_id.value = city.id;
      } else {
        const city = cities.value.find((city: any) => city.city_name == address.city);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        city_id.value = city.id;
      }


    }
    const next = async () => {
      showLoading();
      await store.submitStepTwo({
        country_id: country_id.value,
        city_id: city_id.value,
        address: address.location
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
    const setData = () => {
      country_id.value = user.value?.user_bio?.country_id
      city_id.value = user.value?.user_bio?.city_id
      address.location = user.value?.user_bio?.address
    }

    onMounted(async () => {
      setData();
      await nextTick();
      await loadCities();
    });

    watch(user, () => {
      setData();
    })
    watch(lang, async () => {
      await loadCities()
    });

    return {
      city_id,
      country_id,
      countries,
      cities,
      loadCities,
      loading_cities,
      next,
      error,
      address,
      findMyLocation,
      locate,
      close
    };
  },
});
</script>
<style scoped>
</style>