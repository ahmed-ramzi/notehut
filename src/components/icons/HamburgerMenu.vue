<template>
  <div id="navMenu" @click="toggleMenu" class="cursor-pointer" :class="isMenuActive ? 'active' : null">
    <span :class="black ? 'bg-black' : 'bg-white'"></span>
    <span :class="black ? 'bg-black' : 'bg-white'"></span>
    <span :class="black ? 'bg-black' : 'bg-white'"></span>
  </div>
</template>

<script lang="ts" setup>
import { useNavState, useNavActions } from "@/store/navigators"

const { isMenuActive } = useNavState()
const { toggleMenu } = useNavActions()

defineProps({
  black: {
    type: Boolean,
    default: false,
  },
})
</script>

<style>
#navMenu > span {
  @apply block w-5 h-[2px];
  border-radius: 9999px;
}

#navMenu > span:not(:last-child) {
  @apply mb-2;
}

#navMenu,
#navMenu > span {
  transition: all 0.2s ease-in-out;
}

#navMenu.active {
  transition-delay: 0.2s;
  transform: rotate(45deg);
}

#navMenu.active > span:nth-child(2) {
  @apply w-0;
}
#navMenu.active > span:nth-child(1),
#navMenu.active > span:nth-child(3) {
  transition-delay: 0.4s;
}

#navMenu.active > span:nth-child(1) {
  transform: translateY(10px);
}

#navMenu.active > span:nth-child(3) {
  transform: translateY(-10px) rotate(90deg);
}
</style>
