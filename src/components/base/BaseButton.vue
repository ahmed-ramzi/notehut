<template>
  <button class="flex justify-center items-center" :class="[width, colorTheme, loading ? 'cursor-wait bg-gray-500' : gradient]">
    <div v-if="loading">
      <Spinner size="w-10 h-10" />
    </div>
    <div v-else class="text-white cursor-pointer">
      <slot />
    </div>
  </button>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { colorClass, gradientColorClass } from "../../composables/useRandomColor"
import Spinner from "./Spinner.vue"

defineProps({
  width: {
    type: String,
    default: "w-40",
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const colorTheme = ref<string>("")
const gradient = ref<string>("")
const randColor = "amber" as string

colorTheme.value = colorClass(randColor)
gradient.value = gradientColorClass(randColor)
</script>

<style scoped>
button {
  @apply h-12 rounded-lg motion-safe:hover:scale-110;
}
button:hover {
  @apply scale-105 shadow-lg duration-300;
}
</style>
