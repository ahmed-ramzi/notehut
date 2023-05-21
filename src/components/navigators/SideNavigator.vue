<template>
  <teleport to="body">
    <div v-if="isMenuActive" class="absolute top-0 left-0 bg-slate-300/40 w-full h-screen overscroll-none flex backdrop-blur-sm z-30"></div>
    <div data-test="sideMenu" class="absolute top-0 h-screen z-30 left-0 px-3 py-3">
      <Transition name="slideRight">
        <nav
          v-if="isMenuActive"
          ref="sideBar"
          class="bg-white shadow-2xl shadow-slate-900 opacity-95 p-4 rounded-[2.5rem] flex flex-col justify-between overflow-scroll h-full w-full"
        >
          <div class="flex flex-col space-y-4">
            <div class="flex items-center space-x-2">
              <!-- Avatar -->
              <Avatar :name="user?.name" />
              <div class="truncate w-full">
                <h3 class="text-slate-800 font-bold truncate">{{ user?.name }}</h3>
                <p>{{ user?.email }}</p>
              </div>
            </div>
            <!-- Personal Stuff -->
            <div class="flex flex-col">
              <button data-test="personalNotesBtn" @click="router.push({ name: 'HomePage' })">
                <div>
                  <NoteIcon />
                  <h4>Notes</h4>
                </div>
                <small>({{ privateNotesCount }})</small>
              </button>
              <button data-test="notificationsBtn">
                <div>
                  <NotificationsIcon />
                  <h4>Notifications</h4>
                </div>
                <small>(soon)</small>
              </button>
            </div>
            <!-- Shared -->
            <MembersNavigator />
          </div>

          <div class="flex flex-col">
            <button data-test="settingsBtn">
              <div>
                <SettingsIcon />
                <h4>Settings</h4>
              </div>
              <small>(soon)</small>
            </button>

            <button data-test="logoutBtn" @click="logout">
              <div>
                <LogoutIcon />
                <h4>Logout</h4>
              </div>
            </button>

            <button data-test="closeMenuBtn" class="px-2 space-x-4" @click="toggleMenu">
              <div>
                <div>
                  <HamburgerMenu dark />
                </div>
                <h4>Close Menu</h4>
              </div>
            </button>
          </div>
        </nav>
      </Transition>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import HamburgerMenu from "../icons/HamburgerMenu.vue"
import { useUserState } from "@/store/user"
import NoteIcon from "../icons/NoteIcon.vue"
import SettingsIcon from "../icons/SettingsIcon.vue"
import LogoutIcon from "../icons/LogoutIcon.vue"
import NotificationsIcon from "../icons/NotificationsIcon.vue"
import { getAuth, signOut } from "firebase/auth"
import { resetApp } from "@/store"
import { useRouter } from "vue-router"
import { useNotesListGetters } from "@/store/notesList"
import MembersNavigator from "./MembersNavigator.vue"
import Avatar from "../Avatar.vue"
import { useNavActions, useNavState } from "@/store/navigators"
import { onClickOutside } from "@vueuse/core"
import { onUnmounted, ref } from "vue"

let auth

const sideBar = ref(null)

const { user } = useUserState()
const { privateNotesCount } = useNotesListGetters()

const router = useRouter()

const { isMenuActive } = useNavState()
const { toggleMenu } = useNavActions()

onClickOutside(sideBar, () => {
  if (!document.getElementById("modal")) {
    toggleMenu()
  }
})

onUnmounted(() => {
  if (isMenuActive.value) {
    toggleMenu()
  }
})

const logout = () => {
  try {
    auth = getAuth()
    signOut(auth).then(async () => {
      resetApp()
      await router.push({ name: "login" })
    })
  } catch (e) {
    console.log(e)
    alert("Could not log you out. Please try again later")
  }
}
</script>

<style>
button {
  @apply flex h-12 items-center px-1 justify-between space-x-2 rounded-xl text-left;
}

button:hover {
  @apply outline-dotted outline-slate-700 shadow-md;
}
button:active {
  @apply opacity-70;
}

button > div {
  @apply flex space-x-2 h-full items-center;
}
small {
  @apply italic text-slate-400;
}

/* button > h4:hover,
button > p:hover {
  @apply text-white;
} */

@media (max-width: 299px) {
  nav {
    @apply w-full;
  }
}

@media (min-width: 300px) {
  nav {
    @apply min-w-[280px] max-w-[350px];
  }
}
</style>
