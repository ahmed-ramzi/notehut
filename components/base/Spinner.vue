<template>
  <div class="loader-wrapper" :class="size">
    <div class="loader">
      <div class="loader loader-inner"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    size: {
      type: String,
      default: "w-16 h-16",
    },
  },
})
</script>

<style scoped>
.loader {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 5px solid #162534;
  border-top-color: #4bc8eb;
  border-bottom-color: #f13a8f;
  border-radius: 50%;
  animation: rotate 5s linear infinite;
}
.loader-inner {
  border-top-color: #36f372;
  border-bottom-color: rgb(242, 217, 54);
  animation-duration: 2.5s;
}

@keyframes rotate {
  0% {
    transform: scale(1) rotate(360deg);
  }
  50% {
    transform: scale(0.8) rotate(-360deg);
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
}
</style>
