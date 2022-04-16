import { defineStore, storeToRefs } from "pinia"
import { NoteState } from "types/states"

type NoteDetail = {
  note: NoteState | null
  isEditing: Boolean
}

interface NoteDetailsAction {
  setNoteDetails(note: NoteState): void
  changeEditingState(state: boolean): void
}

const useNoteDetailsStore = defineStore<string, NoteDetail, Record<string, never>, NoteDetailsAction>("noteDetail", {
  state: () => {
    return {
      note: null,
      isEditing: false,
    }
  },
  getters: {},
  actions: {
    setNoteDetails(note: NoteState): void {
      this.note = note
    },
    changeEditingState(state: boolean): void {
      this.isEditing = state
    },
  },
})

export const useNoteDetailsState = () => storeToRefs(useNoteDetailsStore())

export const useNoteDetailsGetters = () => storeToRefs(useNoteDetailsStore())

export const useNoteDetailsActions = () => useNoteDetailsStore()

export const clearNoteDetailsState = () => useNoteDetailsStore().$reset()
