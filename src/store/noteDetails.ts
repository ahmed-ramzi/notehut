import { randomColor } from "@/composables/useRandomColor"
import { arrayRemove, arrayUnion } from "firebase/firestore"
import { defineStore, storeToRefs } from "pinia"
import { NoteState } from "../types/states"
import { notesCollection, useNotesListActions, useNotesListGetters, useNotesListState } from "./notesList"
import { useUserState } from "./user"

type NoteDetail = {
  note: NoteState | undefined
  isEditing: Boolean
}

interface NoteDetailsAction {
  createNote(): void
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
    createNote(): void {
      const { notes } = useNotesListState()
      const { notesCount } = useNotesListGetters()
      const { createNewNote } = useNotesListActions()

      const note = {
        id: notes.value?.length ? notesCount.value + 1 : 1,
        title: "",
        contents: "",
        color: randomColor(),
      } as NoteState

      this.isEditing = true
      this.note = note
      this.setNoteDetails(note)
      // router.push({ name: "notePanel" })
    },
    setNoteDetails(note: NoteState): void {
      this.note = note
    },
    updateNoteTitle(title: string): void {
      const { uploadNoteToDB, removeNoteFromDB } = useNotesListActions()
      if (this.note) {
        removeNoteFromDB(this.note)
        this.note.title = title
        uploadNoteToDB(this.note)
      }
    },
    updateNoteContent(contents: string): void {
      const { uploadNoteToDB, removeNoteFromDB } = useNotesListActions()
      if (this.note) {
        removeNoteFromDB(this.note)
        this.note.contents = contents
        uploadNoteToDB(this.note)
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
