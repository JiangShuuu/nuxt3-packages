// https://github.com/unjs/h3/pull/315
import { useSession } from 'h3'

const sessionPassword = 'secretsecretsecretsecretsecretsecretsecret'

export default eventHandler(async (event) => {
  const session = await useSession<{
    id: number
    name: string
    phone: string
    address: string
  }>(event, {
    password: sessionPassword,
  })
  console.log(session.data)
  // await session.update({ id: 0, name: '', phone: '', address: '' })
  // await session.update({ ctr: Number(session.data.ctr || 0) - 1 })
  // return `Hello! You visited this page ${session.data.ctr} times. session id: ${session.id})`
})
