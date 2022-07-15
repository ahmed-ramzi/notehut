import { defineStore, storeToRefs } from "pinia"

type NavState = {
  isMenuActive: boolean
}

interface NavActions {
  toggleMenu(): void
}

const useNavStore = defineStore<string, NavState, {}, NavActions>("navigator", {
  state: () => {
    return {
      isMenuActive: false,
    }
  },

  actions: {
    toggleMenu(): void {
      this.isMenuActive = !this.isMenuActive
    },
  },
})

export const useNavState = () => storeToRefs(useNavStore())
export const useNavActions = () => useNavStore()
export const clearNavState = () => useNavStore().$reset()
