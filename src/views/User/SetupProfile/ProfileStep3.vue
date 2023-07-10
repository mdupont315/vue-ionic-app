<template>
  <setup-profile-layout step="2">
    <ion-grid>
      <ion-row>
        <ion-col size="12">
          <ion-text>{{  $t('Select up to 5 Majors of what do you want to study.') }}</ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-text class="d-optoin"><p>{{  $t('1st Major Option') }}</p></ion-text>
          <searchable-select sClass="f-item" v-model="form[0].discipline_id" :items="disciplines"
                             text-property="title" value-property="id" 
                             label="Study Discipline" stitle="Select Study Discipline"
                             :loading="!disciplines" :icon-end="chevronDownOutline" @change="getEachMajors(0)"/>
          <searchable-select sClass="s-item" v-model="form[0].major_id" :items="majors_arry[0]"
                             text-property="title" value-property="id" 
                             label="Study Major" stitle="Major City"
                             :loading="(!form[0].majorLoading || !majors_arry[0].length)" :icon-end="chevronDownOutline" />
          <input-error :message="error?.errors?.discipline_id || error?.errors?.major_id"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-txt class="d-optoin"><p>{{  $t('2nd Major Option') }}</p></ion-txt>
          <searchable-select sClass="f-item" v-model="form[1].discipline_id" :items="disciplines"
                             text-property="title" value-property="id" 
                             label="Study Discipline" stitle="Select Study Discipline"
                             :loading="!disciplines" :icon-end="chevronDownOutline" @change="getEachMajors(1)"/>
          <searchable-select sClass="s-item" v-model="form[1].major_id" :items="majors_arry[1]"
                             text-property="title" value-property="id" 
                             label="Study Major" stitle="Major City"
                             :loading="(!form[1].majorLoading || !majors_arry[1].length)" :icon-end="chevronDownOutline" />
          <input-error :message="error?.errors?.discipline_id || error?.errors?.major_id"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-txt class="d-optoin"><p>{{  $t('3rd Major Option') }}</p></ion-txt>
          <searchable-select sClass="f-item" v-model="form[2].discipline_id" :items="disciplines"
                             text-property="title" value-property="id" 
                             label="Study Discipline" stitle="Select Study Discipline"
                             :loading="!disciplines" :icon-end="chevronDownOutline" @change="getEachMajors(2)"/>
          <searchable-select sClass="s-item" v-model="form[2].major_id" :items="majors_arry[2]"
                             text-property="title" value-property="id" 
                             label="Study Major" stitle="Major City"
                             :loading="(!form[2].majorLoading || !majors_arry[2].length)" :icon-end="chevronDownOutline" />
          <input-error :message="error?.errors?.discipline_id || error?.errors?.major_id"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-txt class="d-optoin"><p>{{  $t('4th Major Option') }}</p></ion-txt>
          <searchable-select sClass="f-item" v-model="form[3].discipline_id" :items="disciplines"
                             text-property="title" value-property="id" 
                             label="Study Discipline" stitle="Select Study Discipline"
                             :loading="!disciplines" :icon-end="chevronDownOutline" @change="getEachMajors(3)"/>
          <searchable-select sClass="s-item" v-model="form[3].major_id" :items="majors_arry[3]"
                             text-property="title" value-property="id" 
                             label="Study Major" stitle="Major City"
                             :loading="(!form[3].majorLoading || !majors_arry[3].length)" :icon-end="chevronDownOutline" />
          <input-error :message="error?.errors?.discipline_id || error?.errors?.major_id"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-txt class="d-optoin"><p>{{  $t('5th Major Option') }}</p></ion-txt>
          <searchable-select sClass="f-item" v-model="form[4].discipline_id" :items="disciplines"
                             text-property="title" value-property="id" 
                             label="Study Discipline" stitle="Select Study Discipline"
                             :loading="!disciplines" :icon-end="chevronDownOutline" @change="getEachMajors(4)"/>
          <searchable-select sClass="s-item" v-model="form[4].major_id" :items="majors_arry[3]"
                             text-property="title" value-property="id" 
                             label="Study Major" stitle="Major City"
                             :loading="(!form[4].majorLoading || !majors_arry[4].length)" :icon-end="chevronDownOutline" />
          <input-error :message="error?.errors?.discipline_id || error?.errors?.major_id"/>
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
      await store.submitStepTwo({
        majors: form
      }).then((res) => {
        hideLoading()
        if (!res) {
          return;
        }
        const {data} = res;
        setProfileData(data);
        showToast({message: 'Info Updated!', color: 'primary', position: 'bottom'});
        return checkoutSetupProfileStep(3);
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