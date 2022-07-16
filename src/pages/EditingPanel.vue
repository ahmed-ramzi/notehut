<template>
  <div class="h-screen p-4 space-y-4 flex flex-col">
    <HeaderSection back-btn="home"></HeaderSection>
    <input
      ref="noteTitle"
      v-model="noteLabel"
      type="text"
      name="title"
      :placeholder="noteLabel || 'New note'"
      class="font-extralight text-3xl text-slate-500 w-full outline-none rounded-md"
    />
    <div></div>

    <textarea
      v-model="noteContent"
      name="contents"
      class="w-full h-full rounded-md outline-none text-slate-500 font-light resize-none"
      :placeholder="noteContent || 'Jot something here...'"
    ></textarea>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref, watch } from "vue"
import HeaderSection from "../layouts/HeaderSection.vue"
import { useNoteDetailsState, useNoteDetailsActions, clearNoteDetailsState } from "../store/noteDetails"

const { note: noteFromStore } = useNoteDetailsState()
const { updateNoteTitle, updateNoteContent } = useNoteDetailsActions()

const noteLabel = ref(noteFromStore.value?.title ? noteFromStore.value?.title : "")
const noteContent = ref(noteFromStore.value?.contents ? noteFromStore.value?.contents : "")

watch(
  () => noteLabel.value,
  () => {
    updateNoteTitle(noteLabel.value)
  },
)

watch(
  () => noteContent.value,
  () => {
    updateNoteContent(noteContent.value)
  },
)

onUnmounted(() => {
  clearNoteDetailsState()
})
</script>

<style scoped>
/* @media (max-height: 459px) {
  textarea {
    @apply mb-12;
  }
}

@media (min-height: 460px) {
  textarea {
    @apply mb-7;
  }
} */
</style>
