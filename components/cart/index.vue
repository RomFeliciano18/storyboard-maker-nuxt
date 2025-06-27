<script setup>
const cart = useCart();
const cartSlots = computed(() => {
  return Array.from({ length: 15 }, (_, index) => cart.products[index] || null);
});
</script>

<template>
  <div class="container-padding space-y-2 bg-zinc-100 p-2">
    <h2 class="text-2xl">{{ $t('Home.selectProd') }}</h2>
    <div class="grid grid-cols-12 gap-2 lg:gap-2">
      <CarouselContainer class="col-span-12 lg:col-span-10">
        <CartItem v-for="(crt, index) in cartSlots" :key="index" :data="crt" :index="index" />
      </CarouselContainer>

      <div class="col-span-12 flex flex-row items-center justify-start gap-2 lg:col-span-2 lg:flex-col lg:items-end lg:py-2">
        <MainButton class="w-full lg:h-full lg:w-44">
          <span>{{ $t('Home.next') }}</span>
          <i class="ri-arrow-right-circle-line lg:text-xl"></i>
        </MainButton>
        <MainButton variant="secondary" class="w-full lg:w-44">{{ $t('Home.clearSelection') }}</MainButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
