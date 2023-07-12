<template>
  <div
    class="flex h-screen w-full flex-col items-center justify-center space-y-5"
  >
    <div class="w-full space-y-2 text-center">
      <div>Session Info: {{ postSession }}</div>
      <button
        class="rounded border bg-sky-600 px-1.5 py-1 text-center text-white"
        @click="PostSession()"
      >
        加入Redis跟Session
      </button>
    </div>
    <div class="w-full space-y-2 text-center">
      <div>Session Info: {{ delSession }}</div>
      <button
        class="rounded border bg-sky-600 px-1.5 py-1 text-white"
        @click="DelSession()"
      >
        清除Session
      </button>
    </div>
    <div class="w-full space-y-2 text-center">
      <div>Session Info: {{ getSession }}</div>
      <button
        class="rounded border bg-sky-600 px-1.5 py-1 text-white"
        @click="GetSession()"
      >
        獲取SessionInfo
      </button>
    </div>
    <div class="w-full space-y-2 text-center">
      <div>Session Info: {{ updateSession }}</div>
      <button
        class="rounded border bg-sky-600 px-1.5 py-1 text-white"
        @click="UpdateSession()"
      >
        更新SessionInfo
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useUserStore } from '~/stores/user'
// const userStore = useUserStore()

const { data: postSession, execute: PostSession } = await useFetch(
  '/api/session/redis-session',
  {
    method: 'post',
    body: { text: 'Nuxt is Awesome!' },
    immediate: false,
  }
)

const { data: delSession, execute: DelSession } = await useFetch(
  '/api/session/redis-session',
  {
    method: 'delete',
    immediate: false,
  }
)

const { data: getSession, execute: GetSession } = await useFetch(
  '/api/session/redis-session',
  {
    method: 'get',
    immediate: false,
  }
)

const { data: updateSession, execute: UpdateSession } = await useFetch(
  '/api/session/redis-session',
  {
    method: 'put',
    body: {
      id: 1000,
      name: 'updateUser',
      phone: '88888888',
      address: 'updateupdateupdateupdate',
    },
    immediate: false,
  }
)
</script>
