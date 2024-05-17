<script setup>
import { reduceDesc, calcTimeLeft } from "@/lib/helpers";
import { useToast } from "@/components/ui/toast/use-toast";

defineProps({
  full: Boolean,
});

const count = 7;
const toast = useToast();

const { pending, data: events } = await useLazyFetch("/api/events", {
  transform: (_events) => _events.events,
});

watchEffect(() => {
  console.log(toRaw(events.value));
});
</script>

<template>
  <div class="w-full h-full flex-col">
    <div class="w-full h-[5vh] flex flex-row justify-between">
      <h1 class="text-xl text-white font-medium">Upcoming events</h1>
      <h2
        class="text-lg text-gray-300 hover:text-white font-medium hover:cursor-pointer"
        @click="() => navigateTo('/me/events')"
      >
        View all
      </h2>
    </div>
    <ScrollArea class="w-full h-full flex-col flex pb-3">
      <div
        v-if="pending"
        v-for="index in count"
        class="w-11/12 h-[10vh] rounded-lg animate-pulse mt-5 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-950"
      ></div>
      <div
        v-else-if="events === null"
        class="text-xl w-full flex lg:mt-28 md:mt-28 mt-10 flex-col items-center text-center gap-3 p-7 text-white font-normal"
      >
        <p>No events found. Add to be be notified of future events.</p>
        <div
          @click="() => navigateTo('/me/events/new-event')"
          class="w-10 h-10 bg-cyan-600 duration-150 ease-in-out hover:cursor-pointer hover:bg-gradient-to-r from-cyan-400 to-cyan-900 rounded-full flex justify-center items-center text-2xl pb-1 font-bold text-white"
        >
          <p class="self-center">+</p>
        </div>
      </div>
      <div v-else class="w-full h-full">
        <MiniEvent v-if="!full" :events="events" />
        <FullEvent v-else :events="events" />
      </div>
    </ScrollArea>
  </div>
</template>
