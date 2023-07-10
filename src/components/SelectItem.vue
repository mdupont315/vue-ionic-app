<template>
  <ion-list>
    <ion-item lines="full" mode="ios" v-for="item in filteredItems" :key="item[valueProperty]"
              :class="selectionValue == item[valueProperty] ? 'selected' : ''" @click="selectItem(item[valueProperty])">
      <ion-label>{{ (item[localeProperty] || item[textProperty]) }}</ion-label>
    </ion-item>
  </ion-list>
</template>

<script>
import {computed, defineComponent, ref} from "vue";
import {
  IonItem, 
  IonLabel,
  IonList,
} from "@ionic/vue";
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
    IonLabel,
    IonItem,
    IonList,
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
    width: auto;
    height: 30px;
    display: inline-block;
    border: 1px solid #bcbcbc;
    border-radius: 15px;
    --border-width: 0 !important;
    margin: 5px 10px 5px 0;
  }
  ion-label {
    margin-top: -5px;
  }
  ion-item::part(native) {
    padding-right: 10px;
  }
  ion-item.selected {
    --background: #1c345a;
    color: #ffffff;
  }
</style>