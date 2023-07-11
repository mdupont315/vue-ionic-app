<template>
  <setup-profile-layout step="1">
    <ion-grid>
      <ion-row>
        <ion-col size="12" class="ion-padding-bottom">
          <input-field v-model="form.birthday" label="Date of Birth" placeholder="Example: 1995-09-13"
                       :icon-start="calendarOutline" @clickIconStart="openModel"/>
          <input-error :message="error?.errors?.birthday"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="ion-padding-bottom" v-if="!selectedStudyStatus">
          <input-field label="Select study Status" :icon-end="chevronDownOutline" required :readonly="true" @clickItem="selectStudyStatus"/>
          <input-error :message="error?.errors?.study_status_id"/>
        </ion-col>
        <ion-col size="12" class="ion-padding-bottom" v-if="selectedStudyStatus">
          <searchable-select v-model="form.study_status_id" :items="studyStatuses"
                             text-property="title" value-property="id" 
                             label="Select study Status" stitle="Select study Status"
                             :loading="!studyStatuses" :icon-end="chevronDownOutline" />
          <input-error :message="error?.errors?.study_status_id"/>
        </ion-col>
      </ion-row>
      <ion-row v-if="selectedStudyStatus">
        <ion-col size="12" class="ion-padding-bottom">
          <searchable-select v-model="form.school_id" :items="schools"
                             text-property="title" value-property="id" 
                             label="Select your school" stitle="Select your school"
                             :loading="!schools" :icon-end="chevronDownOutline" />
          <input-error :message="error?.errors?.school_id"/>
        </ion-col>
      </ion-row>
      <ion-row v-if="selectedStudyStatus">
        <ion-col size="12" class="ion-padding-bottom">
          <searchable-select v-model="form.curriculum_id" :items="curriculums"
                             text-property="title" value-property="id" 
                             label="Select your Curriculm" stitle="Select your Curriculm"
                             :loading="!curriculums" :icon-end="chevronDownOutline" />
          <input-error :message="error?.errors?.curriculum_id"/>
        </ion-col>
      </ion-row>
      <ion-row v-if="selectedStudyStatus && form.study_status_id == '2'">
        <ion-col size="12" class="ion-padding-bottom">
          <searchable-select v-model="study_level_id" :items="studyLevels"
                             text-property="title" value-property="id" 
                             label="Select study level" stitle="Select study level"
                             :loading="!studyLevels" :icon-end="chevronDownOutline" />
          <input-error :message="error?.errors?.study_level_id"/>
        </ion-col>
      </ion-row>
      <ion-row v-if="selectedStudyStatus">
        <ion-col size="12" class="ion-padding-bottom">
          <searchable-select v-model="form.grade_scale_id" :items="gradeScales"
                             text-property="title" value-property="id" 
                             label="Select your Grade Scale" stitle="Select your Grade Scale"
                             :loading="!gradeScales" :icon-end="chevronDownOutline" />
          <input-error :message="error?.errors?.grade_scale_id"/>
        </ion-col>
      </ion-row>
      <ion-row v-if="selectedStudyStatus">
        <ion-col size="12" class="ion-padding-bottom">
          <input-field v-model="form.grades" label="Your Last Grades" required/>
          <input-error :message="error?.errors?.grades"/>
        </ion-col>
      </ion-row>
      <ion-row :class="(selectedStudyStatus && form.study_status_id == '2') ? 'w-100': 'd-bottom w-100'">
        <ion-col size="12" class="ion-padding">
          <ion-button class="border-20" expand="block" @click="next">{{ $t(`Step 2 ${form.study_status_id != '3' ? "select Program" : "Where do you want to study?"}`) }}</ion-button>
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

<script>
import {useAuthStore, useSetupProfileStore, useCommonDataStore, useLoadingStore, useTranslationStore} from "@/store";
import {IonButton, IonCol, IonDatetime, IonGrid, IonModal, IonRow,} from "@ionic/vue";
import {format, parseISO} from 'date-fns';
import {computed, defineComponent, onBeforeMount, reactive, ref, watch} from "vue";
import InputError from "@/components/InputError.vue";
import {usePages, useToast, useSchool} from "@/shared";
import {calendarOutline, chevronDownOutline} from 'ionicons/icons';
import InputField from "@/components/InputField.vue";
import SearchableSelect from "@/components/SearchableSelect.vue";
import SetupProfileLayout from "@/views/User/SetupProfile/layout/SetupProfileLayout.vue";


export default defineComponent({
  components: {
    SetupProfileLayout,
    InputField,
    SearchableSelect,
    IonModal,
    IonDatetime,
    InputError,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
  },
  setup() {
    const langStore = useTranslationStore();
    const lang = computed(() => langStore.locale);
    const store = useSetupProfileStore();
    const userStore = useAuthStore();
    const user = computed(() => userStore.user);
    const {setProfileData} = userStore;
    const commonDataStore = useCommonDataStore()
    const {schools, loading_schools,loadSchools} = useSchool();
    const studyStatuses = computed(() => commonDataStore.studyStatuses);
    const curriculums = computed(() => commonDataStore.curriculums);
    const gradeScales = computed(() => commonDataStore.gradeScales);
    const studyLevels = computed(() => commonDataStore.studyLevels);
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
    const study_level_id = ref('');
    const selectedStudyStatus = ref(false);
    const selectStudyStatus = () => {
      selectedStudyStatus.value = true;
    }
    const next = async () => {
      showLoading();
      var _form = form;
      if (form.study_status_id != '3') {
        _form['study_level_id'] = study_level_id.value;
      }
        
      await store.submitStepOne(_form).then((res) => {
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
    });
    watch(selectedDate, (new_date) => {
      if (!new_date) return;
      form.birthday = format(parseISO(new_date), 'yyyy-MM-dd')
    });
    watch(user, () => {
      form.birthday = user.value?.user_bio?.birthday
      selectedDate.value = user.value?.user_bio?.birthday !== null ? user.value?.user_bio?.birthday : '';
    })
    watch(lang, async () => {
      await loadSchools()
    });
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
      study_level_id,
      studyStatuses, 
      gradeScales, 
      studyLevels,
      curriculums,
      schools,
      loading_schools,
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