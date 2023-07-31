import { createRouter, defineEventHandler, useBase } from 'h3'
// import { useSessionEvent } from '~/server/utils/session'
const router = createRouter()

router.post(
  '/receiver',
  defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log('gegegegegegegeget', body.CVSStoreID)
    setCookie(event, 'CVSStoreID', body.CVSStoreID)
    sendRedirect(event, '/close', 301)
  })
)

export default useBase('/api', router.handler)
