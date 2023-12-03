<template>
  <div
    class="flex justify-center items-center cursor-pointer rounded-full h-14 w-14 ring-8 ring-white"
    :class="[gradientColorClass(btnColor), hideBtn ? 'hidden' : null]"
    @click="create"
  >
    <Icon name="pencil" class="w-8 h-8 text-white active:opacity-60 duration-300" />
  </div>
</template>

<script lang="ts" setup>
import { gradientColorClass } from "@/composables/useRandomColor"
import { useNoteDetailsActions } from "@/store/noteDetails"
import { useNotesListGetters } from "@/store/notesList"
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"

const props = defineProps({
  ignoreHiddingBtn: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: "hideBtnShadow", value: boolean): void
}>()

const { createNote } = useNoteDetailsActions()
const router = useRouter()

const route = useRoute()
const groupId = (route.params.groupId as string) || ""

const { privateNotesCount, sharedNotesCount } = useNotesListGetters()

const hideBtn = computed((): boolean => {
  if (groupId && !sharedNotesCount.value && !props.ignoreHiddingBtn) {
    emit("hideBtnShadow", true)
    return true
  } else if (!groupId && !privateNotesCount.value && !props.ignoreHiddingBtn) {
    emit("hideBtnShadow", true)
    return true
  }
  emit("hideBtnShadow", false)
  return false
})

const create = async (): Promise<void> => {
  if (groupId) {
    createNote(true)
    await router.push({ name: "EditPanel", params: { groupId }, query: { new: "true" } })
  } else {
    createNote()
    await router.push({ name: "EditPanel", query: { new: "true" } })
  }
}
// const btnColor = randomColor() as string
const btnColor = "amber"
</script>
