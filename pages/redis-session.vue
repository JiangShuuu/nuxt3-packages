<template>
  <div class="flex h-screen flex-col items-center justify-center space-y-5">
    <div class="space-y-2">
      <div>Redis Info: {{ resDataSuccess }}</div>
      <button
        class="w-20 rounded border bg-sky-600 py-1 text-center text-white"
        @click="PostRedis()"
      >
        Redis
      </button>
    </div>
    <div class="space-y-2">
      <div>Session Info: {{ clearSession }}</div>
      <button
        class="w-20 rounded border bg-sky-600 py-1 text-white"
        @click="PostClearSession()"
      >
        Session
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useUserStore } from '~/stores/user'
// const userStore = useUserStore()

const { data: resDataSuccess, execute: PostRedis } = await useFetch(
  '/api/doc/redis',
  {
    method: 'post',
    body: { text: 'Nuxt is Awesome!' },
    immediate: false,
  }
)

const { data: clearSession, execute: PostClearSession } = await useFetch(
  '/api/doc/redis-clear',
  {
    method: 'post',
    immediate: false,
  }
)
</script>
