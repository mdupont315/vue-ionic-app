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
                <ion-buttons slot="end">
                    <language-switch slot="end"/>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding" :fullscreen="true">
            <ion-grid :dir="dir">
                <ion-row>
                    <ion-col>
                        <ion-text color="primary">
                            <h1 class="ion-text-center">{{ $t("Delete Account") }}</h1>
                            <p class="ion-text-center">
                                <small>{{ $t('Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.') }}</small>
                            </p>
                        </ion-text>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <p class="ion-text-center">
                            <small>{{ $t('Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.') }}</small>
                        </p>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <input-password v-model="form.password" placeholder="Password"/>
                        <ion-text v-if="error?.password" color="danger"><p>{{ error.password[0] }}</p></ion-text>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12">
                        <ion-button expand="block" color="danger" @click="deleteAccount" style="text-transform: capitalize">
                            {{$t('Delete Account') }}
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>

</template>

<script>
import InputPassword from "@/components/InputPassword.vue";
import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonRow,
    IonText,
    IonTitle, IonToolbar
} from "@ionic/vue";
import SchoolMasterLogoHorizontal from "@/components/SchoolMasterLogoHorizontal.vue";
import LanguageSwitch from "@/components/LanguageSwitch.vue";
import {computed, defineComponent, reactive} from "vue";
import {useAuthStore, useLoadingStore} from "@/store";
import {useRouter} from "vue-router";
import {useFormErrorAlert, useToast} from "@/shared";

export default defineComponent({
    components: {
        InputPassword,
        IonButton,
        // IonAvatar,
        LanguageSwitch,
        SchoolMasterLogoHorizontal,
        IonText, IonGrid, IonRow, IonCol,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
    },
    setup() {
        const store = useAuthStore();
        const router = useRouter();
        const {showToast} = useToast();
        const {showFormUserFormError} = useFormErrorAlert();
        const {showLoading, hideLoading} = useLoadingStore();
        const form = reactive({password: ""});
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const error = computed(() => store.error?.errors);
        const deleteAccount = async () => {
            showLoading();
            await store.deleteAccount(form).then(res => {
                hideLoading();
                if (!res) {
                    return showFormUserFormError();
                }
                showToast({message: 'Account Deleted!'});
                return setTimeout(() => logoutUser(), 300);
            });
        };

        function logoutUser() {
            store.logout()
            router.replace("/login");
        }

        return {
            form,
            deleteAccount,
            error,
        };
    },

});
</script>

<style scoped>

</style>