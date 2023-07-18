<template>
    <ion-page  style="height:60%">
        <ion-content>
            <ion-grid>
                <ion-row style="margin-top: 65px; justify-content: center;display: flex; flex-flow: column;">
                  <ion-img :src='logOutImg' class="centerImg"/>
                  <ion-text class="log-title">
                    <p class="ion-text-center" style="margin:0px">{{ $t(`Are you sure you want to log out?`) }}</p>
                  </ion-text>
                </ion-row>
            </ion-grid>
        </ion-content>
        <footer-section  @save="postData" @discard="discardData"/>
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
    IonButton,
    IonInput,
    modalController,
} from "@ionic/vue";
import { defineComponent, ref, computed } from "vue";
import {useRouter} from "vue-router";
import { useAuthStore } from "@/store";
import FooterSection from "@/components/modal/profilemodal/LogOutFooter.vue";
import {useLoadingStore} from "@/store/loading";

export default defineComponent({
    name:"HigherModal",
    components: {
        FooterSection,
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonText,
    },
    setup(props) {
        const store = useAuthStore();
        const router = useRouter();
        const {showLoading, hideLoading} = useLoadingStore();
        const {logout} = store;

        const logOutImg = "assets/images/logout.png";

        const postData = async () => {
            showLoading();
            await logout();
            hideLoading();
            router.push("/profile");
            
            modalController.dismiss({
                'dismissed': true
            })
            // this.$forceUpdate();
        }
        const discardData = () => {
            modalController.dismiss({
                'dismissed': true
            })
        }

        return {
            postData,
            discardData,
            logOutImg,
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
.centerImg {
  margin-left: auto;
  margin-right: auto;
}
.log-title {
    font-size: 30px;
    font-weight: bold;
    font-style: normal;
    text-align: left;
    color: #1c345a;
}
</style>