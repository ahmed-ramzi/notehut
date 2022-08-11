<template>
  <div class="h-screen overflow-scroll relative">
    <!-- The Header -->
    <div class="fixed h-[100px] bg-white blur-sm w-full z-20"></div>
    <HeaderSection :back-btn="backBtn" :header-label="headerLabel" :header-bold="headerBold" class="fixed px-4 w-full z-20 bg-white nh-header pt-10">
      <slot name="Header" />
      <Avatar :name="user?.name" width="w-12" height="h-12" />
    </HeaderSection>
    <div class="h-[100px] w-full bg-transparent z-20"></div>
    <!-- *** -->

    <!-- Content -->
    <div class="flex flex-col space-y-4 p-4">
      <slot />
    </div>
    <FooterNavigator v-if="footer" />
    <SideNavigator v-if="footer" />
  </div>
</template>

<script lang="ts" setup>
import HeaderSection from "@/layouts/HeaderSection.vue"
import FooterNavigator from "@/components/navigators/FooterNavigator.vue"
import SideNavigator from "@/components/navigators/SideNavigator.vue"
import Avatar from "@/components/Avatar.vue"
import { useUserState } from "@/store/user"

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
</script>
