<template>
  <ion-item lines="full" :fill="fill" :mode="mode">
    <ion-label :position="labelPosition" :color="labelColor">{{ $t(label) }}</ion-label>
    <ion-icon v-if="iconStart" slot="start" :icon="iconStart" @click="$emit('clickIconStart')"></ion-icon>
    <ion-icon v-if="iconEnd" slot="end" :icon="iconEnd" @click="$emit('clickIconEnd')"></ion-icon>
    <ion-input v-model="myValue" :type="type" :required="required" :autofocus="autofocus">
    </ion-input>
  </ion-item>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {IonIcon, IonInput, IonItem, IonLabel} from "@ionic/vue";
import {useI18n} from "vue-i18n";

export default defineComponent({
  props: {
    modelValue:{
      type: String,
      default: '',
    },
    value:{
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
  emits:['update:modelValue','focus', 'input'],
  components: {
    IonIcon,
    IonInput,
    IonLabel,
    IonItem,
  },
  setup(props,{emit}){
    const {t} = useI18n({useScope:"global"});
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
        emit('update:modelValue',newValue);
        emit('input',newValue);
      }
    })
    return {placeHolderText,myValue}
  }
})
</script>

<style scoped>
ion-item {
  width: 100%;
  --border-color: #029ae4;
  --ion-color-base: #029ae4 !important;
}
ion-item::part(native) {
  border-radius: 25px;
}
.item-fill-outline.item-has-value .label-floating.sc-ion-label-md-h,
.item-fill-outline.item-has-focus .label-floating.sc-ion-label-md-h {
  transform: translateY(6px) scale(0.75);
}
.sc-ion-input-md-h.has-value, .sc-ion-input-md-h.has-focus {
  top: 10px;
}
</style>