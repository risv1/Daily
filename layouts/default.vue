<script setup>

onMounted(async () => {
  try {
    const user = useCookie('token', {readonly: true});
    if (user.value === undefined) {
      navigateTo("/login");
    } else {
      console.log("User present:");
    }
  } catch (error) {
    console.error(error);
  }
});

</script>

<template>
  <div class="w-full h-full">
    <slot />
  </div>
</template>
