<template>
  <div class="h-full overflow-scroll relative">
    <div class="fixed h-[67px] bg-white blur-sm w-full z-20"></div>
    <HeaderSection headerLabel="notehut" class="fixed px-4 py-2 w-full z-20 bg-white">
      <div class="flex space-x-2">
        <LayoutIcon />
        <!-- <ActionBtn v-if="notesCount" icon="+" label="Create Note" @click="createNote" /> -->
      </div>
    </HeaderSection>
    <div class="h-[67px] w-full bg-transparent z-20"></div>

    <div v-if="isLoading" class="flex justify-center items-center text-center h-[60%]">
      <Spinner />
    </div>
    <div v-else-if="notesCount" class="px-4 py-1 grid grid-cols-2 gap-4 items-start md:grid-cols-4 lg:grid-cols-6">
      <BaseNote v-for="note in notes?.slice().reverse()" :key="note.id" :note="note" :color="note.color" />
    </div>
    <div v-else class="inline-flex flex-col justify-center items-center w-full h-[60%]">
      <p>You have no notes</p>
      <div class="inline-flex flex-col">
        <p class="inline-flex items-center">
          <span> Create a new note by clicking on the </span>
          <span class="px-2">
            <CreateNoteIcon />
          </span>
          <span> button </span>
        </p>
      </div>
    </div>
    <FooterNavigator />
    <SideNavigator v-if="isMenuActive" />
  </div>
</template>

<script lang="ts" setup>
import { NoteState } from "@ts/states"
import BaseNote from "@/components/base/BaseNote.vue"
import ActionBtn from "@/components/icons/ActionBtn.vue"
import { useRouter } from "vue-router"
import { useNoteDetailsActions, clearNoteDetailsState } from "@/store/noteDetails"
import { useNotesListState, useNotesListActions, useNotesListGetters } from "@/store/notesList"
import HeaderSection from "@/layouts/HeaderSection.vue"
import { randomColor } from "@/composables/useRandomColor"
import Spinner from "@/components/base/Spinner.vue"
import { useAppState } from "@/store/app"
import LayoutIcon from "@/components/icons/LayoutIcon.vue"
import CreateNoteIcon from "@/components/icons/CreateNoteIcon.vue"
import { useNavState } from "@/store/navigators"
import FooterNavigator from "@/components/navigators/FooterNavigator.vue"
import SideNavigator from "@/components/navigators/SideNavigator.vue"

const router = useRouter()

const { setNoteDetails, changeEditingState } = useNoteDetailsActions()

const { isMenuActive } = useNavState()

const { createNewNote } = useNotesListActions()
const { notesCount } = useNotesListGetters()
const { notes } = useNotesListState()

const { isLoading } = useAppState()

// const create= (): void => {
//   clearNoteDetailsState()
//   const note = {
//     id: notes.value?.length ? notesCount.value + 1 : 1,
//     title: "",
//     contents: "",
//     color: randomColor(),
//   } as NoteState

//   changeEditingState(true)
//   router.push({ name: "notePanel" })
//   createNewNote(note)
//   setNoteDetails(note)
// }
</script>
