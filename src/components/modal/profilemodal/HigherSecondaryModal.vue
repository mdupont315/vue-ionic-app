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
                        <searchable-select v-model="country_id"
                            label="Country of Education" stitle="Country of Education"
                            :icon-end="chevronDownOutline" :items="countries"
                            textProperty="country_name" valueProperty="id" @change="loadSchool">
                        </searchable-select>
                    </ion-col>
                    <ion-col size="12" style="text-align: center;">
                        <searchable-select v-model="school_id"
                            :label="school_title" :stitle="school_title"
                            :icon-end="chevronDownOutline" :items="schools"
                            textProperty="name" valueProperty="id">
                        </searchable-select>
                    </ion-col>
                    <ion-col size="12" style="text-align: center;">
                        <searchable-select v-model="degree_id"
                            label="Higher Secondary" stitle="Degree"
                            :icon-end="chevronDownOutline" readonly
                            :items="degrees" textProperty="title" valueProperty="id">
                        </searchable-select>
                    </ion-col>
                    <ion-col size="12" style="text-align: center;">
                        <searchable-select v-model="fieldS_id"
                            label="Field of Study" stitle="Field of Study"
                            :icon-end="chevronDownOutline" :items="fieldStudy"
                            textProperty="title" valueProperty="id">
                        </searchable-select>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="6" style="text-align: center;">
                        <searchable-select v-model="gradeS_id"
                            label="Grading System" stitle="Grading System"
                            :icon-end="chevronDownOutline" :items="gradingSys"
                            textProperty="title" valueProperty="id">
                        </searchable-select>
                    </ion-col>
                    <ion-col size="6" style="text-align: center;">
                        <searchable-select v-model="score_id" 
                            label="Score" stitle="Score(out of 100)"
                            :icon-end="chevronDownOutline" :items="scores"
                            textProperty="score" valueProperty="id">
                        </searchable-select>
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col">
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
                    <ion-col size="12"  @click="toUpload">
                        <input-field readonly :icon-end="trashBin" :value="fileName"></input-field>
                    </ion-col>
                </ion-row>
            </ion-grid>
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
    IonButton,
    IonInput,
    modalController,
} from "@ionic/vue";

import { computed, defineComponent, ref, onBeforeMount, reactive } from "vue";
import FooterSection from "@/components/modal/profilemodal/FooterSection.vue";
import SearchableSelect from "@/components/SearchableSelect.vue";
import InputField from "@/components/InputField.vue";
import {chevronDownOutline, trashBin} from 'ionicons/icons';
import UploadModal from "@/components/modal/profilemodal/UploadModal.vue";

import {useDocumentDataStore} from "@/store";
import {useLoadingStore} from "@/store/loading";
import {useToast} from "@/shared/toast";

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
        IonInput,
        IonButton
    },
    props: {
      title: String,
    },
    setup(props) {
        const store = useDocumentDataStore();
        const {showToast} = useToast();
        const {loadCountries, changeFlag, loadSchools, postEducationData} = store;
        const dataLoaded = computed(() => store.dataLoaded);
        const countries = computed(() => store.countries);
        const fieldStudy = computed(() => store.fieldStudy);
        const gradingSys = computed(() => store.gradingSys);
        const schools = computed(() => store.schools);
        const postresult = computed(() => store.postresult);
        const {showLoading, hideLoading} = useLoadingStore();
        const country_id=ref("");
        const school_id=ref("");
        const degree_id=ref("");
        const fieldS_id=ref("");
        const gradeS_id=ref("");
        const fileName=ref("");
        const fileDirectory=ref("");
        const fileType=ref("");
        const filePost=ref();
        const school_title=ref("");
        const degrees=ref([
            {
                id:1,
                title: "Higher Secondary"
            },
            {
                id:2,
                title: "Undergraduate"
            },
            {
                id:3,
                title: "Postgraduate"
            },
        ]);
        const scores=ref([]);
        const score_id=ref("");

        const handleFile = (event) => {
            const file = event.target.files[0];
            filePost.value = file;
            
            if(file.type=='application/pdf')
                fileType.value="pdf";
            if(file.type=='image/png' || file.type=='image/jpg')
                fileType.value="img" 
            
            fileName.value=file.name;
            
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => {
                fileDirectory.value=reader.result;
            }
        };
        const toUpload = async() => {
            const modal = await modalController.create({
                component: UploadModal,
                componentProps:{
                    title:props.title,
                    fileName: fileName.value,
                    fileDirectory: fileDirectory.value,
                    type: fileType.value,
                },
                initialBreakpoint: 0.9,
            });
            modal.present();
        };
        
        const loadSchool = async () => {
            await loadSchools(props.title, country_id.value);
            changeFlag();
        }

        const postData = async () => {
            
            if(!country_id.value || !school_id.value || ! fieldS_id.value || !gradeS_id.value || !score_id.value || !filePost.value)
                showToast({message: 'Fill the gaps exactly!', color:'warning'});
            else {
                let formData = new FormData();
                formData.append("country_id", country_id.value);
                formData.append("institute", school_id.value);
                formData.append("discipline", fieldS_id.value);
                formData.append("grade_scale_id", gradeS_id.value);
                formData.append("grades", score_id.value);
                formData.append("document", filePost.value);
                await postEducationData(props.title.toLowerCase().replace(" ", "-"), formData);

                showToast({message: postresult.value, color:'secondary'});
            }
        }
        const discardData = () => {
            country_id.value="";
            school_id.value="";
            fieldS_id.value="";
            gradeS_id.value="";
            score_id.value="";
            fileName.value="";
            fileType.value="";
            fileDirectory.value="";
        }

        onBeforeMount(() => {
            console.log("BeforeMount")
            if (!dataLoaded.value) {
                showLoading();
                Promise.all([loadCountries()]).then(() => {
                    hideLoading();
                    changeFlag();
            })
            for(let i=0;i<=100;i++)
                scores.value.push({id:i, score:i});
            if(props.title==="Higher Secondary"){
                school_title.value="School name";
                degree_id.value="1";
            }    
            else{
                school_title.value="Name of the Institution";
                if(props.title==="Undergraduate") degree_id.value="2"
                else degree_id.value="3"
            }
                
        }
        });
        return {
            chevronDownOutline,
            trashBin,
            toUpload,
            fileName,
            countries,
            country_id,
            degrees,
            degree_id,
            schools,
            school_id,
            school_title,
            gradingSys,
            gradeS_id,
            fieldStudy,
            fieldS_id,
            score_id,
            scores,
            handleFile,
            loadSchool,
            postData,
            discardData,
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