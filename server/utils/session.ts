// https://github.com/unjs/h3/pull/315
import { useSession } from 'h3'
import type { H3Event } from 'h3'

interface User {
  id: number
  name: string
  phone: string
  address: string
}

const sessionPassword = 'secretsecretsecretsecretsecretsecretsecret'

export const useSessionEvent = (event: H3Event) => {
  return useSession<User>(event, {
    name: 'SessionName',
    password: sessionPassword,
    // Session MaxAge
    maxAge: 100 * 1000,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 100 * 1000,
    },
  })
}
