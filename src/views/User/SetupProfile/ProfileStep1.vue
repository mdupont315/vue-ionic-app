<template>
  <setup-profile-layout step="1">
    <template #header>{{ $t('Personal Information') }}</template>
    <ion-grid>
      <ion-row>
        <ion-col>
          <input-field v-model="form.first_name" label="First Name" required autofocus placeholder="Your First Name"/>
          <input-error :message="error?.errors?.first_name"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <input-field v-model="form.last_name" label="Last Name" required placeholder="Your Last Name"/>
          <input-error :message="error?.errors?.last_name"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <input-field v-model="form.birthday" label="Date of Birth" placeholder="Example: 1995-09-13"
                       :icon-end="calendarOutline" @clickIconEnd="openModel"/>
          <input-error :message="error?.errors?.birthday"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-button expand="block" @click="next">{{ $t('Next') }}</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
    <ion-modal :is-open="isOpen" ref="modal" :keep-contents-mounted="true" @didDismiss="closeModel">
      <ion-datetime id="datetime" :locale="`${$root.$i18n.locale == 'ar'?'ar-ae': $root.$i18n.locale}`"
                    presentation="date" mode="ios"
                    :show-default-buttons="true"
                    :done-text="$t('Done')"
                    :cancel-text="$t('Cancel')"
                    v-model="selectedDate">
        <span slot="title">{{ $t('Select your birthday') }}</span>
      </ion-datetime>
    </ion-modal>
  </setup-profile-layout>
</template>

<script lang="ts">
import {useAuthStore, useSetupProfileStore,} from "@/store";
import {IonButton, IonCol, IonDatetime, IonGrid, IonModal, IonRow,} from "@ionic/vue";
import {format, parseISO} from 'date-fns';
import {computed, defineComponent, onBeforeMount, reactive, ref, watch} from "vue";
import {useLoadingStore} from "@/store/loading";
import InputError from "@/components/InputError.vue";
import {usePages, useToast} from "@/shared";
import {calendarOutline} from 'ionicons/icons';
import InputField from "@/components/InputField.vue";
import SetupProfileLayout from "@/views/User/SetupProfile/layout/SetupProfileLayout.vue";


export default defineComponent({
  components: {
    SetupProfileLayout,
    InputField,
    IonModal,
    IonDatetime,
    InputError,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
  },
  setup() {
    const store = useSetupProfileStore();
    const userStore = useAuthStore();
    const user = computed(() => userStore.user);
    const {setProfileData} = userStore;
    const {showLoading, hideLoading} = useLoadingStore();
    const {checkoutSetupProfileStep} = usePages();
    const {showToast} = useToast();
    const error = computed(() => store.error);
    const selectedDate = ref("");
    const isOpen = ref(false);
    const openModel = () => {
      isOpen.value = true;
    }
    const closeModel = () => {
      isOpen.value = false;
    }
    const form = reactive({
      first_name: "",
      last_name: "",
      birthday: ""
    })
    const next = async () => {
      showLoading();
      await store.submitStepOne(form).then((res) => {
        hideLoading()
        if (!res) {
          return;
        }
        const {data} = res;
        setProfileData(data);
        showToast({message: 'Info Updated!', color: 'primary', position: 'bottom'});
        return checkoutSetupProfileStep(2);
      });
    };
    onBeforeMount(async () => {
      form.first_name = user.value?.user_bio?.first_name
      form.last_name = user.value?.user_bio?.last_name
      form.birthday = user.value?.user_bio?.birthday
      selectedDate.value = user.value?.user_bio?.birthday !== null ? user.value?.user_bio?.birthday : '';
    })
    watch(selectedDate, (new_date) => {
      if (!new_date) return;
      form.birthday = format(parseISO(new_date), 'yyyy-MM-dd')
    });
    watch(user, () => {
      form.first_name = user.value?.user_bio?.first_name
      form.last_name = user.value?.user_bio?.last_name
      form.birthday = user.value?.user_bio?.birthday
      selectedDate.value = user.value?.user_bio?.birthday !== null ? user.value?.user_bio?.birthday : '';
    })
    return {
      calendarOutline,
      form,
      selectedDate,
      next,
      error,
      openModel,
      isOpen,
      closeModel
    };
  },
});
</script>
<style scoped>
ion-modal {
  --width: 290px;
  --height: 382px;
  --border-radius: 8px;
}

ion-modal ion-datetime {
  height: 382px;
}

</style>