<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <div class="relative">
    <pre
      v-bind="$attrs"
      :class="[props.class]"
      style="padding: 0.5rem; padding-top: 2rem"
    ><slot /></pre>
    <div class="absolute top-2 left-4 text-neutral-300">
      <span v-if="language">[{{ language }}]&nbsp;</span>
      <span v-if="filename">{{ filename }}</span>
    </div>
  </div>
</template>

<style>
pre code .line {
  display: block;
}
</style>
