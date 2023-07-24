<template>
  <div
    class="flex h-screen w-full flex-col items-center justify-center space-y-5"
  >
    <div class="w-full space-y-2 text-center">
      <div>綠界 Info: {{ ecpayInfo }}</div>
      <button
        class="rounded border bg-sky-600 px-1.5 py-1 text-center text-white"
        @click="PostEcPay()"
      >
        綠界付款
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useUserStore } from '~/stores/user'
// const userStore = useUserStore()

const { data: ecpayInfo, execute: PostEcPay } = await useFetch(
  '/api/money/ecpay',
  {
    method: 'post',
    immediate: false,
  }
)
</script>
