<script setup>
const props = defineProps(['products', 'category']);
</script>

<template>
  <div class="py-4">
    <div class="flex items-center gap-4 py-4">
      <h1 class="montserrat-bold text-7xl text-yellow-500">{{ category }}</h1>
      <span class="text-lg font-semibold">({{ products?.length }} results)</span>
    </div>
    <CarouselContainer>
      <ProductCard v-for="product in products" :product="product" />
    </CarouselContainer>
  </div>
</template>

<style scoped></style>
