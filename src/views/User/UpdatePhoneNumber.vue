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
              <h1 class="ion-text-center">{{ $t("Update Phone Number") }}</h1>
              <p class="ion-text-center">
                <small>{{ $t('Update your phone number here, a verification code will be sent to your new number')}}</small>
              </p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="4" v-if="countries.length < 1">
            <ion-item lines="full" fill="outline" mode="md">
              <ion-spinner color="secondary"/>
            </ion-item>
          </ion-col>
          <ion-col v-if="countries.length" size="4">
            <ion-item lines="full" fill="outline" mode="md">
              <ion-label position="stacked">{{ $t('Code') }}</ion-label>
              <ion-select v-model="form.mobile_country_id" mode="ios" interface="action-sheet"
                          :interface-options="{header: $t('Country Code')}">
                <ion-select-option v-for="country in countries" :key="country.id"
                                   :value="country.country_code">
                  +{{ country.country_code }} - {{ country.transalated_name || country.country_name }}
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
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import {useAuthStore, useLoadingStore} from "@/store";
import SchoolMasterLogoHorizontal from "@/components/SchoolMasterLogoHorizontal.vue";
import LanguageSwitch from "@/components/LanguageSwitch.vue";
import {useCountries, useFormErrorAlert, useToast} from "@/shared";
import InputField from "@/components/InputField.vue";
import {useRouter} from "vue-router";
import {callOutline, mailOutline} from "ionicons/icons";


export default defineComponent({
  components: {
    IonSpinner,
    // IonImg,
    IonLabel,
    IonItem,
    IonSelect,
    IonSelectOption,
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
    const {updatePhoneNumber} = store;
    const user = computed(() => store.user);
    const {showToast} = useToast();
    const {showFormUserFormError} = useFormErrorAlert();
    const {showLoading, hideLoading} = useLoadingStore();
    const {countries} = useCountries();
    const error = computed(() => store.error);
    const router = useRouter();
    const form = reactive({
      mobile: "",
      mobile_country_id: "",
    });
    onBeforeMount(() => {
      form.mobile = user.value?.user_bio?.mobile;
      form.mobile_country_id = user.value?.user_bio?.mobile_country_id?.toString() || "";
    })
    watch(user, () => {
      form.mobile = user.value?.user_bio?.mobile;
      form.mobile_country_id = user.value?.user_bio?.mobile_country_id?.toString() || "";
    })
    const accountCreated = () => {
      showToast({message: 'Info Updated!'});
      return setTimeout(() => router.replace('/verify-email'), 300);
    }
    const update = async () => {
      if (form.mobile == user.value?.user_bio?.mobile && form.mobile_country_id == user.value?.user_bio?.mobile_country_id?.toString()) return;
      showLoading();
      await updatePhoneNumber(form).then(res => {
        hideLoading();
        return (!res ? showFormUserFormError() : accountCreated());
      });

    };

    return {
      form,
      countries,
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
