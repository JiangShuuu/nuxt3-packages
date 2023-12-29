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

const { data } = useAuth()

let userInfo: UserProp['user'] | null | any = null

if (data.value) {
  userInfo = data.value.user
}

console.log('data', userInfo)
</script>
