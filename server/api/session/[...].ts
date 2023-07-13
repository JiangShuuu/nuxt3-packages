import { createRouter, defineEventHandler, useBase, deleteCookie } from 'h3'
import { useSessionEvent } from '~/server/utils/session'
const router = createRouter()

const user = {
  id: 99,
  name: 'john',
  phone: '0923103213',
  address: 'ewqjkldsaiodjq',
}

router.get(
  '/redis-session',
  defineEventHandler(async (event) => {
    const session = await useSessionEvent(event)
    return `${session.id}, ${session.data.name}`
  })
)

router.post(
  '/redis-session',
  defineEventHandler(async (event) => {
    // InitSession
    const session = await useSessionEvent(event)
    // updateSessionStore
    await session.update({
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address,
    })
    // redis set User
    await useStorage('redis').setItem('user', user)
    await useStorage('redis').setItem('sessionId', session.id || '')
    return `${session.id}, ${session.data.name}`
  })
)

router.put(
  '/redis-session',
  defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log('getUpdateSessionInfo', body)
    // InitSession
    const session = await useSessionEvent(event)
    console.log('updateSessionInfo', session.data)
    // updateSessionStore
    await session.update({
      id: body.id,
      name: body.name,
      phone: body.phone,
      address: body.address,
    })
    // redis set User
    await useStorage('redis').setItem('user', body)
    await useStorage('redis').setItem('sessionId', session.id || '')
    return `${session.id}, ${session.data.name}`
  })
)

router.delete(
  '/redis-session',
  defineEventHandler(async (event) => {
    const session = await useSessionEvent(event)
    await session.clear()
    deleteCookie(event, 'SessionName')
    // redis del User
    await useStorage('redis').removeItem('user')
    await useStorage('redis').removeItem('sessionId')
    return `${session.id}, ${session.data}`
  })
)

export default useBase('/api/session', router.handler)
