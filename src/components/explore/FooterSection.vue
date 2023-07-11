<template>
  <ion-footer class="ion-no-border">
    <ion-toolbar>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="search" href="/explore">
            <ion-icon :icon="searchOutline" />
            <ion-label>{{ $t("Explore") }}</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="logoWechat" href="/chat">
            <ion-icon :icon="logoWechat" />
            <ion-label>{{ $t("Chat") }}</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="appsSharp" href="/application">
            <ion-icon :icon="appsSharp" />
            <ion-label>{{ $t("Application") }}</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="person" href="/profile">
            <ion-icon :icon="person" />
            <ion-label>{{ $t("Profile") }}</ion-label>
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
  IonIcon 
} from '@ionic/vue';
import { searchOutline, logoWechat, appsSharp, person } from 'ionicons/icons';

export default defineComponent({
  components: {
    IonFooter, 
    IonToolbar, 
    IonTabs, 
    IonRouterOutlet, 
    IonTabBar, 
    IonTabButton, 
    IonLabel, 
    IonIcon 
  },
  setup() {
    const imgUrl = 'assets/images/header.svg';
    return {imgUrl, searchOutline, logoWechat, appsSharp, person};
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
ion-tab-button {
  color: #ffffff;
}
.tab-selected {
  color: #00aeef;
}
</style>