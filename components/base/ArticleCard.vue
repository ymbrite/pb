<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'

type ArticleWithLang = BlogCollectionItem & {
  availableLangs?: string[]
}

const localePath = useLocalePath()

const props = defineProps<{
  article: ArticleWithLang
}>()

const publishedDate = computed(() => new Date(props.article.published as unknown as string))

const i18nTime = computed(() =>
  new Intl.DateTimeFormat('ja-JP', { dateStyle: 'long' }).format(publishedDate.value)
)

// 供 <time datetime> 使用，确保是有效 ISO
const datetimeAttr = computed(() => publishedDate.value.toISOString())

const languageBadges = computed(() => {
  const languages = [
    ...(props.article.availableLangs ?? []),
    (props.article.lang as string | undefined) ?? undefined,
  ]

  const normalized = Array.from(
    new Set(
      languages
        .filter((lang): lang is string => Boolean(lang))
        .map(lang => lang.toUpperCase())
    )
  )

  const current = (props.article.lang as string | undefined)?.toUpperCase()

  return normalized.map(code => ({
    code,
    isCurrent: code === current,
  }))
})

const hasAlternateLangs = computed(() => languageBadges.value.length > 1)
</script>

<template>
  <NuxtLink
    :to="localePath(`/blog/${(article as any).slug ?? (article.path || '').split('/').pop()}`)"
    class="group"
  >
    <article>
      <div class="flex gap-4">
        <time
          class="relative z-10 order-first mb-1 flex items-center text-sm text-gray-400 dark:text-gray-500 pl-3.5"
          :datetime="datetimeAttr"
        >
          <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
            <span class="h-4 w-1 rounded-full bg-gray-200 dark:bg-gray-500"></span>
          </span>
          {{ i18nTime }}
        </time>
        <span v-if="article.categories">
          <UBadge v-for="category in article.categories" :key="category" class="mr-1">
            {{ category }}
          </UBadge>
        </span>
      </div>
      <h2
        class="text-lg font-semibold font-display tracking-tight text-gray-800 dark:text-gray-100 group-hover:text-primary-600"
      >
        {{ article.title }}
      </h2>
      <p class="relative z-10 mt-1 text-sm text-gray-600 dark:text-gray-400">
        {{ article.description }}
      </p>
      <div
        v-if="hasAlternateLangs"
        class="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
      >
        <span>Lang</span>
        <div class="flex flex-wrap gap-1">
          <UBadge
            v-for="lang in languageBadges"
            :key="lang.code"
            :color="lang.isCurrent ? 'primary' : 'neutral'"
            size="xs"
            variant="soft"
          >
            {{ lang.code }}
          </UBadge>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>
