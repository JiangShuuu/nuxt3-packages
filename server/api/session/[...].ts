import { createRouter, defineEventHandler, useBase, deleteCookie } from 'h3'
import { useSessionEvent } from '~/server/utils/session'
const router = createRouter()

const user = {
  id: 99,
  name: 'john',
  phone: '0923103213',
  address: 'ewqjkldsaiodjq',
}

router.post(
  '/redis-session',
  defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log('getRedisBody', body)
    // redis setItem
    await useStorage().setItem('redis:test', body)
    // InitSession
    const session = await useSessionEvent(event)
    console.log('ewq', session.data)
    // updateSessionStore
    await session.update({
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address,
    })
    return `data:${session.id}, ${session.data.name}`
  })
)

router.get(
  '/redis-session',
  defineEventHandler(async (event) => {
    const session = await useSessionEvent(event)
    return `獲得Session資料, ${session.id}, ${session.data.name}`
  })
)

router.delete(
  '/redis-session',
  defineEventHandler(async (event) => {
    const session = await useSessionEvent(event)
    await session.clear()
    deleteCookie(event, 'SessionName')
    return `已清除Session, ${session.id}, ${session.data}`
  })
)

export default useBase('/api/session', router.handler)
