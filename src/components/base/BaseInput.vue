<template>
  <div :class="width">
    <div class="flex flex-col">
      <label>{{ label }}</label>
      <div class="pb-6 relative rounded-xl" :class="errorMessage ? ' border bg-red-400 border-opacity-80' : null">
        <Field
          v-if="!noValidate"
          :name="name"
          :placeholder="placeholder"
          :class="[disabled ? 'bg-gray-300' : null, ringColor]"
          class="field"
          :value="modelValue"
          :type="type"
          :disabled="disabled"
          @input="(e) => update(e)"
        />

        <input
          v-else
          ref="inputRef"
          :name="name"
          :placeholder="placeholder"
          :class="[disabled ? 'bg-gray-300' : null, ringColor]"
          class="field"
          :value="modelValue"
          :type="type"
          :disabled="disabled"
          @input="(e) => update(e)"
        />

        <ErrorMessage :name="name" class="errMsg"></ErrorMessage>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Field, ErrorMessage, useField } from "vee-validate"
import { nextTick, ref } from "vue"

import { focusColorClass } from "../../composables/useRandomColor"

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "w-full",
  },
  focus: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  noValidate: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(["update:modelValue"])

const { errorMessage } = useField(props.name)

const inputRef = ref(null)

if (props.focus) {
  nextTick(() => {
    // @ts-ignore
    inputRef.value.focus()
  })
}

// const colorTheme = ref<string>("")
const ringColor = focusColorClass("amber")

const update = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target) {
    emit("update:modelValue", target.value)
  }
}
</script>

<style scoped>
label {
  @apply text-left font-bold text-slate-700;
}
.field {
  @apply h-12 border-2 border-slate-700 border-opacity-80 rounded-lg focus:ring-2 outline-none w-full px-4;
}
.errMsg {
  @apply text-white absolute  text-xs bottom-1 font-medium left-3 whitespace-nowrap;
}
</style>
