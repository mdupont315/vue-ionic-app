<template>
    <ion-page  style="height:50%">
        <ion-content>
            <ion-grid>
                <ion-row class="flex-col" style="margin-bottom: 0px; padding-bottom: 0px;">
                    <ion-col size="12" style="text-align: center;">
                        <ion-text class="modal-title">{{ $t(`Reset Password`)}}</ion-text>
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col" style="margin-bottom:0;">
                    <ion-col size="12" style="text-align: center;">
                        <ion-text class="small-title" >
                            {{$t("Enter your new password")}}
                        </ion-text>
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col" style="margin-bottom: 0px; padding-bottom: 0px;">
                    <ion-col size="12">
                        <input-password placeholder="Current Password" v-model="cur_pass"/>
                    </ion-col>
                    <ion-col size="12">
                        <input-password placeholder="New Password" v-model="new_pass"/>
                    </ion-col>
                    <ion-col size="12">
                        <input-password placeholder="Confirm Password" v-model="con_pass"/>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <footer-section @back="backModal" @save="saveData" title="Save"/>
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
    modalController,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import {useRouter} from "vue-router";
import FooterSection from "@/components/modal/profilemodal/PrevSaveFooter.vue";
import InputPassword from "@/components/InputPassword.vue";
import {useAuthStore, useLoadingStore} from "@/store";
import {useToast} from "@/shared/toast";

export default defineComponent({
    name:"ProfileIntroModal",
    components: {
        InputPassword,
        FooterSection,
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonText,
        IonCol,
    },
    setup() {
        const store = useAuthStore();
        const {updatePassword, logout} = store;
        const {showToast} = useToast();
        const router = useRouter();
        const {showLoading, hideLoading} = useLoadingStore();
        const cur_pass = ref("");
        const new_pass = ref("");
        const con_pass = ref("");

        const backModal = () => {
            modalController.dismiss({
                'dismissed': true
            })
        }
        const saveData = async () => {
            let formData = new FormData();
            formData.append("current_password", cur_pass.value);
            formData.append("password", new_pass.value);
            formData.append("password_confirmation", con_pass.value);
            showLoading();
            const res = await updatePassword(formData);
            hideLoading();
            // console.log(res)
            if(res) {
                showToast({message: "Password Updated Successfully", color:'secondary'});
                modalController.dismiss({
                    'dismissed': true
                })
                await logout();
                window.location="/profile";
            }
            else showToast({message: "Try again", color:'warning'});
        }   
        return {
            backModal,
            cur_pass,
            new_pass,
            con_pass,
            saveData,
        };
    }
})
</script>
<style scoped>
ion-content{
    --background: transparent;
}
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
.small-title {
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #1c345a;
}
</style>