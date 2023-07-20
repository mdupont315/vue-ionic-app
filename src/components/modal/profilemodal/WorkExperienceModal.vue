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
                        <input-field label="Organization" v-model="organization_name"></input-field>
                    </ion-col>
                    <ion-col size="12" style="margin: 0; padding: 0;">
                        <ion-item lines="none">
                            <ion-checkbox label-placement="end" v-model="is_working_here">
                            </ion-checkbox>
                            <ion-label style="margin-left: 8px;">
                                {{$t("This is the current company")}}
                            </ion-label>
                        </ion-item>
                    </ion-col>
                    <ion-col size="12" style="text-align: center;">
                        <input-field label="Designation" v-model="designation"></input-field>
                    </ion-col>
                    <ion-col size="12" style="text-align: center;">
                        <input-field v-model="joining_date" label="Joining Date" placeholder="Example: 1995-09-13" :icon-start="calendarOutline" @clickIconStart="openModel(1)"/>
                    </ion-col>
                    <ion-col size="12" style="text-align: center;">
                        <input-field v-model="relieving_date" label="Relieving Date" placeholder="Example: 1995-09-13" :icon-start="calendarOutline" @clickIconStart="openModel(2)"/>
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

        <ion-modal :is-open="isOpen" ref="modal" :keep-contents-mounted="true" @didDismiss="closeModel">
            <ion-datetime id="datetime" :locale="`${$root.$i18n.locale == 'ar'?'ar-ae': $root.$i18n.locale}`"
                            presentation="date" mode="ios"
                            :show-default-buttons="true"
                            :done-text="$t('Done')"
                            :cancel-text="$t('Cancel')"
                            v-model="selectedDate">
                <span slot="title">{{ $t('Select your date') }}</span>
            </ion-datetime>
        </ion-modal>
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
    IonDatetime,
    modalController,
} from "@ionic/vue";
import { defineComponent, ref, computed, watch } from "vue";
import FooterSection from "@/components/modal/profilemodal/FooterSection.vue";
import InputField from "@/components/InputField.vue";
import {calendarOutline} from 'ionicons/icons';

import {useDocumentDataStore} from "@/store";
import {format, parseISO} from 'date-fns';
import {useLoadingStore} from "@/store/loading";
import {useToast} from "@/shared/toast";

export default defineComponent({
    name:"WorkExperience",
    components: {
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
        IonInput,
        IonDatetime,
    },
    props: {
      title: String,
    },
    setup() {
        const store = useDocumentDataStore();
        const {showToast} = useToast();
        const {showLoading, hideLoading} = useLoadingStore();
        const {postWorkData} = store;
        const postresult = computed(() => store.postresult);
        const selectedDate = ref("");
        const organization_name = ref("");
        const designation = ref("");
        const is_working_here = ref(false);
        const joining_date = ref("");
        const relieving_date = ref("");
        const file=ref("");
        const modalN=ref(0);
        const isOpen = ref(false);

        const handleFile = (event) => {
            showToast({message: "File uploaded successfully!", color:'secondary'});
            file.value = event.target.files[0];
        }
        const openModel = (val) => {
            isOpen.value = true;
            modalN.value = val;
        }
        const closeModel = () => {
            isOpen.value = false;
        }
        const postData = async () => {
            if(!organization_name.value || !designation.value || !joining_date.value || !relieving_date.value || !file.value){
                showToast({message: 'Fill the gaps exactly!', color:'warning'});
                return;
            }
            let formData = new FormData();
            formData.append("organization_name", organization_name.value);
            formData.append("is_working_here", is_working_here.value);
            formData.append("designation", designation.value);
            formData.append("joining_date", joining_date.value);
            formData.append("reliving_date", relieving_date.value);
            formData.append("document", file.value);
            showLoading();
            await postWorkData("add-experiencer", formData);
            hideLoading();
            modalController.dismiss({
                'dismissed': true
            })
            showToast({message: postresult.value, color:'secondary'});
        }
        const discardData = () => {
            file.value = "";
            joining_date.value = "";
        }
        watch(selectedDate, (new_date) => {
            if (!new_date) return;
            if(modalN.value == 1)
                joining_date.value = format(parseISO(new_date), 'yyyy-MM-dd')
            else
                relieving_date.value = format(parseISO(new_date), 'yyyy-MM-dd')
        });
        return {
            calendarOutline,
            postData,
            discardData,
            handleFile,
            selectedDate,
            organization_name,
            is_working_here,
            designation,
            joining_date,
            relieving_date,
            isOpen,
            openModel,
            closeModel,
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
ion-modal {
  --width: 290px;
  --height: 382px;
  --border-radius: 8px;
}

ion-modal ion-datetime {
  height: 382px;
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