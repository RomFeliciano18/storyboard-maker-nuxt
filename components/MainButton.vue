<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value),
  },
});

const buttonClass = computed(() => {
  return {
    'btn-primary': props.variant === 'primary',
    'btn-secondary': props.variant === 'secondary',
    'btn-danger': props.variant === 'danger',
  };
});
</script>

<template>
  <button class="flex w-24 items-center justify-center gap-1 rounded border border-black p-2 transition-all hover:scale-105" :class="buttonClass">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn-primary {
  @apply bg-yellow-500 hover:bg-yellow-600;
}
.btn-secondary {
  @apply bg-neutral-500 hover:bg-neutral-600;
}
.btn-danger {
  @apply bg-red-500 hover:bg-red-600;
}
</style>
