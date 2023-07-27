<template>
  <ion-page :style="title=='edit'? 'height:84%': 'height:100%'">
    <ion-content :class="title=='edit'?'ion-padding edit-content':'ion-padding'">
      <ion-grid style="display:flex; flex-flow: column; justify-content: center;">
        <ion-row>
          <ion-col size="12" class="d-flex">
            <ion-text  v-if="title !='edit'" color="dark1">
              <p class="ion-text-center txt-26 ion-no-margin ion-margin-bottom txt-bold color-3">{{ $t('Signing up') }}</p>
            </ion-text>
            <div v-else style="text-align: left; width: 100%;">
                <ion-img :src='userImgUrl' class="user-Img" style="float: left;" />
                <p  class="ion-text-center txt-15" style="font-weight: bold; float: center;">{{ $t('Edit Profile') }}</p>
              </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <input-field class="f-item" v-model="form.first_name" label="First Name" required autofocus placeholder="Your First Name"/>
            <input-field class="s-item" v-model="form.last_name" label="Last Name" required placeholder="Your Last Name"/>
            <input-error :message="error?.errors?.first_name || error?.errors?.last_name"/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <searchable-select sClass="f-item" v-model="country_id" :items="countries"
                              text-property="country_name" value-property="id" 
                              label="Country of residence" stitle="Select Country"
                              :loading="!countries" :icon-end="chevronDownOutline" @change="loadCities"/>
            <searchable-select sClass="s-item" v-model="city_id" :items="cities"
                              text-property="city_name" value-property="id" 
                              label="City of residence" stitle="Select City"
                              :loading="(loading_cities || !cities.length)" :icon-end="chevronDownOutline" />
            <input-error :message="error?.errors?.country_id || error?.errors?.city_id"/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <searchable-select v-model="national_id" :items="nationalities"
                              text-property="country_name" value-property="id" 
                              label="Nationality" stitle="Select Nationality"
                              :loading="!nationalities" :icon-end="chevronDownOutline" />
            <input-error :message="error?.errors?.nationality_id"/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="ion-no-padding">
            <ion-text>
              <p class="txt-16 color-2">{{ $t("Time to spill the beans on your country of residence! Don't worry, we'll use it to connect you with a super-smart counselor who knows the ins and outs of your geography.") }}</p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <input-phone-field v-model:modelValue="form.mobile" v-model:dCode="form.dial_code" :items="dialCodes" 
                              text-property="country_name" value-property="id" 
                              label="Phone Number" required placeholder="Phone Number"
                              type="number" :icon-start="chevronDownOutline" />
            <input-error :message="error?.errors?.mobile || error?.errors?.dial_code"/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <input-field class="f-item" v-model="form.email" label="Email ID" required placeholder="Email ID"/>
            <input-password v-if="title !='edit'" class="s-item" v-model="form.password"/>
            <input-error v-if="title !='edit'" :message="error?.errors?.email || error?.errors?.password"/>
            <ion-button v-if="title == 'edit'" fill="outline" class="white-button" @click="toResetPass">
              <ion-text style="margin-right: 70%">{{ $t(`Password`) }}</ion-text>
              <ion-icon :src="chevronForward"></ion-icon>
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-row v-if="title !='edit'">
          <ion-col size="12" class="d-flex ion-no-padding">
            <ion-text>
              <p class="txt-16 color-2">
                {{ $t("By selecting Continue, Agree and continue, I agree to UNIRANKS' ") }}
                <a href="/login" class="ion-color-secondary color-5">{{ $t("Terms of Services") }} </a>, 
                <a href="/login" class="ion-color-secondary color-5">{{ $t("Privacy Policy") }} </a>.
              </p>
            </ion-text>
          </ion-col>
          <ion-col size="12" class="d-flex-start">
            <ion-checkbox v-model="agreed" mode="md" color="primary"></ion-checkbox>
            <ion-text class="txt-16 color-2" style="margin-left: 5px;">
              {{ $t("I don't want to receive marketing messages.") }}
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row  v-if="title !='edit'">
          <ion-col size="12" class="d-flex">
            <ion-button class="btn-get-start button-1 txt-20" color="dark2" @click="confirmRegister">{{ $t('Continue') }}</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <footer-section v-if="title=='edit'" @back="backModal" @save="saveData" title="Save"/>
  </ion-page>
</template>

