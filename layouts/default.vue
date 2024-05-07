<template>
  <div v-if="!online" class="w-screen h-screen flex flex-col justify-center items-center bg-indigo-950">
    <img src="/public/bouncing-circles.svg" alt="Loader" width="150">
    <h1 class="lg:text-4xl lg:w-3/5 w-2/3 tracking-wider text-center text-2xl text-cyan-500 font-semibold">
        It appears you're offline at the moment. Please connect to a Wi-Fi network to access 
      <span class="text-white font-bold">Daily</span> {{":)"}}
    </h1>
  </div>
  <div v-else class="w-full h-full">
    <slot />
  </div>
</template>

<script setup>
import { useOnline } from "@vueuse/core";

const online = useOnline();
</script>
