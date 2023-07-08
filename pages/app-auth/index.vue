<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <div class="flex items-center space-x-4">
      <img :src="user.avatar" class="h-12 w-12 rounded-full" />
      <div class="space-y-2">
        <p class="h-4 w-[100px]">
          {{ user.name }}
        </p>
        <p class="h-4 w-[250px]">
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
console.log(userStore.$state.user)
</script>
