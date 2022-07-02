<template>
  <Spinner v-if="loading" class="spinner" />
  <router-view v-else />
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import Spinner from "@/components/base/Spinner.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useUserActions, useUserState } from "@/store/user"
import { useAuthActions } from "@/store/auth"

import { useRouter } from "vue-router"
import { useNotesListActions } from "@/store/notesList"

const loading = ref<boolean>(true)

const { getUser } = useUserActions()
const { setLoggedIn } = useAuthActions()

const router = useRouter()
const { user } = useUserState()

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

onAuthStateChanged(getAuth(), (userData) => {
  // console.log(userData)
  if (userData) {
    getUser(userData.uid)
    setLoggedIn(true)
    router.push({ name: "home" })
    loading.value = false
  } else {
    router.push({ name: "login" })
    setLoggedIn(false)
    loading.value = false
  }
})
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
