<template>
  <div :class="width">
    <div class="flex flex-col">
      <label>{{ label }}</label>
      <div class="relative rounded-xl" :class="errorMessage ? ' border bg-red-400 border-opacity-80' : null">
        <input
          ref="inputRef"
          :name="name"
          :placeholder="placeholder"
          :class="[disabled ? 'bg-gray-300' : null, ringColor, { 'shadow-sm': errorMessage }]"
          class="field"
          :value="value"
          :type="type"
          :disabled="disabled"
          @input="(e) => update(e)"
        />
        <div class="h-6 w-full">
          <p class="px-2 text-left text-white">
            {{ capitalizeFirstLetter(errorMessage as string).replaceAll("_", " ") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useField } from "vee-validate"
import { focusColorClass } from "../../composables/useRandomColor"
import { onMounted, ref } from "vue"
import { capitalizeFirstLetter } from "@/composables/useTitleCase"

const props = withDefaults(
  defineProps<{
    name: string
    modelValue?: string | number
    type?: "text" | "number" | "password"
    label?: string
    placeholder?: string
    disabled?: boolean
    width?: string
    min?: string
    max?: string
    required?: boolean
    focus?: boolean
  }>(),
  {
    type: "text",
    width: "w-full",
    disabled: false,
    focus: false,
    required: true,
    modelValue: "",
    label: "",
    placeholder: "",
    min: "",
    max: "",
  },
)
const emit = defineEmits(["update:modelValue"])

const ringColor = focusColorClass("amber")

const { errorMessage, value, handleChange } = useField(props.name, undefined, {
  initialValue: props.modelValue,
  validateOnValueUpdate: false,
})
const inputRef = ref<HTMLInputElement>()

onMounted(() => {
  if (inputRef.value && props.focus) {
    inputRef.value.focus()
  }
})

const update = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target) {
    handleChange(target.value)
    emit("update:modelValue", target.value)
  }
}
</script>

<style scoped>
label {
  @apply text-left font-bold text-slate-700;
}
input {
  @apply h-12 border-2 border-slate-700 border-opacity-80 rounded-lg focus:ring-2 outline-none w-full px-4 duration-300;
}
</style>
