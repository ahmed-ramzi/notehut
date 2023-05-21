<template>
  <component :is="iconComponent" :class="fillSvg" />
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent } from "vue"
type Icon = "settings"

const props = withDefaults(
  defineProps<{
    name: Icon
    fillSvg?: string
  }>(),
  {
    fillSvg: "fill-current",
  },
)

const iconComponent = computed(() => {
  return defineAsyncComponent(() => import(`../icons-new/${props.name}.vue`))
})
</script>
