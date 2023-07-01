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
        <ion-buttons slot="end">
          <language-switch slot="end"/>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" :fullscreen="true">
      <ion-grid :dir="dir">
        <ion-col size="12">
          <ion-text color="primary"><p style="margin:0" class="ion-text-center">{{ $t('Welcome') }} {{ user?.name }}</p>
          </ion-text>
        </ion-col>
        <ion-row>
          <ion-col size="4" class="user_dp" style="padding: 0;">
              <ion-thumbnail>
                <ion-img v-show="!isLoading || !user?.profile_photo_url" :src="user?.profile_photo_url"
                         @ionImgWillLoad="imgStartedLoading"
                         @ionImgDidLoad="imgLoaded"
                />
                <ion-skeleton-text v-if="isLoading" :animated="true"></ion-skeleton-text>
              </ion-thumbnail>
          </ion-col>
          <ion-col size="8">
            <ion-text color="primary">
              <p style="margin:0">{{ user?.user_bio?.study_level?.title || $t('Graduated') }} <br>
                {{ $t('Looking to study') }} {{ user?.major?.title }} {{ $t('in') }} {{
                  user?.destination?.country_name
                }}
              </p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col style="display: flex" class="ion-justify-content-center">
            <vue-qrcode :value="user?.id" :options="{width: 300, color:{
              dark: '#19335a',
              light: '#fff'
            },}"/>
          </ion-col>
        </ion-row>
      </ion-grid>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import {
  // IonAvatar,
  IonThumbnail,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import {useAuthStore} from "@/store";
import SchoolMasterLogoHorizontal from "@/components/SchoolMasterLogoHorizontal.vue";
import LanguageSwitch from "@/components/LanguageSwitch.vue";
import {useI18nHelpers} from "@/shared";


export default defineComponent({
  name: 'HomePage',
  components: {
    // IonAvatar,
    LanguageSwitch,
    SchoolMasterLogoHorizontal,
    IonSkeletonText,
    IonThumbnail,
    VueQrcode,
    IonText, IonImg, IonGrid, IonRow, IonCol,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  setup() {
    const authStore = useAuthStore();
    const user = computed(() => authStore.user)
    const isLoading = ref(false);
    const imgStartedLoading = () => {
      isLoading.value = true;
      // console.info("Image Started Loading");
    }
    const imgLoaded = () => {
      isLoading.value = false;
      // console.info("Image Started Loaded");
    }
    const {dir} = useI18nHelpers();
    return {user, isLoading, imgStartedLoading, imgLoaded, dir}
  },
  mounted() {
    // const store = useAuthStore();
    // store.logout();
  }
});
</script>

<style scoped>
.user_dp {
  display: flex;
  justify-content: center;
  //border: solid 1px var(--ion-color-primary);
}

ion-thumbnail {
  --size: 100px;
  --border-radius: 2px;
  border: solid 1px var(--ion-color-primary);
}

ion-avatar {
  --border-radius: none;
}
</style>
