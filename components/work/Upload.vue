<script setup lang="ts">
const fileRef = ref<File>();

const updateFileValue = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  fileRef.value = file;
  console.log(file);
};

const uploadFile = async () => {
  const formData = new FormData();
  formData.append("file", fileRef.value!, fileRef.value?.name);

try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <div class="w-full h-full flex justify-center items-center p-2 flex-col">
    <label
      for="file"
      class="w-full flex justify-center items-center rounded-t-lg border-t-2 border-l-2 border-r-2 border-cyan-500 bg-gray-900"
    >
      <Button @click="uploadFile" class="text-white mt-3">Upload File</Button>
    </label>
    <Input
      @change="updateFileValue"
      type="file"
      class="w-full h-full border-t-0 rounded-t-none border-b-2 border-l-2 border-r-2 rounded-b-lg border-cyan-500 bg-gray-900"
    />
  </div>
</template>
