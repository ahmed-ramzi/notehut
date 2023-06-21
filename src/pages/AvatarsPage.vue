<template>
  <DefaultLayout back-btn="back" name="avatars" disable-footer>
    <section class="space-y-4">
      <h3>Select an avatar</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-4 duration-300">
        <div :class="[height, width, { selected: !selectedAvatar }]" class="avatar">
          <BaseAvatar class="w-full h-full" text-size="text-7xl" @click="onClick('')" />
        </div>
        <div v-for="avatar in avatars" :key="avatar.key" class="avatar" :class="{ selected: selectedAvatar === avatar.key }" @click="onClick(avatar.key)">
          <img :src="avatar.value" :class="[height, width]" />
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import BaseAvatar from "@/components/base/BaseAvatar.vue"
import { useUserState, useUserGetters, useUserActions } from "@/store/user"
import { ref } from "vue"

const height = "h-[150px]"
const width = "w-[150px]"
const { user } = useUserState()
const { hasAvatar } = useUserGetters()
const { setAvatar } = useUserActions()
const avatarsDir = import.meta.glob("../../public/avatars/*.png")
const selectedAvatar = ref(hasAvatar ? user.value?.avatar : "")

const avatars = Object.keys(avatarsDir).map((item) => {
  return {
    key: item.replace("../../public/avatars/", "").replace(".png", ""),
    value: item.replace("../../public", ""),
  }
})

const onClick = (avatar: string) => {
  setAvatar(avatar)
  selectedAvatar.value = avatar
  console.log("clicked", selectedAvatar.value)
}
</script>

<style scoped>
.avatar {
  @apply duration-200 cursor-pointer;
}
.avatar:hover,
.avatar.selected {
  @apply ring-4 rounded-full ring-slate-900;
}

.avatar:hover {
  @apply scale-105;
}
</style>
