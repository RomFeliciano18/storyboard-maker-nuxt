<script setup></script>

<template>
  <header class="relative flex items-center">
    <NuxtImg src="/logo.png" alt="logo" class="w-96 px-10" />
    <nav class="grid w-full grid-cols-3 bg-black px-10 text-neutral-400">
      <div class="text-primary flex items-center">
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
    <i class="ri-question-line text-primary absolute right-4 top-4 cursor-pointer text-3xl"></i>
  </header>
</template>

<style scoped></style>
