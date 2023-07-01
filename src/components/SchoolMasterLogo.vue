<template>
  <ion-img :src='logoUrl' style="width: 300px"/>
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
    const {locale} = useI18n();
    const darkMode = userDarkModeStore();
    const is_dark_mode = computed(() => darkMode.prefersDark);
    const lang = computed(()=>locale.value);
    const logoUrl = computed(() => {
      let addLang = ['tr','ar'].includes(lang.value) ? `${lang.value}-` : '';
      return is_dark_mode.value ? 'assets/logos/ur-logo-for-light.svg' : `assets/logos/${addLang}ur-logo-for-dark.svg`;
    });
    return {logoUrl};
  }
});
</script>

<style scoped>

</style>