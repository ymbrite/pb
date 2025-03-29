<script setup lang="ts">
const { data: articles } = await useAsyncData(
  'latest-posts',
  () => queryCollection('content').path('/blog').sort({ published: -1 }).find(),
  { lazy: true }
)

const { data: posts } = await useAsyncData('blog', () =>
  queryCollection('content').path('/blog').all()
)
</script>

<template>
  <div></div>
  {{ posts }}
  <div class="py-8">
    <ul class="space-y-4">
      <li v-for="(article, index) in articles" :key="index">
        <BaseArticleCard :article="article" />
      </li>
    </ul>
  </div>
</template>
