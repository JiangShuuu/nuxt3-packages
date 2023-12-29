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
        try {
          const { data }: any = await $fetch(
            `${runtimeConfig.public.apiBase}/signin`,
            {
              method: 'POST',
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          )
          const userFormat = {
            name: data.user.userData.name,
            email: data.user.userData.email,
            image: data.user.userData.avatar,
          }
          return userFormat
        } catch (err) {
          console.error(err)
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
  // callbacks: {
  //   signIn({ user, account, profile, email, credentials }) {
  //     console.log('Callback_signIn', user, account, profile, email, credentials)
  //     return true
  //   },
  // },
})
