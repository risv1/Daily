<script setup lang="ts">
import { reduceDesc, calcTimeLeft } from "@/lib/helpers";
import type { EventType } from "@/models/events";

defineProps({
  event: Object as () => EventType,
});

</script>

<template>
     <div class="w-full h-1/2 flex flex-row p-2">
      <div class="h-fit flex flex-col gap-1 justify-center">
        <h1 class="text-md text-white font-medium">
          {{ reduceDesc(event?.title!, 10) }}
        </h1>
        <h2 class="text-sm text-gray-300">
          {{ reduceDesc(event?.description!, 10) }}
        </h2>
      </div>
      <h2 class="text-red-500 text-sm flex items-center pl-3">
        <span class="font-bold text-red-700 pr-1">In: </span>
        {{ calcTimeLeft(event?.date!) }}
      </h2>
      <div
        :class="{
          'bg-gray-800': event?.label === 'None',
          'bg-red-900': event?.label === 'Imp',
        }"
        class="duration-150 ease-in-out lg:w-[20%] md:w-[20%] w-[10%] lg:h-[5vh] md:h-[5vh] sm:h-[5%] h-[5%] text-center p-1 text-xs text-gray-300 rounded-lg ml-auto"
      >
        {{ event?.label }}
      </div>
    </div>
</template>