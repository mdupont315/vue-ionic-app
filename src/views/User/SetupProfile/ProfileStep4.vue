<template>
  <setup-profile-layout step="4">
    <template #header>{{ $t('What do you want to study?') }}</template>
    <ion-grid>
      <ion-row v-for="i in 5" :key="`item-${i}`">
        <ion-col>
          <searchable-select v-model="form[(i-1)]" label="You Want to Study" :items="all_majors" text-property="title" value-property="id"
                             :loading="!all_majors.length" clearable />
          <input-error :message="error[`majors.${(i-1)}`] || ''"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-button expand="block" @click="next">{{ $t('Next') }}</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </setup-profile-layout>
</template>

<script lang="ts">
import {useAuthStore, useCommonDataStore, useLoadingStore, useSetupProfileStore} from "@/store";
import {close} from 'ionicons/icons';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/vue";
import {computed, defineComponent, onBeforeMount, ref, watch} from "vue";
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
  },
  setup() {
    const commonDataStore = useCommonDataStore();
    const all_majors = computed(() => commonDataStore.majors);
    const store = useSetupProfileStore();
    const userStore = useAuthStore();
    const userMajors = computed(() => userStore.user?.profile_data?.majors);
    const {setProfileData} = userStore;
    const {showLoading, hideLoading} = useLoadingStore();
    const {checkoutSetupProfileStep} = usePages();
    const {showToast} = useToast();
    const error = computed(() => store.error);
    const form = ref([])

    const next = async () => {
      showLoading();
      let majors = Object.values(form.value).filter((value) => !!value);
      await store.submitStepFour({majors}).then((res) => {
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

    onBeforeMount(async () => {
      form.value = userMajors.value || [];
    })

    watch(userMajors, () => {
      form.value = userMajors.value || [];
    })

    return {
      form,
      all_majors,
      next,
      error,
      close
    }
  },
});
</script>
<style scoped>

</style>