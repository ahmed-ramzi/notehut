import { defineStore, storeToRefs } from "pinia"
import { PrivateNote, SharedNote } from "../types/states"
import db from "@/firestore"
import { useUserState } from "./user"
import { arrayRemove, arrayUnion } from "firebase/firestore"
import { useAppState } from "./app"

export const privateNotesCollection = db.collection("notes")
export const sharedNotesCollection = db.collection("shared_notes")

type NotesListState = {
  notes: PrivateNote[] | null
  shared_notes: SharedNote[] | null
}

type NotesListGetters = {
  privateNotesCount(state: NotesListState): number
  sharedNotesCount(state: NotesListState): number
}

type NotesListActions = {
  getPrivateNotesList(): void
  removePrivateNoteFromDB(note: PrivateNote): void
  uploadPrivateNoteToDB(note: PrivateNote): void
  getSharedNotesList(groupId: string): Promise<void>
  removeSharedNoteFromDB(sharedNote: SharedNote, groupId: string): void
  uploadSharedNoteToDB(sharedNote: SharedNote, groupId: string): void
  clearSharedNotes(): void
}

const useNotesListStore = defineStore<string, NotesListState, NotesListGetters, NotesListActions>("notesList", {
  state: () => {
    return {
      notes: [],
      shared_notes: [],
    }
  },
  getters: {
    privateNotesCount(state: NotesListState): number {
      return state.notes?.length || 0
    },
    sharedNotesCount(state: NotesListState): number {
      return state.shared_notes?.length || 0
    },
  },

  actions: {
    // Private
    async getPrivateNotesList(): Promise<void> {
      const { isLoading } = useAppState()
      const { user } = useUserState()
      try {
        isLoading.value = true
        const collection = await privateNotesCollection.doc(user.value?.id).get()
        const data = collection.data()?.notes as []
        this.notes = data
        isLoading.value = false
      } catch (e) {
        isLoading.value = false
        console.log(e)
        alert("Something went wrong. \nContact Ahmed...")
      }
    },

    removePrivateNoteFromDB(note: PrivateNote): void {
      const { user } = useUserState()
      privateNotesCollection.doc(user.value?.id).update({
        notes: arrayRemove(note),
      })
    },

    uploadPrivateNoteToDB(note: PrivateNote): void {
      const { user } = useUserState()
      privateNotesCollection.doc(user.value?.id).update({
        notes: arrayUnion(note),
      })
    },
    // **** //

    // Shared
    async getSharedNotesList(groupId: string): Promise<void> {
      const { isLoading } = useAppState()
      try {
        isLoading.value = true
        const collection = await sharedNotesCollection.doc(groupId).get()
        const data = collection.data()?.notes as SharedNote[]
        this.shared_notes = data
        isLoading.value = false
      } catch (e) {
        isLoading.value = false
        console.log(e)
        alert("Something went wrong. \nContact Ahmed...")
      }
    },
    removeSharedNoteFromDB(sharedNote: SharedNote, groupId: string): void {
      sharedNotesCollection.doc(groupId).update({
        notes: arrayRemove(sharedNote),
      })
    },

    uploadSharedNoteToDB(sharedNote: SharedNote, groupId: string): void {
      sharedNotesCollection.doc(groupId).update({
        notes: arrayUnion(sharedNote),
      })
    },

    clearSharedNotes(): void {
      this.shared_notes = []
    },
    // **** //
  },
})

export const useNotesListState = () => storeToRefs(useNotesListStore())

export const useNotesListGetters = () => storeToRefs(useNotesListStore())

export const useNotesListActions = () => useNotesListStore()

export const clearNotesListState = (): void => useNotesListStore().$reset()
