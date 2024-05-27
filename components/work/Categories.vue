<script setup lang="ts">
import { reduceDesc } from "~/lib/helpers";
import type { Category } from "~/models/category";
import { useToast } from "../ui/toast";

defineProps({
  categories: Array<Category>,
  isPending: Boolean,
  selectedCategory: Object as PropType<Category>,
  clear: Function as PropType<() => void>,
});

const count = 10;
const emit = defineEmits(["AddedCategory", "SelectedCategory"]);

const { toast } = useToast();

const openInput = ref<boolean>(false);

const setOpenInput = (value: boolean) => {
  openInput.value = value;
};

const categoryRef = ref<string>("");

const addCategory = async (category: string) => {
  try {
    const res = await fetch("/api/categories", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: category,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      toast({
        title: "Success!",
        description: data.message,
      });
      emit("AddedCategory", data.category);
      setOpenInput(false);
    } else {
      toast({
        title: "Error!",
        description: data.message,
      });
    }
  } catch (error) {
    console.error(error);
    toast({
      title: "Error!",
      description: "An error occurred. Please try again.",
    });
  }
};

const selectCategory = (category: Category) => {
  emit("SelectedCategory", category);
};
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <h1
      class="text-xl text-white font-medium flex flex-row items-center w-full self-start"
    >
      Categories
      <div
        @click="clear"
        v-if="selectedCategory !== undefined"
        class="hover:cursor-pointer text-cyan-500 ml-auto text-sm"
      >
        Clear
      </div>
    </h1>
    <ScrollArea class="w-full h-full">
      <div class="w-full h-full flex flex-col items-center">
        <div v-if="isPending" class="flex flex-col w-11/12 h-fit">
          <div
            v-for="index in count"
            class="w-full h-10 bg-gradient-to-t from-black to bg-gray-900 animate-pulse rounded-lg"
          ></div>
        </div>
        <div
          v-else-if="categories === null"
          class="w-full h-full text-center mt-14 text-md text-white font-medium"
        >
          No categories found. Add category to upload files to selected group.
        </div>
        <div
          v-else
          v-for="category in categories"
          @click="selectCategory(category)"
          class="w-8/12 duration-150 ease-in-out hover:cursor-pointer flex justify-between px-10 items-center bg-black hover:bg-gray-900 h-fit p-2 rounded-lg mt-3 text-center text-lg text-cyan-500"
        >
          <Icon
            name="material-symbols:create-new-folder"
            class="w-7 h-7"
            :color="
              selectedCategory !== undefined &&
              selectedCategory.id === category.id
                ? 'cyan'
                : 'gray'
            "
          />
          <span>{{ reduceDesc(category.name, 10) }}</span>
        </div>
      </div>
    </ScrollArea>
    <div
      v-if="!openInput"
      @click="setOpenInput(true)"
      class="w-7 h-7 self-center mt-auto p-1 pb-2 bg-cyan-600 duration-150 ease-in-out hover:cursor-pointer hover:bg-gradient-to-r from-cyan-400 to-cyan-900 rounded-full flex justify-center items-center text-2xl font-bold text-white"
    >
      <p class="self-center">+</p>
    </div>
    <div v-if="openInput" class="mt-auto">
      <form
        @submit.prevent
        class="w-full flex flex-row justify-center p-3 gap-2"
      >
        <input
          v-model="categoryRef"
          class="w-3/5 h-7 bg-black focus:outline-none border-2 rounded-lg text-cyan-500 pl-3 self-center border-cyan-500"
        />
        <Button
          @click="addCategory(categoryRef)"
          class="w-2/5 h-7 bg-cyan-500 hover:bg-cyan-600"
          >Add</Button
        >
        <Button
          @click="setOpenInput(false)"
          class="w-2/5 h-7 bg-red-500 hover:bg-red-600"
          >Cancel</Button
        >
      </form>
    </div>
  </div>
</template>
