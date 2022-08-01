<template>
  <div class="h-screen p-4 space-y-4 flex flex-col">
    <HeaderSection back-btn="home" header-label="shared notes"></HeaderSection>
    <div class="flex flex-col space-y-4">
      <div
        v-for="group in groups"
        :key="group.id"
        class="rounded-2xl h-24 bg-gradient-to-r p-4 from-slate-100 via-slate-300 to-slate-500 shadow-md hover:motion-safe:shadow-xl cursor-pointer duration-300 flex justify-between items-center hover:motion-safe:border-2 border-slate-900"
      >
        <div class="flex flex-col">
          <h3 class="text-slate-900 font-light">{{ group.name }}</h3>
          <small class="text-slate-500 italic">Created on: {{ group.created_at }}</small>
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
  </div>
</template>

<script lang="ts" setup>
import HeaderSection from "@/layouts/HeaderSection.vue"
import { useGroupsState } from "@/store/groups"
import Avatar from "@/components/Avatar.vue"

const { groups } = useGroupsState()
</script>
