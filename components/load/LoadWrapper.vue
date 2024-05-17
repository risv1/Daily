<script setup>
import { ref } from "vue";

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>

<template>
  <div v-if="isLoading">
    <Loader />
  </div>
  <div v-else>
    <slot />
  </div>
</template>
