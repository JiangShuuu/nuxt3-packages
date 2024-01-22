<template>
  <div class="text-center pt-32">
    <h1 class="title text-3xl text-center">PlayWright Test</h1>
    <div v-if="string" class="run">{{ string }}</div>
    <div class="pt-20">
      <button @click="Change">Open</button>

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

          <UButton label="Submit" type="submit">Submit</UButton>
        </UForm>
      </UModal>
    </div>
    <input type="text" placeholder="gmail" />
  </div>
</template>

<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types'

const isOpen = ref(false)
const string = ref('')
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

function Change() {
  console.log('CLick????')
  string.value = '加加'
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
