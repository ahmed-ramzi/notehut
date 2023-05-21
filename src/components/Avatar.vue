<template>
  <div v-if="name" :class="[gradientColorClass(avatarColor), width, height]">
    <h2 class="text-white font-black">
      {{ name ? name.charAt(0).toUpperCase() : null }}
    </h2>
  </div>
</template>

<script lang="ts" setup>
import { gradientColorClass, randomColor } from "@/composables/useRandomColor"
import { PropType } from "vue"

const avatarColor = randomColor()
defineProps({
  width: {
    type: String,
    default: "w-[60px]",
  },
  height: {
    type: String,
    default: "h-[60px] ",
  },
  name: {
    type: String as PropType<string | any>,
    required: true,
  },
})
</script>

<style scoped>
div {
  @apply rounded-full flex justify-center items-center flex-shrink-0 border-4 border-slate-100 ring-1 ring-slate-300 shadow-md cursor-default;
}
</style>
