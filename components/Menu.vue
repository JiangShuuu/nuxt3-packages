<template>
  <div class="fixed z-50 flex w-full items-center justify-between px-4 pt-1">
    <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
      <UButton label="選單" color="gray">
        <template #trailing>
          <UIcon name="i-heroicons-arrow-down-20-solid" />
        </template>
      </UButton>
    </UDropdown>
    <p class="text-3xl font-bold">INTE-NUXT3</p>
    <UAvatarGroup size="sm" :max="2">
      <UAvatar
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        size="lg"
        chip-color="primary"
        chip-text=""
        chip-position="top-right"
      />
      <UAvatar
        src="https://avatars.githubusercontent.com/u/904724?v=4"
        alt="Atinux"
      />
      <UAvatar
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        alt="benjamincanac"
      />
    </UAvatarGroup>
  </div>
</template>

<script lang="ts" setup>
const items = [
  [
    {
      label: '首頁',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/739984?v=4',
      },
      to: '/',
    },
  ],
  [
    {
      label: 'GraphQL',
      icon: 'i-heroicons-arrow-right-circle-20-solid',
      to: '/graphql',
      click: () => {},
    },
    {
      label: 'app-auth',
      icon: 'i-heroicons-arrow-right-circle-20-solid',
      to: '/app-auth',
    },
    {
      label: 'Redis-Session',
      icon: 'i-heroicons-arrow-right-circle-20-solid',
      to: '/redis-session',
      click: () => {
        console.log('goRedis')
      },
    },
    // {
    //   label: 'Money',
    //   icon: 'i-heroicons-arrow-right-circle-20-solid',
    //   to: '/money',
    //   click: () => {},
    // },
  ],
  [
    {
      label: 'NuxtUI',
      icon: 'i-heroicons-pencil-square-20-solid',
      to: '/nuxtui',
      click: () => {
        console.log('goNuxtUI')
      },
    },
  ],
]
</script>
