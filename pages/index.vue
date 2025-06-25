<script setup>
const { locale, t } = useI18n();

const categories = [
  { key: 'notebook', name: t('Home.books') },
  { key: 'bottle', name: t('Home.bottles') },
  { key: 'bag', name: t('Home.bags') },
  { key: 'pen', name: t('Home.pens') },
  { key: 'home', name: t('Home.home') },
  { key: 'travel', name: t('Home.travel') },
  { key: 'packaging', name: t('Home.packaging') },
  { key: 'giftset', name: t('Home.giftset') },
];

const { data: dataProds, status } = useProducts();
const { data: dataFeatured } = useFeaturedProducts();

const featuredProducts = computed(() => {
  const featuredList = dataFeatured.value?.features[0]?.products || [];
  const featuredCode = featuredList.map(({ productCode }) => productCode);
  const productMap = new Map((dataProds.value?.products || []).map((prod) => [prod.productCode, prod]));

  return featuredCode.map((code) => productMap.get(code)).filter(Boolean);
});

const featuredTitle = computed(() => {
  return locale.value == 'fr' ? dataFeatured.value?.features[0].nameFR : dataFeatured.value?.features[0].name;
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
    </div>

    <template v-if="status === 'success'">
      <div class="top-0 z-50 sm:sticky">
        <Cart />
        <AppFilter />
      </div>

      <div class="container-padding">
        <ProductContainer :products="featuredProducts" :category="featuredTitle" />
        <template v-for="category in categories">
          <ProductContainer v-if="groupedProducts.get(category.key).length > 1" :key="category.key" :products="groupedProducts.get(category.key)" :category="category.name" />
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
