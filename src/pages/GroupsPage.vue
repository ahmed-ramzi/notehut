<template>
  <MenuLayout back-btn="HomePage" header-label="groups">
    <div class="flex flex-col space-y-4">
      <div
        v-for="group in groups"
        :key="group.id"
        class="rounded-2xl h-24 bg-gradient-to-r p-4 from-slate-100 via-slate-300 to-slate-500 shadow-md hover:motion-safe:shadow-xl cursor-pointer duration-300 flex justify-between items-center hover:motion-safe:border-2 border-slate-900"
        @click="onClick(group.id)"
      >
        <div class="flex flex-col">
          <h3 class="text-slate-900 font-light">{{ group.name }}</h3>
          <small class="text-slate-500 text-size italic">Created: {{ group.created_at }}</small>
        </div>

        <div class="h-full relative">
          <!-- TODO Fix not more than 3 Icons to appear -->

          <Avatar
            v-for="(member, index) in group.members"
            :key="member.id"
            :name="member.name"
            width="w-16"
            class="absolute"
            :class="index === 0 ? `right-0` : index === 1 ? 'right-10' : index === 2 ? `right-20` : 'hidden'"
          />
        </div>
      </div>
    </div>
  </MenuLayout>
</template>

<script lang="ts" setup>
import { useGroupsState } from "@/store/groups"
import Avatar from "@/components/Avatar.vue"
import { useRouter } from "vue-router"
import MenuLayout from "@/layouts/MenuLayout.vue"

const router = useRouter()
const { groups } = useGroupsState()

const onClick = async (groupId: string): Promise<void> => {
  await router.push({ name: "GroupPage", params: { groupId } })
}
</script>

<style scoped>
@media (min-width: 400px) {
  .text-size {
    font-size: 12px;
    line-height: 16px;
  }
}
@media (max-width: 399px) {
  .text-size {
    font-size: 8px;
    line-height: 8px;
  }
}
</style>
