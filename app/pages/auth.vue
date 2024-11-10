<script setup lang="ts">

const isLoginForm = ref(true)

const toggleForm = () => {
    isLoginForm.value = !isLoginForm.value
}
</script>

<template>
    <main class="min-h-screen overflow-hidden w-screen bg-gray-200 dark:bg-black flex items-center p-4">
        <div class="w-[45%] h-[86vh]">
            <AuthDazaiCard />
        </div>
        <div class="w-[55%] h-[86vh] flex flex-col items-center justify-center">
            <AuthForm :isLoginForm="isLoginForm" :toggleForm="toggleForm" />
        </div>
    </main>
</template>