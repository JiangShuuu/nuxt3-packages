export default defineEventHandler((event) => {
  return navigatorTo(event, '/nuxtui', 302)
})
