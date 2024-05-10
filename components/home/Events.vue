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
    </ScrollArea>
  </div>
</template>

<script setup>
import { useToast } from "@/components/ui/toast/use-toast";

const count = 7;
const toast = useToast();

const { pending, data: events } = await useLazyFetch("/api/events");

watch(events, (newEvents) => {
  if (newEvents.length > 0) {
    console.log("fetched events:", newEvents);
  }
});
</script>
