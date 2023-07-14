<template>
    <ion-app class="scanner-hide">
        <ion-split-pane content-id="main-content">
            <ion-menu :disabled="$route?.meta?.hideMenu !== undefined" content-id="main-content" type="overlay"
                      :dir="dir">
                <ion-content>
                    <ion-list id="inbox-list">
                        <ion-list-header>
                            <ion-text color="primary">{{ user?.user_bio?.first_name }}</ion-text>
                        </ion-list-header>
                        <ion-note>{{ user?.email }}</ion-note>
                        <rep-menu v-if="user?.role_id != 13"/>
                        <student-menu v-else/>
                        <menu-item v-for="item in userPages" :key="item.url" :item="item"/>
                        <menu-item v-if="user?.role_id == 13" :item="{title: 'Delete My Account',url: '/user/delete-account',icon:personRemove}"/>
                        <menu-item @click="logoutUser" :item="{title: 'Logout',url: '#',icon:logOut}"/>
                    </ion-list>
                </ion-content>
            </ion-menu>
            <ion-router-outlet id="main-content"></ion-router-outlet>
            <ion-loading :is-open="loading" @ionLoadingDidDismiss="loadingDismissed"/>
        </ion-split-pane>
    </ion-app>
    <!-- <div class="scanner-ui">
        <ion-app style="background: transparent">
            <ion-toolbar mode="ios">
                <ion-buttons slot="start">
                    <ion-button color="primary" @click="stopScan">
                        <ion-icon slot="icon-only" :icon="close"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>{{ $t('Scan QR Here') }}</ion-title>
            </ion-toolbar>
            <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-flow: column">
                <img src="assets/images/guide-frame.svg" style="width: 300px; height: 300px">
            </div>
        </ion-app>
    </div> -->
</template>

<script lang="ts">
import {
    IonApp,
    IonButton,
    IonButtons,
    IonContent,
    IonIcon,
    IonList,
    IonListHeader,
    IonLoading,
    IonMenu,
    IonNote,
    IonRouterOutlet,
    IonSplitPane,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/vue';
import {computed, defineComponent, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {close, logOut, mail, call, lockClosed, personRemove} from 'ionicons/icons';
import {useAuthStore} from "@/store";
import {useLoadingStore} from "@/store/loading";
import StudentMenu from "@/components/menus/StudentMenu.vue";
import RepMenu from "@/components/menus/RepMenu.vue";
import {useI18nHelpers, useScanQR} from "@/shared";
import MenuItem from "@/components/menus/MenuItem.vue";

export default defineComponent({
    name: 'App',
    components: {
        MenuItem,
        // IonButtons,
        // IonButton,
        // IonTitle,
        // IonToolbar,
        IonText,
        RepMenu,
        StudentMenu,
        IonLoading,
        IonApp,
        IonContent,
        // IonIcon,
        IonList,
        IonListHeader,
        IonMenu,
        IonNote,
        IonRouterOutlet,
        IonSplitPane,
    },
    setup() {
        const {stopScan} = useScanQR();
        const {dir} = useI18nHelpers()
        const selectedIndex = ref(0);
        const authStore = useAuthStore();
        const loadingStore = useLoadingStore();
        const route = useRoute();
        const router = useRouter();
        const user = computed(() => authStore.user);
        const loading = computed(() => loadingStore.loading);
        const loadingDismissed = computed(() => loadingStore.onDismissCallback);
        const userPages = [
            {
                title: 'Update Email',
                url: '/user/update-email',
                icon: mail
            },
            {
                title: 'Update Phone Number',
                url: '/user/update-phone-number',
                icon: call
            },
            {
                title: 'Update Password',
                url: '/user/update-password',
                icon: lockClosed
            },

        ];

        function logoutUser() {
            authStore.logout();
            router.replace("/explore");
        }

        return {
            userPages,
            dir,
            selectedIndex,
            logOut,
            personRemove,
            close,
            isSelected: (url: string) => url === route.path ? 'selected' : '',
            logoutUser,
            user,
            loading,
            loadingDismissed,
            stopScan
        }
    }
});
</script>

<style scoped>
ion-menu ion-content {
    --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
    --padding-start: 8px;
    --padding-end: 8px;
    --padding-top: 20px;
    --padding-bottom: 20px;
}

ion-menu.md ion-list {
    padding: 20px 0;
}

ion-menu.md ion-note {
    margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
    padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
    border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
    font-size: 22px;
    font-weight: 600;

    min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
    font-size: 16px;

    margin-bottom: 18px;

    color: #757575;

    min-height: 26px;
}

ion-menu.md ion-item {
    --padding-start: 10px;
    --padding-end: 10px;
    border-radius: 4px;
}

ion-menu.md ion-item.selected {
    --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
    color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
    color: #616e7e;
}

ion-menu.md ion-item ion-label {
    font-weight: 500;
}

ion-menu.ios ion-content {
    --padding-bottom: 20px;
}

ion-menu.ios ion-list {
    padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
    line-height: 24px;
    margin-bottom: 20px;
}

ion-menu.ios ion-item {
    --padding-start: 16px;
    --padding-end: 16px;
    --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
    color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
    font-size: 24px;
    color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
    margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
    padding-left: 16px;
    padding-right: 16px;
}

ion-menu.ios ion-note {
    margin-bottom: 8px;
}

ion-note {
    display: inline-block;
    font-size: 16px;

    color: var(--ion-color-medium-shade);
}

ion-item.selected {
    --color: var(--ion-color-primary);
}
</style>
