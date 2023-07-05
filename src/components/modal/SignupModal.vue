<template>
  <ion-content class="ion-padding">
    <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
      <ion-row class="ion-padding-top">
        <ion-col size="12" class="d-flex">
          <ion-text color="dark1">
            <p class="ion-text-center txt-15 ion-no-margin ion-margin-bottom">{{ $t('Signing up') }}</p>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="d-flex">
          <input-field v-model="form.first_name" label="First Name" required autofocus placeholder="Your First Name"/>
          <input-error :message="error?.errors?.first_name"/>
        </ion-col>
        <ion-col size="12" class="d-flex">
          <input-field v-model="form.last_name" label="Last Name" required placeholder="Your Last Name"/>
          <input-error :message="error?.errors?.last_name"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="d-flex">
          <input-field v-model="form.country_id" label="Country of residence" required placeholder="Country of residence"/>
          <input-error :message="error?.errors?.country_id"/>
        </ion-col>
        <ion-col size="12" class="d-flex">
          <input-field v-model="form.city_id" label="City of residence" required placeholder="City of residence"/>
          <input-error :message="error?.errors?.city_id"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="d-flex">
          <input-field v-model="form.nationality_id" label="Nationality" required placeholder="Nationality"/>
          <input-error :message="error?.errors?.nationality_id"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-text color="medium">
            <p class="ion-text-center txt-1">{{ $t("Time to spill the beans on your country of residence! Don't worry, we'll use it to connect you with a super-smart counselor who knows the ins and outs of your geography.") }}</p>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="d-flex">
          <input-field v-model="form.mobile" label="Phone Number" required placeholder="Phone Number"/>
          <input-error :message="error?.errors?.mobile"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="d-flex">
          <input-field v-model="form.email" label="Email ID" required placeholder="Email ID"/>
          <input-error :message="error?.errors?.email"/>
        </ion-col>
        <ion-col size="12" class="d-flex">
          <input-password v-model="password"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="d-flex">
          <ion-text color="medium">
            <p class="ion-text-center txt-1">
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
  import {useAuthStore} from "@/store";
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
  import {useLoadingStore} from "@/store/loading";
  import InputPassword from "@/components/InputPassword.vue";
  import InputField from "@/components/InputField.vue";
  import InputError from "@/components/InputError.vue";

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
      InputError,
      IonCheckbox
    },
    setup() {
      const store = useAuthStore();
      const {register} = store;
      const {showLoading, hideLoading} = useLoadingStore();
      const status = ref(1);
      const email = ref("");
      const password = ref("");
      const errorEmail = ref(false);
      const errorPassword = ref(false);
      const error = computed(() => store.error);
      const form = reactive({
        email: "",
        first_name: "",
        last_name: "",
        mobile: "",
        dial_code: "",
        country_id: "",
        city_id: "",
        nationality_id: "",
        password: "{assword}",
      });
      const agreed = ref(false);
      const confirmRegister = async () => {
        showLoading();
        await register(form).then(res => {
          console.log(res);
        }).finally(() => hideLoading());
      };
      return {
        agreed,
        email,
        errorEmail,
        password,
        errorPassword,
        status,
        confirmRegister,
        error,
        form
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
  
</style>