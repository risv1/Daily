<script setup>
import { useAuthStore } from "@/store/auth";

const { user } = useAuthStore();

onMounted(() => {
  if (!user) {
    navigateTo("/login");
  }
});
</script>

<template>
  <LoadWrapper>
    <div class="w-screen h-screen bg-gray-800 gap-5 items-center flex flex-row">
      <Sidebar />
      <div
        class="w-[43.5vw] h-[97vh] rounded-lg border-2 border-cyan-500 bg-black bg-opacity-60"
      ></div>
      <div class="w-[43.5vw] h-[97vh] flex flex-col gap-3">
        <div
          class="w-full h-1/2 flex flex-col gap-5 justify-center items-center rounded-lg border-2 border-cyan-500 bg-black bg-opacity-60"
        >
          <h1 class="text-white font-medium text-2xl">
            No links! Add regular visits here.
          </h1>
          <div
            class="w-10 h-10 bg-cyan-600 duration-150 ease-in-out hover:cursor-pointer hover:bg-gradient-to-r from-cyan-400 to-cyan-900 rounded-full flex justify-center items-center text-2xl pb-1 font-bold text-white"
          >
            <p class="self-center">+</p>
          </div>
        </div>
        <div
          class="w-full h-1/2 rounded-lg border-2 border-cyan-500 bg-black bg-opacity-60"
        ></div>
      </div>
    </div>
  </LoadWrapper>
</template>
