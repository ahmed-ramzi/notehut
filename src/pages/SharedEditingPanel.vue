<template>
  <div class="h-screen p-4 space-y-4 flex flex-col">
    <HeaderSection back-btn="back"></HeaderSection>
    <input
      ref="noteTitle"
      v-model="noteLabel"
      type="text"
      name="title"
      :placeholder="noteLabel || 'New note'"
      class="font-extralight text-3xl text-slate-500 w-full bg-transparent outline-none rounded-md"
    />
    <div></div>

    <textarea
      v-model="noteContent"
      name="contents"
      class="w-full h-full rounded-md outline-none text-slate-500 bg-transparent font-light resize-none"
      :placeholder="noteContent || 'Jot something here...'"
    ></textarea>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import HeaderSection from "../layouts/HeaderSection.vue"
import { useNoteDetailsState, useNoteDetailsActions, clearNoteDetailsState } from "../store/noteDetails"

const route = useRoute()
const groupId = route.params.groupId as string

const { note: noteFromStore } = useNoteDetailsState()
const { updateSharedNoteContent, updateSharedNoteTitle } = useNoteDetailsActions()

const noteLabel = ref(noteFromStore.value?.title ? noteFromStore.value?.title : "")
const noteContent = ref(noteFromStore.value?.contents ? noteFromStore.value?.contents : "")

watch(
  () => noteLabel.value,
  () => {
    updateSharedNoteTitle(noteLabel.value, groupId)
  },
)

watch(
  () => noteContent.value,
  () => {
    updateSharedNoteContent(noteContent.value, groupId)
  },
)

onUnmounted(() => {
  clearNoteDetailsState()
})
</script>
