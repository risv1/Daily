<script setup lang="ts">
import { reduceDesc } from '@/lib/helpers';

const { pending, data: userLinks } = await useLazyFetch("/api/links", {
  transform: (data: any) => data.links,
});

watchEffect(() => {
  if (userLinks !== null) {
    console.log(userLinks);
  }
});

const count = 10

const isOpen = ref<boolean>(false);

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};
</script>

<template>
  <div class="flex flex-col items-center gap-3 w-full h-full p-3">
    <h1
      v-if="userLinks === null"
      class="text-white font-medium text-2xl"
    >
    <div
        v-if="pending"
        v-for="index in count"
        class="w-11/12 h-[10vh] rounded-lg animate-pulse mt-5 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-950"
      ></div>
      No links! Add regular visits here.
    </h1>
    <ScrollArea v-else class="w-full h-full">
      <div class="w-full flex flex-col items-center justify-center">
        <h1 class="text-white mt-3 text-2xl font-medium">
          Visit your recent websites
        </h1>
        <div
          v-for="link in userLinks"
          :key="link.id"
          class="w-4/5 h-fit p-3 bg-black hover:bg-gray-950 flex justify-between items-center rounded-lg mt-3 border-2 border-cyan-500"
        >
          <p class="text-gray-300 pl-3">{{ reduceDesc(link.title, 15) }}</p>
          <a :href="link.url" target="_blank" class="text-cyan-500 hover:text-cyan-400 pr-3"
            >Visit</a
          >
        </div>
      </div>
    </ScrollArea>
    <div
      @click="openModal"
      class="w-10 h-10 p-1 pb-2 bg-cyan-600 duration-150 ease-in-out hover:cursor-pointer hover:bg-gradient-to-r from-cyan-400 to-cyan-900 rounded-full flex justify-center items-center text-2xl font-bold text-white"
    >
      <p class="self-center">+</p>
    </div>
  </div>
  <NewLink v-if="isOpen === true" :closeMethod="closeModal" />
</template>
