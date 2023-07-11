// https://github.com/unjs/h3/pull/315
import { useSession } from 'h3'

const sessionPassword = 'secretsecretsecretsecretsecretsecretsecret'

export default eventHandler(async (event) => {
  const session = await useSession<{ ctr: number }>(event, {
    password: sessionPassword,
  })
  await session.update((data) => ({ ctr: Number(data.ctr || 0) + 2 }))
  await session.update({ ctr: Number(session.data.ctr || 0) - 1 })
  return `Hello! You visited this page ${session.data.ctr} times. session id: ${session.id})`
})
