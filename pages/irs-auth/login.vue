<template>
  <div class="flex h-screen flex-col items-center justify-center space-y-10">
    <div class="text-center">
      <p>User: {{ user }}</p>
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
const { data: user, execute } = await useFetch('/api/auth/irs', {
  method: 'POST',
  body: {
    account_id: publicEnv.irsAccount,
    password: publicEnv.irsPassword,
  },
  immediate: false,
})
</script>
