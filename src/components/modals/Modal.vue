<template>
  <teleport to="body">
    <Transition name="modal">
      <div v-if="closeAction" class="absolute top-0 left-0 bg-slate-300/40 w-full h-screen overscroll-none py-1 flex backdrop-blur-sm" :class="[zIndex]">
        <main class="centered">
          <div class="p-8 rounded-3xl shadow-2xl space-y-8 bg-slate-100">
            <div class="flex justify-between px-2 items-center">
              <div class="">
                <h3 class="font-bold uppercase">{{ title }}</h3>
                <p v-if="description">{{ description }}</p>
              </div>
              <button class="rounded-xl px-2" @click="$emit('close')">
                <svg class="svg-icon" viewBox="0 0 20 20">
                  <path
                    d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"
                  ></path>
                </svg>
              </button>
            </div>
            <slot />
          </div>
        </main>
      </div>
    </Transition>
  </teleport>
</template>

<script lang="ts" setup>
defineProps({
  zIndex: {
    type: String,
    default: "z-40",
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  closeAction: {
    type: Boolean,
    default: false,
  },
})

defineEmits(["close"])
</script>

<style scoped>
@media (max-width: 500px) {
  main {
    @apply w-full;
  }
}

@media (min-width: 600px) {
  main {
    @apply min-w-[600px] lg:min-w-[800px];
  }
}

.svg-icon {
  width: 2em;
  height: 2em;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  @apply fill-slate-700;
}

.svg-icon circle {
  stroke: #4691f6;
  stroke-width: 1;
}
.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
