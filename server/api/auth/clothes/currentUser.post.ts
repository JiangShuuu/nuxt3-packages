import axios from 'axios'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  // const token = getCookie(event, 'access_token')
  const serverEnv = config.apiSecret
  const cookies = parseCookies(event)
  const token = cookies?.access_token
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
    .catch((err) => {
      throw createError({ statusCode: 404, statusMessage: err })
    })

  return data
})
