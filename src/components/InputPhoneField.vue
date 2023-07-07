<template>
  <ion-item lines="full" :fill="fill" :mode="mode">
    <ion-label :position="labelPosition" :color="labelColor">{{ $t(label) }}</ion-label>
    <ion-img v-if="iconStart" slot="start" :src="flagUrl" @click="clickContryCode" />
    <ion-text v-if="iconStart" slot="start" @click="clickContryCode">{{ `+${countryCode}` }}</ion-text>
    <ion-input v-model="myValue" :type="type" :required="required" :autofocus="autofocus" />
  </ion-item>
</template>

<script>
import {computed, defineComponent, ref} from "vue";
import { IonInput, IonItem, IonLabel, IonImg, actionSheetController, IonText} from "@ionic/vue";
import {useI18n} from "vue-i18n";

export default defineComponent({
  props: {
    items:{
      type:Array,
      required:true,
    },
    valueProperty:{
      type:String,
      required:true,
    },
    textProperty:{
      type:String,
      required:true,
    },
    modelValue:{
      type: String,
      default: '',
    },
    value:{
      type: String,
      default: '',
    },
    dCode:{
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: () => "",
    },
    type: {
      type: String,
      default: () => "text",
    },
    placeholder: {
      type: String,
      default: () => "",
    },
    autofocus: {
      type: Boolean,
      default: () => false,
    },
    required: {
      type: Boolean,
      default: () => false,
    },
    mode: {
      type: String,
      default: () => "md",
    },
    fill: {
      type: String,
      default: () => "outline",
    },
    labelPosition: {
      type: String,
      default: () => "floating",
    },
    labelColor: {
      type: String,
      default: () => "medium",
    },
    iconStart:{
      type:String,
      default:()=>""
    },
    iconEnd:{
      type:String,
      default:()=>""
    },
  },
  emits:['update:modelValue','focus', 'input','update:dCode', 'change'],
  components: {
    IonInput,
    IonLabel,
    IonItem,
    IonImg,
    IonText
  },
  setup(props,{emit}){
    const {t} = useI18n({useScope: "global"});
    const filteredItems = computed(() => {
      let _data = props.items.map(item => {
        return { text: `+${item.country_code}-${item.country_name}`, data: {code: item.country_code, flag: item.flag_url} };
      })
      _data.push({ text: t('Cancel'), role: 'cancel' })

      return _data;
    })
    const flagUrl = ref('');
    const countryCode = computed({
      // getter
      get() {
        return props.dCode
      },
      // setter
      set(newValue) {
        emit('update:dCode', newValue);
        emit('change', newValue);
      }
    })
    const clickContryCode = async () => {
      const actionSheet = await actionSheetController.create({
        mode: "ios",
        header: t('Change Language'),
        buttons: filteredItems.value
      });

      await actionSheet.present();
      const res = await actionSheet.onDidDismiss();
      if (!res.data) {
        return;
      }
      if (countryCode.value == res.data.code) {
        return;
      }
      countryCode.value = res.data.code;
      flagUrl.value = res.data.flag;
    };
    const placeHolderText = computed(()=>{
      return (props.placeholder ? t(props.placeholder): "")
    });
    const myValue = computed({
      // getter
      get() {
        return props.modelValue || props.value
      },
      // setter
      set(newValue) {
        emit('update:modelValue', newValue);
        emit('input', newValue);
      }
    })
    return {placeHolderText, myValue, clickContryCode, filteredItems, flagUrl, countryCode}
  }
})
</script>

<style scoped>
ion-item {
  width: 100%;
}
ion-item::part(native) {
  border-radius: 15px;
}
.item-fill-outline.item-has-value .label-floating.sc-ion-label-md-h,
.item-fill-outline.item-has-focus .label-floating.sc-ion-label-md-h {
  transform: translateY(6px) scale(0.75);
}
.sc-ion-input-md-h.has-value, .sc-ion-input-md-h.has-focus {
  top: 10px;
}
ion-img, ion-text {
  margin-right: 10px;
}
</style>