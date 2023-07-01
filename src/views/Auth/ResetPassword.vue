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
              <h1 class="ion-text-center">{{$t("Reset Password")}}</h1>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <input-password v-model="password" placeholder="Password"/>
            <ion-text v-if="error?.password" color="danger"><p>{{ error.password[0] }}</p></ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <input-password v-model="confirm_password" placeholder="Confirm Password"/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-button expand="block" @click="sendOtp">{{$t('Reset Password')}}</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <ion-text color="medium">
              <p>
                <span>{{$t('Go Back ?')}} </span>
                <a href="/login" class="ion-color-secondary">{{$t('Login')}}</a>
              </p>
            </ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {useAuthStore, useLoadingStore, useRestPasswordStore} from "@/store";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import {computed, defineComponent, ref} from "vue";
import {useRouter} from "vue-router";
import {useFormErrorAlert, useToast} from "@/shared";
import SchoolMasterLogo from "@/components/SchoolMasterLogo.vue";
import InputPassword from "@/components/InputPassword.vue";
import LanguageSwitch from "@/components/LanguageSwitch.vue";

export default defineComponent({
  components: {
    LanguageSwitch,
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
    const store = useAuthStore();
    const router = useRouter();
    const resetPassStore = useRestPasswordStore();
    const {showToast} = useToast();
    const {showFormUserFormError} = useFormErrorAlert();
    const {showLoading, hideLoading} = useLoadingStore();
    const email = computed(() => resetPassStore.email);
    const token = computed(() => resetPassStore.token);
    const password = ref("");
    const confirm_password = ref("");
    const error = computed(() => store.error);
    const sendOtp = async () => {
      showLoading();
      await store.resetPassword({
        email: email.value,
        token: token.value,
        password: password.value,
        password_confirmation: confirm_password.value
      }).then(res => {
        hideLoading();
        if (!res) {
          return showFormUserFormError();
        }
        showToast({message: 'Password Updated!'});
        return setTimeout(() => router.replace({name: 'home'}), 300);
      });
    };
    return {
      password, confirm_password,
      sendOtp,
      error,
    };
  },
});
</script>
<style scoped>
</style>