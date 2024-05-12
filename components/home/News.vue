<template>
  <div class="w-full h-full pb-10">
    <h1 class="text-xl text-white font-medium pt-3 pl-4">News</h1>
    <ScrollArea class="w-full h-full p-3 flex justify-center flex-col">
      <div
        v-if="pending"
        v-for="index in count"
        class="w-full h-[10vh] rounded-lg animate-pulse mt-5 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-950"
      ></div>
      <div
        v-for="article in news"
        class="w-full p-3 gap-3 bg-black hover:bg-gray-950 rounded-lg mt-3 flex flex-col"
      >
        <h3 class="text-sm text-gray-300">{{ article.description }}</h3>
        <a
          target="_blank"
          :href="article.url"
          class="text-xs text-cyan-500 hover:cursor-pointer w-fit"
          >Read more...</a
        >
      </div>
    </ScrollArea>
  </div>
</template>

<script setup>

const count = 10;

const { pending, data: news } = await useLazyFetch("/api/news", {
  transform: (data) => data.news,
});

watchEffect(() => {
  console.log(toRaw(news.value));
});
</script>
