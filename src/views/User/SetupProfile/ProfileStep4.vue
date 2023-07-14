<template>
  <setup-profile-layout step="4">
    <ion-grid>
      <ion-row>
        <ion-col size="12">
          <ion-text>{{  $t("Engaging in hobbies can have a positive impact on students' scholarship opportunities in several ways") }}</ion-text>
        </ion-col>
      </ion-row>
      <ion-row v-for="(item, index) in form" :key="index">
        <ion-col size="12">
          <ion-text class="d-optoin"><p style="margin-bottom: 0;">{{  $t(`${orderText[index]} Hobby`) }}</p></ion-text>
          <searchable-select sClass="pro-input-style" v-model="form[index]" :items="hobbies"
                             text-property="title" value-property="id" 
                             label="Select a Hobby" stitle="Select a Hobby"
                             :loading="!hobbies" :icon-end="chevronDownOutline"/>
          <input-error :message="error?.errors?.[`hobbies.${index}`]"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="ion-padding-top w-100">
          <ion-button class="border-20" expand="block" @click="next">{{ $t('Step 5 Support the finding') }}</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </setup-profile-layout>
</template>

<script lang="ts">
import {useAuthStore, useCommonDataStore, useLoadingStore, useSetupProfileStore} from "@/store";
import {chevronDownOutline} from 'ionicons/icons';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonRow,
  IonText
} from "@ionic/vue";
import {computed, defineComponent, reactive} from "vue";
import InputError from "@/components/InputError.vue";
import {usePages, useToast} from "@/shared";
import SetupProfileLayout from "@/views/User/SetupProfile/layout/SetupProfileLayout.vue";
import SearchableSelect from "@/components/SearchableSelect.vue";

export default defineComponent({
  components: {
    SearchableSelect,
    SetupProfileLayout,
    InputError,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonText
  },
  setup() {
    
    const commonDataStore = useCommonDataStore();
    const hobbies = computed(() => commonDataStore.hobbies);
    const store = useSetupProfileStore();
    const userStore = useAuthStore();
    const {setProfileData} = userStore;
    const {showLoading, hideLoading} = useLoadingStore();
    const {checkoutSetupProfileStep} = usePages();
    const {showToast} = useToast();
    const error = computed(() => store.error);
    const orderText = reactive([
      "1st", "2nd", "3rd", "4th", "5th"
    ]);

    const form = reactive([
      "", "", "", "", ""
    ])

    const next = async () => {
      showLoading();
      const nForm = new FormData();
      form.forEach((element, index) => {
        nForm.append(`hobbies[]`, element)
      });
      await store.submitStepFour(nForm).then((res) => {
        hideLoading()
        if (!res) {
          return;
        }
        const {data} = res;
        setProfileData(data);
        showToast({message: 'Info Updated!', color: 'primary', position: 'bottom'});
        return checkoutSetupProfileStep(5);
      });
    };

    return {
      hobbies,
      next,
      error,
      chevronDownOutline,
      form,
      orderText
    };
  },
});
</script>
<style scoped>
.d-optoin {
  font-weight: bold;
  color: #1c345a;
}
ion-item::part(native) {
  border-radius: 15px;
  filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
  border-color: #bcbcbc;
}
</style>