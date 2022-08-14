<template>
  <!-- Hidden Div -->
  <div class="rounded-t-2xl h-14 w-full"></div>
  <div class="fixed z-10 bottom-0 bg-slate-700 blur-sm opacity-50 rounded-t-2xl h-[58px] w-full"></div>

  <div class="fixed z-10 bottom-0 bg-white rounded-t-2xl h-14 w-full">
    <div class="flex justify-between items-center px-6 h-full">
      <div class="flex justify-center items-center cursor-pointer h-10 w-10 rounded-2xl bg-slate-200" @click="toggleMenu">
        <HamburgerMenu class="nh-hamburger" dark />
      </div>
      <div class="relative w-10 h-full">
        <CreateNoteIcon class="absolute -top-7 -right-3" />
      </div>

      <SearchIcon />
    </div>
  </div>
</template>

<script lang="ts" setup>
import HamburgerMenu from "../icons/HamburgerMenu.vue"
import CreateNoteIcon from "../icons/CreateNoteIcon.vue"
import SearchIcon from "@/components/icons/SearchIcon.vue"
import { useNavActions } from "@/store/navigators"
const { toggleMenu } = useNavActions()
</script>
