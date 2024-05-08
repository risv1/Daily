<template>
  <LoadWrapper>
    <div class="w-screen h-screen bg-indigo-950">
        <Nav />
    </div>
  </LoadWrapper>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";

const { user } = useAuthStore();

onMounted(()=>{
    if(!user){
        navigateTo('/login')
    }
})
</script>
