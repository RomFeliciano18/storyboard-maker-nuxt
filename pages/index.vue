<script setup>
const { data: dataProds, status } = useProducts();
const { data: dataFeatured } = useFeaturedProducts();

const featuredProducts = computed(() => {
  const featuredCode = dataFeatured.value?.features[0].products.map(({ productCode }) => productCode);
  return dataProds.value?.products.filter((prod) => featuredCode.includes(prod.productCode));
});

useHead({
  title: 'Products | StoryBoard',
});
</script>

<template>
  <div class="relative">
    <div v-if="status === 'pending'" class="flex h-96 flex-col items-center justify-center">
      <Spinner />
      <h1 class="text-3xl font-bold text-yellow-500">Loading...</h1>
    </div>

    <template v-if="status === 'success'">
      <div class="sticky top-0 z-50">
        <Cart />
        <AppFilter />
      </div>

      <div class="container-padding">
        <ProductContainer :products="featuredProducts" :category="dataFeatured?.features[0].name" />
      </div>
      <div v-for="product in dataProds?.products" :key="product.productCode">
        {{ product.name }}
      </div>
    </template>
  </div>
</template>

<style scoped></style>
