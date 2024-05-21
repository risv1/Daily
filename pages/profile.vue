<script setup></script>

<template>
  <LoadWrapper>
    <div
      class="w-screen h-screen bg-gray-800 gap-5 lg:items-center md:items-center flex flex-row"
    >
      <Sidebar />
      <div class="w-full h-full p-2 flex xl:flex-row lg:flex-row md:flex-row flex-col gap-3">
        <div
          class="lg:w-[43.5vw] md:w-[43.5vw] lg:h-[97vh] md:h-[97vh] w-full h-[50vh] flex justify-center items-center rounded-lg border-2 border-cyan-500 bg-black bg-opacity-60"
        >
          <Links />
        </div>
        <div class="lg:flex md:flex hidden w-[43.5vw] h-[97vh] flex-col gap-3">
          <div
            class="overflow-y-auto w-full h-1/2 flex justify-center items-center rounded-lg border-2 border-cyan-500 bg-black bg-opacity-60"
          >
            <Profile />
          </div>
          <div
            class="w-full h-1/2 flex flex-col justify-center items-center rounded-lg border-2 border-cyan-500 bg-black bg-opacity-60"
          ></div>
        </div>
        <div
          class="overflow-y-auto w-full pt-10 px-10 sm:h-[45vh] h-[36vh] lg:hidden md:hidden flex flex-col bg-black border-2 border-cyan-500 bg-opacity-60 rounded-lg"
        >
          <Profile />
        </div>
      </div>
    </div>
  </LoadWrapper>
</template>
