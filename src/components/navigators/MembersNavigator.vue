<template>
  <div>
    <div class="separator"></div>
    <small class="px-2">Shared</small>
  </div>

  <div class="flex flex-col">
    <button @click="isModalOpened = !isModalOpened">
      <div>
        <MembersIcon />
        <h4>Create a Group</h4>
      </div>
    </button>
  </div>

  <Modal v-if="isModalOpened">
    <ModalContainer title="Create a Group" description="You can your Friends or Family into multiple groups and share notes." @close="isModalOpened = false">
      <Form @submit="submit" :validation-schema="schema" class="form">
        <div>
          <h3>Group Information</h3>
          <BaseInput v-model="groupName" label="Group Name" placeholder="The Marvels" name="GroupName" />
          <BaseInput v-model="userEmail" label="Email" placeholder="example@mail.com" name="Email" />
        </div>
        <div>
          <h3>Add a Member</h3>
          <BaseInput v-model="member" label="Member Name" placeholder="Joe Martin" name="Member" type="search " class="relative border" />
          <Dropdown search="member" class="px-4"> </Dropdown>
        </div>
        <BaseButton label="Add" width="w-20" />
      </Form>
    </ModalContainer>
  </Modal>
</template>

<script lang="ts" setup>
import MembersIcon from "../icons/MembersIcon.vue"
import Modal from "../modals/Modal.vue"
import ModalContainer from "../modals/ModalContainer.vue"
import { Form } from "vee-validate"
import { computed, ref, watch } from "vue"
import * as yup from "yup"
import BaseInput from "../base/BaseInput.vue"
import BaseButton from "../base/BaseButton.vue"
import { usersCollection, useUserActions, useUserState } from "@/store/user"
import db from "@/firebase"
import Dropdown from "../base/Dropdown.vue"

const isModalOpened = ref(false)

const groupName = ref<string>("")
const userEmail = ref<string>("")
const member = ref<string>("")

const { getAllUsers } = useUserActions()
const { all_users } = useUserState()

const unwatch = watch(
  () => isModalOpened.value,
  () => {
    if (isModalOpened.value === true) {
      console.log("triggered")
      getAllUsers()
      unwatch()
    }
  },
)
getAllUsers()

const submit = () => {}

const schema = yup.object({
  Email: yup.string().required().email(),
  GroupName: yup.string().required(),
  Member: yup.string().required(),
})
</script>

<style>
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
</style>
