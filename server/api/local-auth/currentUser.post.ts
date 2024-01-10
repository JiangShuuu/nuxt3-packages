// import { getToken, getServerSession } from '#auth'
import jwt from 'jsonwebtoken'
const config = useRuntimeConfig()

export default defineEventHandler((event) => {
  const headers = getRequestHeader(event, 'Authorization')
  console.log('eventHeader', headers)
  if (!headers) {
    throw createError({ statusCode: 403, statusMessage: 'Unauthorized' })
  }

  const token = headers.split(' ')[1]
  const user = jwt.verify(token, config.jwtSignSecret)

  return {
    data: {
      user,
    },
    success: true,
  }
})
