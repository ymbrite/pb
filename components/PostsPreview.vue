<script setup lang="ts">
const { data: articles } = await useAsyncData('latest-posts', () =>
  queryCollection('blog').limit(5).order('published', 'DESC').all()
)
</script>

<template>
  <div class="pb-8">
    <ul class="space-y-4">
      <li v-for="(article, id) in articles" :key="id">
        <BaseArticleCard :article="article" />
      </li>
    </ul>
  </div>
</template>
