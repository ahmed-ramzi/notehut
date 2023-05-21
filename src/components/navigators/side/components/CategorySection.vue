<template>
  <section>
    <label class="uppercase text-slate-500 text-xs font-bold">{{ name }}</label>
    <div :class="{ 'space-y-1': spacing }">
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    name: string
    spacing?: boolean
  }>(),
  {
    spacing: false,
  },
)
</script>
