<template>
  <div>
    <editor v-model="content" />

    <div class="content">
      <h3>Content</h3>
      <pre><code>{{ content }}</code></pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import Editor from "@/components/ContentEditor.vue"

const content = ref(``)
</script>
