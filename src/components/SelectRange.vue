<template>
  <ion-cont>
    <input-field label="Minimum" :icon-start="chevronDownOutline"/>
    <ion-label>-</ion-label>
    <input-field label="Maximum" :icon-start="chevronDownOutline"/>
  </ion-cont>
</template>

<script>
import {computed, defineComponent, ref} from "vue";
import {
  IonItem, 
  IonLabel,
} from "@ionic/vue";
import {useI18n} from "vue-i18n";
import {chevronBackOutline, checkmark} from "ionicons/icons";
import InputField from "@/components/InputField.vue";

export default defineComponent({
  props: {
    minValue:{
      type: String,
      default: '',
    },
    maxValue:{
      type: String,
      default: '',
    },
  },
  emits:['update:minValue', 'update:maxValue', 'focus', 'change'],
  components: {
    IonLabel,
    // IonItem,
    InputField
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
  ion-cont {
    display: block;
    width: 100%;
  }
  ion-item {
    width: 45%;
    display: inline-block;
    border: 1px solid #bcbcbc;
    border-radius: 5px;
    --border-width: 0 !important;
    margin: 5px 0;
    background: #ffffff;
    color: #1c345a;
  }
  ion-label {
    width: 10%;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    margin-top: 30px;
  }
</style>