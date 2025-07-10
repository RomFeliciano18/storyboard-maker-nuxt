<script setup>
const props = defineProps({
  isOpenModal: Boolean,
  modalSize: {
    type: String,
    default: 'max-w-sm',
  },
  title: String,
});

const emit = defineEmits(['close']);

const handleClickClose = (event) => {
  if (event.target === event.currentTarget && props.isOpenModal) {
    emit('close');
  }
};

const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.isOpenModal) {
    emit('close');
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <transition name="modal">
    <div v-if="props.isOpenModal" class="modal-overlay z-50" @click="handleClickClose">
      <div :class="`modal w-full ${props.modalSize}`">
        <button class="absolute right-2 top-0 text-4xl text-black transition-colors hover:text-red-500" @click="handleClickClose">&times;</button>

        <template v-if="false">
          <h1 class="w-full py-5 text-center text-lg">{{ title }}</h1>
          <div class="flex items-center justify-center gap-2 text-sm">
            <MainButton>Confirm</MainButton>
            <MainButton variant="danger" @click="handleClickClose">Close</MainButton>
          </div>
        </template>

        <slot v-else />
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  max-height: 95vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(255, 255, 255);
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  @apply rounded-lg;
}

.modal-enter-from {
  opacity: 0;
}

.modal-enter-to {
  opacity: 1;
}

.modal-enter-active {
  transition: opacity 0.2s ease-out;
}

.modal-leave-from {
  opacity: 1;
}

.modal-leave-to {
  opacity: 0;
}

.modal-leave-active {
  transition: opacity 0.2s ease-out;
}
</style>
