<script setup lang="ts">
const { data: articles } = await useAsyncData('latest-posts', () => queryCollection('blog').all(), {
  lazy: true,
})

const { data: home } = await useAsyncData(async () => {
  const home = await queryCollection('blog').path('').all()
  console.log(home)
  return home
})
</script>

<template>
  <div>{{ home }}</div>

  <div class="py-8">
    <ul class="space-y-4">
      <li v-for="(article, index) in articles" :key="index">
        <BaseArticleCard :article="article" />
      </li>
    </ul>
  </div>
</template>
