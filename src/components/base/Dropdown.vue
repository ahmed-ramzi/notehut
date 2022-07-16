<template>
  <section v-if="search != ''" class="fixed bottom-6 rounded-2xl min-w-[200px] max-w-xl shadow-lg bg-white">
    <section v-for="item in items" @click="$emit('selected')" class="w-full border inline-flex flex-col">
      {{ item.value }}
    </section>
  </section>
</template>
<script lang="ts" setup>
import { PropType } from "vue"
type Item = {
  key: string | number
  value: string | number
}

defineProps({
  search: {
    type: String,
    required: true,
  },
  //   items: {
  //     type: Array as PropType<Item[]>,
  //     required: true,
  //   },
})

defineEmits(["selected"])

const items = [
  { key: "1", value: "One" },
  { key: "2", value: "two" },
  { key: "3", value: "Tree" },
  { key: "4", value: "four" },
] as Item[]
</script>

<style scoped>
section > section:hover {
  @apply bg-slate-700 text-white duration-200;
}
</style>
