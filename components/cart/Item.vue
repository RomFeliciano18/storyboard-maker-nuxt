<script setup>
const props = defineProps(['data', 'index']);
const cart = useCart();

const showIcon = computed(() => {
  const currentCombo = props.data?.combo;
  const currentIndex = props.index;
  const nextSameCombo = cart.products.slice(currentIndex + 1).some((p) => p.combo === currentCombo);

  return nextSameCombo;
});

const showCancelButton = computed(() => {
  const currentCombo = props.data?.combo;
  const currentIndex = props.index;
  const firstComboIndex = cart.products.findIndex((p) => p.combo === currentCombo);

  return firstComboIndex === currentIndex;
});
</script>

<template>
  <div class="relative">
    <template v-if="showIcon">
      <i class="ri-links-line absolute -right-5 top-10 z-10 rotate-45 text-2xl"></i>
      <i class="ri-links-line absolute -right-5 bottom-10 z-10 rotate-45 text-2xl"></i>
    </template>

    <div :class="['relative flex max-h-[120px] min-h-[120px] min-w-[120px] max-w-[120px] flex-col items-center justify-center overflow-hidden rounded border bg-white p-2 lg:max-h-[150px] lg:min-h-[150px] lg:min-w-[158px] lg:max-w-[158px]', data ? 'border-yellow-500' : 'border-black']">
      <template v-if="data">
        <!-- Show only in the 1st combo number -->
        <i v-if="showCancelButton" @click="cart.remove(index)" class="ri-close-circle-line absolute right-2 top-1 cursor-pointer text-xl transition-all hover:text-yellow-500"></i>
        <NuxtImg :src="`/thumbnails/${data.img}`" :alt="data.productCode" :class="['w-full object-contain py-5', data.type !== 'pen' && 'p-6']" />
        <p class="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold">{{ data.productCode }}</p>
      </template>
      <span v-else class="text-xl font-semibold uppercase text-yellow-500 lg:text-4xl">{{ $t('Home.empty') }}</span>
    </div>
  </div>
</template>

<style scoped></style>
