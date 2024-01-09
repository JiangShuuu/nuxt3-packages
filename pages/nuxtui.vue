<template>
  <div class="flex h-screen items-center justify-center">
    <UButton label="Open" @click="isOpen = true" />

    <UModal v-model="isOpen">
      <!-- Content -->
      <div class="ml-10">
        <UForm
          :validate="validate"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup label="Count" name="count">
            <UInput v-model="state.count" />
          </UFormGroup>

          <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" />
          </UFormGroup>

          <UButton type="submit"> Submit </UButton>
        </UForm>
      </div>
    </UModal>

    <!-- <button @click="submit">Click</button> -->
  </div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const isOpen = ref(false)
const state = reactive({
  count: undefined,
  email: undefined,
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.count) errors.push({ path: 'count', message: 'count' })
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  return errors
}

const onSubmit = async (event: FormSubmitEvent<any>) => {
  console.log('event', event.data)
  await useFetch('/api/auth/limit', {
    method: 'POST',
    body: {
      count: event.data.count,
      email: 'test',
    },
    onResponse({ response }) {
      console.log('res', response._data)
    },
  })
}
</script>
