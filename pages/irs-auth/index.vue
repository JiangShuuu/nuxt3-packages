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
    <div class="text-center">
      <p>TEST: {{ Test }}</p>
      <button
        class="w-20 rounded border bg-sky-600 py-1 text-white"
        @click="GETTEST()"
      >
        Test
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const publicEnv = config.public
const user = ref()
const { data, execute } = await useFetch('/api/auth', {
  method: 'POST',
  body: {
    account_id: publicEnv.account,
    password: publicEnv.password,
  },
  immediate: false,
})

const { data: Test, execute: GETTEST } = await useFetch('/api/redirect', {
  method: 'GET',
  immediate: false,
})

user.value = data
</script>
