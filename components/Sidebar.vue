<template>
  <div
    class="xl:w-[7vw] lg:w-[7vw] md:w-[7vw] sm:w-[7vw] lg:flex md:flex sm:flex border h-[95vh] rounded-lg ml-3 bg-cyan-600 hidden flex-col justify-center items-center"
  >
    <div class="flex flex-col gap-10">
      <Icon
        @click="navigateTo(route.path)"
        v-for="route in routes"
        :name="route.icon"
        :color="route.color"
        :size="route.size"
        class="p-2 rounded-full hover:bg-cyan-500 hover:cursor-pointer duration-200 ease-in-out"
      />
    </div>
  </div>
  <div class="lg:hidden md:hidden sm:hidden flex items-center justify-center absolute bottom-0 w-full h-[10vh] border bg-cyan-600">
    <div class="flex flex-row gap-10">
        <Icon
            @click="navigateTo(route.path)"
            v-for="route in routes"
            :name="route.icon"
            :color="route.color"
            :size="route.size"
            class="p-2 rounded-full hover:bg-cyan-500 hover:cursor-pointer duration-200 ease-in-out"
        />
    </div>
  </div>
</template>

<script setup>
const routes = [
  {
    icon: "material-symbols:home-and-garden-outline",
    color: "white",
    size: 50,
    path: "/me",
  },
  { icon: "iconoir:task-list", color: "white", size: 50, path: "/me/tasks" },
  {icon: "material-symbols:exercise-outline-sharp", color: "white", size: 50, path: "/me/health"},
  {
    icon: "material-symbols:account-circle-full",
    color: "white",
    size: 50,
    path: "/profile",
  },
];
</script>
