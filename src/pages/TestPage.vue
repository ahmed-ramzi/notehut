<template>
  <MasonryWall :items="data" :column-width="superSmall ? 150 : smallScreen ? 200 : 250" :gap="4" class="p-2">
    <template #default="{ item, index }">
      <div class="bg-yellow bg-yellow-400 rounded-xl" :class="item.height">{{ index }}</div>
    </template>
  </MasonryWall>
</template>

<script lang="ts" setup>
import { useBreakpoints } from "@vueuse/core"

const breakpoints = useBreakpoints({
  xs: 404,
  sm: 608,
})

const superSmall = breakpoints.smaller("xs")
const smallScreen = breakpoints.between("xs", "sm")

const data = [
  {
    height: "h-52",
  },
  {
    height: "h-44",
  },
  {
    height: "h-48",
  },
  {
    height: "h-60",
  },
  {
    height: "h-44",
  },
  {
    height: "h-52",
  },
  {
    height: "h-44",
  },
  {
    height: "h-60",
  },
  {
    height: "h-52",
  },
  {
    height: "h-44",
  },
  {
    height: "h-48",
  },
  {
    height: "h-60",
  },
  {
    height: "h-44",
  },
  {
    height: "h-52",
  },
  {
    height: "h-44",
  },
  {
    height: "h-60",
  },
]
</script>
