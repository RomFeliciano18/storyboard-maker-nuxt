<script setup>
const { locale } = useI18n();
const route = useRoute();
const router = useRouter();
const cart = useCart();
const tutorialOpen = ref(false);

const tutorialLink = computed(() => {
  const isFrench = locale.value === 'fr';

  if (route.path === `/${locale.value}`) {
    return isFrench ? 'https://www.youtube.com/embed/_Za4KAerTPQ?si=cv_M8Zf6u8IzGZ7F' : 'https://www.youtube.com/embed/NE2v29gkpcM?si=AjtBVUfuN4YOUHpI';
  }

  if (route.path === `/${locale.value}/upload-logo`) {
    return isFrench ? 'https://www.youtube.com/embed/_Za4KAerTPQ?si=gRX21dHV3YBZjQef&amp;start=47' : 'https://www.youtube.com/embed/NE2v29gkpcM?si=zx71m3sAw0Kg-RJf&amp;start=44';
  }

  if (route.path === `/${locale.value}/render-page`) {
    return isFrench ? 'https://www.youtube.com/embed/_Za4KAerTPQ?si=dPr5QU_tbEK3jRZP&amp;start=116' : 'https://www.youtube.com/embed/NE2v29gkpcM?si=TM6fMTMgyObVemu4&amp;start=102';
  }

  return null;
});

const handleGoToUpload = () => {
  if (cart.products.length === 0) {
    return;
  }
  router.push(`${locale.value}/upload-logo`);
};
</script>

<template>
  <header class="relative flex items-center justify-center lg:justify-start">
    <NuxtLink :to="`/${locale}`">
      <NuxtImg src="/logo.png" alt="logo" class="w-96 px-10 py-4 lg:py-0" />
    </NuxtLink>
    <nav class="hidden w-full grid-cols-3 bg-black px-10 text-neutral-400 lg:grid">
      <div>
        <NuxtLink :to="`/${locale}`" :class="['flex w-48 cursor-pointer items-center transition-colors hover:text-primary', route.path === `/${locale}` ? 'active-link' : '']">
          <span class="montserrat-bold text-[8rem]">1</span>
          <span class="w-36 text-2xl uppercase">
            {{ $t('Home.selectProductsProg') }}
          </span>
        </NuxtLink>
      </div>
      <div>
        <div @click="handleGoToUpload" :class="['flex w-48 cursor-pointer items-center transition-colors hover:text-primary', route.path === `/${locale}/upload-logo` ? 'active-link' : '']">
          <span class="montserrat-bold text-[8rem]">2</span>
          <span class="w-36 text-2xl uppercase">
            {{ $t('Home.uploadImageProg') }}
          </span>
        </div>
      </div>
      <div :class="['flex w-48 cursor-pointer items-center transition-colors hover:text-primary', route.path === `/${locale}/render-page` ? 'active-link' : '']">
        <span class="montserrat-bold text-[8rem]">3</span>
        <span class="w-36 text-2xl uppercase">
          {{ $t('Home.selectLayoutProg') }}
        </span>
      </div>
    </nav>
    <i @click="tutorialOpen = true" class="ri-question-line absolute right-4 top-4 hidden cursor-pointer text-3xl text-yellow-500 lg:block"></i>
  </header>
  <Modal :isOpenModal="tutorialOpen" @close="tutorialOpen = false" modalSize="max-w-5xl">
    <div class="flex w-full flex-col gap-4 p-2 pt-0">
      <h2 class="text-center text-4xl font-bold text-yellow-500">{{ $t('Home.tutorial') }}</h2>
      <iframe class="h-[30vw] w-full" :src="tutorialLink" title="Dec'd Out Storyboard Tutorial" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </div>
  </Modal>
</template>

<style scoped>
.active-link {
  @apply text-primary;
}
</style>
