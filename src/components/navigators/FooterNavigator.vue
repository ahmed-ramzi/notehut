<template>
  <div class="shadow">
    <div class="create-btn-container bg-yellow-500">
      <div class="create-btn-position -top-4 w-16 h-16 circle-shadow"></div>
    </div>
  </div>
  <div data-test="footerNav" class="footer">
    <FooterBtn class="nh-search-icon" @click="toggleMenu">
      <Icon name="hamburger" class="w-6 h-6 text-slate-700 stoke-2" />
    </FooterBtn>

    <div class="create-btn-container">
      <CreateNoteIcon class="create-btn-position -top-3" />
    </div>

    <FooterBtn class="nh-search-icon" @click="$emit('onClickSearch')">
      <Icon name="search" class="w-6 h-6 text-slate-700" />
    </FooterBtn>
  </div>
</template>

<script lang="ts" setup>
import CreateNoteIcon from "../icons/custom/CreateNoteIcon.vue"
import { useNavActions } from "@/store/navigators"
import FooterBtn from "./FooterBtn.vue"
const { toggleMenu } = useNavActions()

defineEmits(["onClickSearch"])
</script>

<style scoped>
.shadow {
  @apply sticky z-10 bottom-0 bg-slate-400 blur-sm opacity-50 rounded-t-2xl h-[58px] w-full flex justify-center;
}
.circle-shadow {
  @apply bg-slate-500 blur-sm opacity-90 rounded-full;
}
.footer {
  @apply fixed z-10 bottom-0 bg-white rounded-t-2xl h-14 w-full flex justify-between items-center px-6;
}
.create-btn-container {
  @apply relative w-10 h-full;
}
.create-btn-position {
  @apply absolute  -right-3;
}
</style>
