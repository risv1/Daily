<template>
    <main
        class="h-screen overflow-hidden bg-[url('/images/dazai_bg_gray.svg')] dark:bg-[url('/images/dazai_bg_black.svg')] bg-center p-6">
        <div class="fixed right-5 top-5 z-10">
            <MiscTheme />
        </div>
        <div class="flex flex-row gap-6 max-w-7xl mx-auto">
            <div class="w-[65%] space-y-6 overflow-y-auto h-[95vh]">
                <slot />
            </div>

            <div class="w-[35%]">
                <DashAiko />
            </div>
        </div>
    </main>
</template>