<template>
  <section class="flex justify-between items-center">
    <div class="flex items-center" :class="backBtn ? 'space-x-2' : null">
      <ActionBtn v-if="backBtn" icon="<" label="Back" class="mt-2" @click="onClickBack" />
      <h1 class="font-normal">{{ headerLabel }}</h1>
    </div>
    <div class="flex">
      <div>
        <slot />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import ActionBtn from "../components/icons/ActionBtn.vue"
import { useRoute, useRouter } from "vue-router"
import { clearNoteDetailsState, useNoteDetailsActions, useNoteDetailsState } from "../store/noteDetails"
import { useNotesListActions } from "@/store/notesList"

const props = defineProps({
  headerLabel: {
    type: String,
    default: "",
  },
  backBtn: {
    type: String,
    default: "",
  },
})

const router = useRouter()
const route = useRoute()

const { changeEditingState } = useNoteDetailsActions()
const { isEditing } = useNoteDetailsState()
const { getPrivateNotesList, getSharedNotesList } = useNotesListActions()

const groupId = route.params.groupId as string

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
  if (props.backBtn === "back") {
    console.log("go back")
    router.back()
  } else {
    console.log("props")
    await router.push({ name: props.backBtn })
  }
}
</script>
