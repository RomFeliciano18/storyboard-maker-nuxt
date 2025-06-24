<script setup>
const categories = [
  { key: 'notebook', name: 'Books' },
  { key: 'bottle', name: 'Bottles' },
  { key: 'bag', name: 'Bags' },
  { key: 'pen', name: 'Pens' },
  { key: 'home', name: 'Home' },
  { key: 'travel', name: 'Travel' },
  { key: 'packaging', name: 'Packaging' },
  { key: 'giftset', name: 'Giftset' },
];

const { data: dataProds, status } = useProducts();
const { data: dataFeatured } = useFeaturedProducts();

const featuredProducts = computed(() => {
  const featuredCode = dataFeatured.value?.features[0].products.map(({ productCode }) => productCode);
  return dataProds.value?.products.filter((prod) => featuredCode.includes(prod.productCode));
});

const groupedProducts = computed(() => {
  const products = dataProds.value?.products || [];
  const categoryMap = new Map();

  for (const product of products) {
    const category = product.type || 'Uncategorized';

    if (!categoryMap.has(category)) {
      categoryMap.set(category, []);
    }

    categoryMap.get(category).push(product);
  }

  for (const [category, group] of categoryMap.entries()) {
    const sorted = group.sort((a, b) => {
      if (a.isNew && !b.isNew) return -1;
      if (!a.isNew && b.isNew) return 1;

      return a.productCode.localeCompare(b.productCode);
    });

    categoryMap.set(category, sorted);
  }

  return categoryMap;
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
        <ProductContainer v-for="category in categories" :products="groupedProducts.get(category.key)" :category="category.name" />
      </div>
    </template>
  </div>
</template>

<style scoped></style>
