import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'

const runtimeConfig = useRuntimeConfig()

export default NuxtAuthHandler({
  secret: runtimeConfig.auth.secret,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: runtimeConfig.github.clientID,
      clientSecret: runtimeConfig.github.clientSecret,
    }),
  ],
  callbacks: {
    signIn({ user, account, profile, email, credentials }) {
      console.log('Callback_signIn', user, account, profile, email, credentials)
      return true
    },
  },
})
