<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <div
      class="flex h-20 w-[300px] items-center justify-center space-x-4 border"
    >
      <img :src="user.avatar" class="h-12 w-12 rounded-full" />
      <div class="space-y-2">
        <p class="w-full">
          {{ user.name }}
        </p>
        <p class="w-full">
          {{ user.email }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
definePageMeta({
  middleware: ['auth'],
})
const user = userStore.$state.user

console.log('PageUser', user)
</script>
