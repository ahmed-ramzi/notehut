import { defineStore, storeToRefs } from "pinia"

type AuthState = {
  isLoggedIn: boolean
}

interface AuthActions {
  setLoggedIn(value: boolean): void
}

const useAuthStore = defineStore<string, AuthState, {}, AuthActions>("auth", {
  state: () => {
    return {
      isLoggedIn: false,
    }
  },
  actions: {
    setLoggedIn(value: boolean): void {
      this.isLoggedIn = value
    },
  },
})

export const useAuthState = () => {
  const state = useAuthStore()
  return storeToRefs(state)
}

export const useAuthActions = () => {
  return useAuthStore()
}

export const clearAuthState = () => {
  const state = useAuthStore()
  state.$reset()
}
