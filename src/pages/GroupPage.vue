<template>
  <DefaultLayout :name="groupDetail?.name ? groupDetail?.name : ''" @search="getSearchValue">
    <div v-if="isLoading" class="centered">
      <Spinner />
    </div>

    <div v-else-if="sharedNotesCount" class="pb-2">
      <MasonryWall :items="filteredNotes" :column-width="superSmall ? 150 : smallScreen ? 200 : 250" :gap="4">
        <template #default="{ item, index }">
          <NoteCard :note="item" :color="item.color" :note-index="index" />
        </template>
      </MasonryWall>
    </div>
    <NoNotes v-else />
  </DefaultLayout>
</template>

<script lang="ts" setup>
import { useNotesListState, useNotesListGetters, useNotesListActions } from "@/store/notesList"
import Spinner from "@/components/base/Spinner.vue"
import { useAppState } from "@/store/app"
import { computed, onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { useBreakpoints } from "@vueuse/core"
import NoteCard from "@/components/notes/NoteCard.vue"
import { useGroupsState } from "@/store/groups"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import NoNotes from "@/components/notes/NoNotes.vue"

const breakpoints = useBreakpoints({
  xs: 436,
  sm: 608,
})

const superSmall = breakpoints.smaller("xs")
const smallScreen = breakpoints.between("xs", "sm")
const { groups } = useGroupsState()

const { sharedNotesCount } = useNotesListGetters()
const { shared_notes } = useNotesListState()
const { getSharedNotesList } = useNotesListActions()
const { isLoading } = useAppState()

const route = useRoute()

const groupId = computed(() => route.params.groupId as string)

const groupDetail = computed(() => {
  return groups.value?.find((g) => g.id === groupId.value)
})

const search = ref<string>("")

const getSearchValue = (val: string) => {
  search.value = val
}

const filteredNotes = computed(() => {
  return shared_notes.value
    ?.filter((item) => item.title.toLowerCase().includes(search.value.toLowerCase()) || item.contents.toLowerCase().includes(search.value.toLowerCase()))
    .reverse()
})

onMounted(() => {
  if (!sharedNotesCount.value) {
    getSharedNotesList(groupId.value)
  }
})

watch(
  () => route.params.groupId,
  () => {
    getSharedNotesList(route.params.groupId as string)
  },
)
</script>
