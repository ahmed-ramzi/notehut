<template>
  <router-view />
</template>

<script lang="ts" setup>
import { watch } from "vue"
import { useUserState } from "@/store/user"
import { useNotesListActions } from "@/store/notesList"

const { user } = useUserState()
const { getNotesList } = useNotesListActions()

watch(
  () => user.value,
  () => {
    if (user.value?.id) {
      getNotesList()
    }
  },
  { deep: true, immediate: true },
)
</script>
