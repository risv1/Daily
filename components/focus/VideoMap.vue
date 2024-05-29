<script setup lang="ts">
defineProps({
    videos: Array<any>,
})

const watchVideo = (videoId: string) => {
    
}

</script>

<template>
    <div
          v-for="video in videos"
          @click="watchVideo(video.id.videoId)"
          :key="video.id.videoId"
          class="w-4/5 p-3 rounded-lg m-2 flex flex-row justify-between bg-gray-900 hover:bg-gray-950 duration-200 ease-in-out"
        >
          <img
            :src="video.snippet.thumbnails.high.url"
            :alt="video.snippet.title"
            class="w-64 h-36 object-cover"
          />
          <div class="w-3/5 text-start flex flex-col gap-3">
            <h3 class="text-sm text-cyan-500">{{ video.snippet.title }}</h3>
            <h2 class="text-md text-white">
              By:
              <span class="text-cyan-500">
                {{ video.snippet.channelTitle }}</span
              >
            </h2>
          </div>
        </div>
</template>