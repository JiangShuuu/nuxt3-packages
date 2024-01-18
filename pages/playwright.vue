<template>
  <div class="text-center pt-32">
    <h1 class="title text-3xl text-center">PlayWright Test</h1>
    <div class="pt-20">
      <UButton label="Open" @click="isOpen = true" />

      <UModal v-model="isOpen">
        <UForm
          :validate="validate"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput v-model="state.password" type="password" />
          </UFormGroup>

          <UButton type="submit"> Submit </UButton>
        </UForm>
      </UModal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types'

const isOpen = ref(false)
const state = reactive({
  email: undefined,
  password: undefined,
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  if (!state.password) errors.push({ path: 'password', message: 'Required' })
  return errors
}

function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)
  if (
    event.data.email === 'user1@example.com' &&
    event.data.password === '12345678'
  ) {
    window.alert('成功送出')
  } else {
    window.alert('輸入錯誤')
  }
  isOpen.value = false
}
</script>
