import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const token = await getToken({ event })

  console.log('body', body)

  const accessData = {
    name: '123',
    email: '321',
  }

  if (body.name !== accessData.name) {
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
