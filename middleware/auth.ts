export default defineNuxtRouteMiddleware((to, from) => {
  //   if (to.params.id === '1') {
  //     return abortNavigation()
  //   }
  console.log('get', to.path, from)
  if (to.path === '/app-auth') {
    return navigateTo('/app-auth/login')
  }
})
