<template>
  <div class="centered">
    <BaseButton class="h-10" @click="toggleMenu">CLick Me</BaseButton>
  </div>
  <Modal title="Header" :close-action="isActive" @close="toggleMenu"> </Modal>
</template>

<script lang="ts" setup>
import BaseButton from "@/components/base/BaseButton.vue"
import Modal from "@/components/modals/Modal.vue"
import { ref } from "vue"

const isActive = ref(false)
const toggleMenu = () => {
  isActive.value = !isActive.value
}
</script>
