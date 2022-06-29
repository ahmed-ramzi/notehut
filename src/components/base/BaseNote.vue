<template>
  <section class="rounded-3xl shadow-lg cursor-pointer hover:scale-110 duration-500" :class="[colorTheme, shadow]">
    <div class="m-4 py-2 space-y-2 cursor-pointer">
      <label :class="text" class="indent-2 font-bold text-xl cursor-pointer">{{ note.title }}</label>
      <p :class="text" class="cursor-pointer">{{ note.contents }}</p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { PropType, ref } from "vue"
import { NoteState } from "../../types/states"

const props = defineProps({
  note: {
    required: true,
    type: Object as PropType<NoteState>,
  },
  color: {
    default: "sky",
    type: String,
  },
})

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
p {
  display: -webkit-box;

  -webkit-box-orient: vertical;
  overflow: hidden;
}
p {
  -webkit-line-clamp: 4;
}
label {
  -webkit-line-clamp: 2;
}
</style>
