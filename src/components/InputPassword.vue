<template>
  <input-field :value="modelValue" :type="passwordInputType" @input="getValue"
               required :label="placeholder"  :icon-start="lockClosedOutline"
               :icon-end="showPassIcon"
               @clickIconEnd="showPassword = !showPassword"/>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {eyeOffOutline, eyeOutline, lockClosedOutline, personOutline} from "ionicons/icons";
import InputField from "@/components/InputField.vue";

export default defineComponent({
  components: {
    InputField,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: () => "Password",
    },
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const showPassword = ref(false);
    const showPassIcon = computed(() => {
      return showPassword.value ? eyeOffOutline : eyeOutline;
    })
    const passwordInputType = computed(() => {
      return showPassword.value ? 'text' : 'password';
    })

    const getValue = (value: any) => {
      emit('update:modelValue', value)
    }

    return {showPassword, showPassIcon, passwordInputType, personOutline, lockClosedOutline, getValue};
  }
});
</script>

<style scoped>

</style>