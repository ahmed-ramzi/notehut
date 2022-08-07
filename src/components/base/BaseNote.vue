<template>
  <section class="rounded-3xl cursor-pointer hover:scale-105 duration-500 relative pb-2" :class="[colorTheme]">
    <div class="absolute top-[10px] right-2 cursor-pointer z-10" @click="onDelete(note)">
      <DeleteIcon />
    </div>

    <div class="my-4 mx-2 space-y-2 cursor-pointer flex flex-col" @click="openNote(note)">
      <div class="max-w-[80%] min-h- md:max-w-[85%] max-h-12">
        <label :class="text" class="font-normal text-lg md:text-xl cursor-pointer">{{ note.title || "Untitled" }}</label>
      </div>

      <textarea
        v-model="note.contents"
        name="contents"
        class="pl-1 w-full text-sm md:text-lg outline-none text-white bg-transparent font-extralight resize-none cursor-pointer"
        disabled
      ></textarea>

      <div v-if="note.last_modified" class="rounded border-t-2 border-white">
        <small class="absolute bottom-1 right-3 md:right-5">
          <span class="text-xs font-thin italic text-white">
            Updated:
            {{ updated_time }}
          </span>
          <!-- <span v-if="groupId" class="text-xs font-thin italic text-white">
            by
            {{ last_modified_by }}
          </span> -->
        </small>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useNoteDetailsActions } from "@/store/noteDetails"
import { useNotesListActions } from "@/store/notesList"
import { onMounted, PropType, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { PrivateNote, SharedNote } from "../../types/states"
import DeleteIcon from "../icons/DeleteIcon.vue"
import useDate from "@/composables/useDate"
const props = defineProps({
  note: {
    required: true,
    type: Object as PropType<SharedNote | PrivateNote>,
  },
  color: {
    default: "sky",
    type: String,
  },
})
const currentTime = ref<any>(0)
const updated_time = ref()

// @ts-ignore
// const last_modified_by = ref(props.note.last_modified_by)

const route = useRoute()

const groupId = route.params.groupId as string

onMounted(() => {
  currentTime.value = new Date()

  window.setInterval(() => {
    currentTime.value = new Date()
  }, 60000)
})
watch(
  () => currentTime.value,
  () => {
    updated_time.value = useDate.displayDate(props.note.last_modified)
  },
)
const router = useRouter()
const { removePrivateNoteFromDB, getPrivateNotesList, removeSharedNoteFromDB, getSharedNotesList } = useNotesListActions()
const { setNoteDetails, changeEditingState } = useNoteDetailsActions()
const isDeleting = ref<boolean>(false)

const onDelete = (note: SharedNote | PrivateNote): void => {
  isDeleting.value = true
  if (groupId) {
    removeSharedNoteFromDB(note as SharedNote, groupId)
    getSharedNotesList(groupId)
  } else {
    removePrivateNoteFromDB(note as PrivateNote)
    getPrivateNotesList()
  }
  isDeleting.value = false
}
const openNote = async (note: SharedNote | PrivateNote): Promise<void> => {
  if (!isDeleting.value) {
    setNoteDetails(note)
    changeEditingState(true)
    if (groupId) {
      console.log(groupId)
      await router.push({ name: "SharedEditingPanel", params: { groupId } })
    } else {
      console.log(groupId)
      await router.push({ name: "EditPanel" })
    }
  }
}
const colorTheme = ref<string>("")
const text = ref<string>("")
const shadow = ref<string>("")
if (props.color === "amber") {
  colorTheme.value = "bg-amber-500"
  text.value = "text-white"
  shadow.value = "shadow-amber-500"
} else if (props.color === "emerald") {
  colorTheme.value = "bg-emerald-500"
  text.value = "text-white"
  shadow.value = "shadow-emerald-500"
} else if (props.color === "teal") {
  colorTheme.value = "bg-teal-500"
  text.value = "text-white"
  shadow.value = "shadow-teal-500"
} else if (props.color === "cyan") {
  colorTheme.value = "bg-cyan-500"
  text.value = "text-white"
  shadow.value = "shadow-cyan-500"
} else if (props.color === "pink") {
  colorTheme.value = "bg-pink-700"
  text.value = "text-white"
  shadow.value = "shadow-pink-700"
} else if (props.color === "sky") {
  colorTheme.value = "bg-sky-500"
  text.value = "text-white"
  shadow.value = "shadow-sky-500"
} else if (props.color === "slate") {
  colorTheme.value = "bg-slate-500"
  text.value = "text-white"
  shadow.value = "shadow-slate-500"
}
</script>

<style scoped>
label,
textarea {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
/* textarea {
  -webkit-line-clamp: 4;
} */
label {
  -webkit-line-clamp: 2;
}
</style>
