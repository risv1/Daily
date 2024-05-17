<script setup>
const routes = [
  {
    icon: "material-symbols:home-and-garden-outline",
    color: "white",
    size: 50,
    path: "/me",
  },
  { icon: "iconoir:task-list", color: "white", size: 50, path: "/me/work" },
  {icon: "material-symbols:exercise-outline-sharp", color: "white", size: 50, path: "/me/health"},
  {
    icon: "material-symbols:account-circle-full",
    color: "white",
    size: 50,
    path: "/profile",
  },
];
</script>

<template>
  <div
    class="z-10 xl:w-[7vw] lg:w-[7vw] md:w-[7vw] sm:w-[9vw] lg:flex md:flex sm:flex border-2 border-cyan-500 h-[97vh] rounded-lg ml-3 bg-opacity-60 bg-black hidden flex-col justify-center items-center"
  >
    <div class="flex flex-col gap-10">
      <Icon
        @click="navigateTo(route.path)"
        v-for="route in routes"
        :name="route.icon"
        :color="route.color"
        :size="String(route.size)"
        class="p-2 rounded-full hover:bg-cyan-500 hover:cursor-pointer duration-200 ease-in-out"
      />
    </div>
  </div>
  <div class="lg:hidden md:hidden sm:hidden flex items-center justify-center absolute bottom-0 z-10 w-full h-[10vh] border-t-2 border-cyan-500 bg-opacity-60 bg-black">
    <div class="flex flex-row gap-10">
        <Icon
            @click="navigateTo(route.path)"
            v-for="route in routes"
            :name="route.icon"
            :color="route.color"
            :size="String(route.size)"
            class="p-2 rounded-full hover:bg-cyan-500 hover:cursor-pointer duration-200 ease-in-out"
        />
    </div>
  </div>
</template>

