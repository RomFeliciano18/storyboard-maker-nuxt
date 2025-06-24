<script setup>
const props = defineProps(['product']);
const activeIndex = ref(0);
const isSliding = ref(false);
const direction = ref('');

const nextVariant = () => {
  if (isSliding.value) return;
  direction.value = 'left';
  isSliding.value = true;
  activeIndex.value = (activeIndex.value + 1) % props.product.colors.length;
  setTimeout(() => (isSliding.value = false), 300);
};

const prevVariant = () => {
  if (isSliding.value) return;
  direction.value = 'right';
  isSliding.value = true;
  activeIndex.value = (activeIndex.value - 1 + props.product.colors.length) % props.product.colors.length;
  setTimeout(() => (isSliding.value = false), 300);
};

const setVariant = (index) => {
  if (isSliding.value || index === activeIndex.value) return;
  direction.value = index > activeIndex.value ? 'left' : 'right';
  isSliding.value = true;
  activeIndex.value = index;
  setTimeout(() => (isSliding.value = false), 300);
};

const variant = computed(() => props.product.colors[activeIndex.value]);

let startX = 0;
const onTouchStart = (e) => {
  startX = e.touches[0].clientX;
};
const onTouchEnd = (e) => {
  const deltaX = e.changedTouches[0].clientX - startX;
  if (Math.abs(deltaX) > 50) {
    if (deltaX < 0) nextVariant();
    else prevVariant();
  }
};
</script>

<template>
  <div class="mb-2 flex flex-col rounded border border-neutral-200 shadow-lg">
    <div class="relative h-full overflow-hidden rounded-t bg-white p-2" @touchstart="onTouchStart" @touchend="onTouchEnd">
      <button @click="prevVariant" class="absolute left-1 top-1/2 z-10 -translate-y-1/2"><i class="ri-arrow-left-circle-line rounded-full bg-white text-4xl transition-colors hover:text-yellow-500"></i></button>
      <div
        class="flex h-auto min-h-full w-full items-center justify-center p-4 transition-transform duration-300 ease-in-out"
        :class="{
          'slide-left': isSliding && direction === 'left',
          'slide-right': isSliding && direction === 'right',
        }"
      >
        <NuxtImg v-if="variant.qty" :src="`/thumbnails/${variant.display}`" alt="" class="w-40" />
        <NuxtImg v-else src="https://media.istockphoto.com/id/1305876461/vector/sorry-temporarily-out-of-stock-sign.jpg?s=612x612&w=0&k=20&c=gXtMjuh6kHPRQaOnPTroS6M7oCpC35VAfYVFQMMQmds=" alt="" class="h-full w-full object-contain" />
      </div>
      <button @click="nextVariant" class="absolute right-1 top-1/2 z-10 -translate-y-1/2"><i class="ri-arrow-right-circle-line rounded-full bg-white text-4xl transition-colors hover:text-yellow-500"></i></button>

      <div class="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        <button
          v-for="(color, index) in product.colors"
          :key="`${index}-${color.displayColor}`"
          @click="() => setVariant(index)"
          :class="['h-3 w-3 rounded-full transition-all duration-200 ease-in-out', color.displayColor === 'WHITE' && 'border border-neutral-600']"
          :style="{
            backgroundColor: color.hex || '#ccc',
            transform: activeIndex === index ? 'scale(1.2)' : 'scale(1)',
            boxShadow: activeIndex === index ? '0 0 0 1px #000' : '',
          }"
        />
      </div>
    </div>

    <div class="space-y-1 p-2">
      <h3 class="w-72 truncate text-[.85vw] font-bold 3xl:w-80">{{ product.summary }}</h3>
      <div class="flex w-72 gap-2 text-[.82vw] font-semibold uppercase 3xl:w-80">
        <span>{{ product.productCode }}</span>
        <span class="truncate">{{ product.name }}</span>
      </div>
      <p class="text-[.8vw]">As Low As: ${{ variant.price.toFixed(2) }}</p>
      <p class="text-[.8vw]">MOQ: {{ variant.MOQ }}</p>
      <p class="text-[.8vw]">Stock: {{ variant.qty.toLocaleString() }} {{ variant.displayColor }}</p>
      <MainButton class="w-full hover:scale-100">{{ $t('Home.add') }}</MainButton>
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
