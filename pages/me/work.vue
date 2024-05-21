<script setup>
definePageMeta({
  layout: "me",
});
</script>

<template>
  <div
    class="w-full h-full p-3 lg:pl-5 md:pl-5 flex xl:flex-row lg:flex-row md:flex-row flex-col gap-3"
  >
    <div
      class="xl:w-1/3 xl:h-full lg:w-1/3 lg:h-full md:w-1/3 md:h-full sm:h-full w-full h-[62vh] p-5 mb-5 rounded-lg border-2 border-cyan-500 bg-black bg-opacity-60"
    >
      <Events :full="false" />
    </div>
  </div>
</template>
