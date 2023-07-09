import { useUserStore } from '~/stores/user'
const userStore = useUserStore()

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('middlewareRoute', to.path, from.path)
  // if (from.path === '/') {
  //   console.log('同頁面, 中斷')
  //   abortNavigation()
  // }
  /*
    1. 檢查 store 有沒有 userInfo, 有就登入
    2. 沒有的話先去抓 cookie || session 內的token
    3. 用token去打api抓 currentUser
    4. 成功存進 store 失敗導回登入頁
  */
  // const config = useRuntimeConfig()
  // const publicEnv = config.public

  const user = userStore.$state.user
  if (!user.name) {
    const { data, error } = await useFetch('/api/auth/clothes/currentUser', {
      method: 'POST',
    })

    if (data) {
      console.log('getUser', data.value.data)
      userStore.addUserInfo(data.value.data)
    }

    if (error) {
      console.log('error', error)
    }
    // if (error) {
    //   console.log('getError', error)
    //   return navigateTo('/app-auth/login')
    //   return navigateTo('/', { replace: false, external: true })
    // }
  }
})
