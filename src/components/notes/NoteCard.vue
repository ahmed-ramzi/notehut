<template>
  <section data-test="noteCard" class="rounded-3xl cursor-pointer duration-500 active:opacity-80 relative pb-2" :class="[colorTheme]">
    <Transition name="fade">
      <div v-if="longPressed" ref="deleteBtn" class="absolute -top-2 right-2 cursor-pointer z-10 p-1 ring-2 ring-white bg-red-500 rounded-lg" @click="onDelete(note)">
        <Icon name="bin" class="w-5 h-5 text-white" />
      </div>
    </Transition>

    <div ref="htmlRef" class="py-4 px-2 space-y-2 cursor-pointer noselect flex flex-col" @click="openNote(note)">
      <div class="max-xs:w-28 w-32 mid-sm:w-52 md:w-60 lg:w-74">
        <label :class="text" class="font-normal noselect text-lg md:text-xl cursor-pointer">{{ note.title || "Untitled" }}</label>
      </div>

      <div class="relative">
        <!--  To hide the selection of the textarea -->
        <div :class="textAreaHeight" class="absolute top-0 left-0 h-full bg-black w-full opacity-0 z-10"></div>
        <textarea
          id="txtInput"
          v-model="note.contents"
          name="contents"
          :class="textAreaHeight"
          class="pl-1 w-full text-sm md:text-lg outline-none text-white bg-transparent font-extralight resize-none cursor-pointer"
          readonly
          unselectable="on"
        ></textarea>
      </div>

      <div v-show="note.last_modified" class="rounded border-t-2 border-white">
        <small class="absolute bottom-1 right-3 md:right-5 noselect">
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

import useDate from "@/composables/useDate"
import { onLongPress, onClickOutside } from "@vueuse/core"
import { Routes } from "@/router/routes"

const props = defineProps({
  note: {
    required: true,
    type: Object as PropType<SharedNote | PrivateNote>,
  },
  color: {
    default: "sky",
    type: String,
  },
  noteIndex: {
    type: Number,
    required: true,
  },
  isScrolling: {
    type: Boolean,
    default: false,
  },
})

const currentTime = ref<any>(0)
const updated_time = ref()

const router = useRouter()
const route = useRoute()

const { removePrivateNoteFromDB, getPrivateNotesList, removeSharedNoteFromDB, getSharedNotesList } = useNotesListActions()
const { setNoteDetails, changeEditingState } = useNoteDetailsActions()
const isDeleting = ref<boolean>(false)
const longPressed = ref(false)

const groupId = route.params.groupId as string

const htmlRef = ref<HTMLElement | null>(null)
const deleteBtn = ref<HTMLElement | null>(null)

const onLongPressCallback = () => {
  if (!props.isScrolling) longPressed.value = true
}
const resetLongPress = (): void => {
  longPressed.value = false
}

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

const lineBreaks = props.note.contents.split(/\r\n|\r|\n/).length

// const textAreaHeight = lineBreaks > 10 || lineBreaks < 3 ? "h-12" : `h-[${lineBreaks * 10}px]`
// const textAreaHeight = lineBreaks < 6 ? `h-${(lineBreaks + 1) * 4}` : "h-32"
const textAreaHeight = lineBreaks < 6 ? `h-${(lineBreaks + 1) * 4}` : "h-32"

const openNote = async (note: SharedNote | PrivateNote): Promise<void> => {
  if (!isDeleting.value && !longPressed.value) {
    setNoteDetails(note)
    changeEditingState(true)
    if (groupId) {
      await router.push({ name: Routes.SHARED_EDITING_PANEL, params: { groupId } })
    } else {
      await router.push({ name: Routes.EDIT_PANEL })
    }
  }
}

const colorTheme = ref<string>("")
const text = ref<string>("")
const shadow = ref<string>("")
if (props.color === "emerald") {
  colorTheme.value = "bg-emerald-500"
  text.value = "text-white"
  shadow.value = "shadow-emerald-500"
  // } else if (props.color === "teal") {
  //   colorTheme.value = "bg-teal-500"
  //   text.value = "text-white"
  //   shadow.value = "shadow-teal-500"
  // } else if (props.color === "cyan") {
  //   colorTheme.value = "bg-cyan-500"
  //   text.value = "text-white"
  //   shadow.value = "shadow-cyan-500"
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
} else {
  colorTheme.value = "bg-amber-500"
  text.value = "text-white"
  shadow.value = "shadow-amber-500"
}

onLongPress(htmlRef, onLongPressCallback)

onClickOutside(deleteBtn, () => {
  resetLongPress()
})

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

watch(
  () => props.isScrolling,
  (val) => {
    if (val) {
      console.log(val)
      resetLongPress()
    }
  },
)
</script>

<style scoped>
label,
textarea {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;

  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
label {
  -webkit-line-clamp: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
