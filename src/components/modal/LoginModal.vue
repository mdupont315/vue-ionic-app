<template>
  <ion-content class="ion-padding">
    <ion-grid v-if="status == 1 || status == 3" class="d-grid">
      <ion-row>
        <ion-col size="12" class="d-flex">
          <ion-text color="dark1">
            <p class="ion-text-center txt-26 txt-bold ion-no-margin ion-margin-bottom">{{ $t('Log in or Sign up') }}</p>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="d-flex">
          <input-field v-model="email" label="Email ID" />
        </ion-col>
        <ion-col size="12">
          <ion-text v-if="error?.message" color="danger"><p class="ion-no-margin">{{ error?.message }}</p></ion-text>
        </ion-col>
      </ion-row>
      <ion-row v-if="status == 3">
        <ion-col size="12" class="d-flex">
          <input-password v-model="password"/>
        </ion-col>
        <ion-col size="12">
          <ion-text v-if="error?.message" color="danger"><p class="ion-no-margin">{{ error?.message }}</p></ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-text color="medium">
            <p class="ion-text-center ion-no-margin txt-20 color-2">{{ $t('Where we can send you all the juicy information.') }}</p>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="d-flex">
          <ion-button class="btn-get-start button-1 txt-20" @click="confirmEmail">{{ $t('Continue') }}</ion-button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="5" class="d-flex top-border ion-margin-top">
        </ion-col>
        <ion-col size="2" class="d-flex">
          <ion-text color="medium" class="txt-20"> {{ $t('or') }} </ion-text>
        </ion-col>
        <ion-col size="5" class="d-flex top-border ion-margin-top">
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="d-flex">
          <ion-button class="btn-get-start button-1 txt-20" color="dark2" @click="googleSignIn" >
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
          <ion-text color="dark1"><p class="ion-no-margin">{{ email }}</p></ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="d-flex">
          <ion-button class="btn-get-start button-1" expand="block" color="dark2" @click="googleSignIn" >
            <p><ion-img class="ion-margin-end" src='./assets/images/icons/google.svg'/>{{ $t('Continue with Google') }}</p>
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

<script lang="ts">
  import {useAuthStore} from "@/store";
  import {
    IonContent,
    IonButton,
    modalController,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonImg
  } from '@ionic/vue';
  import { defineComponent, ref, computed, onMounted } from 'vue';
  import {useI18n} from "vue-i18n";
  import {useLoadingStore} from "@/store/loading";
  import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
  import InputPassword from "@/components/InputPassword.vue";
  import InputField from "@/components/InputField.vue";
  import {useFormErrorAlert} from "@/shared/userError";
  import {useRouter} from "vue-router";
  import SignupModal from "@/components/modal/SignupModal.vue"

  export default defineComponent({
    name: 'LoginModal',
    components: { IonContent,
      IonButton,
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
      const {checkAccount, login, google_login} = store;
      const {showLoading, hideLoading} = useLoadingStore();
      const {showFormUserFormError} = useFormErrorAlert();
      const status = ref(1);
      const router = useRouter();
      const email = ref("");
      const password = ref("");
      const errorEmail = ref(false);
      const errorPassword = ref(false);
      const error = computed(() => store.error);
      const cancel = () => {
        return modalController.dismiss(null, 'cancel');
      };
      const confirmEmail = async () => {
        showLoading();
        if (status.value == 1) {
          await checkAccount(email.value).then(res => {
            if (res.has_account) {
              if (res.login_with_google) status.value = 2;
              else status.value = 3;
            } else {
              openModal();
            }
          }).finally(() => hideLoading());
        } else {
          await login(email.value, password.value).then(res => {
            return !res ? showFormUserFormError() : setTimeout(() => {
              modalController.dismiss(null, 'cancel');
              router.replace('/profile')
            }, 300);
          }).finally(() => hideLoading());
        }
      };
      const userAnother = () => {
        status.value = 1;
        return false;
      };
      const googleSignIn = async () => {
        try {
          const userResponse = await GoogleAuth.signIn()
          const token = userResponse.authentication.accessToken;
          if(token) {
            let formData = new FormData();
            formData.append("access_token", token);
            showLoading();
            await google_login(formData);
            hideLoading();
            modalController.dismiss(null, 'cancel');
            router.push('/profile');
          }
        } catch (error) {
          console.error(error)
        }
      };
      const openModal = async () => {
        const modal = await modalController.create({
          component: SignupModal,
          componentProps: {
            title:"Signup"
          },
          initialBreakpoint: 1.0,
          breakpoints: [0, 1.0],
        });
        modal.present();
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
      onMounted(() => {
        GoogleAuth.initialize({
          clientId: '710490860507-68q3akbkpcd5h5pngbr1c50b7prfamci.apps.googleusercontent.com',
          grantOfflineAccess: true,
          scopes: ['profile', 'email'],
        });
      });
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
        openModal
      }
    },
  });
</script>
<style scoped>
  ion-content{
    --ion-background-color:#f5f5f5;
  }
  ion-input {
    border: 2px solid #7fc4fd;
    border-radius: 15px;
    --padding-start: 15px !important;
  }
</style>