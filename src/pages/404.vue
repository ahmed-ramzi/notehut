<template>
  <div class="h-screen bg-slate-100">
    <div class="centered">
      <div class="inline-flex flex-col items-center justify-center space-y-4">
        <h1>404</h1>
        <BaseButton @click="onClick">Return home page</BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BaseButton from "@/components/base/BaseButton.vue"
import { useRouter } from "vue-router"
const router = useRouter()
const onClick = async () => {
  await router.push({ name: "HomePage" })
}
</script>
