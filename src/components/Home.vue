<template>
  <!-- Header -->
  <section class="p-4 flex justify-between items-center text-center">
    <span>
      <h1 v-if="!currentNote">Notes</h1>
      <h2 v-else class="btn-back" @click="currentNote = null">Back</h2>
    </span>
    <div class="flex items-center space-x-2">
      <base-icon
        v-if="!searchActive && !currentNote"
        svg-path="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"
        @click="onSelectSearch"
      ></base-icon>

      <base-icon
        v-else-if="searchActive"
        svg-path="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"
        @click="onSelectSearch"
      ></base-icon>
      <button class="border-2 h-10 px-3 rounded-lg btn-create-note border-rose-500 text-rose-500 uppercase" @click="createNote">
        <span>
          <span class="md:hidden text-xl">+</span>
          <span class="hidden md:block">Create New</span></span
        >
      </button>
    </div>
  </section>

  <!-- Seach Section Mobile Verson -->
  <section v-if="searchActive" class="px-4 py-2">
    <input ref="searchInput" v-model="search" type="search" placeholder="Seach for note... " class="border w-full px-4 py-2 rounded-lg outline-rose-500 text-gray-400" />
  </section>

  <!-- Notes Display and Writing Section -->
  <section class="h-screen flex">
    <!-- Notes Nav -->
    <nav :class="!currentNote ? 'w-full' : 'min-w-[35%] w-auto rounded-r-md border-r shadow-lg hidden md:block'" class="mt-1 mb-2 px-2 h-full">
      <ul v-if="notes.length" :class="!currentNote ? 'flex flex-wrap   gap-4  mx-2' : 'grid gap-4'">
        <li v-for="note in filteredNotes.slice().reverse()" :key="note.id">
          <button :class="note === currentNote ? 'note-selected bg-rose-500 text-white' : 'notes-unselected text-gray-500'" @click="currentNote = note">
            <h2 class="px-2">
              {{ note.title || "New note" }}
            </h2>
          </button>
        </li>
      </ul>
      <p v-else class="text-gray-400 italic p-2">No notes saved</p>
    </nav>

    <!-- Note Writing Section -->
    <div v-if="currentNote" class="w-full space-y-3 mx-2">
      <input
        ref="noteTitle"
        v-model="currentNote.title"
        type="text"
        name="title"
        class="font-extralight text-3xl text-gray-400 w-full p-2 outline-none rounded-md"
        :placeholder="currentNote.title || 'New note'"
      />

      <textarea
        v-model="currentNote.contents"
        name="contents"
        rows="10"
        class="w-full rounded-md outline-none px-2 py-2 text-gray-400 font-light h-[90%] resize-none"
        :placeholder="currentNote.contents || 'Jot something here...'"
      ></textarea>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue"
import BaseIcon from "./base/BaseIcon.vue"

const notes = ref([
  // Mock data
  { id: "1", title: "First Note", contents: "This is a content" },
  {
    id: "2",
    title: "Second Note",
    contents: "This is a content",
  },
  { id: "3", title: "Third Note", contents: "This is a content" },
  { id: "4", title: "Third Note", contents: "This is a content" },
])
const currentNote = ref(null)

const noteTitle = ref()
const searchInput = ref(null)

const search = ref("")
const searchActive = ref()

const createNote = () => {
  const newNote = { title: "", contents: "" }
  notes.value.push(newNote)
  currentNote.value = newNote
  nextTick(() => {
    noteTitle.value.focus()
  })
}
const onSelectSearch = () => {
  searchActive.value = !searchActive.value
  search.value = ""
  nextTick(() => {
    searchInput.value.focus()
  })
}

const filteredNotes = computed(() => {
  return notes.value.filter((note) => note.title.toLowerCase().includes(search.value.toLowerCase()))
})
watch(
  () => currentNote.value,
  () => {
    if (searchActive.value) {
      onSelectSearch()
    }
  },
)
</script>

<style scoped>
.btn-create-note:hover {
  @apply text-white bg-rose-500 shadow-md shadow-rose-300;
}
.btn-create-note:active {
  @apply bg-rose-400;
}
.btn-back {
  @apply text-rose-500 border border-white px-6 py-1 rounded-lg;
}
.btn-back:hover {
  @apply border border-rose-500;
}
.btn-back:active {
  @apply bg-rose-400;
}
/* .note-grid-mobile {
    @apply w-full text-left pl-2 py-2 bg-gray-100;
}

.note-grid:hover{
    @apply bg-rose-200 shadow-md shadow-rose-300 text-gray-500
} */

.note-selected,
.notes-unselected {
  @apply w-full text-left pl-2 py-2 border shadow-md rounded-lg;
}

/* .notes-unselected {
    @apply rounded-lg md:w-44 md:h-16 md:text-center;
} */
/* grid style grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 */
.notes-unselected:hover {
  @apply bg-rose-200 shadow-md shadow-rose-300;
}
.svg-icon {
  @apply h-8;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  fill: #4691f6;
}

.svg-icon circle {
  stroke: #4691f6;
  stroke-width: 1;
}
</style>
