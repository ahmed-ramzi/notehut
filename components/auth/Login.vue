<template>
  <AuthLayout type="login">
    <!-- Form -->
    <Form @submit="login" :validation-schema="schema" class="w-full flex flex-col items-center">
      <BaseInput v-model="userEmail" label="Email" placeholder="example@mail.com" name="Email" />
      <BaseInput v-model="password" label="Password" placeholder="Your Password" name="Password" />
      <BaseButton label="Sign In" width="w-full md:w-52" :loading="loading" class="mt-4" />
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
    const userEmail = ref<string>("")
    const password = ref<string>("")

    const loading = ref<boolean>(false)

    const schema = yup.object({
      Email: yup.string().required().email(),
      Password: yup.string().required().min(8),
    })

    const login = () => {
      loading.value = true
    }

    return {
      login,
      schema,
      loading,
      userEmail,
      password,
    }
  },
})
</script>
