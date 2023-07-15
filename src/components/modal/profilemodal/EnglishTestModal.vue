<template>
    <ion-page  style="height:90%">
        <ion-content>
            <ion-grid>
                <ion-row class="flex-col" style="margin-bottom: 9px;">
                    <ion-col size="12" style="text-align: center;">
                        <ion-text class="modal-title">{{ $t(`Add ${title} Tests`)}}</ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <ion-text class="modal-intro-text">{{ $t("Proof of your test score are required to proceed with your applications")}}</ion-text>
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col" style="margin-bottom: 9px;">
                    <ion-col size="12" style="text-align: center;">
                        <searchable-select v-model="engTest_id"
                            label="Test Name" stitle="Test Name"
                            :icon-end="chevronDownOutline" :items="engTestData"
                            valueProperty="id" textProperty="title">
                        </searchable-select>
                    </ion-col>
                    <ion-col size="12">
                        <input-field label="Score" v-model="score"></input-field>
                    </ion-col>
                    <ion-col size="12" style="text-align: center;">
                        <input-field v-model="date" label="Date of issue" placeholder="Example: 1995-09-13" :icon-start="calendarOutline" @clickIconStart="openModel"/>
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
        </ion-content>
        <footer-section @save="postData" @discard="discardData"/>
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
    IonInput,
    IonButton,
    IonDatetime,
    modalController,
} from "@ionic/vue";
import { defineComponent, computed, ref, onBeforeMount, watch } from "vue";
import FooterSection from "@/components/modal/profilemodal/FooterSection.vue";
import SearchableSelect from "@/components/SearchableSelect.vue";
import InputField from "@/components/InputField.vue";
import {calendarOutline, chevronDownOutline} from 'ionicons/icons';

import {useDocumentDataStore} from "@/store";
import {useLoadingStore} from "@/store/loading";
import {useToast} from "@/shared/toast";
import {format, parseISO} from 'date-fns';

export default defineComponent({
    name:"EnglishTest",
    components: {
        SearchableSelect,
        FooterSection,
        InputField,    
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonText,
        IonDatetime,
        IonCol,
        IonInput,
        IonButton
    },
    props: {
      title: String,
    },
    setup(props) {
        const store = useDocumentDataStore();
        const {showToast} = useToast();
        const {showLoading, hideLoading} = useLoadingStore();
        const {loadEngTests, changeFlag, postTestData} = store;
        const dataLoaded = computed(() => store.dataLoaded);
        const engTestData = computed(() => store.engTestData);
        const postresult = computed(() => store.postresult);
        const engTest_id = ref("");
        const file = ref("");
        const score = ref("");
        const date = ref("");
        const selectedDate = ref("");
        const isOpen = ref(false);
        
        const openModel = () => {
            isOpen.value = true;
        }
        const closeModel = () => {
            isOpen.value = false;
        }
        const handleFile = (event) => {
            showToast({message: "File uploaded successfully!", color:'secondary'});
            file.value = event.target.files[0];
        }

        const postData = async () => {
            if(!engTest_id.value || !score.value || !date.value || !file.value){
                showToast({message: 'Fill the gaps exactly!', color:'warning'});
                return;
            }
            let formData = new FormData();
            formData.append("test_id", engTest_id.value);
            formData.append("score", score.value);
            formData.append("date_issued", date.value);
            formData.append("document", file.value);
            showLoading();
            if(props.title=="English Language")
                await postTestData("english", formData);
            else
                await postTestData("entrance", formData);
            hideLoading();
            modalController.dismiss({
                'dismissed': true
            })
            showToast({message: postresult.value, color:'secondary'});
            console.log(postresult.value)
        }
        const discardData = () => {
            engTest_id.value="";
            file.value = "";
            score.value = "";
            date.value = "";
        }
        watch(selectedDate, (new_date) => {
            if (!new_date) return;
            date.value = format(parseISO(new_date), 'yyyy-MM-dd')
        });
        onBeforeMount(() => {
            if (!dataLoaded.value) {
                showLoading();
                if(props.title=="English Language")
                    Promise.all([loadEngTests('english')]).then(() => {
                        hideLoading();
                        changeFlag();
                    })
                else  
                    Promise.all([loadEngTests('entrance')]).then(() => {
                        hideLoading();
                        changeFlag();
                    })      
            }
        })
        return {
            engTest_id,
            engTestData,
            score,
            calendarOutline,
            chevronDownOutline,
            handleFile,
            postData,
            discardData,
            selectedDate,
            date,
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
  --border-color: #bcbcbc;
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