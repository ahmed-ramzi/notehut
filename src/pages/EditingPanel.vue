<template>
  <main>
    <section class="flex items-center gap-4 w-full">
      <ActionBtn icon="<" label="Back" @click="onClickBack" />
      <input
        ref="noteTitle"
        v-model="noteLabel"
        data-test="titleArea"
        type="text"
        name="title"
        :placeholder="noteLabel || 'New note'"
        class="font-extralight text-3xl text-slate-500 w-full bg-transparent outline-none rounded-md"
      />
    </section>

    <section class="h-full mt-2">
      <textarea
        v-model="noteContent"
        data-test="textArea"
        name="contents"
        class="w-full h-full rounded-md outline-none text-slate-500 bg-transparent font-light resize-none"
        :placeholder="noteContent || 'Jot something here...'"
      ></textarea>
    </section>

    <section v-if="last_modified_by" class="text-right">
      <span class="text-xs font-thin italic text-slate-500">
        Updated by
        {{ last_modified_by }}
      </span>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { onUnmounted, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
// import HeaderSection from "../layouts/HeaderSection.vue"
import { useNoteDetailsState, useNoteDetailsActions, clearNoteDetailsState } from "../store/noteDetails"
import ActionBtn from "@/components/icons/ActionBtn.vue"
import { useNotesListActions } from "@/store/notesList"

const route = useRoute()
const router = useRouter()

const groupId = route.params.groupId as string

const { note: noteFromStore, isEditing } = useNoteDetailsState()
const { updateNoteTitle, updateNoteContent, updateSharedNoteContent, updateSharedNoteTitle, changeEditingState } = useNoteDetailsActions()

const noteLabel = ref(noteFromStore.value?.title ? noteFromStore.value?.title : "")
const noteContent = ref(noteFromStore.value?.contents ? noteFromStore.value?.contents : "")

// @ts-ignore
const last_modified_by = ref(noteFromStore.value?.last_modified_by)

const { getPrivateNotesList, getSharedNotesList } = useNotesListActions()

const onClickBack = async (): Promise<void> => {
  if (isEditing.value) {
    changeEditingState(false)
    clearNoteDetailsState()
    if (groupId) {
      getSharedNotesList(groupId)
    } else {
      getPrivateNotesList()
    }
  }
  router.back()
}

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

<style scoped>
main {
  @apply h-screen p-3 flex flex-col justify-between;
}
textarea {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
textarea::-webkit-scrollbar {
  display: none;
}
</style>
