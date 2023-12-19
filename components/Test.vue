<template>
  <p @click="changeMsg">{{ msg }}</p>
  <TestButton />
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Test Page',
  description: 'this is desc',
})

const msg = ref('123')
function changeMsg() {
  msg.value += '!'
}
</script>
