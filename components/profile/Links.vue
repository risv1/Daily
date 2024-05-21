<script setup lang="ts">
import { reduceDesc } from "@/lib/helpers";
import { useToast } from "../ui/toast";

const {toast} = useToast();

const { pending, data: userLinks } = await useLazyFetch("/api/links", {
  transform: (data: any) => data.links,
});

watchEffect(() => {
  if (userLinks !== null) {
    console.log(userLinks);
  }
});

const count = 10;

const isOpen = ref<boolean>(false);

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

const handleNewLink = (link: object) => {
  userLinks.value.push(link);
};

const confirmation = (linkId: string) => {
  const res = confirm("Are you sure you want to delete this link?");
  if (res) {
    deleteLink(linkId);
  }
};

const deleteLink = async(linkId: string) =>{
  try{
    const res = await fetch('/api/links', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: linkId,
      }),
    });
    if(res.ok){
      const data = await res.json();
      toast({
        title: 'Success!',
        description: data.message,
      })
      const newLinks = userLinks.value.filter((link: any) => link.id !== linkId);
      userLinks.value = newLinks;
    }
  } catch (error) {
    console.error(error);
    toast({
      title: 'Error!',
      description: "Couldn't delete link!"
    });
  }
}

</script>

<template>
  <div
    class="overflow-y-auto flex flex-col items-center gap-3 w-full h-full p-3"
  >
    <h1 class="text-white mt-5 text-3xl font-medium">
      Visit your saved websites
    </h1>
    <ScrollArea class="w-full h-full">
      <div v-if="pending" class="w-full h-full flex flex-col items-center">
        <div
          v-for="index in count"
          class="w-4/5 h-[10vh] rounded-lg animate-pulse mt-5 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-950"
        ></div>
      </div>
      <div v-else-if="userLinks === null" class="flex flex-col">
        <h1
          class="text-white font-normal text-2xl lg:pt-20 md:pt-20 pt-10 w-3/5 self-center text-center"
        >
          No links! Add regular visits here.
        </h1>
        <div
          @click="openModal"
          class="w-10 h-10 p-1 pb-2 self-center mt-3 bg-cyan-600 duration-150 ease-in-out hover:cursor-pointer hover:bg-gradient-to-r from-cyan-400 to-cyan-900 rounded-full flex justify-center items-center text-2xl font-bold text-white"
        >
          <p class="self-center">+</p>
        </div>
      </div>
      <div v-else class="w-full flex flex-col items-center justify-center">
        <div
          v-for="link in userLinks"
          :key="link.id"
          class="w-4/5 h-fit p-3 bg-black hover:bg-gray-900 flex justify-between items-center rounded-lg mt-3 border-2 border-cyan-500"
        >
          <p class="text-gray-300 pl-3">{{ reduceDesc(link.title, 15) }}</p>
          <Icon
            name="material-symbols:auto-delete-outline"
            color="red"
            class="w-7 h-7 hover:cursor-pointer ml-auto mr-5"
            @click="()=>confirmation(link.id)"
          />
          <a
            :href="link.url"
            target="_blank"
            class="text-cyan-500 hover:text-cyan-400 pr-3"
          >
            <Icon
              name="material-symbols:exit-to-app"
              color="cyan"
              class="ml-auto w-7 h-7"
          /></a>
        </div>
      </div>
    </ScrollArea>
    <div
      @click="openModal"
      v-if="userLinks !== null"
      class="w-10 h-10 p-1 pb-2 bg-cyan-600 duration-150 ease-in-out hover:cursor-pointer hover:bg-gradient-to-r from-cyan-400 to-cyan-900 rounded-full flex justify-center items-center text-2xl font-bold text-white"
    >
      <p class="self-center">+</p>
    </div>
  </div>
  <NewLink
    v-if="isOpen === true"
    :closeMethod="closeModal"
    @LinkCreated="handleNewLink"
  />
</template>
