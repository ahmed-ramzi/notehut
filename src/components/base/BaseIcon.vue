<template>
  <component :is="iconComponent" :class="fillSvg" />
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent } from "vue"
type IconName = "settings" | "chevron-circle-left" | "chevron-left" | "pencil" | "bin" | "dots" | "search" | "hamburger"

const props = withDefaults(
  defineProps<{
    name: IconName
    fillSvg?: string
  }>(),
  {
    fillSvg: "fill-current",
  },
)

const iconComponent = computed(() => {
  return defineAsyncComponent(() => import(`../icons/${props.name}.vue`))
})
</script>
