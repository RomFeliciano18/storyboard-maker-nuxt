<script setup>
const cart = ref(new Array(15));
</script>

<template>
  <div class="container-padding space-y-2 bg-zinc-100 p-2">
    <h2 class="text-2xl">{{ $t('Home.selectProd') }}</h2>
    <div class="grid grid-cols-12 gap-2 lg:gap-2">
      <CarouselContainer class="col-span-12 lg:col-span-10">
        <CartItem v-for="crt in cart" :key="crt" :data="false" />
      </CarouselContainer>

      <div class="col-span-12 flex flex-row items-center justify-start gap-2 lg:col-span-2 lg:flex-col lg:items-end lg:py-2">
        <MainButton class="w-full lg:h-full lg:w-44">
          <span>Next</span>
          <i class="ri-arrow-right-circle-line lg:text-xl"></i>
        </MainButton>
        <MainButton variant="secondary" class="w-full lg:w-44">Clear Selection</MainButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
