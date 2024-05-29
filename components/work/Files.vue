<script setup lang="ts">
import { reduceDesc } from "~/lib/helpers";
import type { Category } from "~/models/category";
import { useToast } from "../ui/toast";

const props = defineProps({
  isPending: Boolean,
  selectedCategory: Object as PropType<Category>,
  files: Array<any>,
});

const { toast } = useToast();

const downloadFile = async (fileName: string) => {
  if (props.selectedCategory !== undefined) {
    try {
      const res = await fetch(
        `/api/download-file/${props.selectedCategory?.name}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileName: fileName }),
        }
      );
      if (res.ok) {
        const blob = await res.blob();
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to download file",
      })
      console.error(error);
    }
  }
};

const confirmDelete = async (fileName: string) => {
  const result = confirm("Are you sure you want to delete this file?");
  if (result) {
    deleteFile(fileName);
  }
};

const deleteFile = async (fileName: string) => {
  if (props.selectedCategory !== undefined) {
    try {
      const res = await fetch(
        `/api/delete-file/${props.selectedCategory?.name}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileName: fileName }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        toast({
          title: "Success!",
          description: data.message,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error!",
        description: "Failed to delete file",
      });
    }
  }
};

const count = 10;
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <h1 class="text-xl text-white font-medium self-start">Files</h1>
    <ScrollArea class="w-full h-full">
      <div class="w-full h-full flex flex-col items-center">
        <div v-if="isPending" class="flex flex-col w-11/12 h-fit">
          <div
            v-for="index in count"
            class="w-full mt-5 h-10 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-950 animate-pulse rounded-lg"
          ></div>
        </div>
        <div
          v-else-if="files?.length === 0"
          class="w-full h-full text-center mt-14 text-md text-white font-medium"
        >
          No files found. Add file to view.
        </div>
        <div
          v-else
          v-for="file in files"
          class="w-10/12 duration-150 ease-in-out flex flex-row items-center justify-between px-10 bg-black hover:bg-gray-900 h-fit p-2 rounded-lg mt-3 text-center text-lg text-cyan-500"
        >
          <span>{{ reduceDesc(file.name, 15) }}</span
          ><span class="flex flex-row gap-3"
            ><Icon
              @click="downloadFile(file.name)"
              name="material-symbols:download-2-outline"
              class="w-5 h-5 hover:cursor-pointer"
              color="cyan" /><Icon
              @click="confirmDelete(file.name)"
              name="material-symbols:auto-delete-outline"
              class="w-5 h-5 hover:cursor-pointer"
              color="red"
          /></span>
        </div>
      </div>
    </ScrollArea>
  </div>
</template>
