<script setup>
defineProps(['data', 'index']);
const cart = useCart();
</script>

<template>
  <div :class="['relative flex max-h-[120px] min-h-[120px] min-w-[120px] max-w-[120px] flex-col items-center justify-center overflow-hidden rounded border bg-white p-2 lg:max-h-[150px] lg:min-h-[150px] lg:min-w-[158px] lg:max-w-[158px]', data ? 'border-yellow-500' : 'border-black']">
    <template v-if="data">
      <i @click="cart.remove(index)" class="ri-close-circle-line absolute right-2 top-1 cursor-pointer text-xl transition-all hover:text-yellow-500"></i>
      <NuxtImg :src="`/thumbnails/${data.img}`" :alt="data.productCode" :class="['w-full object-contain py-5', data.type !== 'pen' && 'p-6']" />
      <p class="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold">{{ data.productCode }}</p>
    </template>
    <span v-else class="text-xl font-semibold uppercase text-yellow-500 lg:text-4xl">{{ $t('Home.empty') }}</span>
  </div>
</template>

<style scoped></style>
