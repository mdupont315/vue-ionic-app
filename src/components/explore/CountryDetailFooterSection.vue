<template>
    <ion-footer class="ion-no-border">
      <ion-toolbar>
        <ion-tabs>
          <ion-router-outlet></ion-router-outlet>
          <ion-tab-bar slot="bottom">
            <ion-tab-button tab="search" style="width: 25%;">
              <ion-icon :icon="bookmark" style="width: 17%;"/>
              <ion-label>{{ $t("Bookmark") }}</ion-label>
            </ion-tab-button>
  
            <ion-tab-button tab="logoWechat" style="width: 25%;">
              <ion-icon :icon="logoWechat" />
              <ion-label>{{ $t("Chat") }}</ion-label>
            </ion-tab-button>

            <ion-tab-button style="width: 50%;">
                <ion-button @click="openModal">View All Programs</ion-button>
            </ion-tab-button>
          </ion-tab-bar>
        </ion-tabs>
      </ion-toolbar>
    </ion-footer>
  </template>
  
  <script lang="ts">
  import {computed, defineComponent} from 'vue';
  import { 
    IonFooter, 
    IonToolbar, 
    IonTabs, 
    IonRouterOutlet, 
    IonTabBar, 
    IonTabButton, 
    IonLabel, 
    IonIcon,
    IonButton, 
    modalController
  } from '@ionic/vue';
  import { searchOutline, logoWechat, appsSharp, person } from 'ionicons/icons';
  import {userDarkModeStore} from "@/store";
  import UniProDetailModal from "@/components/modal/UniProDetailModal.vue";
  
  export default defineComponent({
    components: {
      IonFooter, 
      IonToolbar, 
      IonTabs, 
      IonRouterOutlet, 
      IonTabBar, 
      IonTabButton, 
      IonLabel, 
      IonIcon,
      IonButton 
    },
    props: {
      id: Number
    },
    setup(props) {
      // console.log("Props", props.id)
        const bookmark = 'assets/images/bookmarg.svg';
      const darkMode = userDarkModeStore();
      const is_dark_mode = computed(() => darkMode.prefersDark);
      const imgUrl = computed(() => {
        return is_dark_mode.value ? 'assets/images/header.svg' : `assets/images/header.svg`;
      });
      const openModal = async () => {
        const modal = await modalController.create({
          component: UniProDetailModal,
          componentProps: {
              id:props.id
          },
          initialBreakpoint: 0.95,
          // breakpoints: [0, 0.5, 1],
        });
        modal.present();
      }
      return {imgUrl, bookmark, logoWechat, openModal};
    }
  });
  </script>
  
  <style scoped>
  ion-toolbar {
    --background: #1c345a;
    
    border-top: 2px solid #1c345a;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
  }
  ion-tab-bar {
    --background: "white";
  
  }
  .tab-selected {
    color: #00aeef;
  }
  
  ion-tab-button {
    color: #ffffff;
  }

  ion-button {
    --background: linear-gradient(-73deg, 
#00aeef 0.00%, 
#0076a2 100.00%);
    --background-hover: #9ce0be;
    --background-activated: #88f4be;
    --background-focused: #88f4be;

    --color: white;

    border-radius: 15px;
    --border-color: #000;
    --border-style: solid;
    --border-width: 1px;

    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);

    --ripple-color: deeppink;

    --padding-top: 10px;
    --padding-bottom: 10px;
  }
  </style>