<script setup>
import { useAuthStore } from "@/store/auth";
import { useToast } from "@/components/ui/toast/use-toast";
import { ref } from "vue";
import { z, object } from "zod";

defineProps({
  switchLayer: {
    type: Function,
    required: true,
  },
});

const { user, setUser } = useAuthStore();
const { toast } = useToast();

const email = ref("");
const password = ref("");

const submitSchema = object({
  email: z.string().email(),
  password: z.string().min(8),
});

const onSubmit = async (event) => {
  event.preventDefault();
  try {
    const validatedData = submitSchema.parse({
      email: email.value,
      password: password.value,
    });
    if (validatedData) {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });
      if (!res.ok) {
        throw createError({
          message: "Unable to submit form!",
          statusCode: 400,
        });
      }
      if (res.ok) {
        const data = await res.json();
        setUser({
          name: data.user.name,
          email: data.user.email,
        });
        console.log("Form submitted successfully!", data);
        toast({
          title: "Success!",
          description: "User logged in successfully!",
        });
        navigateTo("/me");
      }
    } else {
      throw createError({
        message: "Form validation failed!",
        statusCode: 400,
      });
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "Unable to submit form!",
    });
    throw createError({
      message: "Unable to submit form!",
      statusCode: 400,
    });
  }
};
</script>

<template>
  <form
    class="lg:w-1/3 md:w-1/3 border-2 shadow-md hover:shadow-cyan-500 duration-200 ease-in-out border-cyan-500 rounded-lg bg-indigo-950 bg-opacity-60 h-fit p-5 flex flex-col gap-7"
    @submit="onSubmit"
  >
    <h1 class="text-cyan-500 text-3xl font-semibold self-center">Login</h1>
    <div class="flex flex-col gap-2">
      <label class="text-cyan-500 text-2xl font-normal">Email</label>
      <Input
        type="email"
        placeholder="Email"
        v-model="email"
        class="text-lg p-2 rounded-md focus:outline-none"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-cyan-500 text-2xl font-normal">Password</label>
      <Input
        type="password"
        placeholder="Password"
        v-model="password"
        class="text-lg p-2 rounded-md focus:outline-none"
      />
    </div>
    <Button
      type="submit"
      @click="onSubmit($event)"
      class="bg-cyan-500 hover:bg-cyan-600 mt-auto"
      >Submit
    </Button>
    <p
      @click="switchLayer"
      class="text-cyan-500 text-md font-medium hover:cursor-pointer self-center"
    >
      Don't have an account? Click to register!
    </p>
  </form>
</template>
