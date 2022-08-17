<template>
  <div class="h-screen overflow-scroll relative">
    <!-- The Header -->
    <!-- <div class="fixed h-[110px] md:h-[67px] bg-white opacity-95 w-full z-20"></div> -->
    <HeaderSection
      :back-btn="backBtn"
      :header-label="headerLabel"
      :header-bold="headerBold"
      class="fixed drop-shadow-lg rounded-b-3xl px-4 w-full z-20 nh-header md:pt-2 bg-white opacity-95"
    >
      <slot name="Header" />
      <Avatar :name="user?.name" width="w-12" height="h-12" />
      <template #SearchBar>
        <Transition name="searchSlide" mode="out-in">
          <div v-if="isSearchActive">
            <BaseInput v-model="search" placeholder="Search for note" class="nh-search drop-shadow-md" type="search" focus no-validate />
          </div>
        </Transition>
      </template>
    </HeaderSection>

    <div class="md:h-[67px] w-full bg-transparent z-20" :class="isSearchActive ? 'h-[170px]' : 'h-[110px]'"></div>
    <!-- *** -->

    <!-- Content -->
    <div class="flex flex-col space-y-4 p-4">
      <slot />
    </div>
    <FooterNavigator v-if="footer" @on-click-search="toggleSearch" />
    <SideNavigator v-if="footer" />
  </div>
</template>

<script lang="ts" setup>
import HeaderSection from "@/layouts/HeaderSection.vue"
import FooterNavigator from "@/components/navigators/FooterNavigator.vue"
import SideNavigator from "@/components/navigators/SideNavigator.vue"
import Avatar from "@/components/Avatar.vue"
import { useUserState } from "@/store/user"
import BaseInput from "@/components/base/BaseInput.vue"
import { ref, watch } from "vue"

const { user } = useUserState()

defineProps({
  headerLabel: {
    type: String,
    default: "",
  },
  headerBold: {
    type: Boolean,
    default: false,
  },
  backBtn: {
    type: String,
    default: "",
  },
  footer: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: "close", value: string): void
}>()

const search = ref("")
const isSearchActive = ref(false)

const toggleSearch = () => {
  isSearchActive.value = !isSearchActive.value
}

watch(
  () => search.value,
  () => emit("close", search.value),
)
</script>

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
