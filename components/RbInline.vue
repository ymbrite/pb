<script setup lang="ts">
defineProps<{ r: string }>()
</script>

<template>
  <span class="rb-tooltip" :data-ruby="r">
    <slot />
  </span>
</template>

<style scoped>
.rb-tooltip {
  position: relative;
  border-bottom: 1px dashed currentColor; /* 下划线 */
  cursor: help;
}
.rb-tooltip::after {
  content: attr(data-ruby);
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translateX(-50%) translateY(-0.25rem);
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.12s ease-in-out;
  z-index: 10;
}
.rb-tooltip:hover::after,
.rb-tooltip:focus-visible::after {
  opacity: 1;
}
</style>
