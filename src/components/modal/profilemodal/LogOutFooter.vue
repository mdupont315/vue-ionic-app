<template>
    <ion-footer class="ion-no-border">
      <ion-toolbar>
        <ion-tabs>
          <ion-router-outlet></ion-router-outlet>
          <ion-tab-bar slot="bottom">
            <ion-button expand="block" style="width: 40%; margin-right: 15%;" class="white-button" @click="$emit('discard')">
              <ion-text class="bt-text" style="color: red;">{{ $t(`${cancel}`) }}</ion-text>
            </ion-button>

            <ion-button expand="block" style="width: 40%;" class="blue-button" @click="$emit('save')">
              <ion-text class="bt-text">{{ $t(`${confirm}`) }}</ion-text>
            </ion-button>
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
    IonText,
    IonButton
  } from '@ionic/vue';
  
  export default defineComponent({
    components: {
        IonFooter, 
        IonToolbar, 
        IonTabs, 
        IonRouterOutlet, 
        IonTabBar, 
        IonText,
        IonButton 
    },
    props: {
      cancel:String,
      confirm: String,
    }
  });
  </script>
  
  <style scoped>
  ion-toolbar {
    border-color: #e6e6e6;
    border-width: 1px;
    border-style: solid;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    background: #f5f5f5
  }
  ion-tab-bar {
    --background: "white";
    height: 70px;
  }
  .tab-selected {
    color: #00aeef;
  }
  
  ion-tab-button {
    color: #ffffff;
  }
  .blue-button {
    --border-radius: 15px;
    --background: linear-gradient(-72deg, #436fb2 0.00%, #1c345a 100.00%);
    width: 100%;
    height: 50px;
  }
  .bt-text {
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: center;
  }
.white-button {
    --border-radius: 15px;
    filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.15 ));
    --background: #e6e6e6;
    width: 100%;
    height: 49px;
}
</style>