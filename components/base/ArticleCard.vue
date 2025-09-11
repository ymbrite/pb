<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'

const props = defineProps<{
  article: BlogCollectionItem
}>()

const publishedDate = computed(() => new Date(props.article.published as unknown as string))

const i18nTime = computed(() =>
  new Intl.DateTimeFormat('ja-JP', { dateStyle: 'long' }).format(publishedDate.value)
)

// 供 <time datetime> 使用，确保是有效 ISO
const datetimeAttr = computed(() => publishedDate.value.toISOString())
</script>

<template>
  <NuxtLink :to="`/blog/${(article as any).slug ?? (article.path || '').split('/').pop()}`" class="group">
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
    </article>
  </NuxtLink>
</template>
