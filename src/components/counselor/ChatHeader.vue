<template>
    <ion-header class="ion-no-border" mode="ios" collapse="fade" :translucent="true">
        <ion-toolbar>
            <ion-title class="ion-text-center" color="primary"></ion-title>
            <ion-img :src='imgUrl'/>
        </ion-toolbar>
    </ion-header>
</template>
  
<script lang="ts">
    import {computed, defineComponent} from 'vue';
    import {
        IonHeader,
        IonTitle,
        IonToolbar,
        IonImg,
        IonIcon
    } from "@ionic/vue";

    export default defineComponent({
    components: {
        IonHeader,
        IonTitle,
        IonToolbar,
        IonImg, 
        // IonIcon
    },
    setup() {
        const imgUrl = computed(() => {
        return `assets/images/header.svg`;
        });
        return {
            imgUrl
        };
    }
    });
</script>

<style scoped>
    ion-toolbar {
        position: absolute;
        background: #1c345a;
        text-align: center;
        border-bottom-left-radius: 25px;
        border-bottom-right-radius: 25px;
        --opacity-scale: 0 !important;
    }
    p {
        padding:0
    }
</style>