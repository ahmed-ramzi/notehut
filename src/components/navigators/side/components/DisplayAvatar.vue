<template>
  <section class="flex items-center space-x-2">
    <Avatar width="w-[70px]" height="h-[70px]" />
    <div class="truncate w-full">
      <h4 class="font-bold truncate leading-3 text-white">{{ user?.name }}</h4>
      <small class="truncate text-gray-400">{{ user?.email }}</small>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Avatar from "../../../Avatar.vue"
import { useUserState } from "@/store/user"

const { user } = useUserState()
</script>
