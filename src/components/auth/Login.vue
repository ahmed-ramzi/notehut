<template>
  <AuthLayout type="login">
    <form class="w-full flex flex-col items-center nh-form" @submit.prevent="onSubmit">
      <TextInput name="email" label="Email" placeholder="example@mail.com" class="nh-email" />
      <TextInput name="password" label="Password" placeholder="Your Password" type="password" class="nh-password" />
      <p v-if="errMsg" class="text-red-500 font-medium nh-error-msg">{{ errMsg }}</p>
      <BaseButton width="w-full md:w-52" :loading="loading" class="mt-4 nh-submit">Sign In</BaseButton>
    </form>
  </AuthLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import AuthLayout from "../../layouts/AuthLayout.vue"
import BaseButton from "../base/BaseButton.vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useAuthActions } from "../../store/auth"
import { useRouter } from "vue-router"
import { useUserActions } from "../../store/user"
import { useAppActions } from "@/store/app"
import { useForm } from "vee-validate"
import TextInput from "../base/TextInput.vue"
import { object, string } from "yup"

type LoginForm = {
  email: string
  password: string
}

let auth
const errMsg = ref<string>("")

const loading = ref<boolean>(false)

const router = useRouter()
const { loadApp } = useAppActions()
const { getUser } = useUserActions()
const { setLoggedIn } = useAuthActions()

const { handleSubmit } = useForm<LoginForm>({
  validationSchema: object({
    email: string().email().required(),
    password: string().min(8).required(),
  }),
  initialValues: {
    email: "",
    password: "",
  },
})

const onSubmit = handleSubmit(async (values: LoginForm) => {
  if (!loading.value) {
    loading.value = true
    auth = getAuth()

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async () => {
        console.log("Successfully signed in!")
        // console.log("auth", auth.currentUser)
        // console.log("data", data.user)

        setLoggedIn(true)
        await router.push({ name: "HomePage" })
        getUser()
        loadApp()
      })
      .catch((error) => {
        loading.value = false
        setLoggedIn(false)

        // console.log(error.code)
        switch (error.code) {
          case "auth/invalid-email":
            errMsg.value = "Invalid email"
            break

          case "auth/user-not-found":
            errMsg.value = "No account with that email was found"
            break

          case "auth/wrong-password":
            errMsg.value = "Incorrect Password"
            break

          default:
            errMsg.value = "Email or Password in incorrect"
            break
        }
      })
  }
})
</script>
