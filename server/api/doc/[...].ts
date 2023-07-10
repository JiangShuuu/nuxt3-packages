import { createRouter, defineEventHandler, useBase } from 'h3'

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

router.post(
  '/redis',
  defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log('getRedisBody', body)
    await useStorage().setItem('redis:test', body)
    return 'Data is set'
  })
)

export default useBase('/api/doc', router.handler)
