<script setup>
const props = defineProps(['products', 'activeCategory']);

const categoryMap = {
  notebook: 'books',
  bottle: 'bottles',
  bag: 'bags',
  pen: 'pens',
  home: 'home',
  travel: 'travel',
  packaging: 'packaging',
  giftset: 'giftset',
};

const emit = defineEmits(['update:filter', 'submit:search']);
const { locale, locales, setLocale, t } = useI18n();
const route = useRoute();
const router = useRouter();
const searchedColor = useState('searchedColor');
const selectedLocale = ref(locale.value);
const inputSearch = ref(route.query.search || '');
const selectedCategory = ref(route.query.category || props.activeCategory || 'all');

watch(
  () => route.query.category,
  (newVal) => {
    selectedCategory.value = newVal || 'all';
    emit('update:filter', selectedCategory.value);
  }
);

watch(
  () => props.activeCategory,
  (newVal) => {
    if (!route.query.category) {
      selectedCategory.value = newVal || 'all';
      emit('update:filter', selectedCategory.value);
    }
  }
);

watch(selectedCategory, (newVal) => {
  if (isResetting) return;

  const { category, ...rest } = route.query;

  router.push({
    query: {
      ...rest,
      category: newVal === 'all' ? undefined : newVal,
    },
  });
});

const categories = computed(() => {
  const productTypes = new Set(props.products?.map((p) => p.type));

  return Object.entries(categoryMap)
    .filter(([key]) => productTypes.has(key))
    .map(([key, translationKey]) => ({
      key,
      name: t(`Home.${translationKey}`),
    }));
});

const { copy } = useClipboard();
const copyFullUrl = () => {
  const fullUrl = `${window.location.origin}${route.fullPath}`;
  copy(fullUrl);
};

let isResetting = false;

const handleSearch = () => {
  const newSearch = inputSearch.value?.trim() || undefined;

  const newQuery = {
    search: newSearch,
  };

  if (!newSearch) {
    delete newQuery.category;
    searchedColor.value = '';
    emit('update:filter', 'all');
  }

  router.push({ query: newQuery });
  emit('submit:search', newSearch);
};

const handleReset = async () => {
  isResetting = true;
  selectedCategory.value = 'all';
  inputSearch.value = '';
  searchedColor.value = '';

  await router.replace({ query: {} });

  emit('update:filter', selectedCategory.value);
  isResetting = false;
};

watch(selectedLocale, (newLocale) => {
  setLocale(newLocale);

  router.replace({
    path: `/${newLocale}${route.path.replace(/^\/[a-z]{2}/, '')}`,
    query: {},
  });

  inputSearch.value = '';
  selectedCategory.value = 'all';
  searchedColor.value = '';
  emit('update:filter', 'all');
});
</script>

<template>
  <div class="container-padding flex flex-wrap items-center justify-between space-y-2 bg-black p-2 md:h-20">
    <div class="flex flex-wrap items-center gap-2">
      <form @submit.prevent="handleSearch" class="relative ml-7 w-full sm:w-auto">
        <NuxtImg src="/icons/icon-search.png" class="absolute -left-7 w-10" />
        <input type="text" v-model="inputSearch" :placeholder="$t('Home.blueBottles')" class="w-full rounded p-2 px-3 pr-12 placeholder:uppercase focus:outline-none sm:w-96" />
        <MainButton class="absolute right-0 top-1/2 h-10 !w-10 -translate-y-1/2 border-none">
          <i class="ri-search-line text-xl"></i>
        </MainButton>
      </form>
      <MainButton variant="secondary" @click="copyFullUrl" class="h-10 !w-10 border-none">
        <i class="ri-link text-xl"></i>
      </MainButton>
      <label class="text-white sm:ml-4">{{ $t('Home.filters') }}:</label>
      <select v-model="selectedCategory" class="select-category">
        <option value="all">{{ $t('Home.categories') }}</option>
        <option v-for="category in categories" :value="category.key">{{ category.name }}</option>
      </select>

      <MainButton @click="handleReset" class="sm:w-auto">{{ $t('Home.resetFilter') }}</MainButton>
    </div>

    <select v-model="selectedLocale" class="select-language">
      <option v-for="locale in locales" :value="locale.code" :key="locale.code">{{ locale.name }}</option>
    </select>
  </div>
</template>

<style scoped>
.select-category {
  @apply h-10 w-auto cursor-pointer rounded px-2 focus:outline-none sm:w-44 lg:!mt-0;
}
.select-language {
  @apply h-10 w-full cursor-pointer rounded px-2 focus:outline-none sm:w-44 lg:!mt-0;
}
</style>
