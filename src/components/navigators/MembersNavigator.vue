<template>
  <div>
    <div class="separator"></div>
    <small class="px-2">Shared Notes</small>
  </div>

  <div class="flex flex-col gap-2">
    <div v-if="groupsCount" class="flex flex-col gap-4">
      <div
        v-for="(group, index) in groups"
        :key="group.id"
        class="hover:motion-safe:ring-2 ring-slate-900 bg-gradient-to-r p-2 from-slate-100 via-slate-300 to-slate-500 shadow-md hover:motion-safe:shadow-xl cursor-pointer duration-300 rounded-lg"
        :class="index > 2 ? 'hidden' : null"
        @click="onSelectGroup(group.id)"
      >
        <div>
          <h4>{{ group.name }}</h4>
        </div>
      </div>
    </div>
    <button v-if="groupsCount" @click="onSelectAll">
      <div>
        <MembersIcon />
        <h4>All Groups</h4>
      </div>
      <small>({{ groupsCount }})</small>
    </button>
    <button data-test="createGroupBtn" @click="isModalOpened = !isModalOpened">
      <div>
        <CreateGroupIcon />
        <h4>Create a Group</h4>
      </div>
    </button>
  </div>

  <Modal :close-action="isModalOpened" title="Create a Group" description="You can your Friends or Family into multiple groups and share notes." @close="isModalOpened = false">
    <CreateGroupForm />
  </Modal>
</template>

<script lang="ts" setup>
import MembersIcon from "../icons/MembersIcon.vue"
import { ref } from "vue"
import { useGroupsGetters, useGroupsState } from "@/store/groups"
import { useRouter } from "vue-router"
import { useNavActions, useNavState } from "@/store/navigators"
import CreateGroupIcon from "../icons/CreateGroupIcon.vue"
import Modal from "../modals/Modal.vue"
import CreateGroupForm from "../forms/CreateGroupForm.vue"

const isModalOpened = ref(false)

const router = useRouter()

const { groups } = useGroupsState()
const { groupsCount } = useGroupsGetters()
const { toggleMenu } = useNavActions()
const { isMenuActive } = useNavState()

const onSelectAll = async () => {
  await router.push({ name: "GroupsPage" })
  if (isMenuActive.value) {
    toggleMenu()
  }
}

const onSelectGroup = async (groupId: string): Promise<void> => {
  await router.push({ name: "GroupPage", params: { groupId } })
  if (isMenuActive.value) {
    toggleMenu()
  }
}
</script>

<style scoped>
.separator {
  @apply h-0 w-full border border-slate-500;
}
button {
  @apply px-1;
}
</style>
