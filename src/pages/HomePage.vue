<template>
  <DefaultLayout name="notehut" @search="getSearchValue">
    <div v-if="isLoading" class="centered">
      <Spinner />
    </div>
    <div v-else-if="privateNotesCount" class="pt-1 pb-2">
      <MasonryWall data-test="notesWall" :items="filteredNotes" :column-width="superSmall ? 150 : smallScreen ? 200 : 250" :gap="4">
        <template #default="{ item, index }">
          <NoteCard :note="item" :color="item.color" :note-index="index" />
        </template>
      </MasonryWall>
    </div>
    <NoNotes v-else />
  </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import { useNotesListState, useNotesListGetters } from "@/store/notesList"
import Spinner from "@/components/base/Spinner.vue"
import { useAppState } from "@/store/app"
import { computed, ref } from "vue"
import { useBreakpoints } from "@vueuse/core"
import NoteCard from "@/components/notes/NoteCard.vue"
import NoNotes from "@/components/notes/NoNotes.vue"

const breakpoints = useBreakpoints({
  xs: 436,
  sm: 608,
})

const superSmall = breakpoints.smaller("xs")
const smallScreen = breakpoints.between("xs", "sm")

const { privateNotesCount } = useNotesListGetters()
const { notes } = useNotesListState()
const { isLoading } = useAppState()

const search = ref<string>("")
const getSearchValue = (val: string) => {
  search.value = val
}

const filteredNotes = computed(() => {
  return notes.value?.filter((item) => item.title.toLowerCase().includes(search.value.toLowerCase()) || item.contents.toLowerCase().includes(search.value.toLowerCase())).reverse()
})
</script>
