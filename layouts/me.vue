<template>
  <LoadWrapper>
    <div class="w-screen h-screen bg-gray-950 flex items-center">
      <Sidebar />
      <div class="lg:w-[93vw] md:w-[92vw] sm:w-[90vw] w-full h-full">
        <slot />
      </div>
    </div>
  </LoadWrapper>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";

const { user } = useAuthStore();

onMounted(() => {
  if (!user) {
    navigateTo("/login");
  }
});
</script>
