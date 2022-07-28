<template>
  <Form :validation-schema="schema" class="form" @submit="submit(userEmail)">
    <div>
      <h3>Group Information</h3>
      <BaseInput v-model="groupName" label="Group Name" placeholder="eg. The Marvels" name="GroupName" />
    </div>
    <div class="border-t-2 pt-4">
      <h3>Add a Member</h3>
      <BaseInput v-model="userEmail" type="search" label="Email" placeholder="example@mail.com" name="Email" />

      <!-- <BaseInput v-model="member" label="Member Name" placeholder="Joe Martin" name="Member" type="search " /> -->
    </div>
    <div class="h-4">
      <p v-if="errorMessage" class="text-red-500 italic font-bold text-center">{{ errorMessage }}</p>
    </div>
    <BaseButton width="w-20" :loading="loading">Create</BaseButton>
  </Form>
</template>

<script lang="ts" setup>
import { markRaw, ref } from "vue"
import * as yup from "yup"
import { Form } from "vee-validate"
import BaseInput from "../base/BaseInput.vue"
import BaseButton from "../base/BaseButton.vue"
import { useUserActions, useUserState } from "@/store/user"
import { useGroupsActions } from "@/store/groups"
import { GroupDetail, User } from "@/types/states"
import { v4 } from "uuid"
import useDate from "@/composables/useDate"
import { useNavActions } from "@/store/navigators"
import { useRouter } from "vue-router"

const groupName = ref<string>("")
const userEmail = ref<string>("")
const loading = ref<boolean>(false)
const errorMessage = ref<string>("")

const { getAllUsers } = useUserActions()
const { user, all_users } = useUserState()

const { createGroup } = useGroupsActions()

const { toggleMenu } = useNavActions()

const router = useRouter()

const submit = async (email: string) => {
  // First checking if member exits
  loading.value = true
  if (!all_users.value.length) {
    await getAllUsers()
  }

  let member = {} as User
  all_users.value.forEach((user: User) => {
    if (email === user.email) {
      member = markRaw(user)
    }
  })

  if (Object.keys(member).length !== 0) {
    try {
      const groupData = {
        id: v4(),
        name: groupName.value,
        created_at: useDate.shortDate(),
        members: [
          {
            id: user.value?.id,
            name: user.value?.name,
            email: user.value?.email,
            role: "admin",
            joinDate: useDate.shortDate(),
            status: "active",
          },
          {
            id: member.id,
            name: member.name,
            email: member.email,
            role: "member",
            joinDate: useDate.shortDate(),
            status: "active",
          },
        ],
      } as GroupDetail

      loading.value = false
      createGroup(groupData)
      await router.push({ name: "GroupsPage" })
      toggleMenu()
    } catch (e) {
      loading.value = false
      errorMessage.value = "Something went wrong. Try again later"
    }
  } else {
    loading.value = false
    errorMessage.value = "User doesn't exist"
  }
}
const schema = yup.object({
  Email: yup.string().required().email(),
  GroupName: yup.string().required(),
})
</script>

<style scoped>
.form,
.form > div {
  @apply flex flex-col space-y-2 w-full;
}
.form {
  @apply items-center;
}
</style>
