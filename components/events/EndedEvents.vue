<script setup lang="ts">
import { ref, watchEffect, toRaw } from "vue";
import { calcTimeLeft } from "~/lib/helpers";
import type { EventType } from "~/models/events";
import { useToast } from "../ui/toast";

const count = 10;
const { toast } = useToast();
const { pending, data: events } = await useLazyFetch("/api/events", {
  transform: (_events: any) => _events.events,
});

const endedEvents = ref<EventType[]>([]);

const filterEndedEvents = (events: EventType[]) => {
  let ended = [];
  for (let i = 0; i < events.length; i++) {
    const remTime = calcTimeLeft(events[i].date);
    console.log("remtime", remTime);
    if (remTime === "Event ended") {
      ended.push(events[i]);
    }
  }
  return toRaw(ended);
};

watchEffect(() => {
  if (events && events.value) {
    endedEvents.value = filterEndedEvents(events.value);
  }
});

const clearEndedEvents = async () => {
  try {
    const res = await fetch("/api/clear-ended-events", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(endedEvents.value),
    });
    if (res.ok) {
      const data = await res.json();
      endedEvents.value = [];
      toast({
        title: "Success!",
        description: data.message,
      });
    }
  } catch (error) {
    toast({
      title: "Error!",
      description: "An error occurred. Please try again.",
    });
  }
};
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <h1 class="text-xl text-white mt-3 font-medium">Ended events</h1>
    <ScrollArea class="w-full">
      <div
        v-if="pending"
        v-for="index in count"
        class="w-11/12 h-[10vh] rounded-lg animate-pulse mt-5 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-950"
      ></div>
      <div v-if="endedEvents && endedEvents.length === 0">
        <h1 class="text-lg text-center mt-28 font-medium text-gray-300">No ended events!</h1>
      </div>
      <div
        v-for="event in endedEvents"
        :key="event.id"
        class="bg-black w-full h-fit rounded-lg mt-5 hover:bg-gray-900 duration-150 ease-in-out"
      >
        <EventHolder :event="event" />
      </div>
    </ScrollArea>
    <Button @click="clearEndedEvents" class="mt-auto w-full bg-cyan-500 hover:bg-cyan-600"
      >Clear Ended Events</Button
    >
  </div>
</template>
