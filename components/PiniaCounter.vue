<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../stores/counter'

const counter = useCounterStore()

const { count: countRef } = storeToRefs(counter)

const onIncrement = () => {
  // counter.count++
  // with autocompletion ✨
  // counter.$patch({ count: counter.count + 1 })
  // or using an action instead
  counter.increment()
}
</script>

<template>
  <!-- Access the state directly from the store -->
  <div>Current Count: {{ counter.count }}</div>
  <div>Ref Count: {{ countRef }}</div>
  <button @click="onIncrement">increment</button>
</template>
