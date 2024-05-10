<template>
  <div
    class="p-5 md:h-2/5 lg:h-2/5 xl:h-2/5 h-full border-2 border-cyan-500 bg-black bg-opacity-60 rounded-lg text-cyan-500"
  >
    <div class="flex flex-row">
      <h1 class="lg:text-3xl md:text-2xl text-xl font-normal">
        {{ greeting }} <span class="text-white">{{ displayName }}</span
        >!
      </h1>
      <h2 class="ml-auto lg:text-3xl md:text-2xl text-xl">
        <span class="text-white font-medium">{{ formattedDate }}</span>, <span class="font-bold">{{ time }}</span>
      </h2>
    </div>
    <div
      class="xl:w-full lg:w-full md:w-full w-5/6 h-4/5 flex flex-col items-center justify-center gap-3"
    >
      <div class="flex flex-row flex-wrap gap-3 lg:mt-0 md:mt-0 sm:mt-0 mt-5">
        <a
          v-for="link in freqLinks"
          :href="link.url"
          target="_blank"
          class="hover:cursor-pointer border w-fit h-fit lg:p-5 md:p-5 sm:p-3 p-3 rounded-lg bg-black duration-200 ease-in-out hover:-rotate-6 hover:bg-gradient-to-r from-cyan-500 to-gray-950"
        >
          <Icon
            :name="link.icon"
            class="text-white xl:w-10 xl:h-10 lg:w-10 lg:h-10 md:w-6 md:h-6 h-5 w-5"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";

const { user } = useAuthStore();

const greeting = ref("");
const displayName = computed(() => {
  if(user){
  return user.name.length > 10 ? `${user.name.slice(0, 10)}...` : user.name;
  }
});
const date = new Date();
const day = date.getDate();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const month = monthNames[date.getMonth()];
const formattedDate = ref(`${month} ${day}`);
const hours = date.getHours();
const minutes = String(date.getMinutes()).padStart(2, '0');
const time = ref(`${hours}:${minutes}`);

watchEffect(() => {
  const hour = Number(time.value.split(':')[0]);
  if (hour >= 0 && hour < 12) {
    greeting.value = "Good morning";
  } else if (hour >= 12 && hour < 18) {
    greeting.value = "Good afternoon";
  } else {
    greeting.value = "Good evening";
  }
});

watchEffect(() => {
  const intervalId = setInterval(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    time.value = `${hours}:${minutes}`;
  }, 5000);

  onUnmounted(() => {
    clearInterval(intervalId);
  });
});

const freqLinks = [
  {
    name: "Google",
    url: "https://www.google.com",
    icon: "logos:google-icon",
  },
  {
    name: "Youtube",
    url: "https://www.youtube.com",
    icon: "logos:youtube-icon",
  },
  {
    name: "Github",
    url: "https://www.github.com",
    icon: "tdesign:logo-github-filled",
  },
  {
    name: "WhatsApp",
    url: "https://web.whatsapp.com/",
    icon: "logos:whatsapp-icon",
  },
  {
    name: "Youtube Music",
    url: "https://music.youtube.com/",
    icon: "material-symbols:youtube-music",
  },
];
</script>
