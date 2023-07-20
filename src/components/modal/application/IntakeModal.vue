<template>
    <ion-page  style="height:40%">
        <ion-content>
            <ion-grid>
                <ion-row class="flex-col" style="margin-bottom: 0px; padding-bottom: 0px;">
                    <ion-col size="12" style="text-align: center;">
                        <ion-text class="modal-title">{{ $t(`Intake`)}}</ion-text>
                    </ion-col>
                    <ion-col size="12" style="text-align: center;">
                        <ion-text class="m-title">{{ $t(`Please choose your preferred intake. By default, the earliest intake is chosen`) }}</ion-text>
                    </ion-col>
                </ion-row>
                <ion-row class="flex-col" style="margin-bottom:0;">
                    <ion-col size="12">
                        <input-field v-model="joining_date" label="Intake" placeholder="Example: 1995-09-13" :icon-start="calendarOutline" @clickIconStart="openModel()" autofocus/>
                    </ion-col>
                    <ion-col size="12" style="text-align: center;">
                        <ion-checkbox label-placement="end" v-model="is_working_here">
                        </ion-checkbox>
                        <ion-label class="s-title" style="margin-left: 8px;">
                            {{ $t(`I, hereby, grant UNIRANKS and/or its agents the authority to act on my behalf and represent me and my application with the institutions.`) }}
                        </ion-label>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <ion-modal :is-open="isOpen" ref="modal" :keep-contents-mounted="true" @didDismiss="closeModel">
            <ion-datetime id="datetime" :locale="`${$root.$i18n.locale == 'ar'?'ar-ae': $root.$i18n.locale}`"
                            presentation="date" mode="ios"
                            :show-default-buttons="true"
                            :done-text="$t('Done')"
                            :cancel-text="$t('Cancel')"
                            v-model="cal_date">
                <span slot="title">{{ $t('Select your date') }}</span>
            </ion-datetime>
        </ion-modal>
        <footer-section @back="backModal" @save="saveData" title="Continue"/>
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
    IonDatetime,
    IonModal,
    IonCheckbox,
    IonLabel,
    modalController,
} from "@ionic/vue";
import { defineComponent, ref, watch, onMounted, computed } from "vue";
import {useRouter} from "vue-router";
import { useApplicationStore } from "@/store";
import {useToast} from "@/shared/toast";
import {useLoadingStore} from "@/store/loading";
import FooterSection from "@/components/modal/profilemodal/PrevSaveFooter.vue";
import {calendarOutline} from 'ionicons/icons';
import InputField from "@/components/InputField.vue";
import {format, parseISO} from 'date-fns';

export default defineComponent({
    name:"ProfileIntroModal",
    components: {
        InputField,
        FooterSection,
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonText,
        IonCol,
        IonCheckbox,
        IonDatetime,
        IonModal,
        IonLabel,
    },
    props: {
        id: String,
        title: String,
        program_id: String,
    },
    setup(props) {
        const store = useApplicationStore();
        const router = useRouter();
        const {showToast} = useToast();
        const {showLoading, hideLoading} = useLoadingStore();
        const { postApplyData } = store;
        const applyData = computed(() => store.applyData);
        const isOpen = ref(false);
        const cal_date = ref("");
        const joining_date = ref("");
        const openModel = () => {
            isOpen.value = true;
        }
        const closeModel = () => {
            isOpen.value = false;
        }
        const backModal = () => {
            modalController.dismiss({
                'dismissed': false
            })
        }
        const saveData = async () => {
            let formData = new FormData();
            formData.append("intake_id", props.id);
            formData.append("program_id", props.program_id);
            await postApplyData(formData);
            console.log(applyData.value);
            modalController.dismiss({"dismissed": true});
        }
        watch(cal_date, (new_date) => {
            if (!new_date) return;
                joining_date.value = format(parseISO(new_date), 'yyyy-MM-dd')
                console.log(joining_date.value)
        });
        onMounted(() => {
            const dateStr = props.title;
            const date = new Date(dateStr);
            const formattedDate = date.getFullYear() + '-' + ((date.getMonth() + 1));
            joining_date.value = formattedDate;
        })
        return {
            isOpen,
            joining_date,
            cal_date,
            calendarOutline,
            saveData,
            backModal,
            openModel,
            closeModel
        };
    }
})
</script>
<style scoped>
ion-grid {
    padding:3%;
}
ion-content {
    --ion-background-color: #F5F5F5 !important;
}
ion-text {
    font-family: "Calibri";
}
ion-col {
    margin-bottom: 9px;
}
ion-card {
    border-color: #bcbcbc;
    border-width: 1px;
    border-style: solid;
    border-radius: 10px;
    filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.16 ));
    background: #ffffff;
    margin:0px;
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
.m-title {
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    text-align: center;
    color: #1c345a; 
}
.s-title {
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    color: #606060;
}
</style>