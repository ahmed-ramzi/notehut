<template>
  <main>
    <!-- Header -->
    <section class="fixed top-0 px-3 pt-3 pb-2 z-20 w-full duration-300 space-y-2 bg-white" :class="!isPositionTop ? 'shadow-lg shadow-slate-500 rounded-b-2xl' : null">
      <div class="flex items-center justify-between">
        <h1 data-test="headerTitle" class="font-semibold">notehut</h1>
        <Avatar data-test="userAvatar" width="w-12" height="h-12" />
      </div>

      <Transition name="searchSlide" mode="out-in">
        <div v-if="isSearchActive">
          <form>
            <TextInput name="search" placeholder="Search for note" class="nh-search drop-shadow-md" focus />
          </form>
        </div>
      </Transition>
    </section>
    <!-- End Header -->

    <section ref="el" class="h-full overflow-scroll px-3 pb-10" :class="isSearchActive ? ' pt-40' : 'pt-20'">
      <div v-if="isLoading" class="centered">
        <Spinner />
      </div>
      <div v-else-if="privateNotesCount" class="pt-1 pb-2">
        <MasonryWall data-test="notesWall" :items="filteredNotes" :column-width="superSmall ? 150 : smallScreen ? 200 : 250" :gap="4">
          <template #default="{ item, index }">
            <NoteCard :note="item" :color="item.color" :note-index="index" />
          </template>
        </MasonryWall>
      </div>
      <div v-else data-test="noNotesView" class="centered">
        <div class="inline-flex flex-col justify-center items-center w-full">
          <p>You have no notes</p>
          <div class="inline-flex flex-col">
            <p class="inline-flex items-center">
              <span class="whitespace-nowrap"> Create a new note by clicking on the </span>
              <span data-test="createNoteBtn" class="px-2">
                <CreateNoteIcon ignore-hidding-btn />
              </span>
              <span> button </span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <FooterNavigator @on-click-search="toggleSearch" />
      <SideNavigator />
    </section>
  </main>
</template>

<script lang="ts" setup>
import { useNotesListState, useNotesListGetters } from "@/store/notesList"
import Spinner from "@/components/base/Spinner.vue"
import Avatar from "@/components/Avatar.vue"
import { useAppState } from "@/store/app"
import CreateNoteIcon from "@/components/icons/CreateNoteIcon.vue"
import { computed, ref, toRefs } from "vue"
import { useBreakpoints, useScroll } from "@vueuse/core"
import NoteCard from "@/components/notes/NoteCard.vue"
import FooterNavigator from "@/components/navigators/FooterNavigator.vue"
import SideNavigator from "@/components/navigators/side/SideNavigator.vue"
import TextInput from "@/components/base/TextInput.vue"
import { useForm } from "vee-validate"

type SearchForm = {
  search: string
}
const breakpoints = useBreakpoints({
  xs: 436,
  sm: 608,
})

const superSmall = breakpoints.smaller("xs")
const smallScreen = breakpoints.between("xs", "sm")

const { privateNotesCount } = useNotesListGetters()
const { notes } = useNotesListState()
const { isLoading } = useAppState()

const { values } = useForm<SearchForm>({
  initialValues: {
    search: "",
  },
})

const filteredNotes = computed(() => {
  return notes.value
    ?.filter((item) => item.title.toLowerCase().includes(values.search.toLowerCase()) || item.contents.toLowerCase().includes(values.search.toLowerCase()))
    .reverse()
})

const el = ref<HTMLElement | null>(null)
const { arrivedState } = useScroll(el)
const { top: isPositionTop } = toRefs(arrivedState)

const isSearchActive = ref(false)

const toggleSearch = () => {
  isSearchActive.value = !isSearchActive.value
}
</script>

<style scoped>
main {
  @apply h-screen flex flex-col justify-between;
}
</style>
<style>
.searchSlide-leave-active {
  transition: all 0.2s ease-out;
}
.searchSlide-enter-active {
  transition: all 0.5s ease-in-out;
}
.searchSlide-enter-from,
.searchSlide-leave-to {
  opacity: 20%;
  transform: translate(0, -10%);
}
</style>
