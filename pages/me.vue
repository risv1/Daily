<template>
  <div
    class="w-full h-full p-3 pl-5 flex xl:flex-row lg:flex-row md:flex-row flex-col gap-3"
  >
    <div
      class="xl:w-2/3 lg:w-2/3 md:w-2/3 xl:h-full lg:h-full md:h-full h-[25vh]"
    >
      <div
        class="p-5 md:h-2/5 lg:h-2/5 xl:h-2/5 h-full shadow-md shadow-cyan-500 bg-black rounded-lg text-cyan-500"
      >
        <h1 class="lg:text-3xl md:text-2xl text-xl font-normal">
          Hello <span class="text-white">{{ user.name }}</span
          >! Lets get started!
        </h1>
        <div
          class="xl:w-full lg:w-full md:w-full w-5/6 h-4/5 flex flex-col items-center justify-center gap-3"
        >
          <div class="flex flex-row flex-wrap gap-3">
            <a
              v-for="link in freqLinks"
              :href="link.url"
              target="_blank"
              class="hover:cursor-pointer border w-fit h-fit p-5 rounded-lg bg-black duration-200 ease-in-out hover:-rotate-6 hover:bg-gradient-to-r from-cyan-500 to-gray-950"
            >
              <Icon
                :name="link.icon"
                class="text-white xl:w-10 xl:h-10 lg:w-10 lg-h-10 md:w-6 md:h-6 h-5 w-5"
              />
            </a>
          </div>
        </div>
      </div>
      <div
        class="lg:flex md:flex hidden w-full h-3/5 flex-row gap-3 items-end"
      >
        <div class="w-2/3 lg:h-[54vh] md:h-[54vh] bg-cyan-600 rounded-lg p-5">
          <h1 class="text-white text-xl"></h1>
        </div>
        <div class="w-1/3  lg:h-[54vh] md:h-[54vh] bg-cyan-600 rounded-lg p-5">
          <h1 class="text-white text-xl"></h1>
        </div>
      </div>
    </div>
    <div
      class="xl:w-1/3 xl:h-full lg:w-1/3 lg:h-full md:w-1/3 md:h-full sm:h-full w-full h-[58vh]  mb-5 rounded-lg shadow-md shadow-cyan-500 bg-black"
    ></div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";

const { user } = useAuthStore();

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

definePageMeta({
  layout: "me",
});
</script>
