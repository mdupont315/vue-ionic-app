<template>
    <ion-page  style="height:90%">
        <ion-content>
            <ion-grid>
                <ion-row class="flex-col" style="margin-bottom: 9px;">
                    <ion-col size="12" style="text-align: center;">
                        <ion-text class="modal-title">{{ $t(`Extracurricular Documents`)}}</ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <ion-text class="modal-intro-text">{{ $t("All certificates and transcripts covering extracurricular activities to support application process")}}</ion-text>
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col" style="margin-bottom: 9px;">
                    <ion-col size="12">
                        <input-field label="Title" v-model="title"></input-field>
                    </ion-col>
                    <ion-col size="12" style="text-align: center;">
                        <ion-textarea
                            v-model="description"
                            aria-label="Custom textarea"
                            placeholder="Description"
                            class="custom"
                            helper-text="Helper text"
                            :counter="true"
                        ></ion-textarea>
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
    IonTextarea,
    modalController,
} from "@ionic/vue";
import { defineComponent, ref, computed } from "vue";
import FooterSection from "@/components/modal/profilemodal/FooterSection.vue";
import SearchableSelect from "@/components/SearchableSelect.vue";
import InputField from "@/components/InputField.vue";
import {useDocumentDataStore} from "@/store";

export default defineComponent({
    name:"ExtracurModal",
    components: {
        FooterSection,
        InputField,    
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonText,
        IonCol,
        IonInput,
        IonTextarea,
        IonButton
    },
    setup() {
        const store = useDocumentDataStore();
        const {postWorkData} = store;
        const postresult = computed(() => store.postresult);
        const file=ref("");
        const title=ref("");
        const description=ref("");

        const handleFile = (event) => {
            file.value = event.target.files[0];
        }

        const postData = async () => {
            let formData = new FormData();
            formData.append("title", title.value);
            formData.append("description", description.value);
            formData.append("document", file.value);
            await postWorkData('extra-curricular', formData);
        }
        const discardData = () => {
            file.value = "";
            title.value = "";
            description.value = "";
        }

        return {
            postData,
            discardData,
            handleFile,
            title,
            description,
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
  --border-color: #bcbcbc;
  --ion-color-base: gray !important;
}
ion-item::part(native) {
  border-radius: 15px !important;
}
ion-textarea.custom {
    text-align: left;
    border-color: #bcbcbc;
    border-width: 1px;
    border-style: solid;
    border-radius: 15px;
    background: #ffffff;
    height: 150px;
}

ion-textarea.custom .helper-text,
ion-textarea.custom .counter {
color: #373737;
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