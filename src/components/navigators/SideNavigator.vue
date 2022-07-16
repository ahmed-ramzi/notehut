<template>
  <teleport to="body">
    <div class="modal">
      <nav class="bg-slate-50 opacity-95 p-6 rounded-xl flex flex-col justify-between border-slate-600 border-2 border-opacity-40 overflow-scroll">
        <div class="flex flex-col space-y-6">
          <div class="flex items-center space-x-4">
            <!-- Avatar -->
            <div class="border-2 rounded-lg w-14 h-14 flex justify-center items-center" :class="gradientColorClass(avatarColor)">
              <h2 class="text-white">
                {{ user?.name.charAt(0).toUpperCase() }}
              </h2>
            </div>
            <div>
              <h3 class="text-slate-800 font-bold">{{ user?.name }}</h3>
              <p>{{ user?.email }}</p>
            </div>
          </div>
          <!-- Personal Stuff -->
          <div class="flex flex-col">
            <button @click="toggleMenu">
              <NoteIcon />
              <h4>Notes</h4>
              <small>({{ notesCount }})</small>
            </button>
            <button>
              <NotificationsIcon />
              <h4>Notifications</h4>
              <small>(soon)</small>
            </button>
          </div>
          <!-- Shared -->
          <div class="separator"></div>
          <small class="px-2">Shared</small>
          <div class="flex flex-col">
            <button>
              <h4>Groups</h4>
              <small>(soon)</small>
            </button>
            <button>
              <h4>Family</h4>
              <small>(soon)</small>
            </button>
          </div>
        </div>

        <div class="flex flex-col">
          <button>
            <SettingsIcon />
            <h4>Settings</h4>
            <small>(soon)</small>
          </button>
          <button @click="logout">
            <LogoutIcon />
            <h4>Logout</h4>
          </button>
          <button @click="toggleMenu" class="px-2 space-x-4">
            <HamburgerMenu black />
            <h4>Close Menu</h4>
          </button>
        </div>
      </nav>
    </div>
  </teleport>
</template>
<script lang="ts" setup>
import HamburgerMenu from "../icons/HamburgerMenu.vue"
import { useNavActions } from "@/store/navigators"
import { useUserState } from "@/store/user"
import { randomColor, gradientColorClass } from "@/composables/useRandomColor"
import NoteIcon from "../icons/NoteIcon.vue"
import SettingsIcon from "../icons/SettingsIcon.vue"
import LogoutIcon from "../icons/LogoutIcon.vue"
import NotificationsIcon from "../icons/NotificationsIcon.vue"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { resetApp } from "@/store"
import { useRouter } from "vue-router"
import { useNotesListGetters } from "@/store/notesList"

const avatarColor = randomColor() as string

const { toggleMenu } = useNavActions()
const { user } = useUserState()
const { notesCount } = useNotesListGetters()

const router = useRouter()

let auth

const logout = () => {
  try {
    auth = getAuth()
    signOut(auth).then(() => {
      resetApp()
      router.push({ name: "login" })
    })
  } catch (e) {
    console.log(e)
    alert("Could not log you out. Please try again later")
  }
}
</script>

<style scoped>
.modal {
  @apply absolute top-0 left-0  bg-slate-300/40 z-50 w-full h-full overscroll-contain flex py-2 px-4 backdrop-blur-sm;
}
button {
  @apply flex h-12 items-center  space-x-2 rounded text-left;
}
button:hover {
  @apply bg-slate-300;
}
button:active {
  @apply opacity-70;
}

small {
  @apply italic text-slate-400;
}

.separator {
  @apply h-0 w-full border border-slate-500;
}

/* button > h4:hover,
button > p:hover {
  @apply text-white;
} */

@media (max-width: 399px) {
  nav {
    @apply w-full;
  }
}

@media (min-width: 400px) {
  nav {
    @apply min-w-[350px];
  }
}
</style>
