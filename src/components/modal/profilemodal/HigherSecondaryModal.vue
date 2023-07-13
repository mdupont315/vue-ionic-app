<template>
    <ion-page  style="height:90%">
        <ion-content>
            <ion-grid>
                <ion-row class="flex-col" style="margin-bottom: 9px;">
                    <ion-col size="12" style="text-align: center;">
                        <ion-text class="modal-title">{{ $t(`${title}`)}}</ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <ion-text class="modal-intro-text">{{ $t("Proof of your education are required to proceed with your applications")}}</ion-text>
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col" style="margin-bottom: 9px;">
                    <ion-col size="12" style="text-align: center;">
                        <searchable-select 
                            label="Country of Education" stitle="Country of Education"
                            :icon-end="chevronDownOutline">
                        </searchable-select>
                    </ion-col>
                    <ion-col size="12" style="text-align: center;">
                        <searchable-select 
                            label="School name" stitle="School name"
                            :icon-end="chevronDownOutline">
                        </searchable-select>
                    </ion-col>
                    <ion-col size="12" style="text-align: center;">
                        <searchable-select 
                            label="Higher Secondary" stitle="Degree"
                            :icon-end="chevronDownOutline">
                        </searchable-select>
                    </ion-col>
                    <ion-col size="12" style="text-align: center;">
                        <searchable-select 
                            label="Field of Study" stitle="Field of Study"
                            :icon-end="chevronDownOutline">
                        </searchable-select>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="6" style="text-align: center;">
                        <searchable-select 
                            label="Grading System" stitle="Grading System"
                            :icon-end="chevronDownOutline">
                        </searchable-select>
                    </ion-col>
                    <ion-col size="6" style="text-align: center;">
                        <searchable-select 
                            label="Score" stitle="Score(out of 100)"
                            :icon-end="chevronDownOutline">
                        </searchable-select>
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col">
                    <ion-col size="12" @click="toUpload">
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
                    <ion-col size="12"  style="height: 35px;">
                        <input-field readonly :icon-end="trashBin"></input-field>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <footer-section />
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
import { defineComponent } from "vue";
import FooterSection from "@/components/modal/profilemodal/FooterSection.vue";
import SearchableSelect from "@/components/SearchableSelect.vue";
import InputField from "@/components/InputField.vue";
import {chevronDownOutline, trashBin} from 'ionicons/icons';
import UploadModal from "@/components/modal/profilemodal/UploadModal.vue";

export default defineComponent({
    name:"HigherModal",
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
        IonButton
    },
    props: {
      title: String,
    },
    setup(props) {
        const toUpload = async() => {
            const modal = await modalController.create({
                component: UploadModal,
                componentProps:{
                    title:props.title
                },
                initialBreakpoint: 0.9,
            });
            modal.present();
        }
        return {
            chevronDownOutline,
            trashBin,
            toUpload,
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