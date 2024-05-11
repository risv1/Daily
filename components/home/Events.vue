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
      <div v-else-if="events === null" class="text-xl w-full flex flex-col items-center text-center gap-3 p-7 text-white font-normal">
        <p>No events found. Add to be be notified of future events.</p>
        <div
        @click="() => navigateTo('/me/events/new-event')"
            class="w-10 h-10 bg-cyan-600 duration-150 ease-in-out hover:cursor-pointer hover:bg-gradient-to-r from-cyan-400 to-cyan-900 rounded-full flex justify-center items-center text-2xl pb-1 font-bold text-white"
          >
            <p class="self-center">+</p>
          </div>
      </div>
      <div
        v-else
        v-for="event in events"
        @dblclick="()=>navigateTo(`/me/events/${event.id}`)"
        class="w-11/12 h-fit mt-5 flex flex-row rounded-lg bg-black hover:bg-gray-950 duration-150 ease-in-out"
      >
        <div class="w-full h-1/2 flex flex-row p-2">
          <div class="h-fit flex flex-col gap-1 justify-center">
            <h1 class="text-md text-white font-medium">{{ reduceDesc(event.title) }}</h1>
            <h2 class="text-sm text-gray-300">{{ reduceDesc(event.description) }}</h2>
          </div>
         <h2 class="text-red-500 text-sm flex items-center pl-3"><span class="font-bold text-red-700 pr-1">In: </span> {{ calcTimeLeft(event.date) }}</h2>
          <div
            :class="{
              'bg-gray-900': event.label === 'None',
              'bg-red-900': event.label === 'Imp',
            }"
            class="duration-150 ease-in-out w-[20%] h-[5vh] text-center p-1 text-xs text-gray-300 rounded-lg ml-auto"
          >
            {{ event.label }}
          </div>
        </div>
      </div>
    </ScrollArea>
  </div>
</template>

<script setup>
import { reduceDesc, calcTimeLeft } from "@/lib/helpers";
import { useToast } from "@/components/ui/toast/use-toast";

const count = 7;
const toast = useToast();

const { pending, data: events } = await useLazyFetch("/api/events", {
  transform: (_events) => {
    console.log(_events)
    return _events.events;
  },
});

watchEffect(() => {
  console.log(toRaw(events.value));
});
</script>
