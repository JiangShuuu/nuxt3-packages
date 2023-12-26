<template>
  <div class="flex h-screen flex-col items-center justify-center space-y-10">
    <p>There are {{ data?.ships.length || 0 }} ships.</p>
  </div>
</template>

<script lang="ts" setup>
type DataResult = {
  ships: {
    id: number
    name: string
  }[]
}

const query = gql`
  query getShips($limit: Int!) {
    ships(limit: $limit) {
      id
      name
    }
  }
`
const variables = { limit: 5 }

const { data } = await useAsyncQuery<DataResult>(query, variables)
</script>
