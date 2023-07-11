import { createRouter, defineEventHandler, useBase, useSession } from 'h3'
const router = createRouter()

router.get(
  '/test',
  defineEventHandler(() => {
    console.log('getegeteget')
    return {
      msg: 'Hello World',
    }
  })
)

router.get(
  '/hello',
  defineEventHandler((event) => {
    const urlObj = getRequestURL(event)
    console.log('get123213', urlObj.origin)

    return sendRedirect(event, `/`)
  })
)

const user = {
  id: 99,
  name: 'john',
  phone: '0923103213',
  address: 'ewqjkldsaiodjq',
}

router.post(
  '/redis',
  defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log('getRedisBody', body)
    await useStorage().setItem('redis:test', body)
    const session = await useSession(event, {
      password: 'secretsecretsecretsecretsecretsecretsecret',
    })
    console.log('ewq', session.data)
    await session.update({
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address,
    })
    return `data:${session.id}, ${session.data.name}`
  })
)

router.post(
  '/redis-clear',
  defineEventHandler(async (event) => {
    const session = await useSession(event, {
      password: 'secretsecretsecretsecretsecretsecretsecret',
    })
    await session.clear()
    return `已清除Session, ${session.id}, ${session.data}`
  })
)

export default useBase('/api/doc', router.handler)
