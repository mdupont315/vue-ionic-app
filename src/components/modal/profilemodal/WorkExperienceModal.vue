<template>
    <ion-page  style="height:90%">
        <ion-content>
            <ion-grid>
                <ion-row class="flex-col" style="margin-bottom: 0px; padding-bottom: 0px;">
                    <ion-col size="12" style="text-align: center;">
                        <ion-text class="modal-title">{{ $t(`Add Work Experience`)}}</ion-text>
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col" style="margin-bottom:0;">
                    <ion-col size="12" style="margin-bottom: 0px; padding-bottom: 0px;">
                        <input-field label="Organization"></input-field>
                    </ion-col>
                    <ion-col size="12" style="margin: 0; padding: 0;">
                        <ion-item lines="none">
                            <ion-checkbox label-placement="end">
                            </ion-checkbox>
                            <ion-label style="margin-left: 8px;">
                                {{$t("This is the current company")}}
                            </ion-label>
                        </ion-item>
                    </ion-col>
                    <ion-col size="12" style="text-align: center;">
                        <searchable-select 
                            label="Designation" stitle="Designation"
                            :icon-end="chevronDownOutline">
                        </searchable-select>
                    </ion-col>
                    <ion-col size="12" style="text-align: center;">
                        <searchable-select 
                            label="Joining date" stitle="Joining date"
                            :icon-end="chevronDownOutline">
                        </searchable-select>
                    </ion-col>
                    <ion-col size="12" style="text-align: center;">
                        <searchable-select 
                            label="Relieving Date" stitle="Relieving Date"
                            :icon-end="chevronDownOutline">
                        </searchable-select>
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
    IonCheckbox,
    modalController,
} from "@ionic/vue";
import { defineComponent, ref, computed } from "vue";
import FooterSection from "@/components/modal/profilemodal/FooterSection.vue";
import SearchableSelect from "@/components/SearchableSelect.vue";
import InputField from "@/components/InputField.vue";
import {chevronDownOutline} from 'ionicons/icons';

import {useDocumentDataStore} from "@/store";

export default defineComponent({
    name:"WorkExperience",
    components: {
        SearchableSelect,
        FooterSection,
        InputField,    
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonText,
        IonCol,
        IonCheckbox,
        IonButton,
        IonInput
    },
    props: {
      title: String,
    },
    setup() {
        const store = useDocumentDataStore();
        const {postWorkData} = store;
        const postresult = computed(() => store.postresult);
        const file=ref("");

        const handleFile = (event) => {
            file.value = event.target.files[0];
        }
        const postData = async () => {
            let formData = new FormData();
            formData.append("organization_name", "");
            formData.append("is_working_here", "");
            formData.append("designation", "");
            formData.append("joining_date", "");
            formData.append("reliving_date", "");
            formData.append("document", file.value);
            await postWorkData("add-experiencer", formData);
        }
        const discardData = () => {
            file.value = "";
        }
        return {
            chevronDownOutline,
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