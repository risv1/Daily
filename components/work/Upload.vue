<script setup lang="ts">
import { useToast } from "../ui/toast";

const categoryRef = ref<string>("");
const fileRef = ref<File>();

const { toast } = useToast();

const updateFileValue = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  fileRef.value = file;
};

const clearInput = () => {
  fileRef.value = undefined;
  const fileInput = document.getElementById("file") as HTMLInputElement;
  fileInput.value = "";
};

const uploadFile = async () => {
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
    <label
      for="file"
      class="w-full flex justify-center items-center rounded-t-lg border-t-2 border-l-2 border-r-2 border-cyan-500 bg-gray-900"
    >
      <Button
        @click="uploadFile"
        class="text-white mt-3 hover:text-cyan-500 ease-in-out duration-150"
        >Upload File</Button
      >
    </label>
    <div
      class="w-full border-r-2 border-l-2 border-cyan-500 flex p-3 justify-center items-center gap-2 flex-col bg-gray-900"
    >
      <label class="text-sm text-cyan-500 font-medium">Category</label>
      <input
        v-model="categoryRef"
        type="text"
        class="w-11/12 h-10 bg-black border-2 focus:outline-none rounded-lg text-cyan-500 pl-3 self-center border-cyan-500"
      />
    </div>
    <div class="w-full flex pb-2 flex-col items-center gap-2 border-t-0 rounded-t-none border-b-2 border-l-2 border-r-2 rounded-b-lg border-cyan-500 bg-gray-900">
      <Input
        id="file"
        @change="updateFileValue"
        type="file"
        class="w-10/12 text-cyan-600 "
      />
      <Button @click="clearInput" class="bg-cyan-500 hover:bg-cyan-600 w-1/2">Clear</Button>
    </div>
  </div>
</template>
