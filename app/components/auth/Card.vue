<script setup lang="ts">

const functionalities = [
    { title: 'Task Manager', icon: 'material-symbols:checklist', color: 'bg-cyan-500' },
    { title: 'Workout Tracker', icon: 'material-symbols:fitness-center', color: 'bg-purple-500' },
    { title: 'Notes', icon: 'material-symbols:note', color: 'bg-yellow-500' },
    { title: 'Calendar', icon: 'material-symbols:calendar-today', color: 'bg-red-500' },
];
</script>

<template>
    <section class="flex card flex-col h-full p-10 rounded-2xl text-white dark:text-black">
        <div class="flex z-10 flex-row items-center">
            <h1 class="text-2xl text-black font-bold mb-2">Daily</h1>
            <span class="text-4xl font-bold text-cyan-500">.</span>
        </div>
        <h2 class="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-200 bg-clip-text text-transparent">My everyday manager.</h2>
        <div class="flex flex-wrap gap-4">
            <div v-for="(func, index) in functionalities" :key="index"
                class="flex items-center gap-3 px-2 rounded-lg bg-black/20">
                <div class="p-3 rounded-lg">
                    <Icon :name="func.icon" class="w-6 h-6 text-white" />
                </div>
                <h3 class="text-xl text-white font-semibold">{{ func.title }}</h3>
            </div>
        </div>
        <a target="_blank" href="https://github.com/risv1" class="mt-auto decoration-none text-black w-fit flex flex-row items-center">
            <p class="text-2xl font-bold">By Rishi</p>
            <Icon name="material-symbols:chevron-right" class="w-16 h-16 text-cyan-300" />
        </a>
    </section>
</template>

<style scoped>
.card {
    background: url('/images/dazai_login.jpg');
    z-index: -1;
    background-size: cover;
    opacity: 0.3;
    background-position: center;
}

</style>