<template>
  <LoadWrapper>
    <div class="relative w-screen h-screen bg-gray-800 flex items-center">
      <Sidebar />
      <div class="lg:w-[93vw] md:w-[92vw] sm:w-[90vw] w-full h-full relative">
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


const route = useRoute();

</script>
