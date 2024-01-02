<template>
  <div
    class="flex h-screen w-full flex-col items-center justify-center space-y-5"
  >
    <div>
      <p>SessionID: {{ userInfo.data.id }}</p>
      <p>Name: {{ userInfo.data.name }}</p>
    </div>
    <div class="space-x-2">
      <button
        class="rounded border bg-sky-600 px-1.5 py-1 text-center text-white"
        @click="PostSession()"
      >
        加入Redis跟Session
      </button>
      <button
        class="rounded border bg-sky-600 px-1.5 py-1 text-white"
        @click="DelSession()"
      >
        清除Session
      </button>
      <button
        class="rounded border bg-sky-600 px-1.5 py-1 text-white"
        @click="GetSession()"
      >
        獲取SessionInfo
      </button>
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
// type UserInfoType = {
//   data: {
//     id: string
//     name: string
//   }
//   success: boolean
// }

const userInfo = ref({
  data: {
    id: '',
    name: '',
  },
  success: false,
})

const { execute: PostSession } = await useFetch('/api/session/redis-session', {
  method: 'post',
  immediate: false,
  onResponse({ response }) {
    // Process the response data
    if (response._data.success) {
      userInfo.value = response._data
    }
  },
})

const { execute: DelSession } = await useFetch('/api/session/redis-session', {
  method: 'delete',
  immediate: false,
  onResponse({ response }) {
    // Process the response data
    if (response._data.success) {
      userInfo.value = {
        data: {
          id: '',
          name: '',
        },
        success: false,
      }
    }
  },
})

const { execute: GetSession } = await useFetch('/api/session/redis-session', {
  method: 'get',
  immediate: false,
  onResponse({ response }) {
    if (response._data.success) {
      userInfo.value = response._data
    }
  },
})

const { execute: UpdateSession } = await useFetch(
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
    onResponse({ response }) {
      if (response._data.success) {
        userInfo.value = response._data
      }
    },
  }
)
</script>
