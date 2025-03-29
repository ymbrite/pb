<script setup lang="ts">
const route = useRoute()
const { slug } = route.params

const { data: doc } = await useAsyncData(
  'page-data',
  () => {
    // if slug is array, join it with '/'
    const joinedSlug = Array.isArray(slug) ? slug.join('/') : slug
    return queryCollection(`/blog/${joinedSlug}`).findOne()
  },
  { lazy: true }
)

useSeoMeta({
  ogImage: `https://parz1.goder.club/posts/${slug}.png`,
  twitterCard: 'summary_large_image',
  articleAuthor: ['ivor'],
})
useHead({
  link: [
    { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css' },
  ],
  title: doc.value?.title,
})

const activeTocId = ref<string | null>(null)
const nuxtContent = ref(null)

const observer: Ref<IntersectionObserver | null | undefined> = ref(null)
const observerOptions = reactive({
  root: nuxtContent.value,
  threshold: 0.5,
})

onMounted(() => {
  observer.value = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id')
      if (entry.isIntersecting) {
        activeTocId.value = id
      }
    })
  }, observerOptions)

  document.querySelectorAll('.nuxt-content h2[id], .nuxt-content h3[id]').forEach(section => {
    observer.value?.observe(section)
  })
})

onUnmounted(() => {
  observer.value?.disconnect()
})
</script>

<template>
  <div
    class="min-h-screen max-w-(--breakpoint-sm) md:max-w-(--breakpoint-xl) py-4 flex justify-center"
  >
    <div class="relative w-60 hidden md:block">
      <div class="sticky top-20 flex flex-col items-start pr-4">
        <div class="text-xl font-normal">Table of Content</div>
        <TableOfContents :active-toc-id="activeTocId" :doc="doc" />

        <!-- <UCard class="w-full my-4"> TODO: sharing module </UCard> -->
      </div>
    </div>

    <div
      class="nuxt-content w-screen px-4 md:px-0 md:max-w-2xl prose dark:prose-invert prose-blockquote:not-italic prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:my-4 prose-code:bg-gray-100 prose-code:dark:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-img:ring-1 prose-img:ring-gray-200 dark:prose-img:ring-white/10 prose-img:rounded-lg"
    >
      <article>
        <div class="mb-4">
          <div class="text-4xl font-extrabold font-sans text-black dark:text-white">
            {{ doc?.title }}
          </div>
          <div class="text-lg mb-2">{{ doc?.description }}</div>
          <div class="text-gray-500 flex gap-4">
            {{ doc?.published }}
            <div>
              <UBadge
                v-for="tag in doc?.tags"
                :key="tag"
                color="neutral"
                variant="solid"
                class="mr-1"
              >
                {{ tag }}
              </UBadge>
            </div>
          </div>
        </div>
        <USeparator />
        <ContentRenderer v-if="doc" ref="nuxtContent" :value="doc">
          <template #empty>
            <div class="text-xl">Document is empty</div>
            <p>maybe I will write it tomorrow... :)</p>
          </template>
        </ContentRenderer>
      </article>
    </div>

    <div></div>
  </div>
</template>

<style>
/* assets/css/prose.css */
.prose p {
  margin-top: 2rem; /* = my-8 */
  margin-bottom: 2rem;
}

.prose h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.875rem; /* = text-3xl */
  line-height: 2.25rem;
  scroll-margin-top: 5rem;
}

.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  scroll-margin-top: 5rem;
}

.prose h3 a,
.prose h4 a,
.prose h5 a,
.prose h6 a {
  text-decoration: none; /* no-underline */
  margin-top: 0.25rem;
}

.prose {
  line-height: 1.5; /* leading-normal */
}

/* 代码块样式 */
.prose pre {
  background-color: rgb(17, 24, 39); /* bg-gray-900 */
  border: 1px solid rgb(31, 41, 55); /* border-gray-800 */
  border-radius: 0.5rem; /* rounded-lg */
  padding: 1rem; /* p-4 */
  overflow-x: auto;
  margin: 1rem 0; /* my-4 */
  font-size: 0.875rem; /* text-sm */
  color: #fff;
}

.prose pre code {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  font-size: 0.875rem; /* text-sm */
}

.prose :not(pre) > code {
  background-color: rgb(243, 244, 246); /* bg-gray-100 */
  padding: 0.125rem 0.25rem; /* px-1 py-0.5 */
  border-radius: 0.25rem; /* rounded */
  font-size: 0.875rem; /* text-sm */
}

.dark .prose :not(pre) > code {
  background-color: rgb(31, 41, 55); /* dark:bg-gray-800 */
}
</style>
