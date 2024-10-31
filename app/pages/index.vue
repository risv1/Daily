<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { quotes } from '~/utils/quotes'

const by = ref('')
const quote = ref('')

const generateQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length)
  const randomQuote = quotes[randomIndex]
  by.value = randomQuote.by
  quote.value = randomQuote.quote
}

onMounted(() => {
  generateQuote()
})
</script>

<template>
  <main class="h-screen overflow-hidden dark:bg-[url('/images/dazai_bg.svg')] bg-[url('/images/dark_dazai_bg.svg')] bg-cover bg-center flex items-center justify-center">
    <div class="flex flex-col items-center min-h-screen p-6">
      <h1 class="text-5xl font-bold mb-12 text-gray-800 dark:text-white text-center tracking-tight">
        Daily
      </h1>
      <button class="hover:cursor-pointer px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full text-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 shadow-lg">
        Get Started
      </button>
      <div class="mb-6 mt-auto max-w-2xl w-full h-[20vh] bg-white/70 dark:bg-black/70 backdrop-blur-md rounded-xl shadow-lg p-8 text-center">
        <button 
          class="mt-4 p-2 rounded-full bg-gray-100 dark:bg-gray-950 dark:border-white border-black text-black dark:text-white border hover:cursor-pointer"
          @click="generateQuote"
        >
        <Icon name="material-symbols:refresh" class="w-6 h-6" />
        </button>
        <blockquote class="italic text-xl text-gray-700 dark:text-gray-300 mb-4">
          "{{ quote }}"
        </blockquote>
        <p class="text-gray-500 dark:text-gray-400 text-right">
          — {{ by }}
        </p>
      </div>
    </div>
  </main>
</template>