<template>
  <p class="separator">{{content}}</p>
</template>

<script>
export default {
  name: "DividerWithText",
  props:{
    content:String,
  }
}
</script>

<style scoped>
.separator {
  display: flex;
  align-items: center;
  text-align: center;
}

.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--ion-color-medium);
}

.separator:not(:empty)::before {
  margin-right: .25em;
}

.separator:not(:empty)::after {
  margin-left: .25em;
}
</style>