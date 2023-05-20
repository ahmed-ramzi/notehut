<template>
  <div></div>
  <AuthLayout type="register">
    <form class="w-full flex flex-col items-center" @submit.prevent="register">
      <TextInput name="name" label="Name" placeholder="Tell us your name" />
      <TextInput name="email" label="Email" placeholder="example@mail.com" />
      <TextInput name="password" label="Password" placeholder="Your Password" type="password" />
      <BaseButton width="w-full md:w-52" class="mt-4" :loading="loading">Register</BaseButton>
    </form>
  </AuthLayout>
</template>

<script lang="ts" setup>
import { markRaw, ref } from "vue"
import AuthLayout from "../../layouts/AuthLayout.vue"
import BaseButton from "../base/BaseButton.vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useUserActions, usersCollection } from "../../store/user"
import { useAuthActions } from "../../store/auth"
import { User } from "../../types/states"
import { useRouter } from "vue-router"
import { privateNotesCollection } from "@/store/notesList"
import TextInput from "../base/TextInput.vue"
import { useForm } from "vee-validate"
import { object, string } from "yup"

type RegisterForm = {
  name: string
  email: string
  password: string
}

let auth

const loading = ref<boolean>(false)

const router = useRouter()

const { setLoggedIn } = useAuthActions()
const { getUser } = useUserActions()

const { handleSubmit } = useForm<RegisterForm>({
  validationSchema: object({
    name: string().required(),
    email: string().email().required(),
    password: string().min(8).required(),
  }),
  initialValues: {
    name: "",
    email: "",
    password: "",
  },
})

const register = handleSubmit(async (values: RegisterForm) => {
  if (!loading.value) {
    loading.value = true
    auth = getAuth()

    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (data) => {
        const newUserId = data.user.uid

        const newUser = {
          id: newUserId,
          name: values.name,
          email: values.email,
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
})
</script>
