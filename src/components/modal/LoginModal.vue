<template>
  <ion-content class="ion-padding">
    <ion-grid v-if="status == 1 || status == 3" style="display:flex; flex-flow: column; justify-content: center;">
      <ion-row class="ion-padding-top">
        <ion-col size="12" class="d-flex">
          <ion-text color="dark1">
            <p class="ion-text-center txt-15 ion-no-margin ion-margin-bottom">{{ $t('Log in or Sign up') }}</p>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="d-flex">
          <input-field v-model="email" label="Email" :icon-start="personOutline"/>
          <!-- <ion-input label-placement="stacked" placeholder="Email ID" v-model="email"  @keyup="changeInput"></ion-input> -->
        </ion-col>
        <ion-col size="12">
          <ion-text v-if="error?.email" color="danger"><p class="ion-no-margin">{{ error?.email[0] }}</p></ion-text>
        </ion-col>
      </ion-row>
      <ion-row v-if="status == 3">
        <ion-col size="12" class="d-flex">
          <input-password v-model="password"/>
          <!-- <ion-input label-placement="stacked" placeholder="Password" v-model="password"  @keyup="changePassword"></ion-input> -->
        </ion-col>
        <ion-col size="12">
          <ion-text v-if="error?.password" color="danger"><p class="ion-no-margin">{{ error?.password[0] }}</p></ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-text color="medium">
            <p class="ion-text-center txt-1">{{ $t('Where we can send you all the juicy information.') }}</p>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="d-flex">
          <ion-button class="btn-get-start button-1" @click="confirmEmail">{{ $t('Continue') }}</ion-button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="5" class="d-flex top-border ion-margin-top">
        </ion-col>
        <ion-col size="2" class="d-flex">
          <ion-text color="medium"> {{ $t('or') }} </ion-text>
        </ion-col>
        <ion-col size="5" class="d-flex top-border ion-margin-top">
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="d-flex">
          <ion-button class="btn-get-start button-1" color="dark2" @click="googleSignIn" >
            <ion-img class="ion-margin-end" src='assets/images/icons/google.svg'/>{{ $t('Continue with Google') }}
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
    <ion-grid v-else-if="status == 2" style="display:flex; flex-flow: column; justify-content: center;">
      <ion-row class="ion-padding-top">
        <ion-col size="12" class="d-flex">
          <ion-text color="dark1">
            <p class="ion-text-center txt-15 ion-no-margin ion-margin-bottom">{{ $t('Oh, hey there') }}</p>
          </ion-text>
        </ion-col>
        <ion-col>
          <ion-text color="medium">
            <p class="ion-text-center ion-no-margin txt-1">{{ $t("Seems like you're already have an account.") }}</p>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="d-flex">
          <ion-img class="ion-margin-end" src='assets/images/icons/user.svg'/>  
        </ion-col>
        <ion-col size="12" class="d-flex">
          <ion-img src='assets/images/icons/mail.svg'/>
          <ion-text color="dark1"><p class="ion-no-margin">admin@gmail.com</p></ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="d-flex">
          <ion-button class="btn-get-start button-1" color="dark2" @click="googleSignIn" >
            <ion-img class="ion-margin-end" src='assets/images/icons/google.svg'/>{{ $t('Continue with Google') }}
          </ion-button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-text color="medium">
            <p class="ion-text-center txt-1">{{ $t('Not you?') }} <a href="javascript:" @click="userAnother">Use another account</a></p>
          </ion-text>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
  import {useAuthStore} from "@/store";
  import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonInput,
    modalController,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonImg
  } from '@ionic/vue';
  import { defineComponent, ref, computed } from 'vue';
  import {useI18n} from "vue-i18n";
  import {useLoadingStore} from "@/store/loading";
  import InputPassword from "@/components/InputPassword.vue";
  import InputField from "@/components/InputField.vue";

  export default defineComponent({
    name: 'LoginModal',
    components: { IonContent,
      //  IonHeader,
      //  IonTitle,
      //  IonToolbar,
      //  IonButtons,
        IonButton,
      //  IonItem,
        // IonInput ,
      //  IonLabel
      IonGrid,
      IonRow,
      IonCol,
      IonText,
      IonImg,
      InputPassword,
      InputField
    },
    setup() {
      const store = useAuthStore();
      const {checkAccount, login} = store;
      const {showLoading, hideLoading} = useLoadingStore();
      const status = ref(1);
      const email = ref("");
      const password = ref("");
      const errorEmail = ref(false);
      const errorPassword = ref(false);
      const error = computed(() => store.error);
      const cancel = () => {
        return modalController.dismiss(null, 'cancel');
      };
      const confirmEmail = async () => {
        // if (email.value == '') {
        //   errorEmail.value = true;
        //   return;
        // }
        showLoading();
        if (status.value == 1) {
          await checkAccount(email.value).then(res => {
            console.log(res);
            if (res.has_account) {
              status.value = 2;
            }
            // return !res ? showFormUserFormError() : setTimeout(() => router.replace('/home'), 300);
          }).finally(() => hideLoading());
        } else {
          await login(email.value, password.value).then(res => {
            console.log(res);
            // if (res.has_account) {
            //   status.value = 2;
            // }
            // return !res ? showFormUserFormError() : setTimeout(() => router.replace('/home'), 300);
          }).finally(() => hideLoading());
        }
      };
      const userAnother = () => {
        status.value = 3;
        return false;
      };
      const googleSignIn = async () => {
        showLoading();
      };
      const changeInput = () => {
        if (email.value != '') {
          errorEmail.value = false;
          return;
        }
      };
      const changePassword = () => {
        if (password.value != '') {
          errorPassword.value = false;
          return;
        }
      };
      return {
        email,
        errorEmail,
        password,
        errorPassword,
        status,
        confirmEmail,
        changeInput,
        changePassword,
        googleSignIn,
        userAnother,
        error,
      }
    },
  });
</script>
<style scoped>
  ion-input {
    border: 2px solid #7fc4fd;
    border-radius: 15px;
    --padding-start: 15px !important;
  }
  
</style>