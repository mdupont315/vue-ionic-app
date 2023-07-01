<template>
  <ion-cont style="display: flex;">
    <ion-text class="ion-text-center start-txt s-line">
      <p style="margin: 9px 2px; margin-right: 1.5rem; color: #fff;">
        {{ currentLanguage }}
      </p>
    </ion-text>
    <ion-button @click="changeLanguage" fill="outline" size="small" style="text-transform: none; --border-color: #fff;">
      <ion-text color="light">
        <p class="ion-text-center s-line">
          {{ $t('Pick a Language') }}
          <ion-icon :icon="chevronDownOutline"/>
        </p>
      </ion-text>
    </ion-button>
  </ion-cont>
</template>

<script>
import {defineComponent, computed, ref} from "vue";
import {IonIcon, actionSheetController, IonButton} from "@ionic/vue";
import {useI18n} from "vue-i18n";
import {chevronDownOutline} from 'ionicons/icons';
import {useAuthStore, useCommonDataStore, useLoadingStore, useTranslationStore} from "@/store";


export default defineComponent({
  props: {
    slot: {
      type: String,
      default: () => 'default'
    }
  },
  components: {
    IonIcon,
    IonButton,
  },
  setup() {
    const {showLoading, hideLoading} = useLoadingStore();
    const store = useAuthStore();
    const isLoggedIn = computed(() => store.isLoggedIn);
    const {loadData} = useCommonDataStore();
    const {locale, t} = useI18n({useScope: "global"});
    const {setLocale} = useTranslationStore();
    var currentLanguage = ref("English");
    const changeLanguage = async () => {
      const actionSheet = await actionSheetController.create({
        mode: "ios",
        header: t('Change Language'),
        buttons: [
          {
            text: 'English',
            data: 'en'
          },
          {
            text: 'عربي',
            data: "ar"
          },

          {
            text: 'Türk',
            data: 'tr'
          },
          {
            text: t('Cancel'),
            role: 'cancel',
          },
        ],
      });

      await actionSheet.present();
      const res = await actionSheet.onDidDismiss();
      if (!res.data) {
        return;
      }
      if (locale.value == res.data) {
        return;
      }
      locale.value = res.data;
      if (res.data == 'en') currentLanguage.value = "English";
      if (res.data == 'ar') currentLanguage.value = "عربي";
      if (res.data == 'tr') currentLanguage.value = "Türk";
      
      setLocale(locale.value);
      if (!isLoggedIn.value) {
        return;
      }
      showLoading();
      Promise.all([loadData(true)]).then(() => {
        hideLoading();
      })

    };

    return {chevronDownOutline, changeLanguage, currentLanguage}
  }
})
</script>

<style scoped>
ion-icon {
  color: #fff;
  margin-left: 1rem;
}
</style>