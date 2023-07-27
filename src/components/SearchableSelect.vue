<template>
  <ion-item lines="full" :fill="fill" :mode="mode" :class="sClass" @click="setIsOpen(true)">
    <ion-label :position="labelPosition" :color="labelColor">{{ $t(label) }}</ion-label>
    <ion-icon v-if="iconStart" slot="start" :icon="iconStart" @click="$emit('clickIconStart')"></ion-icon>
    <ion-icon v-if="iconEnd" slot="end" :icon="iconEnd" @click="$emit('clickIconEnd')"></ion-icon>
    <ion-text v-if="selectedItem">
      <p class="txt-20 color-3" style="margin-top: .25em; margin-bottom: .5em">
        {{selectedItem[localeProperty] || selectedItem[textProperty]}}
      </p>
    </ion-text>
    <ion-input v-model="selectionValue" :type="type" :required="required" :autofocus="autofocus" :value="selectedItem[textProperty] || selectedItem[localeProperty]" style="display: none;" :placeholder="placeholder" />
  </ion-item>

  <ion-modal :is-open="isOpen" :initial-breakpoint="0.95" >
    <ion-header mode="ios">
      <ion-toolbar mode="ios" class="ion-margin-vertical">
        <ion-title class="txt-26 color-3">{{ $t(stitle) }}</ion-title>
      </ion-toolbar>
      <ion-toolbar class="c-search ion-margin-bottom">
        <ion-icon class="c-back-icon" :icon="chevronBackOutline" mode="ios" @click="setIsOpen(false)" />
        <ion-searchbar mode="ios" v-model="search" show-clear-button="focus"
                       :placeholder="$t('start typing')" :search-icon="chevronBackOutline"/>
      </ion-toolbar>
      <ion-toolbar mode="ios" class="ion-margin-vertical" v-if="selectionValue" style="--border-width: 0;">
        <ion-label class="txt-20 color-3">{{ (currentValue[localeProperty] || currentValue[textProperty]) }}</ion-label>
      </ion-toolbar>
      <hr class="under_line" style="width: 75%;" v-if="selectionValue"/>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item class="c-item" lines="full" mode="ios" v-for="item in filteredItems" :key="item[valueProperty]" @click="selectItem(item[valueProperty])">
          <ion-label class="txt-20 color-3">{{ (item[localeProperty] || item[textProperty]) }}</ion-label>
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
    const currentValue = computed(() => {
      if (!selectionValue.value) return {};
      return props.items.find((item) => item[props.valueProperty] == selectionValue.value);
    })
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
      setIsOpen,
      currentValue
    }
  }
})
</script>


<style scoped>
  ion-item {
    width: 100%;
    --background: white;
    /* --border-width: 0 !important; */
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
  ion-searchbar {
    border: 2px solid #7fc4fd;
    border-radius: 15px;
    padding: 0;
    --background: white;
  }
  ion-modal {
    --ion-background-color: #F5F5F5;
  }
  ion-modal ion-list ion-item {
    --background: #F5F5F5;
    --border-width: 0 !important;
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