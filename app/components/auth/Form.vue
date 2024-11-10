<script setup lang="ts">
defineProps<{
  isLoginForm: boolean;
  toggleForm: () => void;
}>();

const username = ref("");
const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
      timeout: 5000,
      parseResponse: (response) => JSON.parse(response),
    });
    navigateTo("/home");
  } catch (e) {
    console.error(e);
  }
};

const handleRegister = async () => {
  try {
    await $fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name: username.value,
        email: email.value,
        password: password.value,
      }),
      timeout: 5000,
      parseResponse: (response) => JSON.parse(response),
    });
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <section class="w-1/2 h-full flex items-center mt-10 flex-col gap-6">
    <div class="flex flex-col items-center">
      <h1
        v-if="!isLoginForm"
        class="text-3xl font-bold text-gray-800 dark:text-white mb-2"
      >
        Create an account.
      </h1>
      <h1 v-else class="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        Welcome back!
      </h1>
      <p class="text-gray-600 dark:text-gray-300">Sign in to continue.</p>
    </div>
    <input
      v-if="!isLoginForm"
      v-model="username"
      type="text"
      placeholder="Username"
      class="w-full py-3 px-5 duration-150 rounded-lg bg-white text-black dark:text-white dark:bg-neutral-900 border-2 hover:border-cyan-500 focus:outline-none text-lg"
    />
    <input
      v-model="email"
      type="text"
      placeholder="Email"
      class="w-full py-3 px-5 duration-150 rounded-lg bg-white text-black dark:text-white dark:bg-neutral-900 border-2 hover:border-cyan-500 focus:outline-none text-lg"
    />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="w-full py-3 px-5 duration-150 rounded-lg bg-white text-black dark:text-white dark:bg-neutral-900 border-2 hover:border-cyan-500 focus:outline-none text-lg"
    />
    <button
      v-if="isLoginForm"
      class="hover:cursor-pointer w-full py-4 rounded-full font-semibold text-lg border-none bg-cyan-500 flex flex-row items-center pl-10 duration-200 gap-2 hover:gap-7 dark:text-black text-white"
      @click="handleLogin"
    >
      Login
      <Icon name="material-symbols:chevron-right" class="w-6 h-6 font-bold" />
    </button>
    <button
      v-else
      class="hover:cursor-pointer w-full py-4 rounded-full font-semibold text-lg border-none bg-cyan-500 flex flex-row items-center pl-10 duration-200 gap-2 hover:gap-7 dark:text-black text-white"
      @click="handleRegister"
    >
      Register
      <Icon name="material-symbols:chevron-right" class="w-6 h-6 font-bold" />
    </button>
    <p
      v-if="isLoginForm"
      class="font-medium text-center text-gray-600 dark:text-gray-300"
    >
      Don't have an account?
      <span class="hover:cursor-pointer text-cyan-500" @click="toggleForm"
        >Register</span
      >
    </p>
    <p v-else class="font-medium text-center text-gray-600 dark:text-gray-300">
      Already have an account?
      <span class="hover:cursor-pointer text-cyan-500" @click="toggleForm"
        >Login</span
      >
    </p>
  </section>
</template>
