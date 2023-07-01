<template>
  <ion-page>
    <ion-header class="ion-no-border" collapse="fade" :translucent="true" mode="ios">
      <ion-toolbar mode="ios">
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title style="display:grid;" class="ion-justify-content-center">
          <school-master-logo-horizontal/>
        </ion-title>
        <language-switch slot="end"/>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" :fullscreen="true">
      <ion-grid>
        <ion-row v-if="loading_student || !student_data">
          <ion-col>
            <ion-list>
              <ion-list-header>
                <ion-skeleton-text :animated="true" style="width: 80px"></ion-skeleton-text>
              </ion-list-header>
              <ion-item>
                <ion-thumbnail slot="start">
                  <ion-skeleton-text :animated="true"></ion-skeleton-text>
                </ion-thumbnail>
                <ion-label>
                  <h3>
                    <ion-skeleton-text :animated="true" style="width: 80%;"></ion-skeleton-text>
                  </h3>
                  <p>
                    <ion-skeleton-text :animated="true" style="width: 60%;"></ion-skeleton-text>
                  </p>
                  <p>
                    <ion-skeleton-text :animated="true" style="width: 30%;"></ion-skeleton-text>
                  </p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        <ion-row v-else>
          <ion-col>
            <ion-list>
              <ion-list-header>
                <ion-label color="primary"><h1>{{$t('Lead Details')}}</h1></ion-label>
              </ion-list-header>
              <ion-item lines="none">
                <ion-thumbnail slot="start">
                  <ion-img v-show="!isLoading" :src="student_data.profile_photo_url"
                           @ionImgWillLoad="imgStartedLoading"
                           @ionImgDidLoad="imgLoaded"
                           style=""/>
                  <ion-skeleton-text v-if="isLoading" :animated="true"></ion-skeleton-text>
                </ion-thumbnail>
                <ion-label color="primary">
                  <h3><b>{{ student_data.name }}</b></h3>
                  <p>
                    <ion-text color="primary"><b>Sid:</b> {{ student_data.id }}</ion-text>
                  </p>
                  <p>
                    <ion-text color="primary"><b>Status: </b></ion-text>
                    <ion-text color="success">Match</ion-text>
                  </p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-col>
          <ion-col size="12">
            <ion-item :dir="dir" lines="full" fill="outline" mode="md">
              <ion-label position="floating">{{ $t('Notes') }}</ion-label>
              <ion-textarea :dir="dir" color="primary" auto-grow v-model="form.notes" clear-on-edit
                            rows="5"></ion-textarea>
            </ion-item>
          </ion-col>
          <ion-col size="12">
            <ion-button expand="block" color="primary" @click="saveLead">{{$t('Save')}}</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, ref} from 'vue';
import {
  IonTextarea,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSkeletonText,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import SchoolMasterLogoHorizontal from "@/components/SchoolMasterLogoHorizontal.vue";
import {useI18nHelpers, useLeads} from "@/shared";
import LanguageSwitch from "@/components/LanguageSwitch.vue";

// declare let window: any; // Don't forget this part!
export default defineComponent({
  components: {
    IonTextarea,
    LanguageSwitch,
    IonButtons,
    IonLabel,
    IonItem,
    IonList,
    IonListHeader,
    IonButton,
    SchoolMasterLogoHorizontal,
    IonSkeletonText,
    IonThumbnail,
    IonText, IonImg, IonGrid, IonRow, IonCol,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  setup() {
    const {dir} = useI18nHelpers();
    const isLoading = ref(false);

    const imgStartedLoading = () => {
      isLoading.value = true;
      // console.info("Image Started Loading");
    }
    const imgLoaded = () => {
      isLoading.value = false;
      // console.info("Image Started Loaded");
    }
    const {saveLead,checkLead, form, student_data, loading_student} = useLeads();
    onBeforeMount(()=>{checkLead()})
    return {saveLead, form, student_data, loading_student,isLoading,imgLoaded,imgStartedLoading,dir}
  },
});
</script>

<style scoped>
ion-thumbnail {
  --size: 200px;
  /*--border-radius: 14px;*/
}

body.scanner-active {
  --background: transparent;
  --ion-background-color: transparent;
}
</style>
