<template>
  <div :class="[gradientColorClass(avatarColor)]">
    <h2 class="text-white font-black" :class="[textSize]">
      {{ name.charAt(0).toUpperCase() || user?.name.charAt(0).toUpperCase() }}
    </h2>
  </div>
</template>

<script lang="ts" setup>
import { gradientColorClass, randomColor } from "@/composables/useRandomColor"
import { useUserState } from "@/store/user"

const avatarColor = randomColor()
const { user } = useUserState()

withDefaults(
  defineProps<{
    textSize?: string
    name?: string
  }>(),
  {
    textSize: "",
    name: "",
  },
)
</script>

<style scoped>
div {
  @apply flex justify-center items-center h-full rounded-full cursor-pointer;
}
h2 {
  @apply cursor-pointer;
}
</style>
