import type { User } from '~/types/user'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const serverEnv = config.apiSecret
  const body = await readBody(event)

  const data: User = await $fetch(`${serverEnv.apiBase}/signin`, {
    method: 'POST',
    body: {
      email: body.email,
      password: body.password,
    },
  })

  return data
})
