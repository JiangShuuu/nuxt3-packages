export default defineEventHandler((event) => {
  if (event.node.req.url !== '/auth') {
    console.log('checkLogin')
  }
})
