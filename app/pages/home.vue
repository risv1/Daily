<script setup lang="ts">

definePageMeta({
  layout: 'dash'
})

const currentHour = new Date().getHours();
const greeting = computed(() => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 18) return 'Good afternoon';
    return 'Good evening';
});

const currentDate = computed(() => {
    return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

const todayTasks = ref([
    { title: 'Complete dashboard design', completed: true },
    { title: 'Workout session', completed: false },
    { title: 'Team meeting at 2 PM', completed: false },
    { title: 'Read chapter 5', completed: false },
]);

const completedTasks = computed(() => {
    return todayTasks.value.filter(task => task.completed).length;
});

const latestNews = ref([
    { title: 'New feature release: Custom Themes', time: '2 hours ago' },
    { title: 'Weekly progress report available', time: '4 hours ago' },
    { title: 'System maintenance scheduled', time: 'Yesterday' },
]);

const navigateToWorkout = () => {
    navigateTo('/workout');
};
</script>

<template>
    <main class="flex flex-col gap-3 w-full h-full">
        <div
            class="bg-white/70 dark:bg-black/70 backdrop-blur-md rounded-xl p-6 shadow-lg hover:scale-[1.02] transition-transform duration-300">
            <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-2">{{ greeting }}, User</h1>
            <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Icon name="material-symbols:calendar-today" class="w-5 h-5" />
                <p class="text-lg">{{ currentDate }}</p>
            </div>
        </div>

        <div
            class="bg-white/70 dark:bg-black/70 backdrop-blur-md rounded-xl p-6 shadow-lg hover:scale-[1.02] transition-transform duration-300">
            <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-3">
                    <div class="p-3 bg-cyan-500 rounded-lg">
                        <Icon name="material-symbols:task-alt" class="w-6 h-6 text-white" />
                    </div>
                    <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">Today's Tasks</h2>
                </div>
                <span class="text-sm font-medium text-cyan-500">{{ completedTasks }}/{{ todayTasks.length }}
                    completed</span>
            </div>
            <div class="space-y-3">
                <div v-for="(task, index) in todayTasks" :key="index"
                    class="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-black/50 transition-colors">
                    <input type="checkbox" v-model="task.completed" class="rounded text-cyan-500 focus:ring-cyan-500">
                    <span
                        :class="{ 'line-through text-gray-400': task.completed, 'text-gray-700 dark:text-gray-300': !task.completed }">{{
                            task.title }}</span>
                </div>
            </div>
        </div>

        <div @click="navigateToWorkout"
            class="bg-white/70 dark:bg-black/70 backdrop-blur-md rounded-xl p-6 shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <div class="p-3 bg-cyan-500 rounded-lg group-hover:bg-cyan-600 transition-colors">
                        <Icon name="material-symbols:fitness-center" class="w-6 h-6 text-white" />
                    </div>
                    <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">Today's Workout</h2>
                </div>
                <Icon name="material-symbols:chevron-right-rounded"
                    class="w-7 h-7 text-gray-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
            </div>
            <div class="mt-4 space-y-3">
                <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Icon name="material-symbols:schedule" class="w-5 h-5" />
                    <p>Next session in 2 hours</p>
                </div>
                <div class="flex gap-2">
                    <span
                        class="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-300 rounded-full text-sm font-medium">Upper
                        Body</span>
                    <span
                        class="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-300 rounded-full text-sm font-medium">45
                        min</span>
                </div>
            </div>
        </div>

        <div
            class="bg-white/70 dark:bg-black/70 backdrop-blur-md rounded-xl p-6 shadow-lg hover:scale-[1.02] transition-transform duration-300">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                    <div class="p-3 bg-cyan-500 rounded-lg">
                        <Icon name="material-symbols:newspaper" class="w-6 h-6 text-white" />
                    </div>
                    <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">Latest News</h2>
                </div>
                <button class="text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium">View All</button>
            </div>
            <div class="space-y-2">
                <div v-for="(news, index) in latestNews" :key="index"
                    class="cursor-pointer hover:bg-white/50 dark:hover:bg-black/50 p-3 rounded-lg transition-colors">
                    <h3 class="font-medium text-gray-800 dark:text-white mb-1">{{ news.title }}</h3>
                    <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Icon name="material-symbols:schedule" class="w-4 h-4" />
                        <span>{{ news.time }}</span>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>