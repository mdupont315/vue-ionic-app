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
              <h1 class="ion-text-center">{{ $t("Update Email") }}</h1>
              <p class="ion-text-center">
                <small>{{ $t('Update your email here, a verification email will be sent to your new email') }}</small>
              </p>
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
          <ion-col size="12">
            <ion-button expand="block" @click="update" style="text-transform: capitalize">{{ $t('save') }}</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {computed, defineComponent, onBeforeMount, reactive, watch} from 'vue';
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
import InputField from "@/components/InputField.vue";
import {useRouter} from "vue-router";
import {callOutline, mailOutline} from "ionicons/icons";


export default defineComponent({
  components: {
    IonButton,
    InputField,
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
    const {updateEmailOnly} = store;
    const user = computed(() => store.user);
    const {showToast} = useToast();
    const {showFormUserFormError} = useFormErrorAlert();
    const {showLoading, hideLoading} = useLoadingStore();
    const error = computed(() => store.error);
    const router = useRouter();
    const form = reactive({
      email: "",
    });
    onBeforeMount(() => {
      form.email = user.value?.email;
    })
    watch(user, () => {
      form.email = user.value?.email;
    })
    const accountCreated = () => {
      showToast({message: 'Info Updated!'});
      return setTimeout(() => router.replace('/verify-email'), 300);
    }
    const update = async () => {
      if (user.value?.email == form.email) return;
      showLoading();
      await updateEmailOnly(form).then(res => {
        hideLoading();
        return (!res ? showFormUserFormError() : accountCreated());
      });

    };
    return {
      form,
      update,
      error,
      mailOutline,
      callOutline,
    };
  },
});
</script>

<style scoped>
</style>
