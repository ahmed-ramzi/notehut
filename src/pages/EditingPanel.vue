<template>
  <section class="p-4 h-screen space-y-4">
    <HeaderSection backBtn="home"></HeaderSection>

    <div class="space-y-4">
      <input
        type="text"
        name="title"
        v-model="noteLabel"
        :placeholder="noteLabel || 'New note'"
        class="font-extralight text-3xl text-slate-500 w-full p-2 outline-none rounded-md"
        ref="noteTitle"
      />
      <textarea
        name="contents"
        rows="25"
        class="w-full h-max rounded-md outline-none px-2 py-2 text-slate-500 font-light resize-none"
        v-model="noteContent"
        :placeholder="noteContent || 'Jot something here...'"
      ></textarea>
    </div>
  </section>
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
