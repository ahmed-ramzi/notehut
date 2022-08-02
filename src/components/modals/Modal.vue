<template>
  <teleport to="body">
    <div class="absolute top-0 left-0 bg-slate-300/40 w-full h-screen overscroll-none py-1 flex backdrop-blur-sm" :class="[z]">
      <slot />
    </div>
  </teleport>
</template>

<script lang="ts" setup>
defineProps({
  z: {
    type: String,
    default: "z-40",
  },
})
</script>
