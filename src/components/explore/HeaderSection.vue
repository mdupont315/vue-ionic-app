<template>
  <ion-header class="ion-no-border" mode="ios" collapse="fade" :translucent="true">
    <ion-toolbar>
      <ion-title class="ion-text-center" color="primary"></ion-title>
      <ion-img :src='imgUrl'/>
      <ion-searchbar  :debounce="1000" @ionInput="handleInput($event)"></ion-searchbar>
    </ion-toolbar>
  </ion-header>
</template>
  
<script lang="ts">
  import {computed, defineComponent} from 'vue';
  import {useRouter} from "vue-router";
  import {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonImg,
    IonSearchbar,
  } from "@ionic/vue";
  import {userDarkModeStore} from "@/store";
  
  export default defineComponent({
    components: {
      IonHeader,
      IonTitle,
      IonToolbar,
      IonImg,
      IonSearchbar,
    },
    setup() {
      const router = useRouter();
      const darkMode = userDarkModeStore();
      const is_dark_mode = computed(() => darkMode.prefersDark);
      const imgUrl = computed(() => {
        return is_dark_mode.value ? 'assets/images/header.svg' : `assets/images/header.svg`;
      });
    const handleInput = (event:any) => {
      router.push(`/explore/searchpage/${event.target.value}`);
    }
      return {imgUrl, handleInput};
    }
  });
</script>

<style scoped>
  ion-toolbar {
    position: absolute;
    background: #1c345a;
    text-align: center;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  }
  /* ion-searchbar {

    width: 346px;
    height: 49.6px;

    border-color: #7fc4fd;
    border-width: 1px;
    border-style: solid;
    border-radius: 15px;

    background: #ffffff;
    margin-left: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    text-align: center;
  } */

  ion-searchbar {
    border-color: #7fc4fd;
    border-width: 1px;
    border-style: solid;
    border-radius: 15px;

    background: #ffffff;
    text-align: left;

    width: calc(100% - 20px) !important;
    margin: 15px 10px !important;
    padding: 0 !important;
  }
  ion-searchbar ion-icon {
      right: 5px !important;
      left: auto !important;
  }
  
</style>