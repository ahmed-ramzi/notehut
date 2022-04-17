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
          @input="$emit('update:modelValue', $event.target.value)"
          :disabled="disabled"
        />

        <ErrorMessage :name="name" class="errMsg"></ErrorMessage>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Field, ErrorMessage } from "vee-validate"
import { defineComponent, ref } from "vue"
import { randomColor, textColorClass, focusColorClass } from "../../composables/useRandomColor"

export default defineComponent({
  components: {
    Field,
    ErrorMessage,
  },
  props: {
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
  },

  setup(props) {
    const colorTheme = ref<string>("")
    const ringColor = ref<string>("")
    const textColor = ref<string>("")
    const randColor = randomColor() as string

    if (!props.color) {
      ringColor.value = focusColorClass(randColor)
    } else {
      //  colorTheme.value = `bg-${props}-600`
      textColor.value = textColorClass(props.color)
      ringColor.value = focusColorClass(props.color)
    }
    return {
      colorTheme,
      ringColor,
      textColor,
      randColor,
    }
  },
})
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
