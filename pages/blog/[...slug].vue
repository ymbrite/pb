<script setup lang="ts">
const route = useRoute()
const { locales, locale, setLocale } = useI18n()

const slug = route.params.slug

const { data: variants } = await useAsyncData(
  'slug-variants',
  async () => {
    if (!slug) return []
    // Query strictly by slug; frontend will handle variants
    return await queryCollection('blog').where('slug', '=', slug).all()
  },
  // lazy load may cause SEO issue and get some trouble for toc comp
  { lazy: false }
)

// chose the variant based on locale or default to first
const doc = computed(() => {
  if (!variants.value || variants.value.length === 0) return null
  const byLocale = variants.value.find(item => item.lang === locale.value)
  return byLocale || variants.value[0]
})

useSeoMeta({
  ogImage: doc.value?.cover,
  twitterCard: 'summary_large_image',
  articleAuthor: ['parz1'],
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
  <template v-if="!doc">
    <div class="text-xl">Page not found</div>
    <p>Oops! The content you're looking for doesn't exist.</p>
    <NuxtLink to="/">Go back home</NuxtLink>
  </template>
  <template v-else>
    <div
      class="min-h-screen max-w-(--breakpoint-sm) md:max-w-(--breakpoint-xl) py-4 flex justify-center"
    >
      <div class="relative w-60 hidden md:block">
        <div class="sticky top-20 flex flex-col items-start pr-4">
          <div class="text-xl font-normal">ToC</div>
          <ClientOnly>
            <TableOfContents :active-toc-id="activeTocId" :doc="doc" />
          </ClientOnly>

          <!-- <UCard class="w-full my-4"> TODO: sharing module </UCard> -->
        </div>
      </div>

      <div class="nuxt-content w-screen px-4 md:px-0 md:max-w-2xl">
        <article>
          <div class="mb-4">
            <div class="text-4xl font-bold font-serif text-black dark:text-white">
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
              <!-- Variants by same slug can be handled by the page UI if needed -->
            </div>
          </div>
          <!-- <USeparator size="lg" /> -->
          <!-- {{ doc.body?.toc }} -->
          <ContentRenderer
            v-if="doc"
            ref="nuxtContent"
            :value="doc"
            class="prose dark:prose-invert"
          >
            <template #empty>
              <div class="text-xl">Document is empty</div>
              <p>maybe I will write it tomorrow... :)</p>
            </template>
          </ContentRenderer>
        </article>
      </div>

      <div class="hidden md:block">
        <!-- right sidebar -->
      </div>
    </div>
  </template>
</template>

<style></style>
