<template>
  <main>
    <!-- Header -->
    <!-- TODO: TO REFACTOR -->
    <section class="fixed top-0 px-3 pt-3 pb-2 z-20 w-full duration-300 space-y-2 bg-white" :class="!isPositionTop ? 'shadow-lg shadow-slate-500 rounded-b-2xl' : null">
      <div class="flex items-center justify-between">
        <h1 data-test="headerTitle" class="font-semibold">{{ name }}</h1>
        <Avatar v-if="!disableAvatar" data-test="userAvatar" width="w-12" height="h-12" />
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

    <section ref="el" class="h-full overflow-scroll px-3" :class="[isSearchActive ? ' pt-40' : 'pt-20', disableFooter ? 'pb-4' : 'pb-10']">
      <slot />
    </section>

    <section>
      <FooterNavigator v-if="!disableFooter" @on-click-search="toggleSearch" />
      <SideNavigator />
    </section>
  </main>
</template>

<script lang="ts" setup>
import Avatar from "@/components/Avatar.vue"
import { ref, toRefs, watch } from "vue"
import { useScroll } from "@vueuse/core"
import FooterNavigator from "@/components/navigators/FooterNavigator.vue"
import SideNavigator from "@/components/navigators/side/SideNavigator.vue"
import TextInput from "@/components/base/TextInput.vue"
import { useForm } from "vee-validate"

type SearchForm = {
  search: string
}

withDefaults(
  defineProps<{
    name: string
    disableFooter?: boolean
    disableAvatar?: boolean
  }>(),
  {
    disableFooter: false,
    disableAvatar: false,
  },
)
const emit = defineEmits<{
  (e: "search", value: string): void
}>()

const el = ref<HTMLElement | null>(null)
const { arrivedState } = useScroll(el)
const { top: isPositionTop } = toRefs(arrivedState)

const isSearchActive = ref(false)

const { values } = useForm<SearchForm>({
  initialValues: {
    search: "",
  },
})

const toggleSearch = () => {
  isSearchActive.value = !isSearchActive.value
}

watch(
  () => values.search,
  (val) => emit("search", val),
)
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
