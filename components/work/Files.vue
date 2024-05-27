<script setup lang="ts">
import { reduceDesc } from "~/lib/helpers";

defineProps({
  isPending: Boolean,
  files: Array<any>,
});

const count = 10;
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <h1 class="text-xl text-white font-medium self-start">Files</h1>
    <ScrollArea class="w-full h-full">
      <div class="w-full h-full flex flex-col items-center">
        <div v-if="isPending" class="flex flex-col w-11/12 h-fit">
          <div
            v-for="index in count"
            class="w-full mt-5 h-10 bg-gradient-to-t from-black to bg-gray-900 animate-pulse rounded-lg"
          ></div>
        </div>
        <div
          v-else-if="files?.length === 0"
          class="w-full h-full text-center mt-14 text-md text-white font-medium"
        >
          No files found. Add file to view.
        </div>
        <div
          v-else
          v-for="file in files"
          class="w-8/12 duration-150 ease-in-out hover:cursor-pointer flex justify-between px-10 items-center bg-black hover:bg-gray-900 h-fit p-2 rounded-lg mt-3 text-center text-lg text-cyan-500"
        >
          <span>{{ reduceDesc(file.name, 15) }}</span>
        </div>
      </div>
    </ScrollArea>
  </div>
</template>
