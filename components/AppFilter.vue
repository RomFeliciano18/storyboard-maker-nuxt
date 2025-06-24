<script setup>
const { locale, locales, setLocale } = useI18n();
const route = useRoute();
const router = useRouter();
const filter = reactive({
  search: route.query.search || '',
  category: route.query.category || 'all',
});
const { copy } = useClipboard(route.fullPath);
const selectedLocale = ref(locale.value);

let isResetting = false;

watch(
  () => filter.category,
  (newCategory) => {
    if (isResetting) return;

    console.log('Filter:', newCategory);
    const { category, ...restQuery } = route.query;

    router.push({
      query: {
        ...restQuery,
        category: newCategory === 'all' ? undefined : newCategory,
      },
    });
  }
);

const handleSearch = () => {
  console.log('Search:', filter.search);
  router.push({
    query: {
      ...route.query,
      search: filter.search || undefined,
    },
  });
};

const handleReset = async () => {
  isResetting = true;

  filter.search = '';
  filter.category = 'all';

  await router.replace({ query: {} });

  isResetting = false;
};
watch(selectedLocale, (newLocale) => {
  setLocale(newLocale);
});
</script>

<template>
  <div class="container-padding flex flex-wrap items-center justify-between space-y-2 bg-black p-2 md:h-20">
    <div class="flex flex-wrap items-center gap-2">
      <form @submit.prevent="handleSearch" class="relative">
        <input type="text" v-model="filter.search" placeholder="Blue bottles under $20" class="w-72 rounded p-2 pr-12 placeholder:uppercase focus:outline-none" />
        <MainButton class="absolute right-0 top-1/2 h-10 !w-10 -translate-y-1/2 border-none">
          <i class="ri-search-line text-xl"></i>
        </MainButton>
      </form>
      <MainButton variant="secondary" @click="copy($route.fullPath)" class="h-10 !w-10 border-none"><i class="ri-link text-xl"></i></MainButton>

      <label class="ml-4 text-white">Categories:</label>
      <select v-model="filter.category">
        <option value="all">All</option>
        <option value="pens">Pens</option>
      </select>

      <MainButton @click="handleReset">Reset</MainButton>
    </div>

    <select v-model="selectedLocale">
      <option v-for="locale in locales" :value="locale.code" :key="locale.code">{{ locale.name }}</option>
    </select>
  </div>
</template>

<style scoped>
select {
  @apply h-10 w-44 cursor-pointer rounded px-2 focus:outline-none;
}
</style>
