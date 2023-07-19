<template>
    <ion-footer class="ion-no-border">
      <ion-toolbar>
        <ion-tabs>
          <ion-router-outlet></ion-router-outlet>
          <ion-tab-bar slot="bottom">
            <ion-tab-button  style="width: 20%;" @click="$emit('back')">
                <ion-icon :src="chevronBack" size="large" style="color: black;"></ion-icon>
            </ion-tab-button>
            <ion-button expand="block" style="width: 70%;" class="blue-button" @click="$emit('save')">
              <ion-text>{{ $t(`${title}`) }}</ion-text>
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
    IonButton,
    IonIcon,
    IonTabButton,
  } from '@ionic/vue';
  import { chevronBack } from 'ionicons/icons';

  export default defineComponent({
    props: {
        title: String,
    },
    components: {
        IonFooter, 
        IonToolbar, 
        IonTabs, 
        IonRouterOutlet, 
        IonTabBar, 
        IonText,
        IonButton,
        IonIcon, 
        IonTabButton,
    },
    setup() {
        return {
            chevronBack,
        };
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
.white-button {
    --border-radius: 15px;
    filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.15 ));
    --background: #e6e6e6;
    width: 100%;
    height: 49px;
}
.button-inner {
    flex-flow: none !important;
    justify-content: none !important;
}
</style>