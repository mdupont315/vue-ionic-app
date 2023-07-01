<template>
  <menu-item v-for="(p, i) in repMenu" :key="i" :item="p"/>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {usePages} from "@/shared";
import MenuItem from "@/components/menus/MenuItem.vue";

export default defineComponent({
  components: {
    MenuItem,
  },
  setup() {
    const {repMenu} = usePages();
    return {
      repMenu,
    }
  }
});

</script>