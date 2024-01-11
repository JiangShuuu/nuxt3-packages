import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const config = useRuntimeConfig()

function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, config.jwtSignSecret)
  } catch (error) {
    return null
  }
}

export default defineEventHandler(async (event) => {
  //  get refreshToken
  const refreshTokenBody = await readBody(event)

  //  verify refreshToken
  const decoded: any = verifyAccessToken(refreshTokenBody)
  console.log('Verify Resgfresh Token', decoded)

  if (!decoded) {
    throw createError({
      statusCode: 403,
      message: 'refreshToken error',
    })
  }

  // Find DB UserInfo
  const user = await prisma.user.findFirst({
    where: {
      email: decoded.email,
    },
  })

  if (!user) {
    throw createError({
      statusCode: 403,
      message: '登入失敗!',
    })
  }

  //  change new accessToken & refeshToken
  const accessToken = jwt.sign(
    { name: user.name, email: user.email, image: user.image },
    config.jwtSignSecret,
    {
      expiresIn: '15m',
    }
  )
  const refreshToken = jwt.sign(
    { name: user.name, email: user.email, image: user.image },
    config.jwtSignSecret,
    {
      expiresIn: '7d',
    }
  )

  return {
    data: {
      accessToken,
      refreshToken,
    },
    success: true,
  }
})
