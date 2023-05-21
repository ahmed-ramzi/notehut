<template>
  <section>
    <p>{{ name }}</p>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  name: string
}>()
</script>

<style scoped>
section {
  @apply bg-gradient-to-r p-2 from-amber-100 via-amber-300 to-amber-500 cursor-pointer duration-300 rounded-xl;
}
p {
  @apply font-medium;
}
section:active {
  @apply opacity-50 text-white;
}
</style>
