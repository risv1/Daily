<script setup lang="ts">
import type { Category } from "~/models/category";
import { useToast } from "../ui/toast";

const props = defineProps({
  selectedCategory: Object as PropType<Category>,
});

const categoryRef = ref<string>("");
const fileRef = ref<File>();

const { toast } = useToast();

watchEffect(() => {
  if (props.selectedCategory !== undefined) {
    categoryRef.value = props.selectedCategory.name;
  }
});

const updateFileValue = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  fileRef.value = file;
};

const clearInput = () => {
  fileRef.value = undefined;
  const fileInput = document.getElementById("file") as HTMLInputElement;
  fileInput.value = "";
  categoryRef.value = "";
};

const uploadFile = async () => {
  if (!fileRef.value || !categoryRef.value) {
    toast({
      title: "No file selected",
      description: "Please select a file to upload",
    });
    return;
  }
  const formData = new FormData();
  formData.append("file", fileRef.value!, fileRef.value?.name);
  formData.append("category", categoryRef.value);

  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      toast({
        title: "Success!",
        description: data.message,
      });
    }
    fileRef.value = undefined;
    categoryRef.value = "";
  } catch (e) {
    toast({
      title: "Error uploading file",
      description: e as string,
    });
  }
};
</script>

<template>
  <div class="w-full h-full flex justify-center items-center p-2 flex-col">
    <h1 class="text-xl text-white font-medium self-start pb-3">Upload</h1>
    <div
      class="w-full border-t-2 border-r-2 border-l-2 rounded-t-lg border-cyan-500 flex p-3 justify-center items-center gap-2 flex-col bg-gray-900"
    >
      <label class="text-sm text-cyan-500 self-start pl-4">Category</label>
      <input
        v-model="categoryRef"
        type="text"
        class="w-11/12 h-10 bg-black border-2 focus:outline-none rounded-lg text-cyan-500 pl-3 self-center border-cyan-500"
      />
    </div>
    <div
      class="w-full flex pb-2 flex-col items-center gap-2 border-t-0 rounded-t-none border-b-2 border-l-2 border-r-2 rounded-b-lg border-cyan-500 bg-gray-900"
    >
      <Input
        id="file"
        @change="updateFileValue"
        type="file"
        class="w-10/12 h-fit text-cyan-500 bg-black file:bg-cyan-500 file:text-white file:rounded-md file:px-3 file:py-1"
      />
      <div class="flex flex-row w-10/12 items-center gap-3">
        <Button @click="clearInput" class="bg-red-500 hover:bg-red-600 w-1/2"
          >Clear</Button
        >
        <Button
          @click="uploadFile"
          class="bg-cyan-500 hover:bg-cyan-600 w-1/2"
          >Upload File</Button
        >
      </div>
    </div>
  </div>
</template>
