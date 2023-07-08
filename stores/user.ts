import { defineStore } from 'pinia'
// import type { User } from '~/server/api/auth/clothes/index'
// type UserInfo = Pick<User['data']['user'], 'userData'>

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: '',
    user: {
      id: 0,
      name: '',
      avatar: '',
      email: '',
      isAdmin: true,
      updatedAt: '',
      createdAt: '',
    },
  }),
  actions: {
    addUserInfo(item: any) {
      console.log('getStoreUser', item)
      this.user = item.userData
      this.token = item.token
    },
  },
  getters: {},
})
