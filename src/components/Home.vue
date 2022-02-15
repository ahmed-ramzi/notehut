<template>
    <!-- Header -->
    <section class="p-4 flex justify-between items-center text-center">
        <span>
            <h1 v-if="!currentNote">Notes</h1>
            <h2 v-else class="btn-back" @click="currentNote = null">Back</h2>
        </span>

        <button
            class="
                border-2
                w-36
                h-9
                rounded-lg
                btn-create-note
                border-rose-500
                text-rose-500
                uppercase
            "
            @click="createNote"
        >
            <!-- <span class="hidden lg:block"> + New Note </span> -->
            <span> + Create New </span>
        </button>
    </section>

    <section class="h-screen flex">
        <!-- Notes Nav -->
        <nav
            :class="
                !currentNote
                    ? 'w-full'
                    : 'min-w-[35%] w-auto rounded-r-md border-r shadow-lg hidden md:block'
            "
            class="mt-1 mb-2 px-2 h-full"
        >
            <ul
                :class="
                    !currentNote
                        ? 'grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  gap-4  mx-2'
                        : 'grid gap-4'
                "
                v-if="notes.length"
            >
                <li v-for="note in notes" :key="note.id">
                    <button
                        @click="currentNote = note"
                        :class="
                            note === currentNote
                                ? 'note-selected bg-rose-500 text-white'
                                : 'notes-unselected text-gray-500'
                        "
                    >
                        <h2 class="">
                            {{ note.title || 'New note' }}
                        </h2>
                    </button>
                </li>
            </ul>
            <p v-else class="text-gray-400 italic p-2">No notes saved</p>
        </nav>

        <!-- Note Writing Section -->
        <div v-if="currentNote" class="w-full space-y-3 mx-2">
            <input
                type="text"
                name="title"
                class="
                    font-extralight
                    text-3xl text-gray-400
                    w-full
                    p-2
                    outline-none
                    rounded-md
                "
                v-model="currentNote.title"
                :placeholder="currentNote.title || 'New note'"
                ref="noteTitle"
            />

            <textarea
                name="contents"
                rows="10"
                class="
                    w-full
                    rounded-md
                    outline-none
                    px-2
                    py-2
                    text-gray-400
                    font-light
                    h-[90%]
                    resize-none
                "
                v-model="currentNote.contents"
                :placeholder="currentNote.contents || 'Jot something here...'"
            ></textarea>
        </div>
    </section>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        const notes = ref([
            // Mock data
            { id: '1', title: 'First Note', contents: 'This is a content' },
            { id: '2', title: 'Second Note', contents: 'This is a content' },
            { id: '3', title: 'Third Note', contents: 'This is a content' },
            { id: '4', title: 'Third Note', contents: 'This is a content' },
        ])
        const currentNote = ref(null)

        const noteTitle = ref()

        const createNote = () => {
            const newNote = { title: '', contents: '' }
            notes.value.push(newNote)
            currentNote.value = newNote
            noteTitle.value.focus()
        }
        return {
            notes,
            currentNote,
            createNote,
            noteTitle,
        }
    },
}
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

.notes-unselected:hover {
    @apply bg-rose-200 shadow-md shadow-rose-300;
}
</style>
