import * as bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'
import db from '@/server/utils/prismaClient'

const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const userRecord = await db.user
    .findFirst({
      where: {
        email: body.email,
      },
    })
    .catch((error) => {
      console.error(error)
      throw createError({
        statusCode: 500,
        message: `DBError:getUserByEmail::${error}`,
      })
    })

  if (!userRecord?.hashedPassword || !userRecord?.email) {
    throw createError({
      statusCode: 400,
      message: 'Email or password is incorrect',
    })
  }

  if (!(await bcrypt.compare(body.password, userRecord.hashedPassword))) {
    throw createError({
      statusCode: 400,
      message: 'Email or password is incorrect',
    })
  }

  const jwtTokenPayload = {
    id: userRecord.id,
    name: userRecord.name,
  }

  const maxAge = 60 * 60 * 24 * 7
  const expires = Math.floor(Date.now() / 1000) + maxAge

  const jwtToken = jwt.sign(
    {
      exp: expires,
      data: jwtTokenPayload,
    },
    runtimeConfig.jwtSignSecret
  )

  setCookie(event, 'access_token', jwtToken, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge,
    expires: new Date(expires * 1000),
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })

  return {
    id: userRecord.id,
    // provider: {
    //   name: userRecord.providerName,
    //   userId: userRecord.providerUserId,
    // },
    // isAdmin: userRecord.isAdmin,
    // nickname: userRecord.nickname,
    // avatar: userRecord.avatar,
    email: userRecord.email,
    name: userRecord.name,
  }
})
