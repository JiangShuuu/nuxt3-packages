import { getToken, getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const session = await getServerSession(event)
  const token = await getToken({ event })

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  console.log('body', body.count, token)
  console.log('session', session)

  const result = await delayResponse(body.count)

  if (!result) {
    throw createError({
      statusCode: 400,
      message: 'error!!!',
    })
  }

  return {
    data: true,
    success: true,
  }
})

const delayResponse = (count: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (count % 2 === 0) {
        resolve(true)
      } else {
        resolve(false)
      }
    }, 3000)
  })
}
