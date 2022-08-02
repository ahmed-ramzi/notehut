<template>
  <MenuLayout header-label="notehut" footer>
    <template #Header>
      <div class="flex space-x-2">
        <LayoutIcon class="layout-btn" />
      </div>
    </template>
    <div v-if="isLoading" class="centered">
      <Spinner />
    </div>
    <div v-else-if="privateNotesCount" class="pb-2 notes-container">
      <BaseNote v-for="note in notes?.slice().reverse()" :key="note.id" :note="note" :color="note.color" />
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
import { useNotesListState, useNotesListGetters } from "@/store/notesList"
import Spinner from "@/components/base/Spinner.vue"
import { useAppState } from "@/store/app"
import LayoutIcon from "@/components/icons/LayoutIcon.vue"
import CreateNoteIcon from "@/components/icons/CreateNoteIcon.vue"
import MenuLayout from "@/layouts/MenuLayout.vue"

const { privateNotesCount } = useNotesListGetters()
const { notes } = useNotesListState()
const { isLoading } = useAppState()
</script>

<style scoped>
.notes-container {
  @apply grid gap-4 items-start;
}

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
}
</style>
