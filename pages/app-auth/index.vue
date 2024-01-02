<template>
  <div class="flex h-screen flex-col items-center justify-center">
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
        <UButton v-if="!data?.user" @click="localLogin">Local Login</UButton>
        <UButton v-if="!data?.user" @click="signIn('github')"
          >Github Login</UButton
        >
        <UButton v-if="data?.user" color="white" @click="signOut"
          >Logout</UButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// type UserProp = {
//   expires: string
//   user: {
//     email: string
//     image: string
//     name: string
//   }
// }

const { data, signOut, signIn, getSession } = useAuth()
const config = useRuntimeConfig()
const token = await getSession()

const localLogin = async () => {
  const { error }: any = await signIn('credentials', {
    email: config.public.appAccount,
    password: config.public.appPassword,
    redirect: false,
  })

  if (error) {
    console.log('error', error)
  } else {
    navigateTo('/')
  }
}

const getCurrent = async () => {
  if (!token.user) {
    useCustomToast({
      title: '請先登入',
      color: 'yellow',
    })
    return
  }

  const { data } = await useFetch(`${config.public.apiBase}/current_user`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token.user.accessToken,
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

  console.log('currentUserData', data.value)
}
</script>
