<template>
    <ion-page  style="height:90%">
        <ion-content>
            <ion-grid>
                <ion-row class="flex-col" style="margin-bottom: 9px;">
                    <ion-col size="12" style="text-align: center;">
                        <ion-text class="modal-title">{{ $t(`${title}`)}}</ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <ion-text class="modal-intro-text">{{ $t(`Document name: ${fileName}`)}}</ion-text>
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col">
                    <ion-col size="12">
                        <hr class="under_line" />
                    </ion-col>
                    <ion-col size="12">
                        <ion-img v-if="type=='img'" :src="fileDirectory"></ion-img>
                        <pdf v-else :src="url"></pdf>
                    </ion-col>
                    <ion-col size="12">
                        <hr class="under_line" />
                    </ion-col>
                    <ion-col size="12">
                        <ion-button @click="closeModal">
                            <ion-text class="button-title">
                                {{ $t("Close") }}
                            </ion-text>
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <footer-section/>
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
    IonImg,
    modalController,
} from "@ionic/vue";
import { defineComponent, ref, onBeforeMount } from "vue";
import pdf from 'vue3-pdf';

export default defineComponent({
    name:"HigherModal",
    components: {
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonText,
        IonCol,
        IonButton,
        IonImg,
        pdf
    },
    props: {
      title: String,
      fileName: String,
      fileDirectory: String,
      type: String,
    },
    setup(props) {
        const url = ref("")
        const base64toBlob = (data) => {
            const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

            const bytes = atob(base64WithoutPrefix);
            let length = bytes.length;
            let out = new Uint8Array(length);

            while (length--) {
                out[length] = bytes.charCodeAt(length);
            }

            return new Blob([out], { type: 'application/pdf' });
        };

        const closeModal = () => {
            modalController.dismiss({
                'dismissed': true
            })
        };

        onBeforeMount(() => {
            if(props.type == 'pdf') {
                const blob = base64toBlob(props.fileDirectory);
                url.value = URL.createObjectURL(blob);
            }
        })
        return {
            url,
            closeModal,
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
ion-img {
    width: 60%;
    height: 70%;
    margin-right: auto;
    margin-left: auto;
}

.modal-title {
    font-size: 30px;
    font-weight: bold;
    font-style: normal;
    text-align: center;
    color: #1c345a;
}
.modal-intro-text {
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: center;
    color: #606060;
}
.button-title {
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: center;
    color: #ffffff;
}
</style>