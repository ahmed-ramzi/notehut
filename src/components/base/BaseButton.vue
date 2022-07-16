<template>
  <button class="flex justify-center items-center" :class="[width, colorTheme, loading ? 'cursor-wait bg-gray-500' : gradient]">
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
  label: {
    type: String,
    default: "",
  },
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
  @apply h-12 rounded-lg motion-safe:hover:scale-110;
}
button:hover {
  @apply scale-105 shadow-lg duration-300;
}
</style>
