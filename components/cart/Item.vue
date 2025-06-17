<script setup>
defineProps(['data']);
</script>

<template>
  <div :class="['relative flex max-h-[120px] min-h-[120px] min-w-[120px] max-w-[120px] flex-col items-center justify-center rounded border bg-white p-2 lg:max-h-[150px] lg:min-h-[150px] lg:min-w-[158px] lg:max-w-[158px]', data ? 'border-yellow-500' : 'border-black']">
    <template v-if="data">
      <i class="ri-close-circle-line absolute right-2 top-1 cursor-pointer text-xl transition-all hover:text-yellow-500"></i>
      <NuxtImg src="https://static.vecteezy.com/system/resources/thumbnails/018/871/732/small_2x/cute-and-happy-dog-png.png" alt="cart-image" class="h-full w-full object-contain py-5" />
      <p class="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold">BG210</p>
    </template>
    <span v-else class="text-xl font-semibold uppercase text-yellow-500 lg:text-4xl">Empty</span>
  </div>
</template>

<style scoped></style>
