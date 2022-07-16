import { defineStore, storeToRefs } from "pinia"

type AppState = {
  isLoading: boolean
}

const useAppStore = defineStore<string, AppState, Record<any, never>, Record<any, never>>("app", {
  state: () => {
    return {
      isLoading: false,
    }
  },
})

export const useAppState = () => storeToRefs(useAppStore())

export const clearAppState = () => useAppStore().$reset()
