<template>
  <div class="flex h-screen items-center justify-center">
    <div v-if="error"></div>
    <div v-if="pending" class="flex items-center space-x-4">
      <USkeleton class="h-12 w-12 rounded-full" />
      <div class="space-y-2">
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[200px]" />
      </div>
    </div>
    <div class="space-y-4">
      <p>APPUser: {{ userStore.$state.user }}</p>
      <button
        class="w-20 rounded border bg-sky-600 py-1 text-white"
        @click="LoginAction"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()

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

const LoginAction = async () => {
  await execute()
  // addStore
  userStore.addUserInfo(data.value?.data.user)
}
</script>
