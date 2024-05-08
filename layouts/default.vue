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
      class="lg:text-4xl lg:w-3/5 w-2/3 text-center text-xl text-cyan-500 font-semibold p-5 bg-black rounded-lg shadow-md shadow-cyan-950"
    >
      It appears you're offline at the moment. Please connect to a Wi-Fi network
      to access
      <span class="text-white font-bold">Daily</span> {{ ":)" }}
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
