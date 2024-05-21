<script setup>
import { useToast } from "@/components/ui/toast/use-toast";
import { useAuthStore } from "@/store/auth";

const { toast } = useToast();
const { user, setUser } = useAuthStore();
console.log(user)
const fields = user
  ? [
      { name: "Name: ", value: user.name },
      { name: "Email: ", value: user.email },
      { name: "Joined: ", value: user.created_at }
    ]
  : [];

const logout = async () => {
  try {
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.ok) {
      setUser(null);
      navigateTo("/login");
    } else {
      toast({
        title: "Error",
        description: "Failed to logout",
      });
      console.error("Failed to logout");
    }
  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: "Failed to logout",
    });
  }
};
</script>

<template>
  
    <div
      class="lg:w-2/3 w-full h-4/5 flex flex-col items-center gap-3 p-5 text-white"
    >
      <div
        v-for="field in fields"
        class="lg:text-xl md:text-xl sm:text-lg text-md flex w-full flex-row items-center"
      >
        <h3 class="text-center font-normal">
          {{ field.name }}
        </h3>
        <span class="text-cyan-500 ml-auto pr-5">{{ field.value }}</span>
      </div>
      <div class="mt-auto flex flex-row gap-3">
        <Button
          @click="navigateTo('/me')"
          class="border w-1/2 bg-cyan-500 hover:bg-cyan-600"
          >Go Home</Button
        >
        <Button @click="logout" class="border w-1/2 bg-red-500 hover:bg-red-600"
          >Logout</Button
        >
      </div>
    </div>
</template>
