<template>
  <div class="flex justify-center items-center border-2 h-10 w-10 rounded-lg border-rose-500 text-rose-500">
    <svg class="svg-icon" viewBox="0 0 20 20">
      <path :d="svgPath"></path>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    svgPath: {
      type: String,
      required: true,
    },
  },
}
</script>
<style scoped>
.svg-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  /* fill: #4691f6; */
  @apply fill-rose-500;
}
.svg-icon:hover {
  /* fill: #4691f6; */
  @apply fill-white;
}

.svg-icon circle {
  /* stroke: #4691f6;
  stroke-width: 1; */
  @apply stroke-rose-500 stroke-1;
}
div:hover {
  @apply text-white bg-rose-100 shadow-md shadow-rose-100;
}
div:active {
  @apply bg-red-200;
}
</style>
