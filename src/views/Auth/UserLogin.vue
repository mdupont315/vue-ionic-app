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
          <ion-col size="12" style="display: flex; width: 100%; justify-content: center">
            <school-master-logo/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-text color="primary">
              <p class="ion-text-center"><small>{{ $t('Find The Best University Of Your Choice') }}</small></p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <input-field v-model="email" label="Email" :icon-start="personOutline"/>
            <!--            <ion-item lines="full" fill="outline" mode="md">-->
            <!--              <ion-icon slot="start" :icon=""></ion-icon>-->
            <!--              <ion-label position="floating">{{$t('Email')}}</ion-label>-->
            <!--              <ion-input v-model="email" type="email" required autofocus-->
            <!--                         :placeholder="`Enter Email eg. info@example.com`"></ion-input>-->
            <!--            </ion-item>-->
            <ion-text v-if="error?.email" color="danger"><p>{{ error?.email[0] }}</p></ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <input-password v-model="password"/>
            <ion-text v-if="error?.password" class="ion-margin-top" color="danger"><p>{{ error?.password[0] }}</p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-text class="ion-float-end" color="secondary">
              <a href="/forget-password">{{ $t('Forgot Password') }}</a>
            </ion-text>
          </ion-col>
          <ion-col size="12">
            <ion-button expand="block" @click="doLogin">{{ $t('Login') }}</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <ion-text color="medium">
              <p>
                <span>{{ $t("Don't have an account?") }} &nbsp;</span>
                <a href="/register" class="ion-color-secondary">{{ $t('Signup') }}</a>
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
import {personOutline} from 'ionicons/icons';
import {computed, defineComponent, ref} from "vue";
import {useRouter} from "vue-router";
import {useFormErrorAlert} from "@/shared/userError";
import {useLoadingStore} from "@/store/loading";
import {useComingSoonAlert} from "@/shared/comingSoonAlert";
import SchoolMasterLogo from "@/components/SchoolMasterLogo.vue";
import InputPassword from "@/components/InputPassword.vue";
import InputField from "@/components/InputField.vue";
import LanguageSwitch from "@/components/LanguageSwitch.vue";

export default defineComponent({
  name: "LoginPage",
  components: {
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
    const store = useAuthStore();
    const {login} = store;
    const {showFormUserFormError} = useFormErrorAlert();
    const {showLoading, hideLoading} = useLoadingStore();
    const {comingSoon} = useComingSoonAlert();
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const error = computed(() => store.error);
    const doLogin = async () => {
      showLoading();
      await login(email.value, password.value).then(res => {

        return !res ? showFormUserFormError() : setTimeout(() => router.replace('/home'), 300);
      }).finally(() => hideLoading());

    };
    return {
      email,
      password,
      doLogin,
      comingSoon,
      error,
      personOutline,
    };
  },
});
</script>
<style scoped>
</style>