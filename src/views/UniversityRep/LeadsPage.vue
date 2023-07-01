<template>
  <ion-page>
    <ion-header class="ion-no-border" collapse="fade" :translucent="true" mode="ios">
      <ion-toolbar mode="ios">
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title style="display:grid;" class="ion-justify-content-center">
          <school-master-logo-horizontal/>
        </ion-title>
        <language-switch slot="end"/>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" :fullscreen="true">
      <ion-list mode="ios" v-if="!leads.length">
        <ion-list-header>
          <ion-label>
            <ion-skeleton-text :animated="true" style="width: 80px"></ion-skeleton-text>
          </ion-label>
          <ion-button disabled>
            <ion-skeleton-text :animated="true" style="width: 80px"></ion-skeleton-text>
          </ion-button>
        </ion-list-header>
        <ion-item v-for="i in 5" lines="full" :key="i">
          <ion-avatar slot="start">
            <ion-skeleton-text :animated="true"></ion-skeleton-text>
          </ion-avatar>
          <ion-label>
            <h3>
              <ion-skeleton-text :animated="true" style="width: 80%;"></ion-skeleton-text>
            </h3>
            <p>
              <ion-skeleton-text :animated="true" style="width: 60%;"></ion-skeleton-text>
            </p>
            <p>
              <ion-skeleton-text :animated="true" style="width: 30%;"></ion-skeleton-text>
            </p>
          </ion-label>
        </ion-item>
      </ion-list>
      <ion-list mode="ios" v-else>
        <ion-list-header  :dir="dir">
          <ion-label color="primary" style="font-weight: normal">{{ $t('Leads') }}</ion-label>
          <ion-button color="secondary" :dir="dir" @click="sendLeads">
            {{ $t('Email me leads').substring(0,20) }} {{$t('Email me leads').length > 20 ?'...':''}}
          </ion-button>
        </ion-list-header>
        <ion-item mode="ios" v-for="lead in leads" :key="lead.id">
          <ion-avatar slot="start">
            <img :src="lead.profile_photo_url" :alt="lead.name"/>
          </ion-avatar>
          <ion-label color="primary">
            <h3>{{ lead.name }}</h3>
            <p class="ion-color-secondary">{{ lead.email }}</p>
            <p>{{ lead?.user_bio?.mobile_number }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-infinite-scroll
          @ionInfinite="loadData($event)" threshold="100px" id="infinite-scroll" :disabled="disableScroll">
        <ion-infinite-scroll-content :dir="dir" loading-spinner="lines"
                                     :loading-text="`${$t('Loading more leads')}...`"/>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, ref} from 'vue';
import {
  InfiniteScrollCustomEvent,
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonSkeletonText,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import SchoolMasterLogoHorizontal from "@/components/SchoolMasterLogoHorizontal.vue";
import {useI18nHelpers, useToast} from "@/shared";
import LanguageSwitch from "@/components/LanguageSwitch.vue";
import {appConst, fetchWrapper} from "@/helpers";
import {useLoadingStore} from "@/store";

// declare let window: any; // Don't forget this part!
export default defineComponent({
  components: {
    IonButton,
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    LanguageSwitch,
    IonButtons,
    IonLabel,
    IonItem,
    IonList,
    IonAvatar,
    IonListHeader,
    IonSkeletonText,
    SchoolMasterLogoHorizontal,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  setup() {
    const {dir} = useI18nHelpers();
    const {BASE_URL} = appConst;
    const {showToast} = useToast();
    const {showLoading, hideLoading} = useLoadingStore();
    const leads = ref([]);
    const nextPageUrl = ref(`${BASE_URL}/university/get-leads`);
    const disableScroll = ref(true);
    const loadData = async (ev: InfiniteScrollCustomEvent) => {
      await loadsLeads().finally(() => ev.target.complete())
    }
    const sendLeads = () => {
      showLoading();
      fetchWrapper.get(`${BASE_URL}/university/email-leads`).finally(() => {
        showToast({message: 'Email Sent!',color:'success',position:'bottom'});
        hideLoading();
      });
    }
    onBeforeMount(() => loadsLeads());
    const loadsLeads = async () => {
      if (!nextPageUrl.value) return;
      return await fetchWrapper.post(nextPageUrl.value).then((response) => {
        const json = response.json();
        return !response.ok ? Promise.reject(json) : json
      }).then(({data}) => {
        leads.value = leads.value.concat(data.data);
        nextPageUrl.value = data.next_page_url
        disableScroll.value = !data.next_page_url;
        if (leads.value.length == 0) {
          showToast({
            message:"No Leads!",
            color: "danger",
            position: "bottom"
          })
        }
      }).catch((reason) => {
        reason.then((reason: any) => {
          showToast({
            message: reason?.message || "Something Went Wrong, While Loading data!",
            color: "danger",
            position: "bottom"
          })
        })
      }).finally(() => Promise.resolve());
    }
    return {disableScroll, loadData, leads, dir, sendLeads}
  },
});
</script>