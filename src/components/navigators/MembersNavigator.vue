<template>
  <div>
    <div class="separator"></div>
    <small class="px-2">Shared Notes</small>
  </div>

  <div class="flex flex-col">
    <button v-if="groupsCount" @click="onClickGroups">
      <div>
        <MembersIcon />
        <h4>Groups</h4>
      </div>
      <small>({{ groupsCount }})</small>
    </button>
    <button @click="isModalOpened = !isModalOpened">
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
import { useGroupsGetters } from "@/store/groups"
import { useRouter } from "vue-router"
import { useNavActions } from "@/store/navigators"
import CreateGroupIcon from "../icons/CreateGroupIcon.vue"
import Modal from "../modals/Modal.vue"
import CreateGroupForm from "../forms/CreateGroupForm.vue"

const isModalOpened = ref(false)

const router = useRouter()

const { groupsCount } = useGroupsGetters()
const { toggleMenu } = useNavActions()

const onClickGroups = async () => {
  await router.push({ name: "GroupsPage" })
  toggleMenu()
}
</script>

<style scoped>
.separator {
  @apply h-0 w-full border border-slate-500;
}
.form,
.form > div {
  @apply flex flex-col space-y-2 w-full;
}
.form {
  @apply items-center;
}
button {
  @apply px-1;
}
</style>
