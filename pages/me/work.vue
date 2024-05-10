<template>
  <div
    class="w-full h-full p-3 lg:pl-5 md:pl-5 flex xl:flex-row lg:flex-row md:flex-row flex-col gap-3"
  >
    <div class="lg:w-1/2 md:w-1/2 w-full h-full flex flex-col items-center border-2 border-cyan-500 bg-black bg-opacity-60 rounded-lg">
        <h1 class="text-2xl text-white self-start p-3">Yet to do:</h1>
        <div class="w-11/12 lg:h-[13vh] md:h-[13vh] h-[10vh] bg-black hover:bg-gradient-to-r from-black to-gray-800 duration-150 ease-in-out rounded-lg">

        </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "me",
});
</script>
