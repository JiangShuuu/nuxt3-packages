export interface User {
  data: {
    token: string
    user: {
      userData: {
        id: number
        name: string
        avatar: string
        email: string
        isAdmin: boolean
      }
    }
  }
}
