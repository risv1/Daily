<template>
  <ScrollArea class="w-full h-full border p-3 flex justify-center flex-col">
    <div
        v-if="pending"
        v-for="index in count"
        class="w-full h-[10vh] rounded-lg animate-pulse mt-5 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-950"
      ></div>
    <div
      v-for="article in news"
      class="w-full p-3 gap-3 bg-black hover:bg-gray-950 rounded-lg mt-3 flex flex-row"
    >
      <h3 class="text-xs text-gray-300">{{ article.description }}</h3>
    </div>
  </ScrollArea>
</template>

<script setup lang="ts">
import { reduceDesc } from "@/lib/helpers";

const count = 10

const { pending, data: news } = await useLazyFetch("/api/news", {
  transform: (data) => data.news,
});

watchEffect(() => {
  console.log(toRaw(news.value));
});

</script>
