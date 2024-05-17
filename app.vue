<template>
  <div
    v-if="!online"
    class="w-screen h-screen flex flex-col justify-center items-center bg-gray-950"
  >
    <div class="w-40 h-40">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <circle
          fill="#1FF3FF"
          stroke="#1FF3FF"
          stroke-width="15"
          r="15"
          cx="40"
          cy="65"
        >
          <animate
            attributeName="cy"
            calcMode="spline"
            dur="2"
            values="65;135;65;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.4"
          ></animate>
        </circle>
        <circle
          fill="#1FF3FF"
          stroke="#1FF3FF"
          stroke-width="15"
          r="15"
          cx="100"
          cy="65"
        >
          <animate
            attributeName="cy"
            calcMode="spline"
            dur="2"
            values="65;135;65;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.2"
          ></animate>
        </circle>
        <circle
          fill="#1FF3FF"
          stroke="#1FF3FF"
          stroke-width="15"
          r="15"
          cx="160"
          cy="65"
        >
          <animate
            attributeName="cy"
            calcMode="spline"
            dur="2"
            values="65;135;65;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="0"
          ></animate>
        </circle>
      </svg>
    </div>
    <h1
      class="lg:text-4xl lg:w-3/5 w-2/3 p-10 text-center text-xl text-cyan-500 font-semibold bg-black rounded-lg shadow-md shadow-cyan-950"
    >
      It appears you're offline at the moment. Please connect to a Wi-Fi network
      to access
      <span class="text-white font-bold">Daily</span> {{ ":)" }}
    </h1>
  </div>
  <div v-else>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
import { useOnline } from "@vueuse/core";

const online = useOnline();

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
