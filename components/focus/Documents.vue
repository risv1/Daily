<!-- ParentComponent.vue -->
<script setup lang="ts">
import { ref } from 'vue';

const pdfOpen = ref(false);
const selectedFileName = ref('');

const showPDF = (file: any) => {
  selectedFileName.value = file.name;
  pdfOpen.value = true;
};

const closePDF = () => {
  pdfOpen.value = false;
};
</script>

<template>
  <div class="w-full h-full flex flex-col ">
    <div class="w-full h-fit flex items-center flex-row">
      <h1 class="text-3xl font-medium text-cyan-500">Documents</h1>
      <Icon name="material-symbols:cancel-outline-rounded" class="w-7 h-7 ml-auto hover:cursor-pointer" color="red" v-if="pdfOpen" @click="closePDF" />
    </div>
    <div v-if="!pdfOpen">
      <StudyDocs @OpenPDF="showPDF" />
    </div>
    <div v-if="pdfOpen">
      <PDFReader :fileName="selectedFileName" />
    </div>
  </div>
</template>