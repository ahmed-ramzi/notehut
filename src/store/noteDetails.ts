import { defineStore, storeToRefs } from "pinia"
import { NoteState } from "../types/states"

type NoteDetail = {
  note: NoteState | undefined
  isEditing: Boolean
}

interface NoteDetailsAction {
  setNoteDetails(note: NoteState): void
  changeEditingState(state: boolean): void
  updateNoteTitle(title: string): void
  updateNoteContent(contents: string): void
}

const useNoteDetailsStore = defineStore<string, NoteDetail, Record<string, never>, NoteDetailsAction>("noteDetail", {
  state: () => {
    return {
      note: undefined,
      isEditing: false,
    }
  },
  getters: {},
  actions: {
    setNoteDetails(note: NoteState): void {
      this.note = note
    },
    updateNoteTitle(title: string): void {
      if (this.note) {
        this.note.title = title
      }
    },
    updateNoteContent(contents: string): void {
      if (this.note) {
        this.note.contents = contents
      }
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
