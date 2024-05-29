<script setup lang="ts">
import { z } from 'zod';
import { useToast } from "@/components/ui/toast/use-toast";
import type { EventType } from "~/models/events";
definePageMeta({
  layout: "me",
});

type EventPayload = {
  message: string;
  event: EventType;
};

const route = useRoute();
const id = ref(route.params.id);

const { toast } = useToast();
const titleRef = ref<string>();
const descRef = ref<string>();
const dateRef = ref<string>();
const timeRef = ref<string>();
const labelRef = ref<string>();

const { data: eventData } = await useFetch(`/api/get-event/${id.value}`, {
  transform: (data: EventPayload) => {
    titleRef.value = data.event.title;
    descRef.value = data.event.description;
    dateRef.value = data.event.date.split(" ")[0];
    timeRef.value = data.event.date.split(" ")[1];
    labelRef.value = data.event.label;
  },
  onResponse: (res) => {
    console.log("res: ", res.response._data);
  },
});

const EventSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
  label: z.string(),
});

const updateEvent = async () => {
  try {
    let time = timeRef.value;
    if (time?.split(":").length === 2) {
      time += ":00";
    }
    const putEventData = {
      title: titleRef.value,
      description: descRef.value,
      date: dateRef.value + " " + time,
      label: labelRef.value,
    };
    const result = EventSchema.safeParse(putEventData);
    if (!result.success) {
        toast({
          title: "Error!",
          description: "Invalid data!",
        });
      console.error('Invalid data:', result.error);
      return;
    }
    const res = await fetch(`/api/update-event/${id.value}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putEventData),
    });
    const data = await res.json();
    if (!res.ok) {
      toast({
        title: "Error!",
        description: `${data.message}`,
      });
    }
    toast({
      title: "Success!",
      description: "Event updated!",
    });
    console.log("data: ", data);
    navigateTo("/me/events");
  } catch (error) {
    console.log(error);
    toast({
      title: "Error!",
      description: "Failed to update event!",
    });
  }
};

watch(dateRef, (newVal, oldVal) => {
  console.log("dateRef changed from", oldVal, "to", newVal);
});

watch(timeRef, (newVal, oldVal) => {
  console.log("timeRef changed from", oldVal, "to", newVal);
});
</script>

<template>
  <Modal :closeModal="() => navigateTo('/me/events')">
    <form @submit.prevent class="w-full md:w-4/5 h-full gap-2 flex flex-col">
      <h1 class="text-xl text-white font-medium">Event</h1>
      <div class="w-full h-fit flex justify-center flex-col">
        <div class="w-full gap-1 rounded-lg h-fit flex flex-col">
          <h3 class="text-sm text-gray-300">Title</h3>
          <Input
            v-model="titleRef"
            type="text"
            class="text-md bg-gray-900 text-cyan-500 hover:cursor-pointer border-none w-full"
          />
          <h3 class="text-md text-gray-300">Description</h3>
          <Input
            v-model="descRef"
            type="text"
            class="text-md bg-gray-900 text-cyan-500 hover:cursor-pointer border-none w-full"
          />
          <div class="w-full flex flex-row gap-2">
            <div class="w-1/2 flex flex-col">
              <h3 class="text-md text-gray-300">Date</h3>
              <label>
                <Input
                  v-model="dateRef"
                  type="date"
                  class="text-md bg-gray-900 text-cyan-500 hover:cursor-pointer border-none"
              /></label>
            </div>
            <div class="w-1/2 flex flex-col">
              <h3 class="text-md text-gray-300">Time</h3>
              <label>
                <Input
                  v-model="timeRef"
                  type="time"
                  class="text-md bg-gray-900 text-cyan-500 hover:cursor-pointer border-none w-full"
                />
              </label>
            </div>
          </div>
          <h3 class="text-md text-gray-300">Label</h3>
          <select
            default="None"
            v-model="labelRef"
            class="text-md h-fit p-2 bg-gray-900 rounded-md text-cyan-500 hover:cursor-pointer w-1/2"
          >
            <option>None</option>
            <option>Imp</option>
          </select>
          <div class="w-full h-fit flex flex-row gap-3">
            <Button
              @click="navigateTo('/me/events')"
              class="mt-3 text-xs w-1/2 text-white bg-red-500 hover:bg-red-600 p-2 md:p-3 rounded-md hover:cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              @click="updateEvent"
              type="submit"
              class="mt-3 text-xs w-1/2 text-white bg-cyan-500 hover:bg-cyan-600 p-2 md:p-3 rounded-md hover:cursor-pointer"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </form>
  </Modal>
</template>
