<template>
  <slot v-if="custom" />
  <section v-else class="nav-option">
    <Icon :name="icon" :class="[color]" class="flex-shrink-0 w-6 h-6" />
    <div>
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    icon?: string
    color?: string
    custom?: boolean
  }>(),
  {
    icon: "",
    color: "",
    custom: false,
  },
)
</script>

<style scoped>
section.nav-option {
  @apply w-full py-2 px-4 flex items-center gap-2 active:opacity-60  rounded-md text-slate-300;
}

section.nav-option:hover {
  @apply bg-amber-200  bg-opacity-20;
}

.nav-option > div {
  @apply flex items-center gap-6;
}
* {
  @apply cursor-pointer;
}
</style>
