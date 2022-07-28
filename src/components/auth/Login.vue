<template>
  <AuthLayout type="login">
    <!-- Form -->
    <Form :validation-schema="schema" class="w-full flex flex-col items-center nh-form" @submit="login">
      <BaseInput v-model="userEmail" label="Email" placeholder="example@mail.com" name="Email" class="nh-email" />
      <BaseInput v-model="password" label="Password" placeholder="Your Password" name="Password" type="password" class="nh-password" />
      <p v-if="errMsg" class="text-red-500 font-medium nh-error-msg">{{ errMsg }}</p>
      <BaseButton label="Sign In" width="w-full md:w-52" :loading="loading" class="mt-4 nh-submit" />
    </Form>
  </AuthLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import AuthLayout from "../../layouts/AuthLayout.vue"
import BaseInput from "../base/BaseInput.vue"
import BaseButton from "../base/BaseButton.vue"
import { Form } from "vee-validate"
import * as yup from "yup"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useAuthActions } from "../../store/auth"
import { useRouter } from "vue-router"
import { useUserActions } from "../../store/user"

let auth

const userEmail = ref<string>("")
const password = ref<string>("")
const errMsg = ref<string>("")

const loading = ref<boolean>(false)

const router = useRouter()

const { getUser } = useUserActions()

const { setLoggedIn } = useAuthActions()

const schema = yup.object({
  Email: yup.string().required().email(),
  Password: yup.string().required(),
})

const login = () => {
  if (!loading.value) {
    loading.value = true
    auth = getAuth()

    signInWithEmailAndPassword(auth, userEmail.value, password.value)
      .then(() => {
        console.log("Successfully signed in!")
        // console.log("auth", auth.currentUser)
        // console.log("data", data.user)

        setLoggedIn(true)
        getUser()
        router.push({ name: "home" })
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
}
</script>
