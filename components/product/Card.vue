<script setup>
const props = defineProps(['product', 'viewAll', 'activeIndex']);
const cart = useCart();
const emit = defineEmits(['update:activeIndex']);

const isSliding = ref(false);
const direction = ref('');

const nextVariant = () => {
  if (isSliding.value) return;
  direction.value = 'left';
  isSliding.value = true;
  emit('update:activeIndex', (props.activeIndex + 1) % props.product.colors.length);
  setTimeout(() => (isSliding.value = false), 300);
  console.log(cart.products);
};

const prevVariant = () => {
  if (isSliding.value) return;
  direction.value = 'right';
  isSliding.value = true;
  emit('update:activeIndex', (props.activeIndex - 1 + props.product.colors.length) % props.product.colors.length);
  setTimeout(() => (isSliding.value = false), 300);
};

const setVariant = (index) => {
  if (isSliding.value || index === props.activeIndex) return;
  direction.value = index > props.activeIndex ? 'left' : 'right';
  isSliding.value = true;
  emit('update:activeIndex', index);
  setTimeout(() => (isSliding.value = false), 300);
};

const variant = computed(() => props.product.colors[props.activeIndex]);
</script>

<template>
  <div class="mb-2 flex flex-col rounded border border-neutral-200 shadow-lg">
    <div class="relative h-full overflow-hidden rounded-t bg-white p-2">
      <div v-if="product.isNew" class="absolute left-2 top-2 z-10">
        <p class="rounded bg-yellow-500 px-2 py-1 text-sm">New</p>
      </div>
      <div v-if="variant.isSale" class="absolute left-2 top-2 z-10">
        <p class="rounded bg-yellow-500 px-2 py-1 text-sm">
          Sale
          <i class="ri-price-tag-3-line"></i>
        </p>
      </div>
      <button v-if="product.colors.length > 1" @click="prevVariant" class="absolute left-1 top-1/2 z-10 -translate-y-1/2"><i class="ri-arrow-left-circle-line rounded-full bg-white text-4xl transition-colors hover:text-yellow-500"></i></button>
      <div
        class="flex h-auto min-h-full w-full items-center justify-center p-4 transition-transform duration-300 ease-in-out"
        :class="{
          'slide-left': isSliding && direction === 'left',
          'slide-right': isSliding && direction === 'right',
        }"
      >
        <NuxtImg :src="`/thumbnails/${variant.display}`" :alt="product.productCode" class="w-40" />
      </div>
      <button v-if="product.colors.length > 1" @click="nextVariant" class="absolute right-1 top-1/2 z-10 -translate-y-1/2"><i class="ri-arrow-right-circle-line rounded-full bg-white text-4xl transition-colors hover:text-yellow-500"></i></button>

      <div class="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        <button
          v-for="(color, index) in product.colors"
          :key="`${index}-${color.displayColor}`"
          @click="() => setVariant(index)"
          :class="['h-3 w-3 rounded-full transition-all duration-200 ease-in-out', (color.displayColor === 'WHITE' || color.displayColor === 'WHITE PEARL') && 'border border-neutral-600']"
          :style="{
            backgroundColor: color.hex || '#ccc',
            transform: activeIndex === index ? 'scale(1.2)' : 'scale(1)',
            boxShadow: activeIndex === index ? '0 0 0 1px #000' : '',
          }"
        />
      </div>
    </div>

    <div class="space-y-1 p-2">
      <h3 :class="['truncate font-bold 3xl:w-80', !viewAll && 'w-72']">{{ product.summary }}</h3>
      <div :class="['flex gap-2 font-semibold uppercase 3xl:w-80', !viewAll && 'w-72']">
        <span>{{ product.productCode }}</span>
        <span class="truncate" v-html="product.name"></span>
      </div>
      <p class="text-sm">{{ $t('Home.aslowas') }}: ${{ variant.price.toFixed(2) }}</p>
      <p class="text-sm">{{ $t('Home.moq') }}: {{ variant.MOQ }}</p>
      <p class="text-sm">{{ $t('Home.stock') }}: {{ variant.qty.toLocaleString() }} {{ variant.displayColor }}</p>
      <MainButton @click="cart.add(product)" class="w-full hover:scale-100">{{ $t('Home.add') }}</MainButton>
    </div>
  </div>
</template>

<style scoped>
.slide-left {
  animation: slideLeft 0.3s forwards;
}
.slide-right {
  animation: slideRight 0.3s forwards;
}
@keyframes slideLeft {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}
@keyframes slideRight {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}
</style>
