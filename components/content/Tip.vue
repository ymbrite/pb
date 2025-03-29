<script setup>
defineProps({
  title: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <ClientOnly>
    <section class="text-xs content-tip">
      <UAlert :title="title">
        <template #icon>
          <UIcon class="text-4xl" :name="icon" />
        </template>
        <template #description>
          <slot />
        </template>
      </UAlert>
    </section>
  </ClientOnly>
</template>

<style>
.prose .content-tip p {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
