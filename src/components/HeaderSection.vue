<template>
    <ion-header class="ion-no-border" mode="ios" collapse="fade" :translucent="true">
      <ion-toolbar>
        <ion-title class="ion-text-center" color="primary"></ion-title>
        <ion-img :src='imgUrl'/>
      </ion-toolbar>
    </ion-header>
  </template>
  
  <script lang="ts">
  import {computed, defineComponent} from 'vue';
  import {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonImg
  } from "@ionic/vue";
  import {userDarkModeStore} from "@/store";
  
  export default defineComponent({
    components: {
      IonHeader,
      IonTitle,
      IonToolbar,
      IonImg
    },
    setup() {
      const darkMode = userDarkModeStore();
      const is_dark_mode = computed(() => darkMode.prefersDark);
      const imgUrl = computed(() => {
        return is_dark_mode.value ? 'assets/images/header.svg' : `assets/images/header.svg`;
      });
      return {imgUrl};
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
  </style>