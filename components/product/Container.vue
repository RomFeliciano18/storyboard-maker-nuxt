<script setup>
const props = defineProps(['products', 'category']);

const viewAll = ref(false);
</script>

<template>
  <div class="py-4">
    <div class="flex items-center justify-between py-4">
      <div class="flex items-center gap-4">
        <h1 class="montserrat-bold text-7xl text-yellow-500">{{ category }}</h1>
        <span class="text-lg font-semibold">({{ products?.length }} results)</span>
      </div>
      <MainButton v-if="products.length > 10" @click="viewAll = !viewAll" class="w-28">{{ viewAll ? 'Show Less' : 'Show More' }}</MainButton>
    </div>
    <CarouselContainer v-if="!viewAll">
      <ProductCard v-for="product in products" :product="product" :viewAll="viewAll" />
    </CarouselContainer>
    <div v-else class="grid grid-cols-4 gap-4">
      <ProductCard v-for="product in products" :product="product" :viewAll="viewAll" />
    </div>
  </div>
</template>

<style scoped></style>
