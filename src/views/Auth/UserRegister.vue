<template>
  <ion-page>
    <ion-header class="ion-no-border" mode="ios" collapse="fade" :translucent="true">
      <ion-toolbar>
        <ion-title class="ion-text-center" color="primary"></ion-title>
        <language-switch slot="end"/>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-grid style="display:flex; flex-flow: column; justify-content: center; height: 100%">
        <ion-row>
          <ion-col size="12" style="display: flex; width: 100%; justify-content: center">
            <school-master-logo/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-text color="primary">
              <h1 class="ion-text-center">{{ $t("Start your higher-ed journey") }}</h1>
              <p class="ion-text-center"><small>{{ $t('Find The Best University Of Your Choice') }}</small></p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <input-field v-model="form.email" label="Email" autofocus :icon-start="mailOutline"/>
            <ion-text v-if="error?.email" color="danger"><p>{{ error.email[0] }}</p></ion-text>
          </ion-col>
        </ion-row>
        <ion-row>

          <ion-col size="4" v-if="countries.length < 1">
            <ion-item lines="full" fill="outline" mode="md">
              <ion-spinner color="secondary"/>
            </ion-item>
          </ion-col>
          <ion-col v-if="countries.length" size="4">
            <ion-item lines="full" mode="md" class="custom-input">
              <ion-label position="floating" color="medium">{{ $t('Code') }}</ion-label>
              <ion-select v-model="form.mobile_country_id" mode="ios" interface="action-sheet"
                          :interface-options="{header: $t('Country Code')}">
                <ion-select-option v-for="country in countries" :key="country.id"
                                   :value="country.country_code">
                  +{{ country.country_code }} - {{country.transalated_name || country.country_name}}
                </ion-select-option>
              </ion-select>
            </ion-item>
          </ion-col>
          <ion-col size="8">
            <input-field v-model="form.mobile" label="Mobile Number" autofocus :icon-start="callOutline"/>
          </ion-col>
          <ion-col size="12">
            <ion-text v-if="error?.mobile_country_id" color="danger"><p>{{ error.mobile_country_id[0] }}</p></ion-text>
            <ion-text v-if="error?.mobile" color="danger"><p>{{ error.mobile[0] }}</p></ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <input-password v-model="form.password" placeholder="Password"/>
            <ion-text v-if="error?.password" color="danger"><p>{{ error.password[0] }}</p></ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <input-password v-model="form.password_confirmation" placeholder="Confirm Password"/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col style="display: flex; align-items: center">
            <ion-checkbox v-model="agreed" mode="md" color="primary"></ion-checkbox>
            <ion-label style="margin-left: 10px; margin-right: 10px">I agree to the <a href="https://uniranks.com/index.php?option=com_sppagebuilder&view=page&id=252" target="_blank" class="ion-color-secondary">
              {{ $t("terms and conditions") }}</a></ion-label>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-button v-if="!agreed" expand="block" disabled color="medium">{{ $t('Signup') }}</ion-button>
            <ion-button v-else expand="block" @click="signup">{{ $t('Signup') }}</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <ion-text color="medium">
              <p>
                <span>{{ $t('Already have an account?') }}&nbsp;</span>
                <a href="/login" class="ion-color-secondary">{{ $t("Login") }}</a>
              </p>
            </ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {useAuthStore} from "@/store";
import {
  IonCheckbox,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import {callOutline, mailOutline} from 'ionicons/icons';
import {computed, defineComponent, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {useFormErrorAlert} from "@/shared/userError";
import {useLoadingStore} from "@/store/loading";
import {useToast} from "@/shared/toast";
import SchoolMasterLogo from "@/components/SchoolMasterLogo.vue";
import InputPassword from "@/components/InputPassword.vue";
import InputField from "@/components/InputField.vue";
import LanguageSwitch from "@/components/LanguageSwitch.vue";
import {useCountries} from "@/shared";

export default defineComponent({
  name: "UserRegister",
  components: {
    IonCheckbox,
    IonSpinner,
    // IonImg,
    IonLabel,
    IonItem,
    IonSelect,
    IonSelectOption,
    LanguageSwitch,
    InputField,
    InputPassword,
    SchoolMasterLogo,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonText
  },
  setup() {
    const agreed = ref(false)
    const store = useAuthStore();
    const {register} = store;
    const {showToast} = useToast();
    const {showFormUserFormError} = useFormErrorAlert();
    const {showLoading, hideLoading} = useLoadingStore();
    const {countries} = useCountries();
    const error = computed(() => store.error);
    const router = useRouter();
    const form = reactive({
      email: "",
      mobile: "",
      mobile_country_id: "",
      password: "",
      password_confirmation: "",
    });
    const accountCreated = () => {
      showToast({message: 'Account Create Successfully!'});
      return setTimeout(() => router.replace({name: 'home'}), 300);
    }
    const signup = async () => {
      showLoading();
      await register(form).then(res => {
        hideLoading();
        return (!res ? showFormUserFormError() : accountCreated());
      });

    };
    return {
      agreed,
      form,
      countries,
      signup,
      error,
      mailOutline,
      callOutline,
    };
  },

});
</script>
<style scoped>
.custom-input {
  --background-focused: transparent;
  --background-hover: transparent;
  --border-color: var(--ion-color-step-500, gray);
  --border-width: 1px;
  --border-radius: 5px;
}
.btn-disable{
  --background: #C6C6C6;
}
</style>