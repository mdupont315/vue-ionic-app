<template>
    <ion-footer class="ion-no-border">
      <ion-toolbar>
        <ion-title class="ion-text-center" color="primary"></ion-title>
        <ion-img :src='imgUrl' class="footer-img"/>
      </ion-toolbar>
    </ion-footer>
</template>

<script lang="ts">
    import {computed, defineComponent} from 'vue';
    import {
    IonFooter,
    IonTitle,
    IonToolbar,
    IonImg
    } from "@ionic/vue";
    import {userDarkModeStore} from "@/store";

    export default defineComponent({
    components: {
        IonFooter,
        IonTitle,
        IonToolbar,
        IonImg
    },
    setup() {
        const darkMode = userDarkModeStore();
        const is_dark_mode = computed(() => darkMode.prefersDark);
        const imgUrl = computed(() => {
        return is_dark_mode.value ? 'assets/images/filter-footer.svg' : `assets/images/filter-footer.svg`;
        });
        return {imgUrl};
    }
    });
</script>

<style scoped>
ion-toolbar {
--background: #1c345a;
    width: 100%;
    height: 55px;
    border-top: 2px solid #1c345a;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
}
.tab-selected {
    color: #00aeef;
}

.footer-img{
    width: 238.4px;
    height: 36.7px;
    margin-top:5px;
    margin-left:20%;
}
</style>