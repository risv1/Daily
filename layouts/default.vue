<template>
  <div class="w-full h-full">
    <slot />
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
import { fetchUser } from "@/lib/fetchUser";

const { setUser } = useAuthStore();

onMounted(async () => {
  try {
    const user = useCookie('token');
    if (user.value === undefined) {
      navigateTo("/login");
    } else {
      console.log("User present:");
    }
  } catch (error) {
    console.error(error);
  }
});

</script>
