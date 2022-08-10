<template>
  <div v-if="name" class="rounded-2xl shadow-lg flex justify-center items-center" :class="[gradientColorClass(avatarColor), width, height]">
    <h2 class="text-white">
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
    default: "w-[84px]",
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
