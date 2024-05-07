<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
import { fetchUser } from "@/lib/fetchUser";
import { useAuthStore } from "@/store/auth";
import { onMounted } from "vue";

const { user, setUser } = useAuthStore();

onMounted(async () => {
  try {
    const userData = await fetchUser();
    if (userData) {
      setUser(userData);
    } else {
      setUser(null);
    }
  } catch (error) {
    console.error(error);
  }
});
</script>
