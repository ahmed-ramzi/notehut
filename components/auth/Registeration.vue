<template>
  <AuthLayout type="register">
    <!-- Form -->
    <Form @submit="register" :validation-schema="schema" class="w-full flex flex-col items-center">
      <BaseInput v-model="userName" label="Name" placeholder="Tell us your name" name="Name" />
      <BaseInput v-model="userEmail" label="Email" placeholder="example@mail.com" name="Email" />
      <BaseInput v-model="password" label="Password" placeholder="Your Password" name="Password" />
      <BaseButton label="Register" width="w-full md:w-52" class="mt-4" :loading="loading" />
    </Form>
  </AuthLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import AuthLayout from "../../layouts/AuthLayout.vue"
import BaseInput from "../base/BaseInput.vue"
import BaseButton from "../base/BaseButton.vue"
import { Form } from "vee-validate"
import * as yup from "yup"

export default defineComponent({
  components: {
    AuthLayout,
    BaseButton,
    BaseInput,
    Form,
  },
  setup() {
    const userName = ref<string>("")
    const userEmail = ref<string>("")
    const password = ref<string>("")

    const loading = ref<boolean>(false)

    const schema = yup.object({
      Name: yup.string().required(),
      Email: yup.string().required().email(),
      Password: yup.string().required().min(8),
    })

    const register = () => {
      loading.value = true
    }

    return {
      register,
      schema,
      userName,
      userEmail,
      password,
      loading,
    }
  },
})
</script>
