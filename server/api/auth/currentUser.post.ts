import { getToken, getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  const token = await getToken({ event })

  console.log('CurrentUserInfo', {
    session,
    token,
  })

  return {
    data: {
      session,
      token,
    },
    success: true,
  }
})
