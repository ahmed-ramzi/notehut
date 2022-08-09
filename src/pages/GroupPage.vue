<template>
  <MenuLayout back-btn="GroupsPage" header-label="shared notes" footer @close="getSearch">
    <div v-if="isLoading" class="centered">
      <Spinner />
    </div>
    <div v-else-if="sharedNotesCount" class="pb-2">
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
import { useNotesListState, useNotesListGetters, useNotesListActions } from "@/store/notesList"
import Spinner from "@/components/base/Spinner.vue"
import { useAppState } from "@/store/app"
import CreateNoteIcon from "@/components/icons/CreateNoteIcon.vue"
import MenuLayout from "@/layouts/MenuLayout.vue"
import { computed, onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { useBreakpoints } from "@vueuse/core"
import NoteCard from "@/components/notes/NoteCard.vue"

const breakpoints = useBreakpoints({
  xs: 436,
  sm: 608,
})

const superSmall = breakpoints.smaller("xs")
const smallScreen = breakpoints.between("xs", "sm")

const { sharedNotesCount } = useNotesListGetters()
const { shared_notes } = useNotesListState()
const { getSharedNotesList } = useNotesListActions()
const { isLoading } = useAppState()

const route = useRoute()

const groupId = route.params.groupId as string

const search = ref("")

const filteredNotes = computed(() => {
  return shared_notes.value?.filter((item) => item.title.toLowerCase().includes(search.value.toLowerCase()) || item.contents.toLowerCase().includes(search.value.toLowerCase()))
})

const getSearch = (value: string) => {
  search.value = value
}

onMounted(() => {
  if (!sharedNotesCount.value) {
    getSharedNotesList(groupId)
  }
})

watch(
  () => route.params.groupId,
  () => {
    getSharedNotesList(route.params.groupId as string)
  },
)
</script>
