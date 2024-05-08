<template>
  <div
    class="w-screen h-screen flex flex-row items-center bg-indigo-950 bg-opacity-60"
  >
    <div
      class="fixed inset-0 opacity-40 bg-indigo-950 -z-10"
      style="
        background-image: url('/Dazai.png');
        background-size: cover;
        background-position: center;
      "
    ></div>
    <div
      class="lg:w-3/5 lg:h-4/5 lg:p-10 lg:justify-center md:w-3/5 md:h-4/5 md:p-10 md:justify-center px-5 w-full h-full flex gap-7 flex-col justify-center items-center"
    >
      <h1 class="lg:text-6xl text-4xl text-center text-white font-semibold">
        Welcome to <span class="text-cyan-400 font-medium">Daily</span>.
      </h1>
      <p
        class="w-2/3 text-center xl:block lg:block md:block sm:block text-white lg:text-3xl text-xl font-normal"
      >
        An application to help me navigate around my frequent visits and manage
        my everyday schedule.
      </p>
      <div class="flex flex-row gap-5">
        <Button
          @click="() => navigateTo('/me')"
          class="lg:block md:block sm:block bg-cyan-600 hover:bg-cyan-700"
          >Get started</Button
        >
        <Button
          @click="() => navigateTo('/login')"
          class="lg:block md:block sm:block bg-cyan-600 hover:bg-cyan-700 hidden"
          >Go to Login</Button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";

const { user } = useAuthStore();
</script>
