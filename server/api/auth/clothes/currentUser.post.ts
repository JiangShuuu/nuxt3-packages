import axios from 'axios'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const serverEnv = config.apiSecret
  // const cookies = parseCookies(event)
  // const token = cookies?.access_token
  const token = await useStorage('redis').getItem('token')
  console.log('ApiToken', token)
  if (!token) {
    throw createError({
      statusCode: 404,
      statusMessage: 'did not get token!!!',
    })
  }

  const data = await axios
    .get(`${serverEnv.apiBase}/current_user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => {
      return data
    })
    .catch(async (err) => {
      // 移除 redis token
      await useStorage('redis').removeItem('token')
      throw createError({ statusCode: 404, statusMessage: err })
    })

  return data
})
