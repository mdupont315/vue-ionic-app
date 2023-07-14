<template>
  <setup-profile-layout step="3">
    <ion-grid>
      <ion-row>
        <ion-col size="12">
          <ion-text>{{  $t('Select up to 5 Majors of what do you want to study.') }}</ion-text>
        </ion-col>
      </ion-row>
      <ion-row v-for="(item, index) in form" :key="index">
        <ion-col size="12">
          <ion-text class="d-optoin"><p>{{  $t(`${orderText[index]} Major Option`) }}</p></ion-text>
          <searchable-select sClass="f-item" v-model="form[index].discipline_id" :items="disciplines"
                             text-property="title" value-property="id" 
                             label="Study Discipline" stitle="Select Study Discipline"
                             :loading="!disciplines" :icon-end="chevronDownOutline" @change="getEachMajors(index)"/>
          <searchable-select sClass="s-item" v-model="form[index].major_id" :items="majors_arry[index]"
                             text-property="title" value-property="id" 
                             label="Study Major" stitle="Major City"
                             :loading="(!form[index].majorLoading || !majors_arry[index].length)" :icon-end="chevronDownOutline" />
          <input-error :message="error?.errors?.[`majors.${orderText[index]}.discipline_id`] || error?.errors?.[`majors.${orderText[index]}.major_id`]"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="ion-padding-top w-100">
          <ion-button class="border-20" expand="block" @click="next">{{ $t('Step 4 Pick Your Hobbies') }}</ion-button>
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
import {computed, defineComponent, onBeforeMount, reactive, watch} from "vue";
import InputError from "@/components/InputError.vue";
import {usePages, useToast, useMajors} from "@/shared";
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
    const disciplines = computed(() => commonDataStore.disciplines);
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
      {discipline_id: "", major_id: "", majorLoading: true},
      {discipline_id: "", major_id: "", majorLoading: true},
      {discipline_id: "", major_id: "", majorLoading: true},
      {discipline_id: "", major_id: "", majorLoading: true},
      {discipline_id: "", major_id: "", majorLoading: true}
    ]);
    const majors_arry = reactive([
      [], [], [], [], []
    ])

    const getEachMajors =async (id: number) => {
      majors_arry[id] = await useMajors(form[id].discipline_id);
      form[id].majorLoading = true;
    }
    const next = async () => {
      showLoading();
      const nForm = new FormData();
      form.forEach((element, index) => {
        nForm.append(`majors[${index}][discipline_id]`, element.discipline_id)
        nForm.append(`majors[${index}][major_id]`, element.major_id)
      });
      await store.submitStepThree(nForm).then((res) => {
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

    return {
      disciplines,
      next,
      error,
      chevronDownOutline,
      form,
      majors_arry,
      getEachMajors,
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
</style>