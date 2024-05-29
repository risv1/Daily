<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps({
  fileName: String,
});

const fileUrl = ref(null);
const pending = ref(true);

onMounted(async () => {
  const response = await fetch(`/api/get-fileUrl/${props.fileName}`);
  const data = await response.json();
  fileUrl.value = data.fileUrl
  pending.value = false;
});
</script>

<template>
  <div v-if="pending" class="flex flex-col w-full h-full gap-3 items-center">
    <div class="w-10/12 h-full bg-gradient-to-r from-gray-800 via-gray-900 to-gray-950 animate-pulse rounded-lg"></div>
  </div>
  <div v-else>
    <h1 class="mt-3 text-lg font-medium text-white">{{ props.fileName }}</h1>
    <embed class="mt-3" v-if="fileUrl" :src="fileUrl" width="100%" height="600px" />
  </div>
</template>