<script>
  import {
    IonPage,
    IonContent,
    IonButton,
    modalController,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonImg,
    IonCheckbox
  } from '@ionic/vue';
  import { defineComponent, ref, computed, reactive } from 'vue';
  import {useI18n} from "vue-i18n";
  import {useRouter} from "vue-router";
  import {useAuthStore, useLoadingStore} from "@/store";
  import {useFormErrorAlert} from "@/shared/userError";
  import {useLocation} from "@/shared/location";
  import {useToast} from "@/shared/toast";
  import InputPassword from "@/components/InputPassword.vue";
  import InputField from "@/components/InputField.vue";
  import InputPhoneField from "@/components/InputPhoneField.vue";
  import InputError from "@/components/InputError.vue";
  import {chevronDownOutline, chevronForward} from "ionicons/icons";
  import SearchableSelect from "@/components/SearchableSelect.vue";
  import FooterSection from "@/components/modal/profilemodal/PrevSaveFooter.vue";
  import ResetPassword from "@/components/modal/profilemodal/ResetPassword.vue";

  export default defineComponent({
    name: 'SignupModal',
    components: { 
      IonContent,
      IonButton,
      IonGrid,
      IonRow,
      IonCol,
      IonText,
      // IonImg,
      InputPassword,
      InputField,
      InputPhoneField,
      InputError,
      IonCheckbox,
      SearchableSelect,
      FooterSection
    },
    props: {
      title: String
    },
    setup() {
      const store = useAuthStore();
      const router = useRouter();
      const commonData = useLocation();
      const {register, updateProfile, logout} = store;
      const {showToast} = useToast();
      const {showFormUserFormError} = useFormErrorAlert();
      const {showLoading, hideLoading} = useLoadingStore();
      const email = ref("");
      const password = ref("");
      const errorEmail = ref(false);
      const errorPassword = ref(false);
      const error = computed(() => store.error);
      const {loading_cities, country_id, city_id, countries, cities, loadCities, national_id,  nationalities, dialCodes} = commonData;
      const userImgUrl = '/assets/images/usr-radius.svg';
      const form = reactive({
        email: "",
        first_name: "",
        last_name: "",
        mobile: "",
        dial_code: "",
        country_id: country_id,
        city_id: city_id,
        nationality_id: national_id,
        password: "",
      });
      const agreed = ref(false);
      const confirmRegister = async () => {
        showLoading();
        await register(form).then(res => {
          hideLoading();
          return (!res ? showFormUserFormError() : accountCreated('Create'));
        }).finally(() => hideLoading());
      };
      const accountCreated = (title) => {
        showToast({message: `Account ${title} Successfully!`});
        return setTimeout(async () => {
          modalController.dismiss(null, 'cancel');
          if(title=="Update") {
            await logout()
            router.push('/profile/')
          }
          else router.replace('/verify-email')
        }, 300);
      }
      const backModal = () => {
          modalController.dismiss({
              'dismissed': true
          })
      }
      const saveData = async () => {
        delete form.password;
        showLoading();
        await updateProfile(form).then(res => {
          hideLoading();
          return (!res ? showFormUserFormError() : accountCreated('Update'));
        }).finally(() => hideLoading());
      }
      const toResetPass = async() => {
        const modal = await modalController.create({
          component: ResetPassword,
          initialBreakpoint: 0.5,
        });
        modal.present();   
      }
      return {
        agreed,
        email,
        errorEmail,
        password,
        errorPassword,
        confirmRegister,
        error,
        form,
        chevronDownOutline,
        country_id, 
        city_id, 
        national_id,
        countries,
        cities,
        nationalities,
        loadCities,
        loading_cities,
        dialCodes,
        backModal,
        chevronForward,
        saveData,
        toResetPass,
        userImgUrl
      }
    },
  });
</script>
<style scoped>
  ion-content{
    --ion-background-color:#f5f5f5;
  }
  .edit-content {
    --ion-background-color: #F5F5F5 !important;
  }
  ion-input {
    border: 2px solid #7fc4fd;
    border-radius: 15px;
    --padding-start: 15px !important;
  }
  ion-item {
    width: 100%;
    --border-color: #92949c;
    --ion-color-base: #92949c !important;
  }
  ion-item::part(native) {
    border-radius: 15px;
  }
  ion-item.f-item::part(native) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: none;
  }
  ion-item.s-item::part(native) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .white-button {
    --border-top-left-radius: 0;
    --border-top-right-radius: 0;
    --border-bottom-left-radius: 15px;
    --border-bottom-right-radius: 15px;
    
    --border-radius: 
      var(--border-top-left-radius) 
      var(--border-top-right-radius) 
      var(--border-bottom-right-radius)
      var(--border-bottom-left-radius);
    filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.15 ));
    --background: #FFFFFF;
    --border-color: #92949c;
    width: 100%;
    height: 49px;
    color:black;
    margin:0px;
  } 
  .user-Img {
      width: 43.1px;
      height: 43.1px;
      margin-top: 15px;
      margin-left: 9px;
   }
</style>