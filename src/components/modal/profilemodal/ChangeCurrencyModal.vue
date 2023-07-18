<template>
    <ion-page  style="height:60%">
        <ion-content>
            <ion-grid>
                <ion-row class="flex-col" style="margin-bottom: 0px; padding-bottom: 0px;">
                    <ion-col size="12" style="text-align: center;">
                        <ion-text class="modal-title">{{ $t(`${title}`)}}</ion-text>
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col" style="margin-bottom:0;">
                    <ion-col v-for="currency in currencies" :key="currency.id" size="12" :style="user.currency.id==currency.id? 'color: #00AEEF': 'color: #1c345a'" @click="postData(currency.id, user.currency.id)">
                        <div style="float: left;">
                            <ion-icon :src="logoEuro" style="margin-right:18px"></ion-icon>
                            <ion-text class="currency-title" :style="user.currency.id==currency.id? 'color: #00AEEF': 'color: #1c345a' ">    
                                {{$t(`${currency.name}`)}}
                            </ion-text>
                        </div>
                        <ion-icon v-if="user.currency.id==currency.id" :src="checkmark" style="float: right;" size="large"></ion-icon>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <footer-section  @back="backModal"/>
    </ion-page>
</template>
<script>
import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonText,
    IonCol,
    IonInput,
    IonIcon,
    modalController,
} from "@ionic/vue";
import { defineComponent, ref, computed, onBeforeMount } from "vue";
import FooterSection from "@/components/modal/profilemodal/BackFooterSection.vue";
import {useProfileMainStore, useAuthStore} from "@/store";
import {useToast} from "@/shared/toast";
import {useLoadingStore} from "@/store/loading";
import { logoEuro, checkmark } from "ionicons/icons"

export default defineComponent({
    name:"CurrencyModal",
    components: {
        FooterSection,
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonText,
        IonCol,
        IonIcon,
    },
    props: {
      title: String,
    },
    setup(props) {
        const userStore = useAuthStore();
        const store = useProfileMainStore();
        const {showToast} = useToast();
        const {showLoading, hideLoading} = useLoadingStore();
        const {loadCurrencies, changeFlag, postCurrencyData} = store;
        const {loadUserData} = userStore;
        const user = computed(() => userStore.user);
        const currencies = computed(() => store.currencies);
        const dataLoaded = computed(() => store.dataLoaded);
        const postresult = computed(() => store.postresult);

        const postData = async (id, userCid) => {
            if(id != userCid) {
                let formData = new FormData();
                formData.append("currency_id", id);
                showLoading();
                await postCurrencyData(formData);
                console.log(postresult.value);
                await loadUserData();
                console.log(user.value)
                hideLoading();
            }
        }
        const backModal = () => {
            modalController.dismiss({
                'dismissed': true
            })
        }
        onBeforeMount(() => {
            if (!dataLoaded.value) {
                showLoading();
                Promise.all([loadCurrencies()]).then(() => {
                    hideLoading();
                    changeFlag();
                })
            }
        });
        return {
            postData,
            backModal,
            logoEuro,
            checkmark,
            user,
            currencies,
        };
    }
})
</script>
<style scoped>
ion-grid {
    padding:3%;
}
ion-text {
    font-family: "Calibri";
}
ion-col {
    margin-bottom: 9px;
}
ion-button {
    --border-radius: 15px;
    --background: linear-gradient(-72deg, #436fb2 0.00%, #1c345a 100.00%);
    width: 100%;
    height: 50px;
}
ion-item {
  width: 100%;
  --min-height: 35px !important;
  --border-color: black;
  --ion-color-base: gray !important;
}
ion-item::part(native) {
  border-radius: 15px !important;
}
.modal-title {
    font-size: 30px;
    font-weight: bold;
    font-style: normal;
    text-align: center;
    color: #1c345a;
}
.currency-title {
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #1c345a;
}
</style>