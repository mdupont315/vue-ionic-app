<template>
  <ion-img :src='logoUrl' style="max-width: 140px"/>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {IonImg} from "@ionic/vue";
import {userDarkModeStore} from "@/store";
import {useI18n} from "vue-i18n";

export default defineComponent({
  components: {
    IonImg
  },
  setup() {
    const darkMode = userDarkModeStore();
    const is_dark_mode = computed(()=>darkMode.prefersDark);
    const {locale} = useI18n();
    const lang = computed(()=>locale.value);
    const logoUrl = computed(() => {
      let addLang = ['tr','ar'].includes(lang.value) ? `${lang.value}-` : '';
      return is_dark_mode.value ? `assets/logos/${addLang}ur-text-for-dark.png` : `assets/logos/${addLang}ur-text-for-light.png`;
    });
    return {logoUrl};
  }
});
</script>

<style scoped>

</style>