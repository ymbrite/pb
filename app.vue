<script setup>
useSeoMeta({
  title: 'parz1 ZHOU',
})

//<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
useHead({
  title: 'parz1 ZHOU',
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style>
/* .page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
} */
</style>
