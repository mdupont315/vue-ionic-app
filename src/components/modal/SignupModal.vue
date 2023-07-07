<template>
  <ion-content class="ion-padding">
    <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
      <ion-row>
        <ion-col size="12" class="d-flex">
          <ion-text color="dark1">
            <p class="ion-text-center txt-15 ion-no-margin ion-margin-bottom">{{ $t('Signing up') }}</p>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <input-field class="f-item" v-model="form.first_name" label="First Name" required autofocus placeholder="Your First Name"/>
          <input-field class="s-item" v-model="form.last_name" label="Last Name" required placeholder="Your Last Name"/>
          <input-error :message="error?.errors?.first_name || error?.errors?.last_name"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <searchable-select sClass="f-item" v-model="country_id" :items="countries"
                             text-property="country_name" value-property="id" 
                             label="Country of residence" stitle="Select Country"
                             :loading="!countries" :icon-end="chevronDownOutline" @change="loadCities"/>
          <searchable-select sClass="s-item" v-model="city_id" :items="cities"
                             text-property="city_name" value-property="id" 
                             label="City of residence" stitle="Select City"
                             :loading="(loading_cities || !cities.length)" :icon-end="chevronDownOutline" />
          <input-error :message="error?.errors?.country_id || error?.errors?.city_id"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <searchable-select v-model="national_id" :items="nationalities"
                             text-property="country_name" value-property="id" 
                             label="Nationality" stitle="Select Nationality"
                             :loading="!nationalities" :icon-end="chevronDownOutline" />
          <input-error :message="error?.errors?.nationality_id"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col class="ion-no-padding">
          <ion-text color="medium">
            <p class="txt-09">{{ $t("Time to spill the beans on your country of residence! Don't worry, we'll use it to connect you with a super-smart counselor who knows the ins and outs of your geography.") }}</p>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <input-phone-field v-model:modelValue="form.mobile" v-model:dCode="form.dial_code" :items="dialCodes" 
                             text-property="country_name" value-property="id" 
                             label="Phone Number" required placeholder="Phone Number"
                             type="number" :icon-start="chevronDownOutline" />
          <input-error :message="error?.errors?.mobile || error?.errors?.dial_code"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <input-field class="f-item" v-model="form.email" label="Email ID" required placeholder="Email ID"/>
          <input-password class="s-item" v-model="form.password"/>
          <input-error :message="error?.errors?.email || error?.errors?.password"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="d-flex ion-no-padding">
          <ion-text color="medium">
            <p class="txt-09">
              {{ $t("By selecting Continue, Agree and continue, I agree to UNIRANKS' ") }}
              <a href="/login" class="ion-color-secondary">{{ $t("Terms of Services, Privacy Policy.") }} </a>
            </p>
          </ion-text>
        </ion-col>
        <ion-col size="12" class="d-flex">
          <ion-text color="medium">
            <ion-checkbox v-model="agreed" mode="md" color="primary"></ion-checkbox>
            {{ $t("I don't want to receive marketing messages.") }}
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="d-flex">
          <ion-button class="btn-get-start button-1" @click="confirmRegister">{{ $t('Continue') }}</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
  import {
    IonContent,
    IonButton,
    modalController,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonImg,
    IonCheckbox
  } from '@ionic/vue';
  import { defineComponent, ref, computed, reactive } from 'vue';
  import {useI18n} from "vue-i18n";
  import {useRouter} from "vue-router";
  import {useAuthStore, useLoadingStore} from "@/store";
  import {useFormErrorAlert} from "@/shared/userError";
  import {useLocation} from "@/shared/location";
  import {useToast} from "@/shared/toast";
  import InputPassword from "@/components/InputPassword.vue";
  import InputField from "@/components/InputField.vue";
  import InputPhoneField from "@/components/InputPhoneField.vue";
  import InputError from "@/components/InputError.vue";
  import {chevronDownOutline} from "ionicons/icons";
  import SearchableSelect from "@/components/SearchableSelect.vue";

  export default defineComponent({
    name: 'SignupModal',
    components: { IonContent,
      IonButton,
      IonGrid,
      IonRow,
      IonCol,
      IonText,
      // IonImg,
      InputPassword,
      InputField,
      InputPhoneField,
      InputError,
      IonCheckbox,
      SearchableSelect
    },
    setup() {
      const store = useAuthStore();
      const router = useRouter();
      const commonData = useLocation();
      const {register} = store;
      const {showToast} = useToast();
      const {showFormUserFormError} = useFormErrorAlert();
      const {showLoading, hideLoading} = useLoadingStore();
      const email = ref("");
      const password = ref("");
      const errorEmail = ref(false);
      const errorPassword = ref(false);
      const error = computed(() => store.error);
      const {loading_cities, country_id, city_id, countries, cities, loadCities, national_id,  nationalities, dialCodes} = commonData;
      const form = reactive({
        email: "",
        first_name: "",
        last_name: "",
        mobile: "",
        dial_code: "",
        country_id: country_id,
        city_id: city_id,
        nationality_id: national_id,
        password: "",
      });
      const agreed = ref(false);
      const confirmRegister = async () => {
        showLoading();
        await register(form).then(res => {
          hideLoading();
          console.log(res)
          return (!res ? showFormUserFormError() : accountCreated());
        }).finally(() => hideLoading());
      };
      const accountCreated = () => {
        showToast({message: 'Account Create Successfully!'});
        return setTimeout(() => router.replace('/profile'), 300);
      }
      return {
        agreed,
        email,
        errorEmail,
        password,
        errorPassword,
        confirmRegister,
        error,
        form,
        chevronDownOutline,
        country_id, 
        city_id, 
        national_id,
        countries,
        cities,
        nationalities,
        loadCities,
        loading_cities,
        dialCodes
      }
    },
  });
</script>
<style scoped>
  ion-input {
    border: 2px solid #7fc4fd;
    border-radius: 15px;
    --padding-start: 15px !important;
  }
  ion-item {
    width: 100%;
    --border-color: #92949c;
    --ion-color-base: #92949c !important;
  }
  ion-item::part(native) {
    border-radius: 15px;
  }
  ion-item.f-item::part(native) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: none;
  }
  ion-item.s-item::part(native) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>