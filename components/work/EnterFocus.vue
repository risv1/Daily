<template>
    <div class="w-full h-full flex gap-3 flex-col">
        <h1 class="text-xl text-white font-medium self-start">Focus Mode</h1>
        <div class="w-full h-4/5 flex flex-col justify-center items-center gap-3">
            <p class="text-white text-md font-medium text-center w-4/5">
                Enter Focus Mode to block out distractions and focus on your work. 
            </p>
            <Button class="w-4/5 bg-cyan-500 hover:bg-cyan-600" @click="()=>navigateTo('/me/work/focus')">Enter</Button>
        </div>
    </div>
</template>