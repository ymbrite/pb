<script lang="ts" setup>
import LanguageSwitch from "./LanguageSwitch.vue"

const { t } = useI18n()
const localePath = useLocalePath()

const navLinks = computed(() => [
  { label: t("menu.home"), to: localePath("/") },
  { label: t("menu.blog"), to: localePath("/blog") },
  { label: t("menu.gallery"), to: null },
  { label: t("menu.demo"), to: localePath("/demo") },
])
</script>

<template>
  <UHeader
    mode="slideover"
    class="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-900/70 bg-white/90 dark:bg-gray-900/90 border-b border-gray-200/80 dark:border-gray-800/80"
    :ui="{ container: 'py-3' }"
  >
    <template #title>
      <NuxtLink
        :to="localePath('/about')"
        class="font-sans text-2xl font-light"
      >
        <span class="font-bold">parz1</span>
      </NuxtLink>
    </template>

    <template #default> </template>

    <template #right>
      <div class="hidden md:flex items-center gap-2">
        <nav class="items-center gap-0 text-xl">
          <template v-for="link in navLinks" :key="link.label">
            <ULink
              v-if="link.to"
              :to="link.to"
              class="px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {{ link.label }}
            </ULink>
            <span v-else class="px-2 py-1 text-gray-500 dark:text-gray-400">
              {{ link.label }}
            </span>
          </template>
        </nav>
        <LanguageSwitch />
        <ThemeSwitcher />
        <UButton
          icon="i-carbon-logo-github"
          color="neutral"
          variant="ghost"
          aria-label="GitHub"
          to="https://github.com/parz1/blog"
          target="_blank"
        />
      </div>
    </template>

    <template #content="{ close }">
      <div class="p-6 space-y-6">
        <div class="flex items-center justify-between">
          <NuxtLink
            :to="localePath('/about')"
            class="font-sans text-2xl font-light"
          >
            <span class="font-bold">parz1</span>
          </NuxtLink>
          <UButton
            icon="i-heroicons-x-mark-20-solid"
            color="neutral"
            variant="ghost"
            aria-label="Close navigation"
            @click="close?.()"
          />
        </div>

        <div class="flex flex-col gap-2">
          <UButton
            v-for="link in navLinks"
            :key="link.label"
            :to="link.to || undefined"
            :disabled="!link.to"
            color="neutral"
            variant="ghost"
            class="justify-start"
            @click="link.to ? close?.() : undefined"
          >
            {{ link.label }}
          </UButton>
        </div>

        <div class="flex items-center gap-3">
          <LanguageSwitch />
          <ThemeSwitcher />
          <UButton
            icon="i-carbon-logo-github"
            color="neutral"
            variant="ghost"
            aria-label="GitHub"
            to="https://github.com/parz1/blog"
            target="_blank"
            class="ml-auto"
            @click="close?.()"
          />
        </div>
      </div>
    </template>
  </UHeader>
</template>
