<script setup lang="ts">
import type { Category } from "~/models/category";

definePageMeta({
  layout: "me",
});

const selectedCategory = ref<Category>();
const filesPending = ref<boolean>(false);
const categoryFiles = ref<any[]>([]);

const { pending, data: categories } = await useLazyFetch("/api/categories", {
  method: "get",
  headers: {
    "Content-Type": "application/json",
  },
  transform: (data: any) => data.categories,
});

watchEffect(async () => {
  if (selectedCategory.value !== undefined) {
    filesPending.value = true;
    const res = await fetch(`/api/get-files/${selectedCategory.value.name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      filesPending.value = false;
      categoryFiles.value = data.files;
    } else {
      filesPending.value = false;
      categoryFiles.value = [];
    }
  }
});

const appendCategory = (category: Category) => {
  if (categories.value !== null) {
    categories.value.push(category);
  } else {
    categories.value = [category];
  }
};

const setSelectedCategory = (category: Category) => {
  selectedCategory.value = category;
};

const clearSelectedCategory = () => {
  selectedCategory.value = undefined;
  categoryFiles.value = [];
};
</script>

<template>
  <div
    class="w-full h-full p-3 lg:pl-5 md:pl-5 flex xl:flex-row lg:flex-row md:flex-row flex-col gap-3"
  >
    <div
      class="xl:w-1/3 xl:h-full lg:w-1/3 lg:h-full md:w-1/3 md:h-full sm:h-full w-full h-[62vh] p-5 mb-5 rounded-lg border-2 border-cyan-500 bg-black bg-opacity-60"
    >
      <Events :full="false" />
    </div>
    <div
      class="lg:w-2/3 md:w-2/3 grid grid-cols-2 grid-rows-2 w-full h-full gap-2"
    >
      <div
        class="bg-black bg-opacity-60 p-5 rounded-lg border-2 border-cyan-500"
      >
        <Categories
          :isPending="pending"
          :selectedCategory="selectedCategory"
          :categories="categories"
          :clear="clearSelectedCategory"
          @AddedCategory="appendCategory"
          @SelectedCategory="setSelectedCategory"
        />
      </div>
      <div
        class="bg-black bg-opacity-60 p-5 rounded-lg border-2 border-cyan-500"
      >
        <Files :files="categoryFiles" :isPending="filesPending" />
      </div>
      <div
        class="bg-black bg-opacity-60 p-5 rounded-lg border-2 border-cyan-500"
      >
        <Upload :selectedCategory="selectedCategory" />
      </div>
      <div
        class="bg-black bg-opacity-60 p-5 rounded-lg border-2 border-cyan-500"
      >
        <EnterFocus />
      </div>
    </div>
  </div>
</template>
