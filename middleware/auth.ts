import { useUserStore } from '~/stores/user'
const userStore = useUserStore()

export default defineNuxtRouteMiddleware((to, from) => {
  /* 
    1. 檢查 store 有沒有 userInfo, 有就登入
    2. 沒有的話先去抓 cookie || session 內的token
    3. 用token去打api抓 currentUser
    4. 成功存進 store 失敗導回登入頁
  */

  console.log('middleFrom', from)
  console.log('middleToken', userStore.$state.token)
  const token = userStore.$state.token

  if (to.path === '/app-auth' && !token) {
    console.log('沒有token, 回登入頁')
    return navigateTo('/app-auth/login')
  }
})
