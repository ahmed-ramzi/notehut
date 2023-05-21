import { defineStore, storeToRefs } from "pinia"

type NavState = {
  isMenuActive: boolean
  currentSelection: string
}

interface NavActions {
  toggleMenu(): void
  changeCurrentSelection(page: string): void
}

const useNavStore = defineStore<string, NavState, Record<any, never>, NavActions>("navigator", {
  state: () => {
    return {
      isMenuActive: true,
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
