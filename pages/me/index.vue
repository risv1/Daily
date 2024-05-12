<template>
  <div
    class="w-full h-full p-3 lg:pl-5 md:pl-5 flex xl:flex-row lg:flex-row md:flex-row flex-col gap-3"
  >
    <div
      class="xl:w-2/3 lg:w-2/3 md:w-2/3 xl:h-full lg:h-full md:h-full h-[25vh]"
    >
      <Intro />
      <div class="lg:flex md:flex hidden w-full h-3/5 flex-row gap-3 items-end">
        <div
          class="w-2/3 lg:h-[54vh] md:h-[54vh] border-2 border-cyan-500 bg-black bg-opacity-60 rounded-lg"
        >
        <News />
        </div>
        <div
          class="w-1/3 lg:h-[54vh] md:h-[54vh] border-2 border-cyan-500 bg-black bg-opacity-60 rounded-lg"
        ></div>
      </div>
    </div>
    <div
      class="xl:w-1/3 xl:h-full lg:w-1/3 lg:h-full md:w-1/3 md:h-full sm:h-full w-full h-[62vh] p-5 mb-5 rounded-lg border-2 border-cyan-500 bg-black bg-opacity-60"
    >
      <Events :full="false" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "me",
});
</script>
