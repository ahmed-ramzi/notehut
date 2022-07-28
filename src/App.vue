<template>
  <router-view />
</template>

<script lang="ts" setup>
import { watch } from "vue"
import { useUserState } from "@/store/user"
import { useNotesListActions } from "@/store/notesList"

const { user } = useUserState()
const { getNotesList } = useNotesListActions()

console.log(process.env.VITE_API_KEY ? "Proccess" : "No Process")
console.log(import.meta.env.VITE_API_KEY ? "Meta" : "No Meta")

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
