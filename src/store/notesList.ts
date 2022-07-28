import { defineStore, storeToRefs } from "pinia"
import { NoteState } from "../types/states"
import mockNotes from "../composables/useMockNotes"
import db from "@/firestore"
import { useUserState } from "./user"
import { arrayRemove, arrayUnion } from "firebase/firestore"
import { markRaw } from "vue"
import { useAppState } from "./app"

export const notesCollection = db.collection("notes")

type NotesList = {
  notes: NoteState[] | null
}

type NotesListGetters = {
  notesCount(state: NotesList): number
}

interface NotesListActions {
  getNotesList(): void
  createNewNote(note: NoteState): void
  addMockData(): Promise<void>
  removeNoteFromDB(note: NoteState): void
  uploadNoteToDB(note: NoteState): void
}

const useNotesListStore = defineStore<string, NotesList, NotesListGetters, NotesListActions>("notesList", {
  state: () => {
    return {
      notes: [],
    }
  },
  getters: {
    notesCount(state: NotesList): number {
      return state.notes?.length || 0
    },
  },

  actions: {
    async getNotesList(): Promise<void> {
      const { isLoading } = useAppState()
      const { user } = useUserState()
      try {
        isLoading.value = true
        const collection = await notesCollection.doc(user.value?.id).get()
        const data = collection.data()?.notes as []
        this.notes = data
        isLoading.value = false
      } catch (e) {
        isLoading.value = false
        console.log(e)
        alert("Something went wrong. \nContact Ahmed...")
      }
    },
    createNewNote(note: NoteState): void {
      try {
        this.uploadNoteToDB(note)
        this.notes?.push(note)
      } catch (e) {
        console.log(e)
        alert("Something went wrong. \nContact Ahmed...")
      }
    },

    async addMockData(): Promise<void> {
      const { user } = useUserState()

      const randomNotes = mockNotes[Math.floor(Math.random() * mockNotes.length)]

      await notesCollection.doc(user.value?.id).update({
        notes: arrayUnion(markRaw(randomNotes as NoteState)),
      })
    },

    removeNoteFromDB(note: NoteState): void {
      const { user } = useUserState()
      notesCollection.doc(user.value?.id).update({
        notes: arrayRemove(note),
      })
    },

    uploadNoteToDB(note: NoteState): void {
      const { user } = useUserState()
      notesCollection.doc(user.value?.id).update({
        notes: arrayUnion(note),
      })
    },
  },
})

export const useNotesListState = () => storeToRefs(useNotesListStore())

export const useNotesListGetters = () => storeToRefs(useNotesListStore())

export const useNotesListActions = () => useNotesListStore()

export const clearNotesListState = (): void => useNotesListStore().$reset()
