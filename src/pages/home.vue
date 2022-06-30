<template>
  <div class="h-screen overflow-scroll relative">
    <div class="fixed h-[67px] bg-white w-full blur-sm"></div>
    <HeaderSection headerLabel="notehut" class="fixed px-4 py-2 w-full bg-white">
      <div class="flex space-x-2">
        <SearchIcon />
        <ActionBtn icon="+" label="Create Note" @click="createNote" />
      </div>
    </HeaderSection>
    <div class="h-[66px] w-full"></div>

    <div v-if="notes" class="px-4 py-1 grid grid-cols-2 gap-4 items-start md:grid-cols-4 lg:grid-cols-6">
      <BaseNote v-for="note in notes.slice().reverse()" :key="note.id" :note="note" :color="note.color" @click="openNote(note)" />
    </div>

    <div class="rounded-t-3xl h-16 w-full"></div>
    <div class="fixed bottom-0 bg-slate-800 rounded-t-3xl h-16 w-full"></div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from "vue"
import SearchIcon from "../components/icons/SearchIcon.vue"
import { NoteState } from "../types/states"
import BaseNote from "../components/base/BaseNote.vue"
import ActionBtn from "../components/icons/ActionBtn.vue"
import { useRouter } from "vue-router"
import { useNoteDetailsActions, clearNoteDetailsState } from "../store/noteDetails"
import { useNotesListState, useNotesListActions } from "../store/notesList"
import HeaderSection from "../layouts/HeaderSection.vue"
import { randomColor } from "../composables/useRandomColor"
import { useUserState } from "../store/user"
import { useAuthState } from "../store/auth"

const router = useRouter()

const { setNoteDetails, changeEditingState } = useNoteDetailsActions()

const { getNotesList, createNewNote } = useNotesListActions()
const { notes } = useNotesListState()

const { isLoggedIn } = useAuthState()

const createNote = (): void => {
  clearNoteDetailsState()
  const note = {
    id: notes.value?.length ? notes.value?.length + 1 : 1,
    title: "",
    contents: "",
    color: randomColor(),
  } as NoteState

  createNewNote(note)
  setNoteDetails(note)
  changeEditingState(true)
  router.push({ name: "notePanel" })
}

const openNote = (note: NoteState): void => {
  setNoteDetails(note)
  changeEditingState(true)
  router.push({ name: "notePanel" })
}

onBeforeMount(() => {
  if (!isLoggedIn.value) {
    router.push({ name: "login" })
  }
})

onMounted(() => {
  getNotesList()
})
</script>
