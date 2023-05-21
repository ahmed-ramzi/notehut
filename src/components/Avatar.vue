<template>
  <section :class="[width, height]">
    <img v-if="hasAvatar && avatarSrc && !name" :src="avatarSrc" />
    <BaseAvatar v-else :name="name" />
  </section>
</template>

<script lang="ts" setup>
import { useUserGetters, useUserState } from "@/store/user"
import BaseAvatar from "./base/BaseAvatar.vue"
import { computed } from "vue"

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
    type: String,
    default: "",
  },
})

const { hasAvatar } = useUserGetters()
const { user } = useUserState()

const avatarSrc = computed(() => {
  if (hasAvatar && user.value?.avatar) {
    return "/avatars/" + user.value?.avatar + ".png"
  }
  return ""
})
</script>

<style scoped>
section {
  @apply rounded-full  flex-shrink-0 border-4 border-slate-100 ring-1 ring-slate-300  bg-white shadow-md cursor-default;
}
img {
  @apply rounded-full flex-shrink-0;
}
</style>
