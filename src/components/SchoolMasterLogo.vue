<template>
  <ion-img :src='logoUrl' style="width: 300px"/>
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
    const logoUrl = 'assets/logos/ur-logo-for-light.svg';
    return {logoUrl};
  }
});
</script>

<style scoped>

</style>