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
              <h1 class="ion-text-center"> {{$t('Verify Your Email Address')}} </h1>
              <p class="ion-text-center"><small>{{ $t('Please check in spam emails, if you dont find in inbox') }}</small></p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col v-for="i in 6" :key="i">
            <ion-item fill="outline" mode="md">
              <ion-input :ref="el => { inputs[i] = el }" inputmode="numeric" @keyup="changeInput(i)" v-model="otp[(i-1)]" type="text"
                         minlength="1" maxlength="1" required :autofocus="i===1"
                          autocomplete="off" />
            </ion-item>
          </ion-col>
          <ion-col size="12" class="ion-padding">
            <input-error :message="error?.token"/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-button expand="block" @click="verify">{{$t("Verify")}}</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <ion-text color="medium">
              <p>
                <a v-if="resendCodeIn <= 0" href="#" @click.prevent="resend" class="ion-color-secondary">{{$t('Resend Verification Code')}}</a>
                <ion-label v-else color="primary">{{$t('Try resend code in')}} : {{`00:${(resendCodeIn < 10 ? "0":"")}${resendCodeIn}`}}</ion-label>
              </p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <ion-text color="primary">
              <p>{{$t('Code sent to')}}:</p>
              <p>{{user?.email}}</p>
              <p>{{user?.user_bio?.mobile_number}}</p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <ion-text color="medium">
              <p>
                <a href="/update-email" class="ion-color-secondary">{{$t('Edit email or mobile number')}}</a>
              </p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <ion-text color="medium">
              <p>
                <span>{{$t("Verify Latter?")}}&nbsp;</span>
                <a href="#" @click.prevent="logoutUser" class="ion-color-secondary">{{$t("Logout")}}</a>
              </p>
            </ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {useAuthStore, useLoadingStore} from "@/store";
import {
  IonLabel,
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
import {computed, defineComponent, onBeforeUpdate, ref, watch} from "vue";
import {useRouter} from "vue-router";
import SchoolMasterLogo from "@/components/SchoolMasterLogo.vue";
import {useFormErrorAlert, useToast} from "@/shared";
import InputError from "@/components/InputError.vue";
import LanguageSwitch from "@/components/LanguageSwitch.vue";

export default defineComponent({
  components: {
    IonLabel,
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
    const {logout,updateCanSendCodeIn} = store
    // eslint-disable-next-line no-undef
    const {showLoading, hideLoading} = useLoadingStore();
    const {verifyEmail, resendVerifyEmail} = store;
    const resendCodeIn = ref(store.can_resend_code_in)
    const interval = ref()
    const startInterval = () =>{
      if (resendCodeIn.value < 0) return;
      interval.value = setInterval(()=>{
        --resendCodeIn.value
        updateCanSendCodeIn(resendCodeIn.value);
      },1000);
    }
    const stopInterval = () => {
      clearInterval(interval.value);
    }
    const user = computed(()=>store.user);
    const {showFormUserFormError} = useFormErrorAlert();
    const {showToast} = useToast();
    const verified = () => {
      showToast({message: 'Successfully Verified!', color: 'success'});
      stopInterval();
      return setTimeout(() => router.replace({name: 'home'}), 300);
    }
    const inputs = ref([]);
    const router = useRouter();
    const otp = ref(['', '', '', '', '', '']);
    const error = computed(() => store.error);
    const verify = async () => {
      showLoading();
      const token = otp.value.join('');
      await verifyEmail({token}).then((res) => {
        hideLoading();
        return (!res ? showFormUserFormError() : verified());
      })
    }
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
      startInterval();
    })

    watch(resendCodeIn,()=>{
      if (resendCodeIn.value != 0 ) return;
      stopInterval();
    })
    const resend = () => {
      showLoading();
      resendVerifyEmail().then((res) => {
        hideLoading();
        if (!res){
          return  showFormUserFormError();
        }
        resendCodeIn.value = 60;
        startInterval();
        return showToast({
          message: 'Verification Email Sent Again!',
          position: 'top'
        });
      })
    }

    function logoutUser() {
      logout();
      router.replace("/login");
    }

    return {
      user,
      otp,
      logoutUser,
      verify,
      resend,
      error,
      changeInput,
      inputs,
      resendCodeIn
    };
  },
});
</script>
<style scoped>
</style>