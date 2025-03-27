<script setup lang="ts">
const props = defineProps<{
  active: ComputedRef<boolean>
  title: string
  content: string
}>()

const emits = defineEmits(['click', 'focus', 'recover'])

const isFocused = ref(false)
const handleFocus = () => {
  isFocused.value = true
  emits('focus')
}
const recover = () => {
  isFocused.value = false
  emits('recover')
}
</script>

<template>
  <div
    class="bg-white p-2 w-56 rounded-md cursor-pointer border-dashed border-2 shadow-sm hover:shadow-2xl hover:bg-teal-50 transition-all"
    :class="{ 'border-blue-500 bg-blue-50 shadow-2xl z-10': active.value }"
    @click="$emit('click')"
  >
    <div class="p-2">
      <div class="font-semibold text-lg">{{ title }}</div>
      <div class="text-sm text-gray-700">{{ content }}</div>
    </div>
  </div>
</template>

<style scoped></style>