import { hashSync } from 'bcrypt'
import db from '~/server/utils/prismaClient'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  let userRecord = await db.user.findFirst({
    where: {
      email: body.email,
    },
  })

  if (userRecord) {
    throw createError({
      statusCode: 400,
      statusMessage: 'A user with that email address already exists',
    })
  }

  userRecord = await db.user.create({
    data: {
      email: body.email,
      name: body.name,
      hashedPassword: hashSync(body.password, 12),
    },
  })

  return {
    id: userRecord.id,
    nickname: userRecord.name,
    email: userRecord.email,
  }
})
