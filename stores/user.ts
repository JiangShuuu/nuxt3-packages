import { defineStore } from 'pinia'
import type { User } from '~/types/user'

type UserInfo = Pick<User['data'], 'user' | 'token'>

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: '',
    user: {
      id: 0,
      name: '',
      avatar: '',
      email: '',
      isAdmin: false,
      updatedAt: '',
      createdAt: '',
    },
  }),
  actions: {
    addUserInfo(item: UserInfo) {
      this.user = item.user.userData
      this.token = item.token
    },
  },
  getters: {},
})
