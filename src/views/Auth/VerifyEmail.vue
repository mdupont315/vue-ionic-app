<template>
  <ion-page>
    <header-section />
    <ion-content :fullscreen="true" class="ion-padding" color="dark2">
      <ion-grid style="display:flex; flex-flow: column; justify-content: center; height: 100%">
        <ion-row>
          <ion-col size="12" style="display: flex; width: 100%; justify-content: center">
            <school-master-logo/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-text color="light">
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
            <ion-button color="secondary" expand="block" @click="verify">{{$t("Verify")}}</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <ion-text color="light">
              <p>
                <a v-if="resendCodeIn <= 0" href="#" @click.prevent="resend" style="color: #fff !important;">{{$t('Resend Verification Code')}}</a>
                <ion-label v-else color="light">{{$t('Try resend code in')}} : {{`00:${(resendCodeIn < 10 ? "0":"")}${resendCodeIn}`}}</ion-label>
              </p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <ion-text color="light">
              <p>{{$t('Code sent to')}}:</p>
              <p>{{user?.email}}</p>
              <p>{{user?.user_bio?.mobile_number}}</p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <ion-text color="light">
              <p>
                <a href="/update-email" style="color: #fff !important;">{{$t('Edit email or mobile number')}}</a>
              </p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <ion-text color="light">
              <p>
                <span>{{$t("Verify Latter?")}}&nbsp;</span>
                <a href="#" @click.prevent="logoutUser" style="color: #fff !important;">{{$t("Logout")}}</a>
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
import HeaderSection from "@/components/HeaderSection.vue";

export default defineComponent({
  components: {
    IonLabel,
    // LanguageSwitch,
    InputError,
    SchoolMasterLogo,
    IonInput,
    IonButton,
    IonItem,
    IonContent,
    // IonHeader,
    // IonTitle,
    // IonToolbar,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    HeaderSection
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
      return setTimeout(() => router.replace('/profile'), 300);
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