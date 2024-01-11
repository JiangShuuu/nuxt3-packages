import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Find DB UserInfo
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  })

  if (!user || !user.hashedPassword) {
    throw createError({
      statusCode: 400,
      message: '登入失敗!',
    })
  }

  // Check hashed Password
  const checkHashPassword = await compare(body.password, user.hashedPassword)

  if (!checkHashPassword) {
    throw createError({
      statusCode: 422,
      message: '登入失敗!',
    })
  }

  // Create accessToken & refreshToken
  const accessToken = jwt.sign(
    { id: user.id, name: user.name, email: user.email, image: user.image },
    config.jwtSignSecret,
    {
      expiresIn: '3m',
    }
  )
  const refreshToken = jwt.sign(
    { id: user.id, name: user.name, email: user.email, image: user.image },
    config.jwtSignRefreshSecret,
    {
      expiresIn: '7d',
    }
  )

  return {
    data: {
      name: user.name,
      email: user.email,
      image: user.image,
      accessToken,
      refreshToken,
    },
    success: true,
  }
})
