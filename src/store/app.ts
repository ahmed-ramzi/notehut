import { defineStore, storeToRefs } from "pinia"
import { useAuthActions } from "./auth"
import { useGroupsActions } from "./groups"
import { useNotesListActions } from "./notesList"

type AppState = {
  isLoading: boolean
}

interface AppActions {
  loadApp(): void
}

const useAppStore = defineStore<string, AppState, Record<any, never>, AppActions>("app", {
  state: () => {
    return {
      isLoading: true,
    }
  },

  actions: {
    loadApp(): void {
      const { getPrivateNotesList } = useNotesListActions()
      const { setLoggedIn } = useAuthActions()
      const { getUserGroups } = useGroupsActions()

      setLoggedIn(true)
      getPrivateNotesList()
      getUserGroups()
    },
  },
})

export const useAppState = () => storeToRefs(useAppStore())
export const useAppActions = () => useAppStore()
export const clearAppState = () => useAppStore().$reset()
