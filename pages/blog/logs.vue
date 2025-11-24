<script setup lang="ts">
const { data: articles } = await useAsyncData(
  'logs-posts',
  () => queryCollection('logs').order('published', 'DESC').all(),
  { lazy: false },
)
</script>

<template>
  <div class="py-8">
    <ul class="space-y-4">
      <li v-for="(article, index) in articles" :key="index">
        <BaseArticleCard :article="article" />
      </li>
    </ul>
  </div>
</template>
