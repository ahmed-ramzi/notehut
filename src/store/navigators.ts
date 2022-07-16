import { defineStore, storeToRefs } from "pinia"

type NavState = {
  isMenuActive: boolean
  currentSelection: String
}

interface NavActions {
  toggleMenu(): void
  changeCurrentSelection(page: string): void
}

const useNavStore = defineStore<string, NavState, {}, NavActions>("navigator", {
  state: () => {
    return {
      isMenuActive: false,
      currentSelection: "",
    }
  },

  actions: {
    changeCurrentSelection(page: string): void {
      this.currentSelection = page
    },

    toggleMenu(): void {
      this.isMenuActive = !this.isMenuActive
    },
  },
})

export const useNavState = () => storeToRefs(useNavStore())
export const useNavActions = () => useNavStore()
export const clearNavState = () => useNavStore().$reset()
