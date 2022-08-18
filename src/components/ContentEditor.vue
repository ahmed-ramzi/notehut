<template>
  <div class="h-full">
    <bubble-menu :editor="editor" :tippy-options="{ duration: 10 }" v-if="editor" class="bubble-menu c">
      <button @click="editor?.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">bold</button>
      <button @click="editor?.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">italic</button>
      <button @click="editor?.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">strike</button>
      <button @click="editor.chain().focus().toggleTaskList().run()" :class="{ 'is-active': editor.isActive('taskList') }">task</button>
    </bubble-menu>
    <editor-content :editor="editor" class="h-full" />
  </div>
</template>

<script lang="ts">
import Placeholder from "@tiptap/extension-placeholder"
import StarterKit from "@tiptap/starter-kit"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import { Editor, EditorContent, BubbleMenu } from "@tiptap/vue-3"

type Data = {
  editor: any
}

export default {
  components: {
    EditorContent,
    BubbleMenu,
  },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue"],

  data(): Data {
    return {
      editor: null,
    }
  },

  watch: {
    modelValue(value: any) {
      // HTML
      // @ts-ignore
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      // @ts-ignore
      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    // @ts-ignore
    this.editor = new Editor({
      extensions: [
        StarterKit,
        TaskList,

        TaskItem.configure({
          nested: true,
        }),
        Placeholder.configure({
          placeholder: "Jot something here",
        }),
      ],

      editorProps: {
        attributes: {
          class: " font-light text-xl text-slate-700 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none  text-2xl  h-full cursor-pointer ",
        },
      },
      // @ts-ignore
      content: this.modelValue,
      onUpdate: () => {
        // HTML
        // @ts-ignore

        this.$emit("update:modelValue", this.editor.getHTML())

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    })
  },

  beforeUnmount() {
    // @ts-ignore
    if (this.modelValue === "Jot something here") {
      console.log("yes")
      // @ts-ignore
      this.editor.commands.setContent("", false)
    }
    // @ts-ignore
    this.editor.destroy()
  },
}
</script>
<style scoped>
.bubble-menu {
  @apply py-2 flex bg-black text-white rounded-3xl;
}
.bubble-menu > button {
  @apply px-4 h-6 rounded-none outline-0;
}
.bubble-menu > button:hover:not(.is-active) {
  @apply text-amber-300 duration-300;
}

.bubble-menu > button:not(:last-child) {
  @apply border-r-2 border-white;
}
.is-active {
  @apply text-amber-500;
}
</style>
