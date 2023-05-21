<template>
  <div class="rounded-full py-1 px-2 text-center min-w-[7px]" :class="[color]">
    <p class="text-xs font-semibold text-white">
      <slot />
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue"
const props = defineProps<{
  type: "warning" | "info" | "ignore"
}>()

const color = computed(() => {
  return {
    "bg-red-500": props.type === "warning",
    "bg-amber-500": props.type === "info",
    "bg-slate-500": props.type === "ignore",
  }
})
</script>
