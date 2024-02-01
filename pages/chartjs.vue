<script lang="ts" setup>
import { Bar } from 'vue-chartjs'

const chartData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'OCTT'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 20, 12, 50, 10, 1],
    },
  ],
})
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
})
</script>
<template>
  <div class="pt-20">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
