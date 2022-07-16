import { clearAppState } from "./app"
import { clearAuthState } from "./auth"
import { clearNavState } from "./navigators"
import { clearNotesListState } from "./notesList"
import { clearUserState } from "./user"

export const resetApp = (): void => {
  clearAppState()
  clearAuthState()
  clearNavState()
  clearNotesListState()
  clearUserState()
}