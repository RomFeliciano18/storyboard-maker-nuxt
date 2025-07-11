<script setup>
import { useDropZone } from '@vueuse/core';

const { locale } = useI18n();

const inputRef = ref(null);
const dropZoneRef = ref(null);

const isProcessing = ref(false);
const processLogo = reactive({
  open: false,
  original: '',
  preview: '',
});

const originalFile = ref(null);

onMounted(() => {
  const storedLogo = JSON.parse(localStorage.getItem('processed-logo'));
  if (storedLogo) {
    processLogo.original = storedLogo.upload;
    processLogo.preview = storedLogo.upload;
    processLogo.shape = storedLogo.shape;
  }
});

const handleFileUpload = async (files) => {
  const file = files?.[0];
  if (!file) return;

  originalFile.value = file;

  const fileType = file.type;

  if (fileType.startsWith('image/') || fileType === 'image/svg+xml') {
    console.log('Calling processLogoApi with image file:', file);
    isProcessing.value = true;
    try {
      const { data, shape } = await useProcessLogo(file);
      // Original Should be another base64
      processLogo.original = data.upload;
      processLogo.preview = data.upload;
      processLogo.shape = shape;

      localStorage.setItem('processed-logo', JSON.stringify({ upload: data.upload, shape }));
    } catch (error) {
      console.log(error);
    } finally {
      isProcessing.value = false;
    }
  } else if (fileType === 'application/pdf') {
    console.log('PDF file detected, showing modal:', file);
  } else {
    console.warn('Unsupported file type:', fileType);
  }
};

const onFileInputChange = (e) => {
  handleFileUpload(e.target.files);
};

const { isOverDropZone } = useDropZone(dropZoneRef, {
  dataTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'application/pdf', 'application/postscript'],
  multiple: false,
  preventDefault: true,
  onDrop: (files) => {
    const droppedFiles = Array.from(files);
    handleFileUpload(droppedFiles);
  },
});

useHead({
  title: 'Upload Logo | StoryBoard',
});
</script>

<template>
  <div class="flex w-full flex-col items-center sm:min-h-[70vh] sm:justify-center">
    <div class="relative flex w-full flex-col items-center gap-4 p-4 sm:max-w-3xl">
      <div @click="() => inputRef.click()" ref="dropZoneRef" class="flex h-80 min-w-96 cursor-pointer flex-col items-center justify-center rounded-lg border p-4 sm:w-[35vw]" :class="[isOverDropZone ? 'border-yellow-500' : 'border-neutral-500']">
        <template v-if="!processLogo.original && !isProcessing">
          <!-- <template v-if="false"> -->
          <i class="ri-image-ai-line text-4xl"></i>
          <p v-if="isOverDropZone" class="w-96 text-center">{{ $t('Home.dropFiles') }}...</p>
          <p v-else class="w-96 text-center" v-html="$t('Home.dragAndDrop')"></p>
        </template>

        <div v-if="isProcessing" class="loader"></div>

        <!-- Preview -->
        <template v-if="processLogo.original && !isProcessing">
          <!-- <template v-if="true"> -->
          <div class="flex h-full w-full items-center justify-evenly gap-2">
            <div class="flex flex-col gap-1">
              <p class="mb-2 font-bold">{{ $t('Home.originalImage') }}:</p>
              <div class="preview-image-background flex min-h-24 items-center justify-center 2xl:max-h-96">
                <img :src="processLogo.original" alt="Preview" class="max-h-40 rounded 2xl:max-w-72" />
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <p class="mb-2 font-bold">{{ $t('Home.1-color') }}:</p>
              <div class="preview-image-background flex min-h-24 items-center justify-center 2xl:max-h-96">
                <img :src="processLogo.original" alt="Preview" class="max-h-40 rounded brightness-0 2xl:max-w-72" />
              </div>
            </div>
          </div>
          <p>{{ $t('Home.logoShape') }}: {{ capitalize(processLogo.shape) }}</p>
        </template>
      </div>

      <input type="file" ref="inputRef" accept="image/jpeg, image/png, image/svg+xml, application/pdf, application/postscript" class="hidden" @change="onFileInputChange" />

      <div class="absolute -bottom-40 flex flex-row items-center justify-center gap-4 pb-6 sm:-right-44 sm:bottom-auto sm:h-full sm:flex-col sm:pb-0">
        <MainButton class="w-40 sm:h-20 sm:w-52">{{ $t('Home.next') }}</MainButton>
        <MainButton variant="secondary" @click="$router.push(`/${locale}`)" class="w-40 sm:h-20 sm:w-52">{{ $t('Home.back') }}</MainButton>
      </div>
    </div>

    <p class="max-w-3xl px-4 text-center text-sm sm:px-0 sm:text-base">{{ $t('uploadNote') }}</p>
  </div>
</template>

<style scoped>
.preview-image-background {
  background-image: url(/assets/images/bg-transparent.jpg);
}
.loader {
  width: 64px;
  height: 64px;
  position: relative;
  background: #000;
  border-radius: 4px;
  overflow: hidden;
}
.loader:before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 40px;
  transform: rotate(45deg) translate(30%, 40%);
  background: #fbd018;
  box-shadow: 32px -34px 0 5px #fbd018;
  animation: slide 2s infinite ease-in-out alternate;
}
.loader:after {
  content: '';
  position: absolute;
  left: 10px;
  top: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fbd018;
  transform: rotate(0deg);
  transform-origin: 35px 145px;
  animation: rotate 2s infinite ease-in-out;
}
@keyframes slide {
  0%,
  100% {
    bottom: -35px;
  }
  25%,
  75% {
    bottom: -2px;
  }
  20%,
  80% {
    bottom: 2px;
  }
}
@keyframes rotate {
  0% {
    transform: rotate(-15deg);
  }
  25%,
  75% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(25deg);
  }
}
</style>
