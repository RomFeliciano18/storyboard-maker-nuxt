<script setup>
const scrollContainer = ref(null);
const showLeft = ref(false);
const showRight = ref(false);

const updateScrollButtons = () => {
  const el = scrollContainer.value;
  if (!el) return;
  showLeft.value = el.scrollLeft > 0;
  showRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth;
};

const scrollLeft = () => {
  scrollContainer.value?.scrollBy({ left: -400, behavior: 'smooth' });
};

const scrollRight = () => {
  scrollContainer.value?.scrollBy({ left: 400, behavior: 'smooth' });
};

onMounted(() => {
  updateScrollButtons();
  scrollContainer.value?.addEventListener('scroll', updateScrollButtons);
});
</script>

<template>
  <div class="relative w-full">
    <div ref="scrollContainer" class="flex max-w-full gap-4 overflow-x-scroll scroll-smooth">
      <slot />
    </div>

    <button v-if="showLeft" @click="scrollLeft" class="absolute left-0 top-1/2 z-10 h-full w-12 -translate-y-1/2 rounded-e-lg bg-neutral-500 bg-opacity-70 p-2 shadow transition-all hover:bg-opacity-90">
      <i class="ri-arrow-left-s-line text-3xl text-white"></i>
    </button>

    <button v-if="showRight" @click="scrollRight" class="absolute right-0 top-1/2 z-10 h-full w-12 -translate-y-1/2 rounded-s-lg bg-neutral-500 bg-opacity-70 p-2 shadow transition-all hover:bg-opacity-90">
      <i class="ri-arrow-right-s-line text-3xl text-white"></i>
    </button>
  </div>
</template>

<style scoped></style>
