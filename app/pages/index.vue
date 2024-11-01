<script setup lang="ts">
import { quotes } from '~/utils/quotes'

const by = ref('')
const quote = ref('')

const generateQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length)
  const randomQuote = quotes[randomIndex]
  by.value = randomQuote.by
  quote.value = randomQuote.quote
}

const goToHome = () => {
  navigateTo('/home')
}

onMounted(() => {
  generateQuote()
})
</script>

<template>
  <main class="h-screen overflow-hidden dark:bg-[url('/images/dazai_bg_black.svg')] bg-[url('/images/dazai_bg_gray.svg')] bg-cover bg-center flex items-center justify-center">
    <div class="flex flex-col items-center min-h-screen p-6">
      <h1 class="text-5xl font-bold mb-12 text-gray-800 dark:text-white text-center tracking-tight">
        Daily
        <span class="text-cyan-500">.</span>
      </h1>
      <button @click="goToHome" class="hover:cursor-pointer px-8 py-3 bg-cyan-500 text-white rounded-full text-lg font-semibold hover:bg-cyan-600 dark:hover:bg-cyan-400 shadow-lg border-none duration-200">
        Get Started
      </button>
      <div class="mb-6 mt-auto max-w-2xl w-full h-[20vh] bg-white/70 dark:bg-black/70 backdrop-blur-md rounded-xl shadow-lg p-8 text-center">
        <button 
          class="mt-4 p-2 rounded-full hover:bg-cyan-600 bg-cyan-500 dark:hover:bg-cyan-400 dark:border-white border-black text-black border hover:cursor-pointer transition-colors duration-200"
          @click="generateQuote"
        >
          <Icon name="material-symbols:refresh" class="w-6 h-6 text-black" />
        </button>
        <blockquote class="italic text-xl text-gray-700 dark:text-gray-300 mb-4">
          "{{ quote }}"
        </blockquote>
        <p class="text-gray-500 dark:text-gray-400 text-right">
          — <span class="text-cyan-500">{{ by }}</span>
        </p>
      </div>
    </div>
  </main>
</template>