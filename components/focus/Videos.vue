<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
const searchRef = ref<string>("");
const videosRef = ref<any[]>([]);

const searchYt = useDebounceFn(async (value: string) => {
  const { data: videos } = await useFetch("/api/search-videos", {
    method: "POST",
    body: JSON.stringify({ query: value }),
    headers: {
      "Content-Type": "application/json",
    },
    transform: (data: any) => data.videos,
  });
  videosRef.value = videos.value;
}, 1000);

watchEffect(() => {
  if (searchRef.value.length > 0) {
    searchYt(searchRef.value);
  }
});
</script>

<template>
  <div class="w-full h-full flex flex-col gap-3">
    <h1 class="text-3xl font-medium text-cyan-500">Videos</h1>
    <div class="w-full h-full flex flex-col items-center">
      <Input
        v-model="searchRef"
        placeholder="Search video"
        class="w-10/12 h-fit bg-gray-950 placeholder:text-cyan-500 text-cyan-500 text-md"
      />
      <div
        v-if="searchRef === ''"
        class="mt-5 flex justify-center items-center text-2xl"
      >
        <p class="text-white font-normal">Search for a video to watch...</p>
      </div>
      <div class="w-full mt-3 flex flex-col gap-3 items-center">
        <VideoMap :videos="videosRef" />
      </div>
    </div>
  </div>
</template>
