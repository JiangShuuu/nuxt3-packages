import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string | number
      name: string
      email: string
      image: string
      accessToken: string
    } & DefaultSession['user']
  }

  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  // interface JWT {
  //   /** OpenID ID Token */
  //   idToken?: string
  // }
}
