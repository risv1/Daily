<template>
  <LoadWrapper>
    <div
      class="w-screen h-screen flex flex-row items-center bg-indigo-950 bg-opacity-60"
    >
      <div
        class="fixed inset-0 opacity-40 -z-10"
        style="
          background-image: url('/Dazai.png');
          background-size: cover;
          background-position: center;
        "
      ></div>
      <div
        class="lg:w-3/5 lg:h-4/5 lg:p-10 lg:justify-center md:w-3/5 md:h-4/5 md:p-10 md:justify-center px-5 w-full h-full flex gap-7 flex-col justify-center items-center"
      >
        <h1 class="xl:text-7xl lg:text-6xl text-4xl text-center text-white font-semibold">
          Welcome to <span class="text-cyan-400 font-medium">Daily</span>.
        </h1>
        <p
          class="w-2/3 text-center xl:block lg:block md:block sm:block text-white xl:text-4xl lg:text-3xl text-xl font-normal"
        >
          An application to help me navigate around my frequent visits and
          manage my everyday schedule.
        </p>
        <div class="flex justify-center gap-5 w-full">
          <Button
            @click="() => navigateTo('/me')"
            class="lg:block md:block sm:block bg-cyan-600 w-2/5 hover:bg-cyan-700 xl:text-xl xl:h-14"
            >Get started</Button
          >
        </div>
      </div>
      <div
        class="lg:w-2/5 lg:flex md:flex md:w-2/5 xl:text-5xl lg:text-3xl md:text-2xl text-md h-full flex-col justify-center hidden"
      >
        <p class="text-white italic w-4/5">
          "{{ chosenQuote.quote }}"
        </p>
        <p class="text-white font-semibold pl-20 pt-5">
          - {{ chosenQuote.by }}
        </p>
      </div>
    </div>
  </LoadWrapper>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
import { quotes } from "@/utils/quotes";

const { user } = useAuthStore();
const chosenQuote = ref("");

const chooseRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  chosenQuote.value = quotes[randomIndex];
};

onMounted(() => {
  chooseRandomQuote();
});
</script>
