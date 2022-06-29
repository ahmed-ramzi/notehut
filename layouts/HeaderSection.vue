<template>
  <section class="flex justify-between">
    <ActionBtn v-if="backBtn" icon="<" label="Back" @click="onClickBack" />
    <h1 class="font-semibold justify-start">{{ headerLabel }}</h1>
    <div class="flex">
      <div>
        <slot />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import ActionBtn from "../components/icons/ActionBtn.vue"
import { useRouter } from "vue-router"
import { clearNoteDetailsState, useNoteDetailsActions } from "../store/noteDetails"

const props = defineProps({
  headerLabel: {
    type: String,
    default: "",
  },
  backBtn: {
    type: String,
    default: "",
  },
})

const router = useRouter()

const { changeEditingState } = useNoteDetailsActions()
const onClickBack = (): void => {
  router.push({ name: props.backBtn })
  changeEditingState(false)
  clearNoteDetailsState()
}
</script>
