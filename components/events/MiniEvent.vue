<script setup>
defineProps({
  events: Array,
});
</script>

<template>
  <div
    v-for="event in events"
    @dblclick="() => navigateTo(`/me/events/edit/${event.id}`)"
    class="w-full h-fit mt-3 flex flex-row rounded-lg bg-black hover:bg-gray-900 duration-150 ease-in-out"
  >
   <EventHolder :event="event" />
  </div>
</template>
