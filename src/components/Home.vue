<template>
    <!-- Header -->
    <section class="p-4 flex justify-between items-center">
        <h1>Notes</h1>
        <button
            class="border-2 w-36 h-9 rounded-lg border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white active:bg-rose-400 uppercase"
        >
            <span class="hidden lg:block"> + New Note </span>
            <span class="lg:hidden"> + Create New </span>
        </button>
    </section>

    <section class="p-2 flex">
        <!-- Notes Nav -->
        <nav
            :class="
                !currentNote
                    ? 'w-full'
                    : 'min-w-[35%] w-auto bg-gray-100 rounded-md'
            "
        >
            <ul class="grid" v-if="notes.length">
                <li v-for="note in notes" :key="note.id">
                    <button
                        @click="currentNote = note"
                        class="w-full text-left pl-2 py-4 rounded-md"
                        :class="
                            note === currentNote
                                ? 'bg-rose-500 text-white italic'
                                : 'hover:bg-rose-200'
                        "
                    >
                        <h2>
                            {{ note.title }}
                        </h2>
                    </button>
                </li>
            </ul>
            <p v-else>No notes saved</p>
        </nav>

        <div v-if="currentNote" class="w-full p-4">
            <h2>{{ currentNote.title }}</h2>
            <p>{{ currentNote.contents }}</p>
        </div>
    </section>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        const notes = ref([
            { id: '1', title: 'First Note', contents: 'This is a content' },
            { id: '2', title: 'Second Note', contents: 'This is a content' },
            { id: '3', title: 'Third Note', contents: 'This is a content' },
        ])
        const currentNote = ref(null)

        return {
            notes,
            currentNote,
        }
    },
}
</script>
