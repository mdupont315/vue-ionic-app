<template>
  <ion-item lines="full" :fill="fill" :mode="mode" :class="sClass" @click="setIsOpen(true)">
    <ion-label :position="labelPosition" :color="labelColor">{{ $t(label) }}</ion-label>
    <ion-icon v-if="iconStart" slot="start" :icon="iconStart" @click="$emit('clickIconStart')"></ion-icon>
    <ion-icon v-if="iconEnd" slot="end" :icon="iconEnd" @click="$emit('clickIconEnd')"></ion-icon>
    <ion-text v-if="selectedItem">
      <p style="margin-top: .25em; margin-bottom: .5em">
        {{selectedItem[localeProperty] || selectedItem[textProperty]}}
      </p>
    </ion-text>
    <ion-input v-model="selectionValue" :type="type" :required="required" :autofocus="autofocus" :value="selectedItem[localeProperty] || selectedItem[textProperty]" style="display: none;" />
  </ion-item>

  <ion-modal :is-open="isOpen" :initial-breakpoint="0.95" >
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-title>{{ $t(stitle) }}</ion-title>
      </ion-toolbar>
      <ion-toolbar class="c-search">
        <ion-icon class="c-back-icon" :icon="chevronBackOutline" mode="ios" @click="setIsOpen(false)" />
        <ion-searchbar mode="ios" v-model="search" show-clear-button="focus"
                       :placeholder="$t('Search')" :search-icon="chevronBackOutline"/>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item class="c-item" lines="full" mode="ios" v-for="item in filteredItems" :key="item[valueProperty]"
                  :disabled="selectionValue == item[valueProperty]" @click="selectItem(item[valueProperty])">
          <ion-label>{{ (item[localeProperty] || item[textProperty]) }}</ion-label>
          <ion-icon v-if="selectionValue == item[valueProperty]" slot="end" :icon="checkmark" color="success"/>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script>
import {computed, defineComponent, ref} from "vue";
import {
  IonIcon, 
  IonInput, 
  IonItem, 
  IonLabel,
  IonModal,
  IonHeader,
  IonButtons,
  IonButton,
  IonList,
  IonText,
  IonContent,
  IonSearchbar,
  IonSpinner,
  IonTitle,
  IonToolbar} from "@ionic/vue";
import {useI18n} from "vue-i18n";
import {chevronBackOutline, checkmark} from "ionicons/icons";

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
    stitle: {
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
    sClass: {
      type:String,
      default:()=>""
    },
    multiple: {
      type: Boolean,
      default: () => false,
    }
  },
  emits:['update:modelValue','focus', 'change'],
  components: {
    IonIcon,
    IonInput,
    IonLabel,
    IonItem,
    IonModal,
    IonHeader,
    IonList,
    IonContent,
    IonSearchbar,
    IonTitle,
    IonToolbar
  },
  setup(props,{emit}){
    console.log("props.items", props.items)
    const {t} = useI18n({useScope:"global"});
    const placeHolderText = computed(()=>{
      return (props.placeholder ? t(props.placeholder): "")
    });
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
    const isOpen = ref(false)
    const search = ref('')
    const setIsOpen = (state) => {
      isOpen.value = state;
      if (!state) {
        search.value = '';
      }
    }
    const selectedItem = computed(() => {
      if (!selectionValue.value) return {};
      return props.items.find((item) => item[props.valueProperty] == selectionValue.value);
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
    const selectItem = (id) => {
      selectionValue.value = id;
      if (!props.multiple) {
        setIsOpen(false);
      }
    }
    return {
      chevronBackOutline,
      checkmark,
      placeHolderText,
      selectionValue,
      isOpen,
      search,
      selectedItem,
      filteredItems,
      selectItem,
      setIsOpen
    }
  }
})
</script>


<style scoped>
  ion-item {
    width: 100%;
    /* --border-color: #029ae4;
    --ion-color-base: #029ae4 !important; */
  }
  ion-item::part(native) {
    border-radius: 15px;
  }
  ion-item.f-item::part(native) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: none;
  }
  ion-item.s-item::part(native) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  ion-item.c-item::part(native) {
    border-radius: 0;
  }
  .item-fill-outline.item-has-value .label-floating.sc-ion-label-md-h,
  .item-fill-outline.item-has-focus .label-floating.sc-ion-label-md-h {
    transform: translateY(6px) scale(0.75);
  }
  .sc-ion-input-md-h.has-value, .sc-ion-input-md-h.has-focus {
    top: 10px;
  }
  .searchbar-left-aligned.sc-ion-searchbar-ios-h .searchbar-search-icon.sc-ion-searchbar-ios {
    right: auto !important;
    left: 20px !important;
    font-size: 30px;
  }
</style>