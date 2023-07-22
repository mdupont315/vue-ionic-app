<template>
    <ion-footer class="ion-no-border">
      <ion-toolbar>
        <ion-tabs>
          <ion-router-outlet></ion-router-outlet>
          <ion-tab-bar slot="bottom" style="width: 100%;">
            <ion-icon :src="addOutline" style="width: 15%; font-size: 50px;" ></ion-icon>
            <input-field label="Type a message" style="width: 70%;"></input-field>
            <div style="width: 15%;">
                <ion-img src="assets/images/Icon-material-send.svg" style="margin-left:9px; width: 65%;"></ion-img>
            </div>
          </ion-tab-bar>
        </ion-tabs>
      </ion-toolbar>
    </ion-footer>
  </template>
  
  <script lang="ts">
    import {defineComponent} from 'vue';
    import InputField from "@/components/InputField.vue";
    import { 
        IonFooter, 
        IonToolbar, 
        IonTabs, 
        IonRouterOutlet, 
        IonTabBar, 
        IonImg,
        IonIcon,
    } from '@ionic/vue';
    import { addOutline } from 'ionicons/icons';
    
    export default defineComponent({
        components: {
            InputField,
            IonFooter, 
            IonToolbar, 
            IonTabs, 
            IonRouterOutlet, 
            IonTabBar,  
            IonImg,
            IonIcon
        },
        setup() {
            return {addOutline}
        }
    });
  </script>
  
  <style scoped>
    ion-toolbar {
        border-color: #e6e6e6;
        border-width: 1px;
        border-style: solid;
        background: #f5f5f5
    }
    ion-tab-bar {
        --background: #f5f5f5;
        height: 70px;
    }
    ion-img img {
        width:24px !important
    }
    .tab-selected {
        color: #00aeef;
    }
    ion-tab-button {
        color: #ffffff;
    }
    ion-item {
        width: 100%;
        --min-height: 25px !important;
        --border-color: black;
        --ion-color-base: gray !important;
    }
    ion-item::part(native) {
        border-radius: 15px !important;
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
</style>