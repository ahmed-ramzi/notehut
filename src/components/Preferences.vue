<template>
  <div class="relative border">
    <button class="relative z-10" @click="toggleOptions">
      <Icon name="dots" class="w-3 h-3" />
    </button>

    <div v-if="isActive" class="absolute bg-slate-100 rounded-md shadow-lg right-0 top-12 z-20">
      <div v-for="item in items" :key="item.key" class="px-4 py-2 hover">{{ item.value }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Item } from "@/types/types"
import { ref } from "vue"

const isActive = ref(true)
const toggleOptions = (): void => {
  isActive.value = !isActive.value
}

const items = [
  {
    key: "rename",
    value: "Rename",
  },
  {
    key: "delete",
    value: "Delete",
  },
] as Item[]
</script>
