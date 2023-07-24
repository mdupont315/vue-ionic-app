<template>
    <ion-footer class="ion-no-border">
      <ion-toolbar>
        <ion-tabs>
          <ion-router-outlet></ion-router-outlet>
          <ion-tab-bar slot="bottom" style="display: flex; flex-flow: row;">
            <!-- <ion-tab-button> -->
                <ion-button @click="$emit('next')">{{ $t(`${title}`) }}</ion-button>
            <!-- </ion-tab-button> -->
        </ion-tab-bar>
        </ion-tabs>
      </ion-toolbar>
    </ion-footer>
  </template>
  
  <script lang="ts">
  import {defineComponent} from 'vue';
  import { 
    IonFooter, 
    IonToolbar, 
    IonTabs, 
    IonRouterOutlet, 
    IonTabBar, 
    IonButton
  } from '@ionic/vue';
  
  export default defineComponent({
    components: {
      IonFooter, 
      IonToolbar, 
      IonTabs, 
      IonRouterOutlet, 
      IonTabBar,  
      IonButton
    },
    props: {
      title:String
    },
  });
  </script>
  
  <style scoped>
  ion-toolbar {
    --background: transparent;
  }
  ion-tab-bar {
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    background: #f5f5f5;
  }
.group-img {
    width: 32.1px;
    height: 22.5px;
    margin-left: 24px;
}
ion-button {
    --background: linear-gradient(-73deg, 
    #436FB2 0.00%, 
    #1C345A 100.00%);
    --background-hover: #9ce0be;
    --background-activated: #88f4be;
    --background-focused: #88f4be;
    --color: white;
    --border-radius: 15px;
    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
    --ripple-color: deeppink;
    --padding-top: 10px;
    --padding-bottom: 10px;
    width: 90%;
    height: 40px;
    
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: center;
    color: #ffffff;
  }
  </style>