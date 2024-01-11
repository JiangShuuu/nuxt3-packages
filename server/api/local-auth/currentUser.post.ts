// import { getToken, getServerSession } from '#auth'
import jwt from 'jsonwebtoken'
const config = useRuntimeConfig()

export default defineEventHandler((event) => {
  const headers = getRequestHeader(event, 'Authorization')
  if (!headers) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const token = headers.split(' ')[1]

  // console.log('user', token, headers)

  // 驗證換發 token
  let user
  try {
    user = jwt.verify(token, config.jwtSignSecret)
  } catch (err) {
    console.log('ErrorInfo', err)
    $fetch('/api/local-auth/refresh', {
      method: 'POST',
    })
  }
  console.log('userInfo', user)
  return {
    data: {
      user,
    },
    success: true,
  }
})
