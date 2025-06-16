<script setup>
const { locales, setLocale } = useI18n();
const route = useRoute();
</script>

<template>
  <div class="flex items-center gap-2">
    <button v-for="locale in locales" @click="setLocale(locale.code)" class="rounded bg-yellow-500 px-4 py-2 text-black">
      {{ locale.name }}
    </button>
  </div>
  <h1>{{ $t('Home.tutorial') }}</h1>
  <p>{{ $t('Home.dragAndDrop') }}</p>
  <!-- <p v-html="$t('Home.dragAndDrop')"></p> -->

  <p>{{ route.path }}</p>
</template>

<style scoped></style>
