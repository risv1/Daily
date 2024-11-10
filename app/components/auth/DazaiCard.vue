<template>
    <section class="fixed w-[54vh] h-[87vh] top-5 flex card flex-col p-10 rounded-2xl text-white dark:text-black mb-10">
        <div class="flex z-10 flex-row items-center">
            <h1 class="text-2xl text-black font-bold mb-2">Daily</h1>
            <span class="text-4xl font-bold text-cyan-500">.</span>
        </div>
        <h2 class="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-200 bg-clip-text text-transparent">My everyday manager.</h2>
        <a target="_blank" href="https://github.com/risv1" class="mt-auto decoration-none text-black w-fit flex flex-row items-center">
            <p class="text-2xl font-bold">By Rishi</p>
            <Icon name="material-symbols:chevron-right" class="w-16 h-16 text-cyan-300" />
        </a>
    </section>
</template>

<style scoped>
.card {
    background: url('/images/dazai_login.jpg');
    background-size: cover;
    opacity: 0.3;
    background-position: center;
}

</style>