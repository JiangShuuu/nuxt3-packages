<template>
  <div class="flex h-screen items-center justify-center">
    <div v-if="pending">isLoading...</div>
    <div v-if="error"></div>
    <div class="space-y-4">
      <p>IRSUser: {{ data }}</p>
      <button
        class="w-20 rounded border bg-sky-600 py-1 text-white"
        @click="execute()"
      >
        Get
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const publicEnv = config.public

// immediate true SSR 才會成功
const { data, pending, error, execute } = await useFetch('/api/auth/clothes', {
  method: 'POST',
  body: {
    email: publicEnv.appAccount,
    password: publicEnv.appPassowrd,
  },
  immediate: false,
})
</script>
