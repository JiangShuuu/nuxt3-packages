import { useUserStore } from '~/stores/user'
const userStore = useUserStore()

export default defineNuxtRouteMiddleware(async (to, from) => {
  /*
    1. 檢查 store 有沒有 userInfo, 有就登入
    2. 沒有的話先去抓 cookie || session 內的token
    3. 用token去打api抓 currentUser
    4. 成功存進 store 失敗導回登入頁
  */
  // const config = useRuntimeConfig()
  // const publicEnv = config.public

  const cookieToken = useCookie('access_token')

  await $fetch('/api/auth/clothes/currentUser').then((data) => {
    console.log('getUser', data)
    userStore.addUserInfo(data.data)
  })

  console.log('middleFrom', from, to)
  console.log('middleToken', userStore.$state.user)

  const token = cookieToken.value
  if (process.server && !token) {
    return navigateTo('/app-auth/login')
  }

  const user = userStore.$state.user
  if (process.client && !user.id) {
    console.log('client沒有token')
    return navigateTo('/app-auth/login')
  }
})
