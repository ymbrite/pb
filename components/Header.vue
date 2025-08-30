<script lang="ts" setup>
import { useFixedHeader } from 'vue-use-fixed-header'
import LanguageSwitch from './LanguageSwitch.vue'
import avator from '~/assets/avatar.png'
const headerRef = ref(null)
const { styles } = useFixedHeader(headerRef)
const { t } = useI18n()

const isMenuOpen = ref(false)
const links = [
  [
    {
      label: t('menu.home'),
      avatar: {
        src: avator,
      },
      to: '/',
    },
    {
      label: t('menu.blog'),
      icon: 'i-carbon-document',
      to: '/blog',
    },
    {
      label: t('menu.demo'),
      icon: 'i-carbon-development',
      to: '/demo',
    },
  ],
  [
    {
      label: 'Examples',
      icon: 'i-heroicons-light-bulb',
    },
    {
      label: 'Help',
      icon: 'i-heroicons-question-mark-circle',
    },
  ],
]
</script>

<template>
  <div
    ref="headerRef"
    :style="styles"
    class="blur-header sticky top-0 w-full z-50 h-16 flex justify-between items-center"
  >
    <ULink to="/">
      <div class="font-sans text-2xl pl-4 font-light">
        <span class="font-bold">parz1</span>
      </div>
    </ULink>
    <div class="hidden md:flex items-center gap-3 text-xl pr-4">
      <ULink to="/">
        {{ t('menu.home') }}
      </ULink>
      <ULink to="/blog">
        {{ t('menu.blog') }}
      </ULink>
      <div>{{ t('menu.gallery') }}</div>
      <ULink to="/demo">
        {{ t('menu.demo') }}
      </ULink>

      <LanguageSwitch />
      <ThemeSwitcher />
      <UButton
        icon="i-carbon-logo-github"
        color="neutral"
        variant="ghost"
        aria-label="Theme"
        to="https://github.com/parz1/blog"
        target="_blank"
      ></UButton>
    </div>

    <div class="md:hidden flex items-center pr-4">
      <UButton
        icon="i-carbon-logo-github"
        size="xl"
        color="neutral"
        variant="ghost"
        aria-label="Theme"
        to="https://github.com/parz1/blog"
        target="_blank"
      ></UButton>
      <!-- <USlideover>
        <UButton icon="i-carbon-menu" size="xl" color="neutral" variant="ghost" aria-label="Theme">
          <template #fallback>
            <div class="w-8 h-8"></div>
          </template>
        </UButton>
        <template #content>
          <div class="p-4 flex-1">
            <UNavigationMenu orientation="vertical" :items="links" />
          </div>
        </template>
      </USlideover> -->
    </div>
  </div>
</template>

<style>
.blur-header {
  backdrop-filter: blur(6px);
}
</style>
