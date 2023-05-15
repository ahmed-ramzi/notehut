<script lang="ts" setup>
import SkeletonLoader from "./Skeleton.vue"
</script>

<template>
  <div class="p-4 max-w-sm rounded border border-gray-200 md:p-6">
    <SkeletonLoader class="mb-4 h-48 flex justify-center items-center text-gray-400"> Image </SkeletonLoader>
    <SkeletonLoader class="h-2.5 w-48 mb-4" />
    <SkeletonLoader class="h-2 mb-2.5" />
    <SkeletonLoader class="h-2 mb-2.5" />
    <SkeletonLoader class="h-2" />
    <div class="flex items-center mt-4 space-x-3">
      <SkeletonLoader type="circle" class="w-14 h-14 flex justify-center items-center text-gray-400"> Icon </SkeletonLoader>
      <div>
        <SkeletonLoader class="h-2.5 w-32 mb-2"></SkeletonLoader>
        <SkeletonLoader class="w-48 h-2" />
      </div>
    </div>
  </div>
</template>
