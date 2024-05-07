<template>
  <div v-if="isLoading">
    <Loader />
  </div>
  <div v-else>
      <h1>Welcome back, {{ user.name }}</h1>
      <button @click="logout">Logout</button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { useAuthStore } from "@/store/auth";

const { user } = useAuthStore();
const isLoggedIn = computed(() => user !== null);
const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});

</script>
