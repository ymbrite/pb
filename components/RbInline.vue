<script setup lang="ts">
defineProps<{
  r: string
  s: string
}>()
</script>

<template>
  <UTooltip :text="'wtf'" :delay-duration="0" class="inline-block relative">
    <template v-if="s">{{ s }}</template>
    <slot v-else />
  </UTooltip>
</template>

<style scoped></style>
