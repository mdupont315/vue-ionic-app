<template>
  <setup-profile-layout step="1">
    <ion-grid>
      <ion-row>
        <ion-col size="12">
          <input-field v-model="form.birthday" label="Date of Birth" placeholder="Example: 1995-09-13"
                       :icon-start="calendarOutline" @clickIconStart="openModel"/>
          <input-error :message="error?.errors?.birthday"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" v-if="!selectedStudyStatus">
          <input-field label="Select study Status" :icon-end="chevronDownOutline" required :readonly="true" @clickItem="selectStudyStatus"/>
        </ion-col>
        <ion-col size="12" v-if="selectedStudyStatus">
          <input-field v-model="form.study_status_id" label="Select study Status" :icon-end="chevronDownOutline" required/>
          <input-error :message="error?.errors?.study_status_id"/>
        </ion-col>
      </ion-row>
      <ion-row v-if="selectedStudyStatus">
        <ion-col size="12">
          <input-field v-model="form.school_id" label="Select your school" :icon-end="chevronDownOutline" required/>
          <input-error :message="error?.errors?.school_id"/>
        </ion-col>
      </ion-row>
      <ion-row v-if="selectedStudyStatus">
        <ion-col size="12">
          <input-field v-model="form.curriculum_id" label="Select your Curriculm" :icon-end="chevronDownOutline" required/>
          <input-error :message="error?.errors?.curriculum_id"/>
        </ion-col>
      </ion-row>
      <ion-row v-if="selectedStudyStatus">
        <ion-col size="12">
          <input-field v-model="Study_level_id" label="Select study level" :icon-end="chevronDownOutline" required/>
          <input-error :message="error?.errors?.Study_level_id"/>
        </ion-col>
      </ion-row>
      <ion-row v-if="selectedStudyStatus">
        <ion-col size="12">
          <input-field v-model="form.grade_scale_id" label="Select your Grade Scale" :icon-end="chevronDownOutline" required/>
          <input-error :message="error?.errors?.grade_scale_id"/>
        </ion-col>
      </ion-row>
      <ion-row v-if="selectedStudyStatus">
        <ion-col size="12">
          <input-field v-model="form.grades" label="Your Last Grades" required/>
          <input-error :message="error?.errors?.grades"/>
        </ion-col>
      </ion-row>
      <ion-row class="d-bottom">
        <ion-col size="12" class="ion-padding">
          <ion-button class="border-20" expand="block" @click="next">{{ $t('Step 2 select Program') }}</ion-button>
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
import {calendarOutline, chevronDownOutline} from 'ionicons/icons';
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
      birthday: "",
      study_status_id: "",
      grade_scale_id: "",
      grades: "",
      school_id: "",
      curriculum_id: ""
    })
    const Study_level_id = ref('');
    const selectedStudyStatus = ref(false);
    const selectStudyStatus = () => {
      selectedStudyStatus.value = true;
    }
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
      form.birthday = user.value?.user_bio?.birthday
      selectedDate.value = user.value?.user_bio?.birthday !== null ? user.value?.user_bio?.birthday : '';
    })
    watch(selectedDate, (new_date) => {
      if (!new_date) return;
      form.birthday = format(parseISO(new_date), 'yyyy-MM-dd')
    });
    watch(user, () => {
      form.birthday = user.value?.user_bio?.birthday
      selectedDate.value = user.value?.user_bio?.birthday !== null ? user.value?.user_bio?.birthday : '';
    })
    return {
      calendarOutline,
      chevronDownOutline,
      form,
      selectedDate,
      next,
      error,
      openModel,
      isOpen,
      closeModel,
      selectStudyStatus,
      selectedStudyStatus,
      Study_level_id
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

ion-item {
  width: 100%;
  --border-color: #92949c;
  --ion-color-base: #92949c !important;
}
ion-item::part(native) {
  border-radius: 15px;
  filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
  border-color: #bcbcbc;
}
</style>