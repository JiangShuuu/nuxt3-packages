<template>
  <div class="flex h-screen items-center justify-center">
    <UButton label="Open" @click="isOpen = true" />

    <UModal v-model="isOpen">
      <!-- Content -->
      <div>123321</div>
      <p>123213</p>
    </UModal>
  </div>
</template>
<script setup lang="ts">
const isOpen = ref(false)
</script>
