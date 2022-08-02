import { randomColor } from "@/composables/useRandomColor"
import { defineStore, storeToRefs } from "pinia"
import { PrivateNote, SharedNote } from "../types/states"
import { useNotesListActions, useNotesListGetters, useNotesListState } from "./notesList"
import useDate from "@/composables/useDate"
import { useUserState } from "./user"

type NoteDetail = {
  note: PrivateNote | SharedNote | undefined
  isEditing: boolean
}

interface NoteDetailsAction {
  createNote(shared?: boolean): void
  setNoteDetails(note: PrivateNote): void
  changeEditingState(state: boolean): void
  updateNoteTitle(title: string): void
  updateNoteContent(contents: string): void
  updateSharedNoteTitle(title: string, groupId: string): void
  updateSharedNoteContent(contents: string, groupId: string): void
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
    setNoteDetails(note: PrivateNote): void {
      this.note = note
    },

    changeEditingState(state: boolean): void {
      this.isEditing = state
    },

    createNote(shared?: boolean): void {
      if (shared) {
        const { shared_notes } = useNotesListState()
        const { sharedNotesCount } = useNotesListGetters()
        const { user } = useUserState()

        const shared_note = {
          id: shared_notes.value?.length ? sharedNotesCount.value + 1 : 1,
          title: "",
          contents: "",
          color: randomColor(),
          created_date: useDate.shortDate(),
          last_modified: useDate.shortDate(),
          created_by: user.value?.name,
          last_modified_by: user.value?.name,
        } as SharedNote

        this.isEditing = true
        this.setNoteDetails(shared_note)
      } else {
        const { notes } = useNotesListState()
        const { privateNotesCount } = useNotesListGetters()

        const note = {
          id: notes.value?.length ? privateNotesCount.value + 1 : 1,
          title: "",
          contents: "",
          color: randomColor(),
          created_date: useDate.shortDate(),
          last_modified: useDate.shortDate(),
        } as PrivateNote

        this.isEditing = true
        this.setNoteDetails(note)
      }
    },

    updateNoteTitle(title: string): void {
      const { removePrivateNoteFromDB, uploadPrivateNoteToDB } = useNotesListActions()
      if (this.note) {
        removePrivateNoteFromDB(this.note)
        this.note.title = title
        this.note.last_modified = useDate.shortDate()
        uploadPrivateNoteToDB(this.note)
      }
    },
    updateNoteContent(contents: string): void {
      const { removePrivateNoteFromDB, uploadPrivateNoteToDB } = useNotesListActions()
      if (this.note) {
        removePrivateNoteFromDB(this.note)
        this.note.contents = contents
        this.note.last_modified = useDate.shortDate()
        uploadPrivateNoteToDB(this.note)
      }
    },

    updateSharedNoteTitle(title: string, groupId: string): void {
      const { uploadSharedNoteToDB, removeSharedNoteFromDB } = useNotesListActions()
      if (this.note) {
        removeSharedNoteFromDB(this.note as SharedNote, groupId)
        this.note.title = title
        this.note.last_modified = useDate.shortDate()
        uploadSharedNoteToDB(this.note as SharedNote, groupId)
      }
    },
    updateSharedNoteContent(contents: string, groupId: string): void {
      const { uploadSharedNoteToDB, removeSharedNoteFromDB } = useNotesListActions()
      if (this.note) {
        removeSharedNoteFromDB(this.note as SharedNote, groupId)
        this.note.contents = contents
        this.note.last_modified = useDate.shortDate()
        uploadSharedNoteToDB(this.note as SharedNote, groupId)
      }
    },
  },
})

export const useNoteDetailsState = () => storeToRefs(useNoteDetailsStore())

export const useNoteDetailsGetters = () => storeToRefs(useNoteDetailsStore())

export const useNoteDetailsActions = () => useNoteDetailsStore()

export const clearNoteDetailsState = () => useNoteDetailsStore().$reset()
