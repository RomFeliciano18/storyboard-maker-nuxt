<script setup>
const { locales, setLocale } = useI18n();
const route = useRoute();
</script>

<template>
  <div class="sticky top-0">
    <Cart />
    <AppFilter />
  </div>
</template>

<style scoped></style>
