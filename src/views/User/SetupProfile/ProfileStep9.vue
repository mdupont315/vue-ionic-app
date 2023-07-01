<template>
  <setup-profile-layout step="9">
    <template #header>{{ $t('Upload your photo') }}</template>
    <ion-grid>
      <ion-row>
        <ion-col style="display: flex" class="ion-justify-content-center">
          <ion-button @click="takePicture" fill="outline">
            <ion-icon :icon="camera" color="primary" size="large"/>
          </ion-button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col style="display: flex" class="ion-justify-content-center">
          <input-error :message="error.image"/>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col style="display: flex" class="ion-justify-content-center">
          <ion-thumbnail v-if="imageUrl" size="200">
            <ion-img :src="imageUrl?.webPath" class="user_dp"/>
          </ion-thumbnail>
          <ion-thumbnail v-else size="200">
            <ion-img v-show="!isLoading && userPhoto" :src="userPhoto" @ionImgWillLoad="imgStartedLoading"
                     @ionImgDidLoad="imgLoaded"/>
            <ion-skeleton-text v-if="isLoading" :animated="true"></ion-skeleton-text>
          </ion-thumbnail>

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
import {useAuthStore, useLoadingStore, useSetupProfileStore} from "@/store";
import {IonButton, IonCol, IonGrid, IonIcon, IonImg, IonRow, IonSkeletonText, IonThumbnail} from "@ionic/vue";
import {computed, defineComponent, ref, watch} from "vue";
import {useRouter} from "vue-router";
import InputError from "@/components/InputError.vue";
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {camera} from 'ionicons/icons';
import {useToast} from "@/shared";
import SetupProfileLayout from "@/views/User/SetupProfile/layout/SetupProfileLayout.vue";

export default defineComponent({
  components: {
    SetupProfileLayout,
    IonSkeletonText,
    IonThumbnail,
    IonIcon,
    IonImg,
    InputError,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
  },
  setup() {
    const userStore = useAuthStore();
    const user = computed(() => userStore.user);
    const userPhoto = ref(user.value?.profile_photo_url)
    const {setProfileData} = userStore;
    const store = useSetupProfileStore();
    const {showLoading, hideLoading} = useLoadingStore();
    const {showToast} = useToast();
    const imageUrl = ref('');
    const selectedPhoto = ref<Blob>();
    const isLoading = ref(false);
    const imgStartedLoading = () => {
      isLoading.value = true;
      // console.info("Image Started Loading");
    }
    const imgLoaded = () => {
      isLoading.value = false;
      // console.info("Image Started Loaded");
    }


    const takePicture = async () => {
      const status = await Camera.requestPermissions();
      if (status.camera == 'granted' || status.photos == 'granted') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        imageUrl.value = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          width:512,
          height:512,
          resultType: CameraResultType.Uri,
          source: CameraSource.Prompt,

        }).catch(() => {
          showToast({message: 'No Image Selected', color: 'danger'})
        });
        return;
      } else {
        showToast({message: "Camera Permission Denied!", color: "danger", position: "bottom"})
      }
    };
    const error = computed(() => store.error);
    const router = useRouter();
    watch(user, () => {
      userPhoto.value = user.value?.profile_photo_url
    })
    const next = async () => {
      showLoading();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-unsafe-optional-chaining
      const {webPath} = imageUrl?.value;
      if (webPath) {
        selectedPhoto.value = await fetch(webPath).then((r) => r.blob());
      }

      const formData = new FormData();
      formData.append('image', selectedPhoto.value || '');
      store.submitStepNine(formData).then((res) => {
        hideLoading()
        if (!res) {
          return;
        }
        const {data} = res;
        setProfileData(data);
        showToast({message: 'Info Updated!', color: 'primary', position: 'bottom'});
        router.replace('/home');
      }).finally(() => selectedPhoto.value = new Blob()).catch(() => {
        hideLoading();
      })
    }

    return {
      camera,
      takePicture,
      userPhoto,
      imageUrl,
      next,
      error,
      imgStartedLoading,
      imgLoaded,
      isLoading,
    };
  },
});
</script>
<style scoped>
ion-thumbnail {
  --size: 200px;
  /*--border-radius: 14px;*/
  /*border: solid 1px var(--ion-color-primary);*/
}

.user_dp {
  min-width: 200px;
  min-height: 200px;
  max-height: 200px;
  max-width: 200px;
}
</style>