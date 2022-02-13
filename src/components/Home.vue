<template>
    <!-- Header -->
    <section class="p-4 flex justify-between">
        <h1>Notes</h1>
        <button
            class="border-2 w-36 rounded-lg border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white active:bg-rose-400 uppercase"
        >
            <span class="hidden lg:block"> + New Note </span>
            <span class="lg:hidden"> + Create New </span>
        </button>
    </section>

    <section class="px-8 py-4 flex">
        <!-- Notes Nav -->
        <nav
            class="border"
            :class="!currentNote ? 'w-full' : 'min-w-[35%] w-auto'"
        >
            <ul class="grid gap-4" v-if="notes.length">
                <li v-for="note in notes" :key="note.id">
                    <button @click="currentNote = note" class="hover:underline">
                        <h2>
                            {{ note.title }}
                        </h2>
                    </button>
                </li>
            </ul>
            <p v-else>No notes saved</p>
        </nav>

        <div v-if="currentNote" class="border w-full p-4">
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
            { id: '1', title: 'First Notes', contents: 'This is a content' },
            { id: '2', title: 'Second Notes', contents: 'This is a content' },
            { id: '3', title: 'Third Notes', contents: 'This is a content' },
        ])
        const currentNote = ref(null)

        return {
            notes,
            currentNote,
        }
    },
}
</script>
