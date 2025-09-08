<script setup lang="ts">
const { data: articles } = await useAsyncData(
  'latest-posts',
  () => queryCollection('blog').order('published', 'DESC').all(),
  {
    // lazy: true,
  }
)
</script>

<template>
  <div class="py-8 flex justify-center">
    <ul class="space-y-4 max-w-4xl w-full">
      <li v-for="(article, index) in articles" :key="index">
        <BaseArticleCard :article="article" />
      </li>
    </ul>
  </div>
</template>
