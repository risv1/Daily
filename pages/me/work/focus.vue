<script setup lang="ts">

const docsRef = ref<boolean>(true)

</script>

<template>
  <div
    class="flex p-3 justify-center items-center w-screen h-screen bg-black bg-opacity-95 fixed top-0 left-0"
  >
    <div class="w-11/12 h-full flex items-center flex-col gap-3">
      <div class="w-5/6 h-fit flex flex-row items-center gap-3">
        <div
          @click="docsRef = true"
          class="hover:cursor-pointer w-1/2 text-2xl font-medium rounded-md p-2 text-cyan-500 bg-black hover:bg-gray-900 duration-150 ease-out text-center"
        >
          Documents
        </div>
        <div
          @click="docsRef = false"
          class="hover:cursor-pointer w-1/2 text-2xl font-medium rounded-md p-2 text-cyan-500 bg-black hover:bg-gray-900 duration-150 ease-out text-center"
        >
          Videos
        </div>
      </div>
      <ScrollArea class="w-5/6 p-5 h-full mb-5 bg-black rounded-lg">
        <Documents v-if="docsRef" />
        <Videos v-else />
      </ScrollArea>
    </div>
  </div>
</template>
