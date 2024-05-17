<script setup>
import { useToast } from "@/components/ui/toast/use-toast";
definePageMeta({
  layout: "me",
});

const { toast } = useToast();
const titleRef = ref(null);
const descRef = ref(null);
const dateRef = ref(null);
const timeRef = ref(null);
const labelRef = ref(null);

const submit = async () => {
  event.preventDefault();
  try {
    if (
      !titleRef.value ||
      !descRef.value ||
      !dateRef.value ||
      !timeRef.value ||
      !labelRef.value
    ) {
      toast({
        title: "Error!",
        description: "Please fill all fields!",
      });
      return;
    }
    const sendEvent = {
      title: titleRef.value,
      description: descRef.value,
      date: dateRef.value + " " + timeRef.value + ":00",
      label: labelRef.value,
    };
    const res = await fetch("/api/create-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendEvent),
    });
    if (!res.ok) {
      toast({
        title: "Error!",
        description: "Failed to create event!",
      });
    }
    const data = await res.json();
    console.log(data);
    toast({
      title: "Success!",
      description: "Event created!",
    });
    titleRef.value = null;
    descRef.value = null;
    dateRef.value = null;
    timeRef.value = null;
    labelRef.value = null;
  } catch (error) {
    console.log(error);
    toast({
      title: "Error!",
      description: "Failed to create event!",
    });
  }
};
</script>

<template>
  <Modal route="/me/events">
    <form @submit.prevent class="w-full md:w-4/5 h-3/5 flex flex-col">
      <h1 class="text-xl text-white font-medium">New Event</h1>
      <div class="w-full h-full flex justify-center flex-col">
        <div
          class="w-full bg-black gap-1 hover:bg-gray-950 rounded-lg h-fit flex flex-col"
        >
          <h3 class="text-sm text-gray-300">Title</h3>
          <Input
            v-model="titleRef"
            type="text"
            class="text-xs bg-gray-900 text-cyan-500 hover:cursor-pointer w-full"
          />
          <h3 class="text-sm text-gray-300">Description</h3>
          <Input
            v-model="descRef"
            type="text"
            class="text-xs bg-gray-900 text-cyan-500 hover:cursor-pointer w-full"
          />
          <div class="w-full flex flex-row gap-2">
            <div class="w-1/2 flex flex-col">
              <h3 class="text-sm text-gray-300">Date</h3>
              <label>
                <Input
                  v-model="dateRef"
                  type="date"
                  class="text-xs bg-gray-900 text-cyan-500 hover:cursor-pointer"
              /></label>
            </div>
            <div class="w-1/2 flex flex-col">
              <h3 class="text-sm text-gray-300">Time</h3>
              <label>
                <Input
                  v-model="timeRef"
                  type="time"
                  class="text-xs bg-gray-900 text-cyan-500 hover:cursor-pointer w-full"
                />
              </label>
            </div>
          </div>
          <h3 class="text-sm text-gray-300">Label</h3>
          <select
            default="None"
            v-model="labelRef"
            class="text-xs bg-gray-900 h-full rounded-md text-cyan-500 hover:cursor-pointer w-full md:w-1/2"
          >
            <option class="w-10 h-10">None</option>
            <option class="w-10 h-10">Imp</option>
          </select>
          <button
            @click="submit"
            class="mt-3 text-xs text-white bg-cyan-500 hover:bg-cyan-600 p-2 md:p-3 rounded-md hover:cursor-pointer w-full"
          >
            Create
          </button>
        </div>
      </div>
    </form>
  </Modal>
</template>
