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
              <h1 class="ion-text-center">{{ $t("Update Information") }}</h1>
              <p class="ion-text-center"><small>{{
                  $t('Update your email or mobile number here for verification')
                }}</small></p>
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
            <ion-item lines="full" fill="outline" mode="md">
              <ion-label position="stacked">{{ $t('Code') }}</ion-label>
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
          <ion-col size="12">
            <ion-button expand="block" @click="update">{{ $t('Update and send verification') }}</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <ion-text color="medium">
              <p>
                <a href="/verify-email" class="ion-color-secondary">{{ $t('Go back to verification') }}</a>
              </p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <ion-text color="medium">
              <p>
                <span>{{ $t("Verify Latter?") }}&nbsp;</span>
                <a href="#" @click.prevent="logoutUser" class="ion-color-secondary">{{ $t("Logout") }}</a>
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
import {computed, defineComponent, onBeforeMount, reactive, watch} from "vue";
import {useRouter} from "vue-router";
import {useFormErrorAlert} from "@/shared/userError";
import {useLoadingStore} from "@/store/loading";
import {useToast} from "@/shared/toast";
import SchoolMasterLogo from "@/components/SchoolMasterLogo.vue";
import InputField from "@/components/InputField.vue";
import LanguageSwitch from "@/components/LanguageSwitch.vue";
import {useCountries} from "@/shared";

export default defineComponent({
  components: {
    IonSpinner,
    // IonImg,
    IonLabel,
    IonItem,
    IonSelect,
    IonSelectOption,
    LanguageSwitch,
    InputField,
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
    const {updateEmail, logout} = store;
    const user = computed(() => store.user);
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
    });
    onBeforeMount(() => {
      form.email = user.value?.email;
      form.mobile = user.value?.user_bio?.mobile;
      form.mobile_country_id = user.value?.user_bio?.mobile_country_id.toString();
    })
    watch(user, () => {
      form.email = user.value?.email;
      form.mobile = user.value?.user_bio?.mobile;
      form.mobile_country_id = user.value?.user_bio?.mobile_country_id.toString();
    })
    const accountCreated = () => {
      showToast({message: 'Info Updated!'});
      return setTimeout(() => router.replace('/verify-email'), 300);
    }
    const update = async () => {
      showLoading();
      await updateEmail(form).then(res => {
        hideLoading();
        return (!res ? showFormUserFormError() : accountCreated());
      });

    };

    function logoutUser() {
      logout();
      router.replace("/login");
    }

    return {
      form,
      countries,
      update,
      logoutUser,
      error,
      mailOutline,
      callOutline,
    };
  },

});
</script>
<style scoped>
</style>