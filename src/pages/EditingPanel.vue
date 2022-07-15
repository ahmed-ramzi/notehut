<template>
  <!-- <div class="h-full px-4 border-4 space-y-4"> -->
  <HeaderSection backBtn="home" class="p-4"></HeaderSection>
  <input
    type="text"
    name="title"
    v-model="noteLabel"
    :placeholder="noteLabel || 'New note'"
    class="font-extralight text-3xl text-slate-500 py-4 px-6 w-full outline-none rounded-md"
    ref="noteTitle"
  />

  <textarea
    name="contents"
    class="w-full h-full rounded-md outline-none py-4 px-6 text-slate-500 font-light resize-none"
    v-model="noteContent"
    :placeholder="noteContent || 'Jot something here...'"
  ></textarea>
  <!-- </div> -->
</template>

<script lang="ts" setup>
import { onBeforeMount, onUnmounted, ref, watch } from "vue"
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
@media (max-height: 459px) {
  textarea {
    @apply mb-12;
  }
}

@media (min-height: 460px) {
  textarea {
    @apply mb-7;
  }
}
</style>
