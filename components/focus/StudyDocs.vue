<script setup lang="ts">
const count = 10;

const emit = defineEmits(["OpenPDF"])

const { data: files, pending } = useLazyFetch("/api/get-files/Documents", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  transform: (data: any) => {
    return data.files;
  },
});

const openPdf = (file: any) => {
  emit("OpenPDF", file)
}

</script>

<template>
  <div class="w-full h-4/5 flex flex-col">
    <div v-if="pending" class="flex flex-col w-full h-fit gap-3 items-center">
      <div
        v-for="index in count"
        class="w-10/12 h-10 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-950 animate-pulse rounded-lg"
      ></div>
    </div>
    <div v-else-if="files === null" class="flex flex-col w-full h-fit">
      <div class="w-full h-10 bg-red-500 rounded-b-lg">
        <h1 class="text-white pt-1 text-center">No files found</h1>
      </div>
    </div>
    <div v-else class="w-full">
      <div class="w-full h-full flex flex-col items-center">
        <div
          @click="openPdf(file)"
          v-for="file in files"
          class="w-8/12 mt-3 py-2 h-10 bg-gray-900 rounded-lg hover:cursor-pointer"
        >
          <h1 class="text-white text-sm text-center">{{ file.name }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>
