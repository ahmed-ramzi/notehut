<template>
    <!-- Header -->
    <section class="p-4 flex justify-between items-center">
        <h1>Notes</h1>
        <button
            class="border-2 w-36 h-9 rounded-lg btn-create-note border-rose-500 text-rose-500 uppercase"
        >
            <span class="hidden lg:block"> + New Note </span>
            <span class="lg:hidden"> + Create New </span>
        </button>
    </section>

    <section :class="!notes ? 'border-b-2' : 'p-2 flex'">
        <!-- Notes Nav -->
        <nav
            :class="
                !currentNote
                    ? 'w-full'
                    : 'min-w-[35%] w-auto bg-gray-100  rounded-md shadow-lg'
            "
            class="mt-1"
        >
            <ul class="grid" v-if="notes.length">
                <li v-for="note in notes" :key="note.id">
                    <button
                        @click="currentNote = note"
                        class="w-full text-left pl-2 py-2 rounded-md"
                        :class="
                            note === currentNote
                                ? 'bg-rose-500 text-white italic'
                                : 'hover:bg-rose-200 text-gray-500'
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

        <div v-if="currentNote" class="w-full px-2 space-y-3">
            <input
                type="text"
                name="title"
                class="font-extralight text-3xl text-gray-400 w-full p-2 outline-none rounded-md"
                v-model="currentNote.title"
                :placeholder="currentNote.title || 'New note'"
            />

            <textarea
                name="contents"
                rows="10"
                class="w-full rounded-md outline-none px-2 py-2 text-gray-400 font-light"
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

<style scoped>
.btn-create-note:hover {
    @apply text-white bg-rose-500 shadow-xl shadow-rose-200;
}
</style>
