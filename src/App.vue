<template>
  <router-view />
</template>

<script lang="ts" setup>
import { watch } from "vue"
import { useAppActions } from "./store/app"
import { useAuthState } from "./store/auth"

const { isLoggedIn } = useAuthState()
const { loadApp } = useAppActions()

watch(
  () => isLoggedIn.value,
  () => {
    if (isLoggedIn.value) {
      loadApp()
    }
  },
  { deep: true, immediate: true },
)
</script>
