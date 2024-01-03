import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'

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
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await $fetch('/api/auth/login', {
          method: 'POST',
          body: {
            email: credentials.email,
            password: credentials.password,
          },
        })

        return user
      },
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: runtimeConfig.github.clientID,
      clientSecret: runtimeConfig.github.clientSecret,
    }),
  ],
  callbacks: {
    // 加這邊才能修改 Session 預設 User 型別
    // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
    jwt: ({ token, user, account }) => {
      // credentials登入
      if (user && account && account.provider === 'credentials') {
        token.user = {
          ...user,
        }
      }

      console.log('tokenAXSADSA', account, token, user)

      // 返回JWT
      return Promise.resolve(token)
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    session: ({ session, token }) => {
      // jwt資料合併到session.user
      ;(session as any).user = token.user

      // 送出session
      return Promise.resolve(session)
    },
  },
})
