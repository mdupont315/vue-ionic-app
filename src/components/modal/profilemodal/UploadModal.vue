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
                        <div v-if="!(type=='img')" id="webviewer" ref="viewer"></div>
                        <ion-img v-else :src="fileDirectory"></ion-img>
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
import { defineComponent, ref, onBeforeMount, onMounted } from "vue";
import WebViewer from "@pdftron/webviewer";

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
    },
    props: {
      title: String,
      fileName: String,
      fileDirectory: String,
      type: String,
    },
    setup(props) {
        const viewer = ref(null);
        const url = ref("")
        // const { PdfViewer } = Plugins;
        const base64toBlob = (data) => {
            // Cut the prefix `data:application/pdf;base64` from the raw base 64
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
        }
        onBeforeMount(() => {
            if(props.type == 'pdf') {
                const blob = base64toBlob(props.fileDirectory);
                url.value = URL.createObjectURL(blob);
            }
        });
        onMounted(() => {
            
            const path = `${process.env.BASE_URL}webviewer`;
            console.log(url.value)
            WebViewer({ 
                path, 
                initialDoc: url.value, 
                licenseKey: 'demo:1689368950107:7c7e8acb030000000071b7cca60a0b7965d73b24554e24cd754a136b5c'  // sign up to get a free trial key at https://dev.apryse.com
            }, viewer.value).then( (instance) => {
                console.log(instance)
                const { documentViewer, annotationManager, Annotations } = instance.Core;
                console.log(documentViewer)
                documentViewer.addEventListener("documentLoaded", () => {
                            const rectangleAnnot = new Annotations.RectangleAnnotation({
                            PageNumber: 1,
                            // values are in page coordinates with (0, 0) in the top left
                            X: 100,
                            Y: 150,
                            Width: 200,
                            Height: 500,
                            Author: annotationManager.getCurrentUser(),
                        });
                    annotationManager.addAnnotation(rectangleAnnot);
                    annotationManager.redrawAnnotation(rectangleAnnot);
                });
            });
        })
        return {
            url,
            viewer,
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
#webviewer {
    height: 500px !important
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