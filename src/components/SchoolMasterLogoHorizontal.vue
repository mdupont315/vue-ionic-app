<template>
  <ion-img :src='logoUrl' style="max-width: 140px"/>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {IonImg} from "@ionic/vue";
import {useI18n} from "vue-i18n";

export default defineComponent({
  components: {
    IonImg
  },
  setup() {
    const {locale} = useI18n();
    const lang = computed(()=>locale.value);
    const logoUrl = computed(() => {
      let addLang = ['tr','ar'].includes(lang.value) ? `${lang.value}-` : '';
      return `assets/logos/${addLang}ur-text-for-light.png`;
    });
    return {logoUrl};
  }
});
</script>

<style scoped>

</style>