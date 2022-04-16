import { defineStore, storeToRefs } from "pinia"
import { NoteState } from "types/states"
import mockNotes from "../composables/useMockNotes"

type NotesList = {
  notes: NoteState[] | null
}

interface NotesListActions {
  getNotesList(): void
  createNewNote(note: NoteState): void
  updateNoteLabel(note: NoteState): void
}

const useNotesListStore = defineStore<string, NotesList, {}, NotesListActions>("notesList", {
  state: () => {
    return {
      notes: [],
    }
  },
  getters: {},

  actions: {
    getNotesList(): void {
      this.notes = mockNotes
    },
    createNewNote(note: NoteState): void {
      this.notes?.push(note)
    },

    updateNoteLabel(note: NoteState): void {
      // const objIndex = this.notes?.findIndex((obj => obj.id == note.id));
      // console.log(this.notes?[objIndex])
    },
  },
})

export const useNotesListState = () => storeToRefs(useNotesListStore())

export const useNotesListGetters = () => storeToRefs(useNotesListStore())

export const useNotesListActions = () => useNotesListStore()

export const clearNotesListState = (): void => useNotesListStore().$reset()
