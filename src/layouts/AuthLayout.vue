<template>
  <main>
    <div>
      <section class="flex justify-center mr-8 items-center space-x-2">
        <img v-if="envConfig.isBeta || envConfig.isDev" src="../assets/logo/beta.png" alt="Notehut Logo" />
        <img v-else src="../assets/logo/prod.png" alt="Notehut Logo" />
        <h1 class="font-semibold justify-start drop-shadow-2xl">notehut</h1>
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

<script lang="ts" setup>
import envConfig from "@/envConfig"

defineProps({
  type: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
main {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  @apply w-full  px-4;
}
img {
  @apply h-16 w-16 drop-shadow-lg rounded-xl;
}
div {
  @apply p-8 rounded-3xl shadow-2xl space-y-12 bg-slate-100;
}
@media (min-width: 450px) {
  main {
    @apply max-w-[450px];
  }
  img {
    @apply rounded-2xl;
  }
}
</style>
