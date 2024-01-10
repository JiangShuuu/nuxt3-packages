// @ts-ignore
// import bcrypt from 'bcrypt'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
// import { PrismaAdapter } from '@next-auth/prisma-adapter'
// import { PrismaClient } from '@prisma/client'
import { NuxtAuthHandler } from '#auth'

// const prisma = new PrismaClient()
const runtimeConfig = useRuntimeConfig()
type Credential = {
  email: string
  password: string
}

export default NuxtAuthHandler({
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
        try {
          // 取得token
          const user = await $fetch('/api/auth/login', {
            method: 'POST',
            body: {
              email: credentials.email,
              password: credentials.password,
            },
          })

          return {
            name: user.data.name,
            email: user.data.email,
            picture: user.data.image,
            accessToken: user.data.accessToken,
          }
        } catch (error) {
          console.log(error)

          return null
        }
      },
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: runtimeConfig.github.clientID,
      clientSecret: runtimeConfig.github.clientSecret,
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
    jwt: ({ token, user, account }: any) => {
      // 使用signIn()時,user,account才會有資料
      // 不然就返回之前取得的JWT

      console.log('CallbackJwtStart', token, user, account)
      // credentials登入
      if (user && account && account.provider === 'credentials') {
        token.user = {
          ...user,
        }
        token.accessToken = user.accessToken
      }

      // google登入
      // if (account && account.provider === 'google' && account.access_token) {
      //   // 若取得用戶的token
      //   const accessToken = await socialiteSignIn(
      //     account.provider,
      //     account.access_token
      //   )

      //   // 取得用戶資料
      //   const userData = await fetchUser(accessToken)

      //   // 加到JWT
      //   token.user = { ...userData, accessToken }
      // }

      console.log('CallbackJwtEnd', token)

      // 返回JWT
      return Promise.resolve(token)
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    session: ({ session, token }: any) => {
      console.log('CallSessionStart', session, token)
      // jwt資料合併到session.user
      session.user = token.user
      session.accessToken = token.user.accessToken

      // 送出session
      return Promise.resolve(session)
    },
  },
})
