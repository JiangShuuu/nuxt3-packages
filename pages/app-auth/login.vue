<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <div v-if="error"></div>
    <div class="flex flex-col items-center justify-center space-y-4">
      <button
        class="w-20 rounded border bg-sky-600 py-1 text-white"
        @click="LoginAction"
      >
        Login
      </button>
    </div>
    <div>Post state: {{ resDataSuccess }}</div>
    <button
      class="w-20 rounded border bg-sky-600 py-1 text-white"
      @click="PostRedis()"
    >
      Redis
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()

const config = useRuntimeConfig()
const publicEnv = config.public

// immediate true SSR 才會成功
const { data, error, execute } = await useFetch('/api/auth/clothes', {
  method: 'POST',
  body: {
    email: publicEnv.appAccount,
    password: publicEnv.appPassowrd,
  },
  immediate: false,
})

const LoginAction = async () => {
  await execute()
  // addStore
  if (data.value) {
    userStore.addUserInfo(data.value.data)
    navigateTo('/app-auth')
  }
}

const { data: resDataSuccess, execute: PostRedis } = await useFetch(
  '/api/doc/redis',
  {
    method: 'post',
    body: { text: 'Nuxt is Awesome!' },
    immediate: false,
  }
)
</script>
