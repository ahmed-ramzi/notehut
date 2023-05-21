<template>
  <teleport to="body">
    <BlurLayer v-if="isMenuActive" />
    <main data-test="sideMenu">
      <Transition name="slideRight">
        <SideNavigationWindow v-if="isMenuActive" ref="sideBar">
          <div class="flex flex-col justify-between h-full">
            <section>
              <DisplayAvatar class="mb-8" />

              <CategorySection name="Personal">
                <NavOption icon="notes" data-test="personalNotesBtn" @click="router.push({ name: 'HomePage' })">
                  <label class="option">My Notes</label>
                  <Pill type="info">{{ privateNotesCount }}</Pill>
                </NavOption>
                <NavOption icon="notification-bell" data-test="notificationsBtn">
                  <label class="option">Notifications </label>
                  <Pill type="ignore">Soon</Pill>
                </NavOption>
              </CategorySection>

              <CategorySection name="Groups">
                <NavOption v-if="groupsCount" icon="groups" data-test="groupsBtn" @click="router.push({ name: 'GroupsPage' })">
                  <label class="option">My Groups</label>
                  <Pill type="info">{{ groupsCount }}</Pill>
                </NavOption>

                <NavOption icon="add-member" data-test="createGroupBtn" @click="isModalOpened = !isModalOpened">
                  <label class="option">Create Group</label>
                  <Modal
                    :close-action="isModalOpened"
                    title="Create a Group"
                    description="You can your Friends or Family into multiple groups and share notes."
                    @close="isModalOpened = false"
                  >
                    <CreateGroupForm />
                  </Modal>
                </NavOption>
              </CategorySection>

              <CategorySection name="Shortcuts" spacing>
                <template v-for="(group, index) in groups" :key="group.id">
                  <NavOption v-if="index < 3" custom>
                    <DisplayGroupName :name="group.name" @click="onSelectGroup(group.id)" />
                  </NavOption>
                </template>
              </CategorySection>

              <CategorySection name="Settings">
                <NavOption icon="account" data-test="accountBtn">
                  <label class="option">My Account</label>
                  <Pill type="ignore">Soon</Pill>
                </NavOption>

                <NavOption icon="theme" data-test="themeBtn">
                  <label class="option">Themes </label>
                  <Pill type="ignore">Soon</Pill>
                </NavOption>

                <NavOption icon="settings" data-test="appSettingsBtn">
                  <label class="option">App Settings</label>
                  <Pill type="ignore">Soon</Pill>
                </NavOption>
              </CategorySection>
            </section>

            <section>
              <CategorySection name="MISC">
                <NavOption icon="logout" data-test="logoutBtn" @click="logout">
                  <label class="option">Logout</label>
                </NavOption>
                <NavOption icon="close-nav" data-test="closeMenuBtn" @click="toggleMenu">
                  <label class="option">Close </label>
                </NavOption>
              </CategorySection>
            </section>
          </div>
        </SideNavigationWindow>
      </Transition>
    </main>
  </teleport>
</template>

<script lang="ts" setup>
import DisplayAvatar from "./components/DisplayAvatar.vue"
import SideNavigationWindow from "./components/SideNavigationWindow.vue"
import CategorySection from "./components/CategorySection.vue"
import NavOption from "./components/NavOption.vue"
import Pill from "./components/Pill.vue"
import Modal from "@/components/modals/Modal.vue"
import CreateGroupForm from "@/components/forms/CreateGroupForm.vue"
import DisplayGroupName from "./components/DisplayGroupName.vue"
import { getAuth, signOut } from "firebase/auth"
import { resetApp } from "@/store"
import { useRouter } from "vue-router"
import { useNotesListGetters } from "@/store/notesList"
import { useNavActions, useNavState } from "@/store/navigators"
import { onClickOutside } from "@vueuse/core"
import { onUnmounted, ref } from "vue"
import BlurLayer from "./components/BlurLayer.vue"
import { useGroupsGetters, useGroupsState } from "@/store/groups"

let auth

const sideBar = ref(null)
const router = useRouter()
const isModalOpened = ref(false)

const { privateNotesCount } = useNotesListGetters()
const { isMenuActive } = useNavState()
const { toggleMenu } = useNavActions()
const { groupsCount } = useGroupsGetters()
const { groups } = useGroupsState()

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

const onSelectGroup = async (groupId: string): Promise<void> => {
  await router.push({ name: "GroupPage", params: { groupId } })
  if (isMenuActive.value) {
    toggleMenu()
  }
}

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

<style scoped>
main {
  @apply absolute top-0 h-screen z-30 left-0 p-2;
}
label.option {
  @apply font-medium text-sm cursor-pointer;
}
</style>
