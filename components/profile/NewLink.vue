<script setup lang="ts">
import { useToast } from "@/components/ui/toast/use-toast";

const props = defineProps({
  closeMethod: {
    type: Function,
    required: true,
    default: () => {},
  },
});

const emit = defineEmits(["LinkCreated"]);

const { toast } = useToast();

const titleRef = ref<string | null>(null);
const urlRef = ref<string | null>(null);

const submit = async () => {
  try {
    if (!titleRef.value || !urlRef.value) {
      toast({
        title: "Error",
        description: "Please fill all fields",
      });
      return;
    }
    if ((urlRef.value as string).slice(0, 4) !== "http") {
      urlRef.value = "https://" + urlRef.value;
    }
    const res = await fetch("/api/links", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleRef.value,
        url: urlRef.value,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      toast({
        title: "Error",
        description: `${data.message}!`,
      });
      return;
    }
    emit("LinkCreated", data.link);
    toast({
      title: "Success",
      description: "Link created!",
    });
    props.closeMethod();
  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: "Failed to create link!",
    });
  }
};
</script>

<template>
  <Modal :closeModal="closeMethod">
    <div class="text-white w-full h-full p-3 flex flex-col items-center">
      <form
        @submit.prevent
        class="flex flex-col w-full h-full gap-3 justify-center items-start"
      >
        <h1 class="font-medium text-xl self-center">New Link</h1>
        <label for="title" class="text-white font-medium">Title</label>
        <Input
          v-model="titleRef"
          type="text"
          placeholder="Title"
          class="w-full bg-gray-900 border-none focus:outline-none text-cyan-500"
        />
        <label for="url" class="text-white font-medium">URL</label>
        <Input
          v-model="urlRef"
          type="text"
          placeholder="URL"
          class="bg-gray-900 border-none focus:outline-none text-cyan-500 w-full"
        />
        <Button
          @click="submit"
          type="submit"
          class="w-full bg-cyan-500 hover:bg-cyan-600"
          >Add</Button
        >
      </form>
    </div>
  </Modal>
</template>
