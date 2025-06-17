<script setup></script>

<template>
  <header class="relative flex items-center justify-center lg:justify-start">
    <NuxtImg src="/logo.png" alt="logo" class="w-96 px-10 py-4 lg:py-0" />
    <nav class="hidden w-full grid-cols-3 bg-black px-10 text-neutral-400 lg:grid">
      <div class="flex items-center text-primary">
        <span class="montserrat-bold text-[8rem]">1</span>
        <span class="w-36 text-2xl uppercase">
          {{ $t('Home.selectProductsProg') }}
        </span>
      </div>
      <div class="flex items-center">
        <span class="montserrat-bold text-[8rem]">2</span>
        <span class="w-36 text-2xl uppercase">
          {{ $t('Home.uploadImageProg') }}
        </span>
      </div>
      <div class="flex items-center">
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
