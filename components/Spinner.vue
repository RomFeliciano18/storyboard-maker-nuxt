<script setup></script>

<template>
  <div>
    <div class="flex w-full flex-col items-center justify-center gap-4">
      <div class="flex h-20 w-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-yellow-500 text-4xl text-yellow-500">
        <div class="flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-yellow-600 text-2xl text-yellow-600"></div>
      </div>
    </div>
    <h1 class="text-3xl font-bold text-yellow-500">{{ $t('Home.loading') }}</h1>
  </div>
</template>

<style scoped></style>
