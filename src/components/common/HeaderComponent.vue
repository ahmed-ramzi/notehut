<template>
  <section class="sticky top-0 px-3 pt-3 pb-2 z-20 w-full duration-300 space-y-4 bg-white rounded-b-2xl" :class="!isPositionTop ? 'shadow-lg shadow-slate-500 ' : null">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <button v-if="backBtn" class="active:opacity-50 active:scale-90 duration-300 mt-2" @click="onClickBack">
          <Icon name="chevron-left" class="w-7 h-7 text-slate-700" />
        </button>
        <h1 data-test="headerTitle" class="font-semibold"><slot /></h1>
      </div>

      <Avatar v-if="!hideAvatar" data-test="userAvatar" width="w-12" height="h-12" />
    </div>

    <Transition name="searchSlide" mode="out-in">
      <div v-if="isSearchActive">
        <form>
          <TextInput name="search" placeholder="Search for note" class="nh-search drop-shadow-md" no-validate focus />
        </form>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import TextInput from "../base/TextInput.vue"
import Avatar from "../Avatar.vue"
import { useForm } from "vee-validate"
import { watch } from "vue"
import { Routes } from "@/router/routes"
import { useNotesListActions } from "@/store/notesList"
import { clearNoteDetailsState, useNoteDetailsActions, useNoteDetailsState } from "@/store/noteDetails"
import { useRoute, useRouter } from "vue-router"

type SearchForm = {
  search: string
}

const props = withDefaults(
  defineProps<{
    isPositionTop: boolean
    isSearchActive: boolean
    hideAvatar: boolean
    backBtn?: Routes | "back" | ""
  }>(),
  {
    isPositionTop: false,
    isSearchActive: false,
    hideAvatar: false,
    backBtn: "",
  },
)
const emit = defineEmits<{
  (e: "search", value: string): void
}>()

const { values } = useForm<SearchForm>({
  initialValues: {
    search: "",
  },
})

const router = useRouter()
const route = useRoute()

const groupId = route.params.groupId as string
const { isEditing } = useNoteDetailsState()
const { getPrivateNotesList, getSharedNotesList } = useNotesListActions()
const { changeEditingState } = useNoteDetailsActions()

const onClickBack = async (): Promise<void> => {
  if (isEditing.value) {
    changeEditingState(false)
    clearNoteDetailsState()
    if (groupId) {
      getSharedNotesList(groupId)
    } else {
      getPrivateNotesList()
    }
  }
  if (props.backBtn === "back") {
    router.back()
  } else {
    await router.push({ name: props.backBtn })
  }
}

watch(
  () => values.search,
  (val) => emit("search", val),
)
</script>
