<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { quotes } from "~/utils/quotes"

const features = [
  {
    title: 'Work Management',
    description: 'Track projects, deadlines, and meetings. Stay organized with smart task categorization and priority settings.',
    icon: 'material-symbols:work-outline'
  },
  {
    title: 'Workout Tracking',
    description: 'Plan and monitor your fitness journey. Track workouts, set goals, and maintain your exercise routine.',
    icon: 'material-symbols:exercise-outline'
  },
  {
    title: 'Task Management',
    description: 'Efficiently manage your daily tasks with intuitive organization tools and progress tracking.',
    icon: 'material-symbols:task-outline'
  },
  {
    title: 'Meet Aiko',
    description: 'Your personal AI assistant who helps organize your schedule, provides reminders, and offers intelligent suggestions.',
    icon: 'material-symbols:smart-toy-outline',
    image: '/images/aiko.jpg'
  }
]

const by = ref('')
const quote = ref('')
const isQuoteVisible = ref(false)

const generateQuote = () => {
  isQuoteVisible.value = false
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    const randomQuote = quotes[randomIndex]
    by.value = randomQuote.by
    quote.value = randomQuote.quote
    isQuoteVisible.value = true
  }, 200)
}

const navigateToHome = () => {
  navigateTo('/home')
}

onMounted(() => {
  generateQuote()
})
</script>

<template>
  <main class="min-h-screen overflow-hidden dark:bg-black bg-gradient-to-br from-gray-100 to-gray-200 dark:from-black dark:to-gray-900">
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-20">
        <h1 class="text-7xl font-bold mb-6 text-gray-800 dark:text-white tracking-tight animate-fade-in">
          Welcome to Daily<span class="text-cyan-500">.</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Your all-in-one personal management platform designed to streamline your daily life and boost productivity.
        </p>
        <button 
          @click="navigateToHome"
          class="px-10 border-none py-4 bg-cyan-500 text-white rounded-full text-lg font-semibold 
                 hover:bg-cyan-600 dark:hover:bg-cyan-400 
                 shadow-lg hover:shadow-xl
                 transform hover:-translate-y-1
                 transition-all duration-200"
        >
          Get Started
        </button>
      </div>

      <div class="max-w-4xl mx-auto mb-20">
        <div 
          class="bg-white/80 dark:bg-neutral-950 backdrop-blur-md rounded-2xl p-8 shadow-xl
                 transform hover:scale-[1.02] transition-all duration-300"
          @click="generateQuote"
        >
          <div 
            class="text-center cursor-pointer"
            :class="{ 'opacity-0': !isQuoteVisible, 'opacity-100': isQuoteVisible }"
            style="transition: opacity 0.3s ease-in-out"
          >
            <p class="text-2xl text-gray-700 dark:text-gray-200 italic mb-4">
              "{{ quote }}"
            </p>
            <p class="text-lg text-cyan-600 dark:text-cyan-400 font-medium">
              - {{ by }}
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div 
          v-for="feature in features" 
          :key="feature.title"
          class="group bg-white/70 dark:bg-neutral-950 backdrop-blur-md rounded-2xl p-8 
                 hover:bg-gradient-to-br from-white dark:from-neutral-950 to-cyan-50 dark:to-cyan-950
                 shadow-lg hover:shadow-xl
                 transform hover:scale-[1.02]
                 transition-all duration-300"
        >
          <div class="flex items-start space-x-6">
            <div class="p-4 bg-cyan-500 rounded-xl group-hover:bg-cyan-600 transition-colors duration-200">
              <Icon :name="feature.icon" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 class="text-2xl font-semibold text-gray-800 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-200">
                {{ feature.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ feature.description }}
              </p>
              <div v-if="feature.image" class="mt-4">
                <img 
                  :src="feature.image" 
                  :alt="feature.title"
                  class="w-20 h-20 rounded-full object-cover border-2 border-cyan-500 group-hover:border-cyan-400 transition-colors duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>