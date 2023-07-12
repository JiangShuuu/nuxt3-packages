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

export default useBase('/api/doc', router.handler)
