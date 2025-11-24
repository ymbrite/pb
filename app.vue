<script setup>
// import { SpeedInsights } from '@vercel/speed-insights/vue'
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/docs">
          <Logo class="h-6 w-auto" />
        </NuxtLink>
      </template>
    </UHeader>

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <UFooter />
  </UApp>
  <!-- 避免 SSR 时的告警 -->
  <!-- <ClientOnly>
    <SpeedInsights />
  </ClientOnly> -->
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
