<template>
  <!-- Hidden Div -->
  <div class="rounded-t-3xl h-16 w-full"></div>

  <div class="fixed z-10 bottom-0 bg-slate-800 rounded-t-3xl h-16 w-full">
    <div class="flex justify-between items-center px-6 h-full relative">
      <HamburgerMenu class="nh-hamburger" />
      <SearchIcon />
      <div></div>
      <CreateNoteIcon class="absolute -top-5 right-10" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import HamburgerMenu from "../icons/HamburgerMenu.vue"
import CreateNoteIcon from "../icons/CreateNoteIcon.vue"
import SearchIcon from "@/components/icons/SearchIcon.vue"
</script>
