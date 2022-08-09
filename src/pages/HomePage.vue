<template>
  <MenuLayout header-label="notehut" header-bold footer @close="getSearch">
    <template #Header>
      <div class="flex space-x-2">
        <!-- <LayoutIcon class="layout-btn" /> -->
      </div>
    </template>
    <div v-if="isLoading" class="centered">
      <Spinner />
    </div>
    <div v-else-if="privateNotesCount" class="pb-2">
      <MasonryWall :items="filteredNotes" :column-width="superSmall ? 150 : smallScreen ? 200 : 250" :gap="4">
        <template #default="{ item, index }">
          <NoteCard :note="item" :color="item.color" />
        </template>
      </MasonryWall>
    </div>
    <div v-else class="centered">
      <div class="inline-flex flex-col justify-center items-center w-full">
        <p>You have no notes</p>
        <div class="inline-flex flex-col">
          <p class="inline-flex items-center">
            <span class="whitespace-nowrap"> Create a new note by clicking on the </span>
            <span class="px-2">
              <CreateNoteIcon ignore-hidding-btn />
            </span>
            <span> button </span>
          </p>
        </div>
      </div>
    </div>
  </MenuLayout>
</template>

<script lang="ts" setup>
import { useNotesListState, useNotesListGetters } from "@/store/notesList"
import Spinner from "@/components/base/Spinner.vue"
import { useAppState } from "@/store/app"
import CreateNoteIcon from "@/components/icons/CreateNoteIcon.vue"
import MenuLayout from "@/layouts/MenuLayout.vue"
import { computed, ref } from "vue"
import { useBreakpoints } from "@vueuse/core"
import NoteCard from "@/components/notes/NoteCard.vue"

const breakpoints = useBreakpoints({
  xs: 436,
  sm: 608,
})

const superSmall = breakpoints.smaller("xs")
const smallScreen = breakpoints.between("xs", "sm")

const { privateNotesCount } = useNotesListGetters()
const { notes } = useNotesListState()
const { isLoading } = useAppState()

const search = ref("")

const filteredNotes = computed(() => {
  return notes.value?.filter((item) => item.title.toLowerCase().includes(search.value.toLowerCase()) || item.contents.toLowerCase().includes(search.value.toLowerCase()))
})

const getSearch = (value: string) => {
  search.value = value
}
</script>
