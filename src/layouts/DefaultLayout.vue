<template>
  <main>
    <HeaderComponent :back-btn="backBtn" :is-position-top="top" :is-search-active="isSearchActive" :hide-avatar="disableAvatar" @search="getSearchValue">{{
      name
    }}</HeaderComponent>
    <section ref="el" class="h-full overflow-scroll px-3 py-4">
      <slot />
    </section>
    <section>
      <FooterNavigator v-if="!disableFooter" @on-click-search="toggleSearch" />
      <SideNavigator />
    </section>
  </main>
</template>

<script lang="ts" setup>
import HeaderComponent from "../components/common/HeaderComponent.vue"
import { ref, toRefs, watch } from "vue"
import { useScroll } from "@vueuse/core"
import FooterNavigator from "@/components/navigators/FooterNavigator.vue"
import SideNavigator from "@/components/navigators/side/SideNavigator.vue"
import { Routes } from "../router/routes"

withDefaults(
  defineProps<{
    name: string
    disableFooter?: boolean
    disableAvatar?: boolean
    backBtn?: Routes | "back" | ""
  }>(),
  {
    disableFooter: false,
    disableAvatar: false,
    backBtn: "",
  },
)
const emit = defineEmits<{
  (e: "search", value: string): void
}>()

const el = ref<HTMLElement | null>(null)
const { arrivedState } = useScroll(el)
const { top } = toRefs(arrivedState)

const isSearchActive = ref(false)
const search = ref("")

const getSearchValue = (val: string) => {
  search.value = val
}

const toggleSearch = () => {
  isSearchActive.value = !isSearchActive.value
}

watch(
  () => search.value,
  (val) => emit("search", val),
)
</script>

<style scoped>
main {
  @apply h-screen flex flex-col justify-between;
}
</style>
<style>
.searchSlide-leave-active {
  transition: all 0.2s ease-out;
}
.searchSlide-enter-active {
  transition: all 0.5s ease-in-out;
}
.searchSlide-enter-from,
.searchSlide-leave-to {
  opacity: 20%;
  transform: translate(0, -10%);
}
</style>
