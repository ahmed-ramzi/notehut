<template>
  <div
    class="flex justify-center items-center cursor-pointer rounded-[1.25rem] h-[60px] w-[60px] text-slate-500 border-2 border-white shadow-md"
    :class="[gradientColorClass(btnColor), shadowColorClass(btnColor), hideBtn ? 'hidden' : null]"
    @click="create"
  >
    <svg class="svg-icon pl-1" viewBox="0 0 20 20">
      <path
        d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"
      ></path>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { gradientColorClass, shadowColorClass } from "@/composables/useRandomColor"
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

const { createNote } = useNoteDetailsActions()
const router = useRouter()

const route = useRoute()
const groupId = route.params.groupId as string

const { privateNotesCount, sharedNotesCount } = useNotesListGetters()

const hideBtn = computed((): boolean => {
  if (groupId && !sharedNotesCount.value && !props.ignoreHiddingBtn) {
    return true
  } else if (!groupId && !privateNotesCount.value && !props.ignoreHiddingBtn) {
    return true
  }
  return false
})

const create = async (): Promise<void> => {
  if (groupId) {
    createNote(true)
    await router.push({ name: "SharedEditingPanel", params: { groupId } })
  } else {
    createNote()
    await router.push({ name: "EditPanel" })
  }
}
// const btnColor = randomColor() as string
const btnColor = "amber"
</script>

<style scoped>
.svg-icon {
  width: 2.5rem;
  height: 2.5rem;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  /* fill: #4691f6; */
  @apply fill-white;
}
/* .svg-icon:hover {
  fill: #4691f6;
  @apply fill-slate-400;
} */

.svg-icon circle {
  /* stroke: #4691f6;
  stroke-width: 1; */
  @apply stroke-slate-500 stroke-1;
}
div:hover {
  @apply duration-300 scale-110
  /* shadow-slate-100; */;
}
div:active {
  @apply opacity-80;
}
</style>
