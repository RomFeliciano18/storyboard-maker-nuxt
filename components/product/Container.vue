<script setup>
import CarouselContainer from '@/components/CarouselContainer.vue';

const props = defineProps(['products', 'category']);
const activeVariants = ref({});
const viewAll = ref(false);
const layoutComponent = computed(() => (viewAll.value ? 'div' : CarouselContainer));

watchEffect(() => {
  if (props.products?.length) {
    props.products.forEach((product) => {
      if (!(product.productCode in activeVariants.value)) {
        activeVariants.value[product.productCode] = 0;
      }
    });
  }
});

const updateVariant = (code, index) => {
  activeVariants.value[code] = index;
};
</script>

<template>
  <div class="py-4">
    <div class="flex flex-wrap items-center justify-between py-4">
      <div class="flex items-center gap-4">
        <h1 class="montserrat-bold text-4xl text-yellow-500 sm:text-6xl">{{ category }}</h1>
        <span class="text-lg font-semibold">({{ products?.length }} results)</span>
      </div>
      <MainButton v-if="products?.length > 20" @click="viewAll = !viewAll" class="w-28">
        {{ viewAll ? 'Show Less' : 'Show More' }}
      </MainButton>
    </div>

    <component :is="layoutComponent" :class="viewAll ? 'grid grid-cols-4 gap-4' : ''">
      <ProductCard v-for="product in products" :key="product.productCode" :product="product" :viewAll="viewAll" :activeIndex="activeVariants[product.productCode]" @update:activeIndex="(index) => updateVariant(product.productCode, index)" />
    </component>
  </div>
</template>
