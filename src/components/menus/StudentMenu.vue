<template>
  <span v-if="user?.user_bio?.profile_completion_status == 9">
    <menu-item v-for="(p, i) in appPages" :key="`${p.title}_${i}`" :item="p"/>
  </span>
  <menu-item v-for="(p, i) in setupProfilePages" :key="`${p.title}_${i}`" :item="p"/>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {useAuthStore} from "@/store";
import {usePages} from "@/shared";
import MenuItem from "@/components/menus/MenuItem.vue";

export default defineComponent({
  components: {
    MenuItem,
  },
  setup() {
    const authStore = useAuthStore();
    const {appPages, setupProfilePages} = usePages();
    const user = computed(() => authStore.user);

    return {
      appPages,
      setupProfilePages,
      user,
    }
  }
});

</script>