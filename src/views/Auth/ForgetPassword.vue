<template>
  <ion-page>
    <ion-header class="ion-no-border" mode="ios" collapse="fade" :translucent="true">
      <ion-toolbar>
        <ion-title class="ion-text-center" color="primary"></ion-title>
        <language-switch slot="end"/>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
        <ion-row>
          <ion-col size="12" style="display: flex; width: 100%; justify-content: center; height: 100%">
            <school-master-logo/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-text color="primary">
              <h1 class="ion-text-center"> {{$t("Request Reset Password OTP")}} </h1>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-item lines="full" fill="outline">
              <ion-icon slot="start" :ios="personOutline" :md="personSharp"></ion-icon>
              <ion-label position="floating">{{$t("Email")}}</ion-label>
              <ion-input v-model="email" type="email" required autofocus
                         :placeholder="`${$t('Enter Email eg.')} info@example.com`"></ion-input>
            </ion-item>
            <ion-text v-if="error?.email" color="danger"><p>{{ error?.email[0] }}</p></ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-button expand="block" @click="sendOtp">{{$t('Send Verification Code')}}</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <ion-text color="medium">
              <p>
                <span>{{$t("Go Back ?")}}</span>
                <a href="/login" class="ion-color-secondary">{{$t("Login")}}</a>
              </p>
            </ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {useAuthStore, useRestPasswordStore} from "@/store";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import {personOutline, personSharp} from 'ionicons/icons';
import {computed, defineComponent, ref} from "vue";
import {useRouter} from "vue-router";
import {useFormErrorAlert} from "@/shared/userError";
import {useLoadingStore} from "@/store/loading";
import {useToast} from "@/shared";
import SchoolMasterLogo from "@/components/SchoolMasterLogo.vue";
import LanguageSwitch from "@/components/LanguageSwitch.vue";

export default defineComponent({
  components: {
    LanguageSwitch,
    SchoolMasterLogo,
    IonIcon,
    IonLabel,
    IonInput,
    IonButton,
    IonItem,
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
    const store = useAuthStore();
    const {requestOtp} = store;
    const {showFormUserFormError} = useFormErrorAlert();
    const {showLoading, hideLoading} = useLoadingStore();
    const {setEmail} = useRestPasswordStore();
    const {showToast} = useToast();
    const router = useRouter();
    const email = ref("");
    const error = computed(() => store.error);
    const sendOtp = async () => {
      showLoading();
      await requestOtp(email.value).then(res => {
        hideLoading();
        if (!res) {
          return showFormUserFormError();
        }
        showToast({message: 'Verification code has been sent to your email!'});
        setEmail(email.value);
        return setTimeout(() => router.replace({name: 'verifyOtp'}), 300);
      });

    };
    return {
      email,
      sendOtp,
      error,
      personOutline,
      personSharp,
    };
  },
});
</script>
<style scoped>
</style>