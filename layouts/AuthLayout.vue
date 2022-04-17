<template>
  <main>
    <div>
      <section class="flex justify-center mr-8 items-center space-x-2">
        <img src="../assets/logo.png" alt="Notehut Logo" />
        <h1 class="font-semibold justify-start">notehut</h1>
      </section>

      <!-- Form -->
      <section class="text-center">
        <slot />
        <small v-if="type === 'register'" class="mt-2"
          >Already have an account?
          <router-link class="text-blue-500 hover:underline" to="/login"> Sign in </router-link>
          here!</small
        >

        <small v-else-if="type === 'login'" class="mt-2">
          Do not have an account?
          <router-link class="text-blue-500 hover:underline" to="/register"> Register </router-link>
          here!</small
        >
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  setup() {},
})
</script>

<style scoped>
main {
  @apply p-5 gap-8 flex-auto flex flex-col items-center justify-center;
  /* @apply flex flex-auto w-full h-full items-center justify-center p-5; */
}
img {
  @apply h-16 w-16  shadow-2xl rounded-2xl;
}
div {
  @apply p-8  rounded-3xl shadow-2xl  w-full md:w-[450px] space-y-12 bg-slate-100 mt-[15%] md:mt-[5%];
}
</style>
