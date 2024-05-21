<script setup>

onMounted(async () => {
  try {
    const user = useCookie('token', { 
      readonly: true
     });
    if (user.value === undefined) {
      navigateTo("/login");
    } else {
      console.log("User present");
    }
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <LoadWrapper>
    <div class="relative w-screen h-screen bg-gray-800 flex items-center">
      <Sidebar />
      <div class="lg:w-[93vw] md:w-[92vw] sm:w-[90vw] w-full h-full relative">
        <slot />
      </div>
    </div>
  </LoadWrapper>
</template>
