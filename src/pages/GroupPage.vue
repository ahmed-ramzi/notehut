<template>
  <MenuLayout back-btn="GroupsPage" header-label="shared notes" footer>
    <div v-if="isLoading" class="centered">
      <Spinner />
    </div>
    <div v-else-if="sharedNotesCount" class="pb-2 notes-container">
      <BaseNote v-for="note in shared_notes?.slice().reverse()" :key="note.id" :note="note" :color="note.color" />
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
import BaseNote from "@/components/base/BaseNote.vue"
import { useNotesListState, useNotesListGetters, useNotesListActions } from "@/store/notesList"
import Spinner from "@/components/base/Spinner.vue"
import { useAppState } from "@/store/app"
import CreateNoteIcon from "@/components/icons/CreateNoteIcon.vue"
import MenuLayout from "@/layouts/MenuLayout.vue"
import { onMounted } from "vue"
import { useRoute } from "vue-router"

const { sharedNotesCount } = useNotesListGetters()
const { shared_notes } = useNotesListState()
const { getSharedNotesList } = useNotesListActions()
const { isLoading } = useAppState()

const route = useRoute()

const groupId = route.params.groupId as string

onMounted(() => {
  if (!sharedNotesCount.value) {
    getSharedNotesList(groupId)
  }
})
</script>

<style scoped>
.notes-container {
  @apply grid gap-4 items-start;
}
/*
@media (max-width: 459px) {
  .notes-container {
    @apply grid-cols-1;
  }
  .layout-btn {
    @apply hidden;
  }
}
@media (min-width: 460px) {
  .notes-container {
    @apply grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5;
  }
} */

.notes-container {
  @apply grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5;
}
</style>
