<template>
  <div
    class="flex h-screen w-full flex-col items-center justify-center space-y-5"
  >
    <div class="w-full space-y-2 text-center">
      <div>綠界 Info:</div>
      <button
        class="rounded border bg-sky-600 px-1.5 py-1 text-center text-white"
        @click="getMap"
      >
        綠界付款
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useUserStore } from '~/stores/user'
// const userStore = useUserStore()
import axios from 'axios'

// const { data: ecpayInfo, execute: PostEcPay } = await useFetch(
//   'axios.post("http://localhost:8888/getmap");',
//   {
//     method: 'post',
//     immediate: false,
//   }
// )

const getMap = async () => {
  const { data } = await axios.post('http://localhost:8888/getmap')
  console.log('get', data)
  const newWindow = window.open('', '_blank', 'height=500,width=500')
  if (newWindow) {
    newWindow.document.write(data)
    newWindow.document.close()
  }
}
</script>
