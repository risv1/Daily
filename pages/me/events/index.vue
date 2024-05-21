<script setup>
definePageMeta({
  layout: "me",
});
</script>

<template>
  <div class="w-full lg:h-screen md:h-screen h-[90vh] p-3 lg:pl-5 md:pl-5 flex lg:flex-row md:flex-row flex-col gap-3">
    <div class="border-2 border-cyan-500 lg:w-2/3 md:w-2/3 w-full lg:h-full md:h-full h-1/2 rounded-lg bg-black bg-opacity-60 p-5">
      <Events :full="true" />
    </div>
    <div class="lg:w-1/3 md:w-1/3 lg:h-full md:h-full h-1/2 p-5 border-2 rounded-lg border-cyan-500 bg-black bg-opacity-60">
      <EndedEvents />
    </div>
  </div>
</template>
