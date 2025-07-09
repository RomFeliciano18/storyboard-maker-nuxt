<script setup>
const route = useRoute();
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

const modalState = useState('modalState', () => ({
  open: false,
  data: {},
}));
const selectedColor = ref(null); // Holds the selected color object

const productsState = useState('productsState');
const isSearching = ref(false);
const activeCategory = ref('');
const searchedColor = useState('searchedColor', () => '');

watchEffect(() => {
  if (!route.query.search && dataProds.value?.products?.length) {
    productsState.value = dataProds.value.products;
  }
});

watch(
  () => route.query.search,
  async (searchQuery) => {
    if (!route.query.search) return;

    isSearching.value = true;

    const formData = new FormData();
    formData.append('search', searchQuery);
    formData.append('lang', locale.value === 'us' ? 'EN' : locale.value.toUpperCase());
    formData.append('country', locale.value === 'us' ? 'US' : 'CA');

    try {
      const result = await $fetch('http://20.123.82.238:7700/product/search', {
        method: 'POST',
        body: formData,
      });
      productsState.value = result.products || [];
      activeCategory.value = result.types.length > 1 ? 'all' : result.types[0];
      searchedColor.value = result.colors.length === 1 ? result.colors[0] : '';
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      isSearching.value = false;
    }
  },
  { immediate: true }
);

const featuredProducts = computed(() => {
  const featuredList = dataFeatured.value?.features[0]?.products || [];
  const featuredCode = featuredList.map(({ productCode }) => productCode);
  const productMap = new Map((dataProds.value?.products || []).map((prod) => [prod.productCode, prod]));

  return featuredCode.map((code) => productMap.get(code)).filter(Boolean);
});

const featuredTitle = computed(() => {
  return locale.value == 'fr' ? dataFeatured.value?.features[0].nameFR : dataFeatured.value?.features[0].name;
});

const filteredGroupedProducts = computed(() => {
  const products = !route.query.search ? dataProds.value.products : productsState.value;

  const filtered = products.filter((product) => {
    const matchCategory = filterCategory.value === 'all' || product.type === filterCategory.value;
    return matchCategory;
  });

  const categoryMap = new Map();

  for (const product of filtered) {
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

const filterCategory = ref(route.query.category || 'all');

const handleFilterUpdate = (newFilter) => {
  filterCategory.value = newFilter;
};

const hasFilters = computed(() => {
  return filterCategory.value !== 'all' || !!route.query.search;
});

const handleConfirmCombo = () => {
  modalState.value.data.onConfirm(selectedColor.value);
  selectedColor.value = '';
};

useHead({
  title: 'Products | StoryBoard',
});
</script>

<template>
  <div class="relative">
    <ClientOnly>
      <div class="top-0 z-50 sm:sticky">
        <Cart />
        <AppFilter :products="productsState" :activeCategory="activeCategory" @update:filter="handleFilterUpdate" />
      </div>

      <div v-if="status === 'pending' || isSearching" class="flex h-96 flex-col items-center justify-center">
        <Spinner />
      </div>

      <div v-else class="container-padding">
        <ProductContainer v-if="!hasFilters" :products="featuredProducts" :category="featuredTitle" />
        <template v-for="category in categories">
          <ProductContainer v-if="filteredGroupedProducts.get(category.key)?.length > 0" :key="category.key" :products="filteredGroupedProducts.get(category.key)" :category="category.name" :isShowMore="hasFilters" />
        </template>
      </div>
    </ClientOnly>
  </div>

  <Modal :isOpenModal="modalState.open" @close="modalState.open = false">
    <div class="flex flex-col items-center justify-center gap-4">
      <h2 class="text-xl">Please select the color of Pen</h2>
      <img src="/pen-combo/i128.webp" alt="" />
      <div class="flex flex-wrap items-center justify-center gap-2">
        <div v-for="(color, idx) in modalState.data.component?.colors || []" :key="idx" @click="selectedColor = color" class="h-10 w-10 cursor-pointer rounded-full border border-neutral-500 transition-all ease-in-out hover:scale-110" :style="{ background: color.hex || '#ccc', boxShadow: selectedColor?.color === color.color ? '0 0 0 2px #000' : '' }" />
      </div>

      <MainButton class="w-full" :disabled="!selectedColor" @click="handleConfirmCombo">Confirm</MainButton>
    </div>
  </Modal>
</template>

<style scoped></style>
