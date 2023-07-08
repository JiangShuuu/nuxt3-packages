<template>
  <p>APP CONTENT</p>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
definePageMeta({
  middleware: ['auth'],
})
console.log(userStore.$state.user)
</script>
