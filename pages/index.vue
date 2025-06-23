<script setup>
const { data: dataProds, status } = useProducts();
const { data: dataFeatured } = useFeaturedProducts();

const featuredProducts = computed(() => {
  const featuredCode = dataFeatured.value?.features[0].products.map(({ productCode }) => productCode);
  return dataProds.value?.products.filter((prod) => featuredCode.includes(prod.productCode));
});
</script>

<template>
  <div class="sticky top-0">
    <Cart />
    <AppFilter />
    <h1 v-if="status === 'pending'">LOADING...</h1>
    <template v-if="status === 'success'">
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
