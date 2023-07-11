<template>
  <ion-cont>
    <input-field v-model="setMinValue" label="Minimum" :required="true" :autofocus="true"/>
    <ion-label>-</ion-label>
    <input-field v-model="setMaxValue" label="Maximum" :required="true" :autofocus="true"/>
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
    min:{
      type: String,
      default: '',
    },
    max:{
      type: String,
      default: '',
    },
  },
  emits:['update:min', 'update:max', 'focus', 'change'],
  components: {
    IonLabel,
    // IonItem,
    InputField
  },
  setup(props,{emit}){
    const {t} = useI18n({useScope:"global"});
    const setMinValue = computed({
      // getter
      get() {
        return props.min;
      },
      // setter
      set(newValue) {
        emit('update:min', newValue);
        emit('change', newValue);
      }
    });
    const setMaxValue = computed({
      // getter
      get() {
        return props.max;
      },
      // setter
      set(newValue) {
        emit('update:max', newValue);
        emit('change', newValue);
      }
    })
    return {
      chevronBackOutline,
      setMinValue,
      setMaxValue,
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