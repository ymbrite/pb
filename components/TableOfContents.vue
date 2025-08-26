<script setup lang="ts">
/**
 * SSR-safe TOC 组件：
 * ✅ 仅在客户端绑定 IO / 访问 document
 * ✅ 初始对齐移到 onMounted（避免 SSR 阶段触发）
 * ✅ 所有工具函数都做了 process.client 守卫
 * ✅ performance/IntersectionObserver 不存在时有兜底
 */

import type { BlogCollectionItem } from '@nuxt/content'

const props = withDefaults(
  defineProps<{
    activeTocId?: string | null
    doc: BlogCollectionItem | null | undefined
  }>(),
  {}
)

const router = useRouter()
const route = useRoute()

const sliderHeight = ref(0)
const sliderTop = ref(0)

const tocLinks = computed(() => props.doc?.body?.toc?.links ?? [])

/** 归一化 hash → id */
const normalizedHashId = computed<string | null>(() => {
  const raw = route.hash?.slice(1) || ''
  if (!raw) return null
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
})

const lastUserClickAt = ref(0)
const ioActiveId = ref<string | null>(null)
const effectiveId = computed<string | null>(
  () => normalizedHashId.value ?? ioActiveId.value ?? props.activeTocId ?? null
)

/** ✅ SSR-safe：仅在客户端做 raf 重试 */
const rafTry = async (fn: () => boolean, timeoutMs = 300) => {
  if (!process.client) return
  const now =
    typeof performance !== 'undefined' && performance.now
      ? () => performance.now()
      : () => Date.now()
  const start = now()
  return new Promise<void>(resolve => {
    const tick = () => {
      if (fn() || now() - start > timeoutMs) return resolve()
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })
}

/** ✅ SSR-safe：仅在客户端查询 DOM */
const updateSliderById = (id: string | null) => {
  if (!process.client) return false
  if (!id) return false
  const tocEl = document.getElementById(`toc-${id}`)
  if (!tocEl) return false
  sliderHeight.value = tocEl.offsetHeight
  sliderTop.value = tocEl.offsetTop - 45
  return true
}

const onClick = async (id: string) => {
  lastUserClickAt.value =
    typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now()
  const hash = `#${id}`
  if (route.hash !== hash) {
    await router.replace({ hash })
  }
  await nextTick()
  if (process.client) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    updateSliderById(id) || (await rafTry(() => updateSliderById(id)))
  }
}

/** ✅ SSR-safe：仅在客户端收集 heading 元素 */
const collectHeadingEls = () => {
  if (!process.client) return [] as HTMLElement[]
  const ids: string[] = []
  const flatten = (links: any[] = []) => {
    for (const l of links) {
      if (l?.id) ids.push(l.id)
      if (Array.isArray(l?.children)) flatten(l.children)
    }
  }
  flatten(tocLinks.value)
  return ids.map(id => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
}

let io: IntersectionObserver | null = null

/** ✅ SSR-safe：仅在客户端绑定 IO，且存在性检查 */
const bindIO = () => {
  if (!process.client) return
  if (io) {
    io.disconnect()
    io = null
  }
  const targets = collectHeadingEls()
  if (!targets.length) return
  if (typeof IntersectionObserver === 'undefined') return

  io = new IntersectionObserver(
    entries => {
      const now =
        typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now()
      if (now - lastUserClickAt.value < 600) return

      const visible = entries
        .filter(e => e.isIntersecting && e.intersectionRatio > 0)
        .map(e => {
          const rect = (e.target as HTMLElement).getBoundingClientRect()
          return {
            id: (e.target as HTMLElement).id,
            topDist: Math.abs(rect.top),
            ratio: e.intersectionRatio,
          }
        })

      if (!visible.length) return
      visible.sort((a, b) => a.topDist - b.topDist || b.ratio - a.ratio)
      const topId = visible[0]?.id || null

      if (topId && topId !== ioActiveId.value) {
        ioActiveId.value = topId
        updateSliderById(topId)
      }
    },
    {
      root: null,
      rootMargin: '-20% 0% -60% 0%',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    }
  )

  for (const el of targets) io.observe(el)
}

/** ✅ 初次对齐与重绑：只在客户端进行 */
const rebindAndAlign = async () => {
  if (!process.client) return
  await nextTick()
  bindIO()
  const id = effectiveId.value
  updateSliderById(id) || (await rafTry(() => updateSliderById(id)))
}

/** ✅ 监听改为非 immediate，避免 SSR 阶段触发 */
watch(
  () => [route.fullPath, normalizedHashId.value, tocLinks.value?.length],
  () => {
    rebindAndAlign()
  },
  { immediate: false }
)

/** ✅ mounted 后再跑第一次（客户端） */
onMounted(() => {
  rebindAndAlign()
})
onBeforeUnmount(() => {
  if (io) {
    io.disconnect()
    io = null
  }
})
</script>

<template>
  <div class="max-h-82 overflow-auto">
    <nav class="mt-4 flex">
      <div class="relative w-1 overflow-hidden rounded-sm bg-secondary">
        <div
          class="absolute left-0 w-full rounded-sm bg-blue-600 transition-all duration-200"
          :style="{ height: `${sliderHeight}px`, top: `${sliderTop}px` }"
        />
      </div>
      <ul class="ml-0 pl-4">
        <li
          v-for="{ id, text, children } in tocLinks"
          :id="`toc-${id}`"
          :key="id"
          class="mb-2 ml-0 cursor-pointer list-none text-sm last:mb-0"
          :class="{ 'font-bold': id === effectiveId }"
          :aria-current="id === effectiveId ? 'true' : 'false'"
          @click="onClick(id)"
        >
          {{ text }}
          <ul v-if="children" class="my-2 ml-3">
            <li
              v-for="{ id: childId, text: childText } in children"
              :id="`toc-${childId}`"
              :key="childId"
              class="mb-2 ml-0 cursor-pointer list-none text-xs last:mb-0"
              :class="{ 'font-bold': childId === effectiveId }"
              :aria-current="id === effectiveId ? 'true' : 'false'"
              @click.stop="onClick(childId)"
            >
              {{ childText }}
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>
