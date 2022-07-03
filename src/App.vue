<template>
  <router-view />
</template>

<script lang="ts" setup>
import { watch } from "vue"
import { useUserState } from "@/store/user"
import { useNotesListActions } from "@/store/notesList"

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
