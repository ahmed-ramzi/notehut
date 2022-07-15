<template>
  <div :class="width">
    <div class="flex flex-col space-y-2">
      <label>{{ label }}</label>
      <div class="pb-6 relative">
        <Field
          :name="name"
          :placeholder="placeholder"
          :class="[disabled ? 'bg-gray-300' : null, ringColor]"
          class="field"
          :value="modelValue"
          :type="type"
          @input="(e) => update(e)"
          :disabled="disabled"
        />

        <ErrorMessage :name="name" class="errMsg"></ErrorMessage>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Field, ErrorMessage } from "vee-validate"
import { ref } from "vue"
import { randomColor, textColorClass, focusColorClass } from "../../composables/useRandomColor"

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
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
  disabled: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "",
  },
})
const emit = defineEmits(["update:modelValue"])

const colorTheme = ref<string>("")
const ringColor = ref<string>("")
const textColor = ref<string>("")
const randColor = randomColor() as string

const update = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target) {
    emit("update:modelValue", target.value)
  }
}

if (!props.color) {
  ringColor.value = focusColorClass(randColor)
} else {
  //  colorTheme.value = `bg-${props}-600`
  textColor.value = textColorClass(props.color)
  ringColor.value = focusColorClass(props.color)
}
</script>

<style scoped>
label {
  @apply text-left font-bold text-slate-700;
}
.field {
  @apply h-12 border-2 border-slate-700 rounded-lg focus:ring-4 outline-none w-full pl-4;
}
.errMsg {
  @apply text-red-500 font-bold absolute bottom-0 left-0 whitespace-nowrap;
}
</style>
