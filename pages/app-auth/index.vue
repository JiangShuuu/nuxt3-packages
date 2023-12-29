<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <div
      v-if="userInfo"
      class="flex h-20 w-[300px] items-center justify-center space-x-4 border"
    >
      <img :src="userInfo.image" class="h-12 w-12 rounded-full" />
      <div class="space-y-2">
        <p class="w-full">
          {{ userInfo.name }}
        </p>
        <p class="w-full">
          {{ userInfo.email }}
        </p>
      </div>
    </div>
    <div class="mt-5 space-x-4">
      <UButton @click="getCurrent">GetUserInfo</UButton>
      <UButton @click="localLogin">Local Login</UButton>
      <UButton @click="signIn('github')">Github Login</UButton>
      <UButton color="white" @click="signOut">Logout</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
type UserProp = {
  expires: string
  user: {
    email: string
    image: string
    name: string
  }
}

const { data, signOut, signIn, getSession } = useAuth()
const config = useRuntimeConfig()

let userInfo: UserProp['user'] | null | any = null

if (data.value) {
  userInfo = data.value.user
}

console.log('data', data.value)

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
  const token = await getSession()
  console.log('token', token)

  const { data }: any = await $fetch(
    'https://express.jiangshuuu.com/current_user',
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token.user.accessToken,
      },
    }
  )

  console.log('currentUserData', data)
}
</script>
