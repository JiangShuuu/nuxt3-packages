import { defineStore } from 'pinia'
import type { User } from '~/types/user'

type UserInfo = Pick<User['data'], 'user' | 'token'>

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {
      id: 0,
      name: '',
      avatar: '',
      email: '',
      isAdmin: false,
    },
  }),
  actions: {
    addUserInfo(item: UserInfo) {
      console.log('store', item)
      this.user = item.user.userData
      // this.token = item?.token || ''
    },
  },
  getters: {},
})
