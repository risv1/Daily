<script setup lang="ts">
import { useToast } from '../ui/toast';

defineProps({
  full: Boolean,
});

const { toast } = useToast()

const count = 7;

const { pending, data: events } = await useLazyFetch("/api/events", {
  transform: (_events: any) => _events.events,
});

const confirmation = (eventId: string) => {
  const res = confirm("Are you sure you want to delete this event?");
  if (res) {
    deleteEvent(eventId);
  }
};

const deleteEvent = async(eventId: string) =>{
  try{
    const res = await fetch('/api/events', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: eventId,
      }),
    });
    if(res.ok){
      const data = await res.json();
      toast({
        title: 'Success!',
        description: data.message,
      })
      const newEvents = events.value.filter((event: any) => event.id !== eventId);
      events.value = newEvents;
    }
  } catch (error) {
    toast({
      title: 'Error!',
      description: 'An error occurred. Please try again.',
    })
  }
};

</script>

<template>
  <div class="w-full h-full flex-col">
    <div class="w-full h-[5vh] flex flex-row justify-between">
      <h1 class="text-xl text-white font-medium">Upcoming events</h1>
      <h2
        v-if="!full"
        class="text-lg text-gray-300 hover:text-white font-medium hover:cursor-pointer"
        @click="() => navigateTo('/me/events')"
      >
        View all
      </h2>
    </div>
    <div class="w-full h-full flex-col flex pb-3">
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
      <ScrollArea v-else class="w-full h-full pt-5 flex flex-col">
        <MiniEvent v-if="!full" :events="events" />
        <FullEvent v-else :events="events" @DeleteEvent="confirmation" />
      </ScrollArea>
      <div
          v-if="events && events.length < 8"
          @click="() => navigateTo('/me/events/new-event')"
          class="w-10 h-10 self-center lg:mb-0 md:mb-0 mb-6 mt-1 p-1 pb-2 bg-cyan-600 duration-150 ease-in-out hover:cursor-pointer hover:bg-gradient-to-r from-cyan-400 to-cyan-900 rounded-full flex justify-center items-center text-2xl font-bold text-white"
        >
          <p class="self-center">+</p>
        </div>
    </div>
  </div>
</template>
