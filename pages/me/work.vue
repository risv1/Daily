<script setup lang="ts">
import Upload from "~/components/work/Upload.vue";
import Categories from "~/components/work/Categories.vue";
import EnterFocus from "~/components/work/EnterFocus.vue";
import Files from "~/components/work/Files.vue";

definePageMeta({
  layout: "me",
});

const comps = [
  { component: Categories },
  { component:  Files },
  { component: Upload },
  { component: EnterFocus },
];
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
    <div class="lg:w-2/3 md:w-2/3 grid grid-cols-2 grid-rows-2 w-full h-full gap-2">
      <div v-for="comp in comps" class="bg-black bg-opacity-60 p-5 rounded-lg border-2 border-cyan-500">
        <component :is="comp.component" />
      </div>
    </div>
  </div>
</template>
