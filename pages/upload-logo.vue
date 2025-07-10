<script setup>
import { useDropZone } from '@vueuse/core';

const inputRef = ref(null);
const dropZoneRef = ref(null);

const { isOverDropZone } = useDropZone(dropZoneRef, {
  dataTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'application/pdf', 'application/postscript'], // supports svg, png, ai, eps, pdf
  multiple: false,
  preventDefault: true,
  onDrop: (files) => {
    const droppedFiles = Array.from(files);
    console.log('Files dropped:', droppedFiles);
  },
});

useHead({
  title: 'Upload Logo | StoryBoard',
});
</script>

<template>
  <div class="flex min-h-[70vh] w-full items-center justify-center">
    <div class="flex w-full max-w-3xl flex-col items-center gap-4 p-4">
      <div @click="() => inputRef.click()" ref="dropZoneRef" class="flex h-80 w-[35vw] cursor-pointer flex-col items-center justify-center rounded-lg border border-neutral-400 p-4" :class="{ 'border-blue-500': isOverDropZone }">
        <i class="ri-image-ai-line text-4xl"></i>
        <p class="w-96 text-center">{{ $t('Home.dragAndDrop') }}</p>
      </div>
      <input type="file" ref="inputRef" accept="image/jpeg, image/png, image/svg+xml, application/pdf, application/postscript" class="hidden" />
      <p class="text-center">{{ $t('uploadNote') }}</p>
    </div>
  </div>
</template>

<style scoped></style>
