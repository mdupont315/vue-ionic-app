<template>
  <setup-profile-layout step="3">
    <template #header>{{ $t('School Information') }}</template>
    <ion-grid>
      <ion-row>
        <ion-col>
          <searchable-select v-model="form.school_id" :items="schools" label="Your School"
                             text-property="school_name" value-property="id" :loading="(!schools.length || loading_schools)"/>
          <input-error :message="error?.errors?.school_id"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <searchable-select v-model="form.curriculum_id" :items="curriculums" label="Your Curriculum"
                             text-property="title" value-property="id" :loading="!curriculums"/>
          <input-error :message="error?.errors?.curriculum_id"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-item lines="full" fill="outline" mode="md">
            <ion-label v-if="[0,1].includes(form.still_studying)" color="medium" position="stacked">
              {{ $t('Your Study Status') }}
            </ion-label>
            <ion-label v-else color="medium">{{ $t('Select Study Status') }}</ion-label>
            <ion-select mode="ios" interface="action-sheet" v-model="form.still_studying">
              <ion-select-option v-for="status in study_statuses" :key="`status-${status.id}`" :value="status.id">
                {{ $t(status.title) }}
              </ion-select-option>
            </ion-select>
          </ion-item>
          <input-error :message="error?.errors?.still_studying"/>
        </ion-col>
      </ion-row>
      <div v-if="form.still_studying == 1">
        <ion-row>
          <ion-col>
            <ion-item lines="full" fill="outline" mode="md">
              <ion-label v-if="form.study_level_id && studyLevels.length" color="medium" position="stacked">
                {{ $t('Your Study Level') }}
              </ion-label>
              <ion-label v-else color="medium">{{ $t('Select Study Level') }}</ion-label>
              <ion-spinner v-if="!studyLevels.length" slot="end" color="secondary"/>
              <ion-select mode="ios" interface="action-sheet" v-model="form.study_level_id"
                          :disabled="!studyLevels.length">
                <ion-select-option v-for="scale in studyLevels" :key="`grade-${scale.id}`" :value="scale.id">
                  {{ scale.translated_name || scale.title }}
                </ion-select-option>
              </ion-select>
            </ion-item>
            <input-error :message="error?.errors?.study_level_id"/>
          </ion-col>
        </ion-row>
      </div>
      <div v-if="form.still_studying == 0">
        <ion-row>
          <ion-col>
            <ion-item lines="full" fill="outline" mode="md">
              <ion-label v-if="form.grade_scale_id && scales.length" color="medium" position="stacked">
                {{ $t('Your Grade Scale') }}
              </ion-label>
              <ion-label v-else color="medium">{{ $t('Select Grade Scale') }}</ion-label>
              <ion-spinner v-if="!scales.length" slot="end" color="secondary"/>
              <ion-select mode="ios" interface="action-sheet" v-model="form.grade_scale_id"
                          :disabled="!scales.length">
                <ion-select-option v-for="scale in scales" :key="`grade-${scale.id}`" :value="scale.id">
                  {{ scale.title }}
                </ion-select-option>
              </ion-select>
            </ion-item>
            <input-error :message="error?.errors?.grade_scale_id"/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <input-field v-model="form.grades" label="Your Grades" type="number"/>
            <input-error :message="error?.errors?.grades"/>
          </ion-col>
        </ion-row>
      </div>
      <ion-row>
        <ion-col size="12">
          <ion-button expand="block" @click="next">{{ $t('Next') }}</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </setup-profile-layout>
</template>

<script lang="ts">
import {useAuthStore, useCommonDataStore, useLoadingStore, useSetupProfileStore, useTranslationStore} from "@/store";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
} from "@ionic/vue";
import {computed, defineComponent, onBeforeMount, reactive, watch} from "vue";
import InputError from "@/components/InputError.vue";
import {usePages, useSchool, useToast} from "@/shared";
import InputField from "@/components/InputField.vue";
import SetupProfileLayout from "@/views/User/SetupProfile/layout/SetupProfileLayout.vue";
import {checkmark} from 'ionicons/icons';
import SearchableSelect from "@/components/SearchableSelect.vue";

export default defineComponent({
  components: {
    SearchableSelect,
    SetupProfileLayout,
    InputField,
    IonSpinner,
    IonSelect,
    IonSelectOption,
    InputError,
    IonLabel,
    IonButton,
    IonItem,
    IonGrid,
    IonRow,
    IonCol,
  },
  setup() {
    const langStore = useTranslationStore();
    const lang = computed(() => langStore.locale);
    const commonDataStore = useCommonDataStore();
    const curriculums = computed(() => commonDataStore.curriculums);
    const scales = computed(() => commonDataStore.scales);
    const studyLevels = computed(() => commonDataStore.studyLevels);
    const {study_statuses} = commonDataStore;
    const store = useSetupProfileStore();
    const userStore = useAuthStore();
    const user = computed(() => userStore.user);
    const {setProfileData} = userStore;
    const {showLoading, hideLoading} = useLoadingStore();
    const {checkoutSetupProfileStep} = usePages();
    const {showToast} = useToast();
    const {schools, loading_schools,loadSchools} = useSchool();
    const error = computed(() => store.error);
    const form = reactive({
      school_id: '',
      curriculum_id: '',
      grade_scale_id: '',
      grades: '',
      still_studying: '',
      study_level_id: '',
    });
    const next = async () => {
      showLoading();
      await store.submitStepThree(form).then((res) => {
        hideLoading()
        if (!res) {
          return;
        }
        const {data} = res;
        setProfileData(data);
        showToast({message: 'Info Updated!', color: 'primary', position: 'bottom'});
        return checkoutSetupProfileStep(4);
      });
    };
    const setData = () => {
      form.school_id = user.value?.campus_id
      form.curriculum_id = user.value?.user_bio.curriculum_id
      form.grade_scale_id = user.value?.user_bio.grade_scale_id
      form.grades = user.value?.user_bio.grades
      form.still_studying = user.value?.user_bio.still_studying;
      form.study_level_id = user.value?.user_bio.study_level_id;
    }
    onBeforeMount(() => {
      setData();
    });
    watch(user, () => {
      setData();
    })
    watch(lang, async () => {
      await loadSchools()
    });

    return {
      form,
      schools,
      loading_schools, scales, curriculums, study_statuses, studyLevels,
      next,
      error,
      checkmark
    };
  },
});
</script>
<style scoped>
.ion-no-shadow {
  --box-shadow: 0 !important;
}
</style>