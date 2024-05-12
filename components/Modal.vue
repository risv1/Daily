<template>
  <div
    @click="navigateTo(route)"
    class="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-60 flex z-10"
  >
    <div
      @click="($e) => $e.stopPropagation()"
      class="lg:top-[10vh] lg:left-[30vw] md:top-[20vh] md:left-[30vw] sm:top-[20vh] sm:left-[20vw] top-[25vh] left-[10vw] border-cyan-500 border-2 shadow-md hover:shadow-cyan-500 lg:w-2/5 lg:h-4/5 md:w-2/5 md:h-3/5 sm:w-3/5 sm:h-3/5 w-4/5 h-fit p-3 absolute inset-10 bg-black rounded-lg flex justify-center items-center"
    >
    <Icon @click="navigateTo(route)" name="ph:x-bold" color="mdi:alpha-x-circle" class="absolute top-2 right-2 w-5 h-5 hover:cursor-pointer text-white" />
    <slot />    
</div>
  </div>
</template>

<script setup>
defineProps({
    route: String
})
</script>
