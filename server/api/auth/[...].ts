// @ts-ignore
import bcrypt from 'bcrypt'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { NuxtAuthHandler } from '#auth'

const prisma = new PrismaClient()
const runtimeConfig = useRuntimeConfig()
type Credential = {
  email: string
  password: string
}

export default NuxtAuthHandler({
  adapter: PrismaAdapter(prisma),
  secret: runtimeConfig.auth.secret,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      // 識別用
      id: 'credentials',
      // 顯示用
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials: Credential) {
        if (!credentials?.email || !credentials?.password) {
          throw createError({
            statusCode: 500,
            statusMessage: 'Missing Info',
          })
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user || !user.hashedPassword) {
          throw createError({
            statusCode: 401,
            statusMessage: 'Invalid Credentials',
          })
        }

        const correctPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )
        if (!correctPassword) {
          throw createError({
            statusCode: 401,
            statusMessage: 'Invalid Credentials',
          })
        }

        return user
      },
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: runtimeConfig.github.clientID,
      clientSecret: runtimeConfig.github.clientSecret,
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  // pages: {
  //   signIn: '/',
  // },
  session: {
    strategy: 'jwt',
  },
})
