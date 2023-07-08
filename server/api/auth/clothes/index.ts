interface User {
  data: {
    id: string
    account_id: string
    employee_no: string
    nickname: string
    status: boolean
    role_type: number
  }
}

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
