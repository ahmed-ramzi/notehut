<template>
  <div class="centered">
    <div class="inline-flex flex-col justify-center items-center w-full">
      <p>You have no notes</p>
      <div class="inline-flex flex-col">
        <p class="inline-flex items-center">
          <span class="whitespace-nowrap"> Create a new note by clicking on the </span>
          <span class="px-2">
            <CreateNoteIcon ignore-hidding-btn />
          </span>
          <span> button </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateNoteIcon from "../icons/custom/CreateNoteIcon.vue"
</script>
