import axios from 'axios'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'access_token')
  const serverEnv = config.apiSecret

  const data = await axios
    .get(`${serverEnv.apiBase}/current_user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => {
      return data
    })

  return data
})
