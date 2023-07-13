export default defineEventHandler((event) => {
  return sendRedirect(event, '/app-auth/login', 307)
})
