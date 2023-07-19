<template>
    <ion-page  style="height:40%">
        <ion-content>
            <ion-grid>
                <ion-row class="flex-col" style="margin-bottom: 0px; padding-bottom: 0px;">
                    <ion-col size="12" style="text-align: center;">
                        <ion-text class="modal-title">{{ $t(`Settings`)}}</ion-text>
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col" style="margin-bottom:0;">
                    <ion-col size="12">
                        <ion-card>
                            <ion-card-content style="padding-top: 0; padding-bottom: 0;">
                                <ion-text class="card-title" style="float:left; margin-top:8px;">
                                    {{$t("Marketing Notification")}}
                                </ion-text>
                                <ion-toggle :checked="true" style="float:right">Checked Toggle</ion-toggle>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="12">
                        <ion-card>
                            <ion-card-content style="padding-top: 0; padding-bottom: 0;">
                                <ion-text class="card-title" style="float:left; margin-top:8px;">
                                    {{$t("Subscribe to emails")}}
                                </ion-text>
                                <ion-toggle :checked="true" style="float:right">Checked Toggle</ion-toggle>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="12">
                        <ion-text class="delete-account" @click="deleteAcc">{{ $t(`Delete my account`) }}</ion-text>
                    </ion-col>
                    <ion-col size="12" style="text-align: center;">
                        <ion-text class="b-title">{{ $t(`UNIRANKS APP Version 2.00`) }}</ion-text>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <footer-section @back="backModal" @save="saveData" title="Upload"/>
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
    IonCard,
    IonCardContent,
    modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import {useRouter} from "vue-router";
import { useAuthStore } from "@/store";
import {useToast} from "@/shared/toast";
import {useLoadingStore} from "@/store/loading";
import FooterSection from "@/components/modal/profilemodal/PrevSaveFooter.vue";

export default defineComponent({
    name:"ProfileIntroModal",
    components: {
        FooterSection,
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonText,
        IonCol,
        IonCard,
        IonCardContent,
    },
    setup() {
        const store = useAuthStore();
        const router = useRouter();
        const {showToast} = useToast();
        const {showLoading, hideLoading} = useLoadingStore();
        const { deleteAccount, logout } = store;
        const backModal = () => {
            modalController.dismiss({
                'dismissed': true
            })
        }
        const deleteAcc = async () => {
            let formData = new FormData();
            formData.append("password", "123456789");
            showLoading();
            await deleteAccount(formData);
            hideLoading();
            showToast({message: "Delete Successfully!", color:'secondary'});
            modalController.dismiss({
                'dismissed': true
            })
            await logout();
            router.push("/profile");
        }
        return {
            backModal,
            deleteAcc,
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
ion-card {
    border-color: #bcbcbc;
    border-width: 1px;
    border-style: solid;
    border-radius: 10px;
    filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
    background: #ffffff;
    margin:0px;
}
.modal-title {
    font-size: 30px;
    font-weight: bold;
    font-style: normal;
    text-align: center;
    color: #1c345a;
}
.card-title {
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #203456;
}
.delete-account {
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #ff0000;
}
.b-title {
    font-size: 20px;
    font-weight: bold;
    font-style: normal;
    color: #606060;
}
</style>