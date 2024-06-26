<script setup>
import { useToast } from "@/components/ui/toast/use-toast";
import { h } from "vue";
import { ref } from "vue";
import { z, object } from "zod";

const { toast } = useToast();

defineProps({
  switchLayer: {
    type: Function,
    requicyan: true,
  },
});

const name = ref("");
const email = ref("");
const password = ref("");

const submitSchema = object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

const onSubmit = async (event) => {
  event.preventDefault();
  try {
    const validatedData = submitSchema.parse({
      name: name.value,
      email: email.value,
      password: password.value,
    });
    if (validatedData) {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
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
      console.log("Form submitted successfully!", res.body);
      toast({
        title: "Success",
        description: "Registered successfully!",
      });
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
    console.log(error);
    throw createError({
      message: "Unable to submit form!",
      statusCode: 400,
    });
  }
};
</script>

<template>
  <form
    class="lg:w-1/3 md:w-1/3 border-2 shadow-md hover:shadow-cyan-500 duration-200 ease-in-out border-cyan-500 rounded-lg bg-indigo-950 bg-opacity-60 p-5 flex flex-col gap-5"
    @submit="onSubmit"
  >
    <h1 class="text-cyan-500 text-3xl font-semibold self-center">Sign up</h1>
    <div class="flex flex-col gap-2">
      <label class="text-cyan-500 text-2xl font-normal">Name</label>
      <Input
        type="name"
        placeholder="Name"
        v-model="name"
        class="text-lg p-2 rounded-md focus:outline-none"
      />
    </div>
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
      Already have an account? Click to login!
    </p>
  </form>
</template>
