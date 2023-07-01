<template>
  <ion-page>
    <ion-router-outlet/>
  </ion-page>
</template>

<script lang="ts">
import {computed, defineComponent, onBeforeMount} from 'vue';
import {IonPage, IonRouterOutlet} from '@ionic/vue';
import {useAuthStore, useCommonDataStore, useLoadingStore} from "@/store";

export default defineComponent({
  name: 'SetupProfilePage',
  components: {
    IonRouterOutlet,
    IonPage
  },
  setup() {
    const store = useAuthStore();
    const {loadUserData} = store;
    const commonDataStore = useCommonDataStore()
    const {loadData} = commonDataStore;
    const loaded = computed(() => commonDataStore.dataLoaded);
    const {showLoading, hideLoading} = useLoadingStore();
    onBeforeMount(() => {
      if (!loaded.value) {
        showLoading();
        Promise.all([loadUserData(), loadData()]).then(() => {
          hideLoading();
        })
      }
    });
    return {}
  }

});
</script>