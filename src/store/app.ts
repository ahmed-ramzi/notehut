import { defineStore, storeToRefs } from "pinia"

type AppState = {
  isLoading: boolean
}

const useAppStore = defineStore<string, AppState, {}, {}>("app", {
  state: () => {
    return {
      isLoading: false,
    }
  },
})

export const useAppState = () => storeToRefs(useAppStore())

export const clearAppState = () => useAppStore().$reset()
