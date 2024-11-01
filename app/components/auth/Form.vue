<script setup lang="ts">

const props = defineProps<{
    isLoginForm: boolean,
    toggleForm: () => void
}>()
</script>

<template>
    <section class="w-1/2 h-full flex items-center mt-10 flex-col gap-6">
        <div class="flex flex-col items-center">
            <h1 v-if="!isLoginForm" class="text-4xl font-bold text-gray-800 dark:text-white mb-2">Create an account.
            </h1>
            <h1 v-else class="text-4xl font-bold text-gray-800 dark:text-white mb-2">Welcome back!</h1>
            <p class="text-gray-600 dark:text-gray-300">Sign in to continue.</p>
        </div>
        <input v-if="isLoginForm" type="text" placeholder="Username" class="w-full py-3 px-5 duration-150 rounded-lg bg-white text-black dark:text-white dark:bg-neutral-900 border-2 hover:border-cyan-500 focus:outline-none text-lg" />
        <input type="text" placeholder="Email" class="w-full py-3 px-5 duration-150 rounded-lg bg-white text-black dark:text-white dark:bg-neutral-900 border-2 hover:border-cyan-500 focus:outline-none text-lg" />
        <input type="password" placeholder="Password" class="w-full py-3 px-5 duration-150 rounded-lg bg-white text-black dark:text-white dark:bg-neutral-900 border-2 hover:border-cyan-500 focus:outline-none text-lg" />
        <button v-if="isLoginForm" class="hover:cursor-pointer w-full py-4 rounded-full font-semibold text-lg border-none bg-cyan-500 flex flex-row items-center pl-10 duration-200 gap-2 hover:gap-7 dark:text-black text-white">Login <Icon name="material-symbols:chevron-right" class="w-6 h-6 font-bold" /></button>
        <button v-else class="hover:cursor-pointer w-full py-4 rounded-full font-semibold text-lg border-none bg-cyan-500 flex flex-row items-center pl-10 duration-200 gap-2 hover:gap-7 dark:text-black text-white">Register<Icon name="material-symbols:chevron-right" class="w-6 h-6 font-bold" /></button>
        <p v-if="isLoginForm" class="font-medium text-center text-gray-600 dark:text-gray-300">Don't have an account? <span
                @click="toggleForm" class="hover:cursor-pointer text-cyan-500">Register</span></p>
        <p v-else class="font-medium text-center text-gray-600 dark:text-gray-300">Already have an account? <span
                @click="toggleForm" class="hover:cursor-pointer text-cyan-500">Login</span></p>
    </section>
</template>
