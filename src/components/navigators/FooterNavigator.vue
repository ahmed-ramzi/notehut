<template>
  <!-- Hidden Div -->
  <div class="rounded-t-3xl h-16 w-full"></div>

  <div class="fixed z-10 bottom-0 bg-slate-800 rounded-t-3xl h-16 w-full">
    <nav class="flex justify-between items-center px-6 h-full">
      <HamburgerMenu />
      <SearchIcon />
    </nav>
  </div>
</template>

<script lang="ts" setup>
import HamburgerMenu from "../icons/HamburgerMenu.vue"
import SearchIcon from "@/components/icons/SearchIcon.vue"
</script>
