<template>
  <section class="h-screen">
    <div class="p-4 space-y-6">
      <!-- The header -->
      <HeaderSection headerLabel="notehut">
        <div class="flex items-center space-x-2">
          <SearchIcon />
          <ActionBtn icon="+" label="Create Note" @click="createNote" />
        </div>
      </HeaderSection>

      <!-- Note List -->
      <section v-if="notes" class="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        <BaseNote v-for="note in notes.slice().reverse()" :key="note.id" :note="note" :color="note.color" @click="openNote(note)" />
      </section>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue"
import SearchIcon from "../components/icons/SearchIcon.vue"
import { NoteState } from "../types/states"
import BaseNote from "../components/base/BaseNote.vue"
import ActionBtn from "../components/icons/ActionBtn.vue"
import { useRouter } from "vue-router"
import { useNoteDetailsActions, clearNoteDetailsState } from "../store/noteDetails"
import { useNotesListState, useNotesListActions } from "../store/notesList"
import HeaderSection from "../layouts/HeaderSection.vue"

export default defineComponent({
  components: {
    SearchIcon,
    BaseNote,
    ActionBtn,
    HeaderSection,
  },
  setup() {
    const router = useRouter()

    const { setNoteDetails, changeEditingState } = useNoteDetailsActions()

    const { getNotesList, createNewNote } = useNotesListActions()
    const { notes } = useNotesListState()

    const createNote = (): void => {
      clearNoteDetailsState()
      const note = {
        id: notes.value?.length ? notes.value?.length + 1 : 1,
        title: "",
        contents: "",
        color: "teal",
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

    onMounted(() => {
      getNotesList()
    })

    return {
      createNote,
      notes,
      openNote,
    }
  },
})
</script>
