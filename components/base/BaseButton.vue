<template>
  <button class="flex justify-center items-center" :class="[width, gradient, colorTheme, loading ? 'cursor-wait' : 'cursor-pointer']">
    <div v-if="loading">
      <Spinner size="w-10 h-10" />
    </div>
    <div v-else class="text-white cursor-pointer">
      {{ label }}
    </div>
  </button>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { randomColor, colorClass, gradientColorClass } from "../../composables/useRandomColor"
import Spinner from "./Spinner.vue"

const props = defineProps({
  label: String,
  width: {
    type: String,
    default: "w-40",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "",
  },
})

const colorTheme = ref<string>("")
const gradient = ref<string>("")
const randColor = randomColor() as string

if (!props.color) {
  colorTheme.value = colorClass(randColor)
  gradient.value = gradientColorClass(randColor)
} else {
  colorTheme.value = colorClass(props.color)
  gradient.value = gradientColorClass(props.color)
}
</script>

<style scoped>
button {
  @apply h-12 rounded-3xl motion-safe:hover:scale-110;
}
button:hover {
  @apply scale-110 duration-300;
}
</style>
