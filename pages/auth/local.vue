<template>
  <div class="flex h-screen space-x-2 items-center justify-center">
    <div class="border px-4 py-4 rounded flex flex-col items-center">
      <div
        v-if="data?.user"
        class="flex h-20 w-[300px] items-center justify-center space-x-4 border"
      >
        <img :src="data.user.image" class="h-12 w-12 rounded-full" />
        <div class="space-y-2">
          <p class="w-full">
            {{ data.user.name }}
          </p>
          <p class="w-full">
            {{ data.user.email }}
          </p>
        </div>
      </div>
      <div
        v-else
        class="h-20 w-[300px] flex items-center justify-center text-white"
      >
        未登入
      </div>
      <div class="mt-5 space-x-4">
        <UButton v-if="!data?.user" @click="localLogin">Local Login</UButton>
        <UButton v-if="data?.user" color="white" @click="() => {}"
          >Logout</UButton
        >
      </div>
    </div>
    <div class="border px-4 py-4 rounded flex flex-col items-center">
      <div
        v-if="data?.user"
        class="flex h-20 w-[300px] items-center justify-center space-x-4 border"
      >
        <img :src="data.user.image" class="h-12 w-12 rounded-full" />
        <div class="space-y-2">
          <p class="w-full">
            {{ data.user.name }}
          </p>
          <p class="w-full">
            {{ data.user.email }}
          </p>
        </div>
      </div>
      <div
        v-else
        class="h-20 w-[300px] flex items-center justify-center text-white"
      >
        未登入
      </div>
      <div class="mt-5 space-x-4">
        <UButton @click="getCurrent">GetUserInfo</UButton>
        <UButton @click="registerUser">Register</UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const token = useCookie('access_token')
const data: any = reactive({})

const localLogin = async () => {
  const user = await $fetch('/api/local-auth/login', {
    method: 'POST',
    body: {
      email: 'john@john.com',
      password: 'john1234',
    },
    onResponse({ response }) {
      if (response._data) {
        token.value = response._data.data.accessToken
      }
    },
  })

  console.log('userr', user)
}

const getCurrent = async () => {
  console.log('TTTOKEN', token)
  // if (!token.user) {
  //   useCustomToast({
  //     title: '請先登入',
  //     color: 'yellow',
  //   })
  //   return
  // }
  // console.log('TokenInfo', token.user.accessToken)
  await useFetch(`/api/local-auth/currentUser`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token.value,
    },
    onResponse({ response }) {
      // Process the response data
      if (response._data.error) return
      console.log('Response', response._data)
      useCustomToast({
        title: '成功獲取使用者資料!',
      })
    },
    onResponseError({ request, options, error }) {
      // Handle the request errors
      console.log('errorMsg::getCurrent:', error, request, options)
      useCustomToast({
        title: 'Error::getCurrent',
        color: 'yellow',
      })
    },
  })
}

const registerUser = async () => {
  await $fetch('/api/auth/register', {
    method: 'POST',
    body: {
      email: 'john@john.com',
      name: 'john',
      password: 'john1234',
    },
    onResponse({ response }) {
      if (response._data.statusCode) {
        useCustomToast({
          title: response._data.message,
          color: 'yellow',
        })
      }

      useCustomToast({
        title: '成功註冊',
      })
      console.log('resss', response._data)
    },
  })
}
</script>
