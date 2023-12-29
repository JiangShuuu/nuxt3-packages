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

  await useStorage('redis').setItem('token', data.data.token)

  // const maxAge = 60 * 60 * 24 * 7
  // const expires = Math.floor(Date.now() / 1000) + maxAge

  // setCookie(event, 'access_token', data.data.token, {
  //   httpOnly: true,
  //   maxAge,
  //   expires: new Date(expires * 1000),
  //   secure: process.env.NODE_ENV === 'production',
  //   path: '/',
  // })

  return data
})
