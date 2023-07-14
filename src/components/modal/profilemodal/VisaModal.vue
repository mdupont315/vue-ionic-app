<template>
    <ion-page  style="height:40%">
        <ion-content>
            <ion-grid>
                <ion-row class="flex-col" style="margin-bottom: 0px; padding-bottom: 0px;">
                    <ion-col size="12" style="text-align: center;">
                        <ion-text class="modal-title">{{ $t(`${title}`)}}</ion-text>
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col" style="margin-bottom:0;">
                    <ion-col size="12">
                        <ion-text class="small-title">
                            {{$t("Please upload your corresponding documents. this is required for your application")}}
                        </ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <ion-input type="file" class="file-input" style="opacity: 0" accept=".png, .jpg, .pdf" @change="handleFile($event)" />
                        <ion-button>
                            <ion-text class="button-title">
                                {{ $t("Upload") }}
                            </ion-text>
                        </ion-button>
                    </ion-col>
                    <ion-col size="12">
                        <ion-text class="small-title">
                            {{$t("We accept documents in PNG, JPG and PDF formats. Max file size is 8MB.")}}
                        </ion-text>
                    </ion-col>
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
import FooterSection from "@/components/modal/profilemodal/FooterSection.vue";
import {useDocumentDataStore} from "@/store";

export default defineComponent({
    name:"HigherModal",
    components: {
        FooterSection,
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonText,
        IonCol,
        IonInput,
        IonButton
    },
    props: {
      title: String,
    },
    setup(props) {
        const store = useDocumentDataStore();
        const {postWorkData} = store;
        const postresult = computed(() => store.postresult);
        const file=ref("");

        const handleFile = (event) => {
            file.value = event.target.files[0];
        }

        const postData = async () => {
            let formData = new FormData();
            formData.append("document", file.value);
            if(props.title=="Recommendations Letter")
                await postWorkData('recommendation-latter', formData);
            else if( props.title=="Other Documents")
                await postWorkData('others', formData);
            else if( props.title=="Finance Documents")
                await postWorkData('finance', formData);
            else if( props.title=="Health Documents")
                await postWorkData('health', formData);
            else
                await postWorkData(props.title.toLowerCase(), formData);
        }
        const discardData = () => {
            file.value = "";
        }

        return {
            postData,
            discardData,
            handleFile,
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
.small-title {
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #606060;
}
</style>