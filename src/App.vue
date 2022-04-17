<template>
  <Spinner v-if="loading" class="spinner" />
  <router-view v-else />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import Spinner from "../components/base/Spinner.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useUserActions } from "../store/user"
import { useAuthActions } from "../store/auth"
import { useRouter } from "vue-router"

export default defineComponent({
  components: {
    Spinner,
  },
  setup() {
    const loading = ref<boolean>(true)

    const { getUser } = useUserActions()
    const { setLoggedIn } = useAuthActions()

    const router = useRouter()

    onAuthStateChanged(getAuth(), (userData) => {
      // console.log(userData)
      if (userData) {
        getUser(userData.uid)
        setLoggedIn(true)
        router.push({ name: "home" })
        loading.value = false
      } else {
        setLoggedIn(false)
        router.push({ name: "login" })
        loading.value = false
      }
    })

    return {
      loading,
    }
  },
})
</script>

<style scoped>
.spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
