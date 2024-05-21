<script setup lang="ts">
import { reduceDesc, calcTimeLeft } from "@/lib/helpers";
import type { EventType } from "~/models/events";

const props = defineProps({
  events: Array as PropType<EventType[]>,
});

const emit = defineEmits(["DeleteEvent"]);

const onGoingEvents = ref<EventType[]>([]);

const filterEndedEvents = (events: EventType[]) => {
  let onGoing = [];
  for (let i = 0; i < events.length; i++) {
    const remTime = calcTimeLeft(events[i].date);
    console.log("remtime", remTime);
    if (remTime !== "Event ended") {
      onGoing.push(events[i]);
    }
  }
  return toRaw(onGoing);
};

watchEffect(() => {
  if (props.events) {
    onGoingEvents.value = filterEndedEvents(props.events);
  }
});
</script>

<template>
  <div
    v-for="event in onGoingEvents"
    class="w-full h-fit mt-3 flex flex-row rounded-lg bg-black hover:bg-gray-900 duration-150 ease-in-out"
  >
    <div class="w-full h-1/2 flex flex-row p-2 gap-3">
      <div class="w-3/5 flex flex-row">
        <div class="h-fit flex flex-col gap-1 justify-center">
          <h1 class="text-md text-white font-medium">
            {{ event.title }}
          </h1>
          <h2 class="text-sm text-gray-300 lg:block md:block hidden">
            {{ event.description }}
          </h2>
          <h2 class="text-sm text-gray-300 lg:hidden md:hidden block">
            {{ reduceDesc(event.description, 10) }}
          </h2>
        </div>
        <h2
          class="text-red-500 lg:text-sm md:text-sm text-xs flex items-center ml-auto"
        >
          <span class="font-bold text-red-700 pr-1">In: </span>
          {{ calcTimeLeft(event.date) }}
        </h2>
      </div>
      <div class="flex flex-row items-center w-2/12 ml-auto">
        <Icon
          @click="navigateTo(`/me/events/edit/${event.id}`)"
          name="material-symbols:edit-outline"
          color="white"
          class="w-7 h-7 ml-auto hover:cursor-pointer lg:mr-5 md:lg-mr-5 mr-1"
        />
        <Icon
          name="material-symbols:auto-delete-outline"
          color="red"
          class="w-7 h-7 hover:cursor-pointer lg:mr-5 md:mr-5 mr-3 ml-2"
          @click="() => emit('DeleteEvent', event.id)"
        />
      </div>
      <div
        :class="{
          'bg-gray-800': event.label === 'None',
          'bg-red-900': event.label === 'Imp',
        }"
        class="duration-150 ease-in-out lg:w-[10%] md:w-[15%] w-[15%] lg:h-[5vh] md:h-[5vh] sm:h-[5%] h-[5%] text-center p-1 text-xs text-gray-300 rounded-lg ml-auto"
      >
        {{ event.label }}
      </div>
    </div>
  </div>
</template>
