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
              <h1 class="ion-text-center"> {{$t('Enter Verification Code')}} </h1>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col v-for="i in 6" :key="i">
            <ion-item fill="outline" mode="md">
              <ion-input :ref="el => { inputs[i] = el }"  inputmode="numeric" @keyup="changeInput(i)" v-model="otp[(i-1)]" type="text"
                         minlength="1" maxlength="1" required
                         :autofocus="i===1" autocomplete="off"  />
            </ion-item>
          </ion-col>
          <ion-col  size="12">
            <input-error :message="error?.token"/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-button expand="block" @click="sendOtp">{{$t('Verify')}}</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <ion-text color="medium">
              <p>
                <span>{{$t('Go Back ?')}}&nbsp;</span>
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
import {useAuthStore, useRestPasswordStore} from "@/store";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import {computed, defineComponent, onBeforeUpdate, ref} from "vue";
import {useRouter} from "vue-router";
import SchoolMasterLogo from "@/components/SchoolMasterLogo.vue";
import InputError from "@/components/InputError.vue";
import LanguageSwitch from "@/components/LanguageSwitch.vue";

export default defineComponent({
  components: {
    LanguageSwitch,
    InputError,
    SchoolMasterLogo,
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
    const router = useRouter();
    const {setToken} = useRestPasswordStore();
    const otp = ref(['', '', '', '', '', '']);
    const error = computed(() => store.error);
    const sendOtp = async () => {
      let token = otp.value.join('');
      setToken(token);
      return setTimeout(() => router.replace({name: 'resetPassword'}), 300);
    };
    const inputs = ref([]);
    const changeInput = (inp: number) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const val = inputs.value[inp].$el.value;
      const next = val !== '' ? (inp + 1) : (inp - 1);
      if (next < 1 || next > 6) return;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const next_input = inputs.value[next].$el
      // next_input.disabled(false);
      next_input.setFocus();
    }
    onBeforeUpdate(() => {
      inputs.value = []
    })

    return {
      otp,
      sendOtp,
      error,
      inputs,
      changeInput
    };
  },
});
</script>
<style scoped>
</style>