<template>
  <ion-text v-if="message" color="danger">
    <p>{{ message[0] || message }}</p>
  </ion-text>
</template>

<script>
import {IonText} from "@ionic/vue";

export default {
  name: "InputError",
  components:{
    IonText,
  },
  props:{
    message: [String,Array],
  }
}
</script>

<style scoped>

</style>