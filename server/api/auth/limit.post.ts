import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const token = await getToken({ event })

  console.log('body', body.count)

  const result = await delayResponse(body.count)
  console.log('resultOOOO', result)
  if (!result) {
    throw createError({
      statusCode: 400,
      message: 'error!!!',
    })
  }

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
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
