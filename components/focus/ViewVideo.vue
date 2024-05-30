<script setup lang="ts">
defineProps({
    videoId: String
})

const emit = defineEmits(['CloseVideo'])

const closeVideo = () => {
    emit('CloseVideo')
}

</script>

<template>
    <div class="w-full h-full flex flex-col items-center gap-3">
        <iframe
            :src="'https://www.youtube.com/embed/' + videoId"
            class="w-10/12 h-96"
        ></iframe>
        <button
            @click="closeVideo"
            class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 duration-200 ease-in-out"
        >
            Close
        </button>
    </div>
</template>