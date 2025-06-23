<script setup>
defineProps(['product']);
</script>

<template>
  <div class="mb-2 flex flex-col rounded shadow-lg">
    <div class="rounded-t bg-red-500 p-2 lg:max-h-[230px] lg:min-h-[230px] lg:min-w-[290px] lg:max-w-[290px]">
      <NuxtImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw" alt="" class="h-full w-full object-contain py-5" />
    </div>
    <div class="p-2">
      <h3>{{ product.productCode }}</h3>
      <div>
        <span>BG210</span>
        <span>Call of the Wild</span>
      </div>
      <p>As Low As: 99.99</p>
      <p>MOQ: 25</p>
      <p>Stock: 1772 Black</p>
    </div>
  </div>
</template>

<style scoped></style>
