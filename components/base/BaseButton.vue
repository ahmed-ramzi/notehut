<template>
  <button class="flex justify-center items-center" :class="[width, gradient, colorTheme, loading ? 'cursor-wait' : 'cursor-pointer']">
    <div v-if="loading">
      <Spinner />
    </div>
    <div v-else class="text-white cursor-pointer">
      {{ label }}
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { randomColor, colorClass, gradientColorClass } from "../../composables/useRandomColor"
import Spinner from "./Spinner.vue"

export default defineComponent({
  components: {
    Spinner,
  },
  props: {
    label: String,
    width: {
      type: String,
      default: "w-40",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const colorTheme = ref<string>("")
    const gradient = ref<string>("")
    const randColor = randomColor() as string

    if (!props.color) {
      colorTheme.value = colorClass(randColor)
      gradient.value = gradientColorClass(randColor)
    } else {
      colorTheme.value = colorClass(props.color)
      gradient.value = gradientColorClass(props.color)
    }

    return {
      colorTheme,
      gradient,
    }
  },
})
</script>

<style scoped>
button {
  @apply h-12 rounded-3xl motion-safe:hover:scale-110;
}
button:hover {
  @apply scale-110 duration-300;
}
</style>
