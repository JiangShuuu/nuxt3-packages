<template>
  <div class="flex h-screen items-center justify-center">
    <UButton label="Open" @click="isOpen = true" />

    <UModal v-model="isOpen">
      <!-- Content -->
      <div>123321</div>
      <p>123213</p>
    </UModal>

    <button @click="submit">Click</button>
  </div>
</template>
<script setup lang="ts">
const isOpen = ref(false)

const submit = async () => {
  await useFetch('/api/auth/limit', {
    method: 'POST',
    body: {
      name: '1234',
      email: '321',
    },
    onResponse({ response }) {
      console.log('res', response._data)
    },
  })
}
</script>
