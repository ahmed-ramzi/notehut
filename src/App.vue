<template>
  <div class="h-screen flex flex-col">
    <router-view />
    <FooterNavigator v-if="isLoggedIn" />
    <SideNavigator v-if="isMenuActive && isLoggedIn" />
  </div>
</template>

<script lang="ts" setup>
import { watch } from "vue"
import { useUserState } from "@/store/user"
import { useNotesListActions } from "@/store/notesList"
import { useAuthState } from "@/store/auth"
import FooterNavigator from "@/components/navigators/FooterNavigator.vue"
import SideNavigator from "@/components/navigators/SideNavigator.vue"
import { useNavState } from "./store/navigators"

const { user } = useUserState()
const { isMenuActive } = useNavState()
const { isLoggedIn } = useAuthState()

const { getNotesList, addMockData } = useNotesListActions()

watch(
  () => user.value,
  () => {
    if (user.value?.id) {
      getNotesList()
      // addMockData()
    }
  },
  { deep: true, immediate: true },
)
</script>

<style scoped>
.spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
