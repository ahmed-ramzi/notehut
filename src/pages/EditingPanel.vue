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

    <!-- <textarea
      v-model="noteContent"
      name="contents"
      class="w-full h-full rounded-md outline-none text-slate-500 bg-transparent font-light resize-none"
      :placeholder="noteContent || 'Jot something here...'"
    ></textarea> -->
    <ContentEditor v-model="noteContent" />

    <div v-if="last_modified_by" class="text-right">
      <span class="text-xs font-thin italic text-slate-500">
        Updated by
        {{ last_modified_by }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import HeaderSection from "../layouts/HeaderSection.vue"
import { useNoteDetailsState, useNoteDetailsActions, clearNoteDetailsState } from "../store/noteDetails"
import ContentEditor from "@/components/ContentEditor.vue"

const route = useRoute()
const groupId = route.params.groupId as string

const { note: noteFromStore } = useNoteDetailsState()
const { updateNoteTitle, updateNoteContent, updateSharedNoteContent, updateSharedNoteTitle } = useNoteDetailsActions()

const noteLabel = ref(noteFromStore.value?.title ? noteFromStore.value?.title : "")
const noteContent = ref(noteFromStore.value?.contents ? noteFromStore.value?.contents : "")

// @ts-ignore
const last_modified_by = ref(noteFromStore.value?.last_modified_by)

watch(
  () => noteLabel.value,
  () => {
    if (groupId) {
      updateSharedNoteTitle(noteLabel.value, groupId)
    } else {
      updateNoteTitle(noteLabel.value)
    }
  },
)

watch(
  () => noteContent.value,
  () => {
    if (groupId) {
      updateSharedNoteContent(noteContent.value, groupId)
    } else {
      updateNoteContent(noteContent.value)
    }
  },
)

onUnmounted(() => {
  clearNoteDetailsState()
})
</script>
