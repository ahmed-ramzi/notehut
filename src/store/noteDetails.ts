import { randomColor } from "@/composables/useRandomColor"
import { defineStore, storeToRefs } from "pinia"
import { NoteState } from "../types/states"
import moment from "moment"
import { useNotesListActions, useNotesListGetters, useNotesListState } from "./notesList"
import useDate from "@/composables/useDate"

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

      const note = {
        id: notes.value?.length ? notesCount.value + 1 : 1,
        title: "",
        contents: "",
        color: randomColor(),
        created_date: useDate.shortDate(),
        last_modified: useDate.shortDate(),
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
        this.note.last_modified = useDate.shortDate()
        uploadNoteToDB(this.note)
      }
    },
    updateNoteContent(contents: string): void {
      const { uploadNoteToDB, removeNoteFromDB } = useNotesListActions()
      if (this.note) {
        removeNoteFromDB(this.note)
        this.note.contents = contents
        this.note.last_modified = useDate.shortDate()
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
