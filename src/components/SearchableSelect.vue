<template>
  <ion-item lines="full" fill="outline" mode="md" :disabled="loading"
            @click="setIsOpen(true)" class="custom-input">
    <ion-label color="medium" :position="'stacked'">
      {{ $t(label) }}
    </ion-label>
    <ion-spinner v-if="loading" slot="end" color="secondary"/>
    <ion-text v-else>
      <p v-if="selectedItem" style="margin-top: .25em; margin-bottom: .5em">
        {{selectedItem[localeProperty] || selectedItem[textProperty]}}
      </p>
    </ion-text>
    <ion-icon v-if="clearable && selectionValue" style="z-index: 1000" :icon="close" color="primary" slot="end" @click="selectionValue = ''"/>
  </ion-item>
  <ion-modal :is-open="isOpen" >
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-title>{{ $t(label) }}</ion-title>
        <ion-buttons slot="end">
          <ion-button mode="ios" @click="setIsOpen(false)">{{ $t('Cancel') }}</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar mode="ios" v-model="search" show-clear-button="focus"
                       :placeholder="$t('Search')"/>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item lines="full" mode="ios" v-for="item in filteredItems" :key="item[valueProperty]"
                  :disabled="selectionValue == item[valueProperty]" @click="selectItem(item[valueProperty])">
          <ion-label>{{ (item[localeProperty] || item[textProperty]) }}</ion-label>
          <ion-icon v-if="selectionValue == item[valueProperty]" slot="end" :icon="checkmark" color="success"/>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {
  IonText,
  IonButton,
  IonContent,
  IonHeader, IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSearchbar,
  IonSpinner,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import {checkmark,close} from 'ionicons/icons';

export default defineComponent({
  components: {
    IonText,
    // IonSelect,
    // IonSelectOption,
    IonIcon,
    IonSearchbar,
    IonList,
    IonModal, IonHeader, IonToolbar, IonContent, IonTitle,
    IonSpinner,
    IonLabel,
    IonButton,
    IonItem,
  },
  props:{
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
    localeProperty:{
      type:String,
      default:()=>'translated_name'
    },
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
      default: () => "stacked",
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
    loading:{
      type:Boolean,
      default:()=>false,
    },
    required: {
      type: Boolean,
      default: () => false,
    },
    multiple: {
      type: Boolean,
      default: () => false,
    },
    clearable: {
      type: Boolean,
      default: () => false,
    },
  },
  emits:['update:modelValue','focus', 'change'],
  setup(props,{emit}) {
    const selectionValue = computed({
      // getter
      get() {
        return props.modelValue || props.value
      },
      // setter
      set(newValue) {
        emit('update:modelValue',newValue);
        emit('change',newValue);
      }
    })
    const isOpen = ref(false);
    const setIsOpen = (state: boolean) => {
      isOpen.value = state;
      if (!state) {
        search.value = '';
      }
    }
    const search = ref('');
    const selectedItem = computed(() => {
      if (!selectionValue.value) return {};
      return props.items.find((item: any) => item[props.valueProperty] == selectionValue.value);
    })
    const filteredItems = computed(() => {
      if (!search.value) return props.items;
      let query = search.value.toLowerCase();
      return props.items.filter(item => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return item[props.textProperty]?.toLowerCase().indexOf(query) > -1 || item[props.localeProperty]?.toLowerCase().indexOf(query) > -1;
      })
    })
    const selectItem = (id: any) => {
      selectionValue.value = id;
      if (!props.multiple) {
        setIsOpen(false);
      }
    }
    return {selectionValue,isOpen,setIsOpen,search,selectedItem,filteredItems,selectItem,checkmark,close}
  }
})
</script>

<style scoped>

</style>