<template>
  <div class="flex h-screen items-center justify-center">倒數關閉視窗...</div>
</template>

<script lang="ts" setup>
onMounted(() => {
  setTimeout(() => {
    window.close()
  }, 1000)
})
</script>
