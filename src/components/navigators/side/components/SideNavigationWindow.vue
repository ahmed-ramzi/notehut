<template>
  <nav>
    <slot />
  </nav>
</template>

<style scoped>
nav {
  @apply shadow-md shadow-slate-900 opacity-95 p-6 bg-slate-900  rounded-2xl overflow-scroll h-full duration-300;
}

@media (max-width: 299px) {
  nav {
    @apply w-full;
  }
}

@media (min-width: 300px) {
  nav {
    @apply w-80 md:w-96;
  }
}
</style>
