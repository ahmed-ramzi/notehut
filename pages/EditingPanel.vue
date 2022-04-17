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

<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch } from "vue"
import HeaderSection from "../layouts/HeaderSection.vue"
import { useNoteDetailsState, useNoteDetailsActions, clearNoteDetailsState } from "../store/noteDetails"
import { NoteState } from "../types/states"
import { useRouter } from "vue-router"

export default defineComponent({
  components: {
    HeaderSection,
  },
  setup() {
    const router = useRouter()
    const { note: noteFromStore, isEditing } = useNoteDetailsState()

    const noteLabel = ref(noteFromStore.value?.title ? noteFromStore.value?.title : "")
    const noteContent = ref(noteFromStore.value?.contents ? noteFromStore.value?.contents : "")

    // watch(
    //   () => noteLabel.value,
    //   () =>
    // )

    onBeforeMount(() => {
      if (!isEditing.value) {
        router.push({ name: "home" })
      }
    })

    return {
      noteLabel,
      noteContent,
    }
  },
})
</script>
