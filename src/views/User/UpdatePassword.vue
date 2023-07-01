<template>
  <ion-page>
    <ion-header class="ion-no-border" collapse="fade" :translucent="true" mode="ios">
      <ion-toolbar mode="ios">
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title style="display:grid;" class="ion-justify-content-center">
          <school-master-logo-horizontal/>
        </ion-title>
        <ion-buttons slot="end">
          <language-switch slot="end"/>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" :fullscreen="true">
      <ion-grid :dir="dir">
        <ion-row>
          <ion-col>
            <ion-text color="primary">
              <h1 class="ion-text-center">{{ $t("Update Password") }}</h1>
              <p class="ion-text-center">
                <small>{{ $t('Update your password here, you will logged out after updating') }}</small>
              </p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <input-password v-model="form.current_password" placeholder="Current Password"/>
            <ion-text v-if="error?.current_password" color="danger"><p>{{ error.current_password[0] }}</p></ion-text>
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
          <ion-col size="12">
            <ion-button expand="block" @click="updatePassword" style="text-transform: capitalize">{{
                $t('save')
              }}
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {computed, defineComponent, reactive} from 'vue';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import {useAuthStore, useLoadingStore} from "@/store";
import SchoolMasterLogoHorizontal from "@/components/SchoolMasterLogoHorizontal.vue";
import LanguageSwitch from "@/components/LanguageSwitch.vue";
import {useFormErrorAlert, useToast} from "@/shared";
import {useRouter} from "vue-router";
import InputPassword from "@/components/InputPassword.vue";


export default defineComponent({
  components: {
    InputPassword,
    IonButton,
    // IonAvatar,
    LanguageSwitch,
    SchoolMasterLogoHorizontal,
    IonText, IonGrid, IonRow, IonCol,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  setup() {
    const store = useAuthStore();
    const router = useRouter();
    const {showToast} = useToast();
    const {showFormUserFormError} = useFormErrorAlert();
    const {showLoading, hideLoading} = useLoadingStore();
    const form = reactive({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const error = computed(() => store.error?.errors);
    const updatePassword = async () => {
      showLoading();
      await store.updatePassword(form).then(res => {
        hideLoading();
        if (!res) {
          return showFormUserFormError();
        }
        showToast({message: 'Password Updated!'});
        return setTimeout(() => logoutUser(), 300);
      });
    };

    function logoutUser() {
      store.logout()
      router.replace("/login");
    }

    return {
      form,
      updatePassword,
      error,
    };
  },

});
</script>

<style scoped>
</style>
