<script setup>
const { locale } = useI18n();
</script>

<template>
  <header class="relative flex items-center justify-center lg:justify-start">
    <NuxtImg src="/logo.png" alt="logo" class="w-96 px-10 py-4 lg:py-0" />
    <nav class="hidden w-full grid-cols-3 bg-black px-10 text-neutral-400 lg:grid">
      <div>
        <NuxtLink :to="`/${locale}`" class="flex w-48 items-center text-primary">
          <span class="montserrat-bold text-[8rem]">1</span>
          <span class="w-36 text-2xl uppercase">
            {{ $t('Home.selectProductsProg') }}
          </span>
        </NuxtLink>
      </div>
      <div>
        <NuxtLink :to="`/${locale}/upload-logo`" class="flex w-48 items-center">
          <span class="montserrat-bold text-[8rem]">2</span>
          <span class="w-36 text-2xl uppercase">
            {{ $t('Home.uploadImageProg') }}
          </span>
        </NuxtLink>
      </div>
      <div class="flex w-48 items-center">
        <span class="montserrat-bold text-[8rem]">3</span>
        <span class="w-36 text-2xl uppercase">
          {{ $t('Home.selectLayoutProg') }}
        </span>
      </div>
    </nav>
    <i class="ri-question-line absolute right-4 top-4 hidden cursor-pointer text-3xl text-yellow-500 lg:block"></i>
  </header>
</template>

<style scoped></style>
