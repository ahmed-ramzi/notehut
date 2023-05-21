<template>
  <button :data-test="`action${label}Btn`" class="border-2 h-10 px-3 rounded-2xl btn-create-note border-slate-500 text-slate-500 uppercase">
    <span>
      <span class="md:hidden text-xl">{{ icon }}</span>
      <span class="hidden md:block">{{ label || icon }}</span></span
    >
  </button>
</template>

<script lang="ts" setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
})
</script>

<style scoped>
.btn-create-note:hover {
  @apply text-white bg-slate-100 shadow-md shadow-slate-300 duration-500;
}
.btn-create-note:active {
  @apply bg-slate-300;
}
</style>
