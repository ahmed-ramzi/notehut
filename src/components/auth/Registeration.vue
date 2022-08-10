<template>
  <div></div>
  <AuthLayout type="register">
    <Form :validation-schema="schema" class="w-full flex flex-col items-center" @submit="register">
      <BaseInput v-model="userName" label="Name" placeholder="Tell us your name" name="Name" />
      <BaseInput v-model="userEmail" label="Email" placeholder="example@mail.com" name="Email" />
      <BaseInput v-model="password" label="Password" placeholder="Your Password" name="Password" type="password" />
      <BaseButton width="w-full md:w-52" class="mt-4" :loading="loading">Register</BaseButton>
    </Form>
  </AuthLayout>
</template>

<script lang="ts" setup>
import { markRaw, ref } from "vue"
import AuthLayout from "../../layouts/AuthLayout.vue"
import BaseInput from "../base/BaseInput.vue"
import BaseButton from "../base/BaseButton.vue"
import { Form } from "vee-validate"
import * as yup from "yup"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useUserActions, usersCollection } from "../../store/user"
import { useAuthActions } from "../../store/auth"
import { User } from "../../types/states"
import { useRouter } from "vue-router"
import { privateNotesCollection } from "@/store/notesList"

let auth

const userName = ref<string>("")
const userEmail = ref<string>("")
const password = ref<string>("")

const loading = ref<boolean>(false)

const router = useRouter()

const { setLoggedIn } = useAuthActions()

const { getUser } = useUserActions()

const schema = yup.object({
  Name: yup.string().required(),
  Email: yup.string().required().email(),
  Password: yup.string().required().min(8),
})

const register = () => {
  if (!loading.value) {
    loading.value = true
    auth = getAuth()

    createUserWithEmailAndPassword(auth, userEmail.value, password.value)
      .then(async (data) => {
        const newUserId = data.user.uid

        const newUser = {
          id: newUserId,
          name: userName.value,
          email: userEmail.value,
          registerDate: data.user.metadata.creationTime,
        } as User

        usersCollection.doc(newUserId).set(markRaw(newUser))
        privateNotesCollection.doc(newUserId).set({
          notes: [],
        })

        getUser()
        console.log("Successfully Registered")
        setLoggedIn(true)
        await router.push({ name: "HomePage" })
      })
      .catch((error) => {
        loading.value = false
        console.log(error.code)
        setLoggedIn(false)
        alert(error.message)
      })
  }
}
</script>
