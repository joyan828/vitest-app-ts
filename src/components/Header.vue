<script setup lang="ts">
import { defineComponent} from 'vue'
defineProps<{ loggedIn: boolean }>()
</script>

<template>
  <header>
    <button class="login" type="button" @click="$emit('set-status')">{{loggedIn? 'Logout' : 'Login'}}</button>
  </header>
</template>

<script lang="ts">
export default defineComponent({
  name: "Header",
  emits: ['set-status'],
  props: {
    loggedIn: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style scoped>
header {
  text-align: right;
}
</style>
