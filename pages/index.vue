<script setup lang="ts"></script>

<template>
  <div class="w-screen flex flex-col lg:flex-row">
    <!-- 左侧固定区域 -->
    <div
      class="w-full lg:flex lg:flex-col lg:items-end lg:w-[25%] ml-0 lg:ml-[10%] h-full pt-20 lg:fixed left-0 top-0"
    >
      <BaseIntroCard />
    </div>

    <!-- 右侧自适应区域 -->
    <div class="w-full lg:ml-[40%] grow flex flex-col justify-start items-start">
      <div class="">
        <!-- <GradientTitle title="Tools" subtitle="私が使っています" /> -->
        <div class="text-xl font-bold mb-2">Tools</div>
        <div class="hidden lg:block">
          <div>
            <!-- <div class="text-xl mb-0">I build apps mainly with</div> -->
            <div class="flex flex-wrap justify-start gap-1">
              <div
                class="w-58 h-full tech-item p-2 border-2 border-dashed rounded-md dark:bg-gray-800"
              >
                <div class="h-22 flex gap-2">
                  <TechIcon name="javascript" size="5rem" icon="/svg/javascript-color.svg" />
                  <!-- <img class="w-10 h-10" src="/svg/typescript-color.svg" alt="typescript" /> -->
                  <div class="h-full flex flex-col gap-1 flex-wrap">
                    <TechIcon name="typescript" size="2.4rem" icon="/svg/typescript-color.svg" />
                    <!-- node -->
                    <TechIcon name="nodejs" size="2.4rem" icon="/svg/nodedotjs-color.svg" />
                    <TechIcon name="C" size="2.4rem" icon="/svg/c-color.svg" />
                    <!-- node -->
                    <TechIcon name="C++" size="2.4rem" icon="/svg/cplusplus-color.svg" />
                    <!-- rust -->
                    <TechIcon name="rust" size="2.4rem" icon="/svg/rust-color.svg" />
                  </div>
                </div>
                Languages
              </div>

              <div
                class="w-68 h-full tech-item p-2 border-2 border-dashed rounded-md dark:bg-gray-800"
              >
                <div class="h-22 flex gap-2">
                  <div class="h-full flex flex-col gap-1 flex-wrap">
                    <TechIcon name="vuejs" size="2.4rem" icon="/svg/vuedotjs-color.svg" />
                    <TechIcon name="nuxtjs" size="2.4rem" icon="/svg/nuxtdotjs-color.svg" />
                    <!-- react -->
                    <TechIcon name="react" size="2.4rem" icon="/svg/react-color.svg" />
                    <TechIcon
                      name="react native"
                      size="2.4rem"
                      icon="/svg/react-native-color.svg"
                    />
                    <TechIcon name="electron" size="2.4rem" icon="/svg/electron-color.svg" />
                    <TechIcon name="nestjs" size="2.4rem" icon="/svg/nestjs.svg" />
                    <TechIcon name="tailwindcss" size="2.4rem" icon="/svg/tailwindcss-color.svg" />
                    <TechIcon name="unity" size="2.4rem" icon="/svg/unity.svg" />
                    <TechIcon name="vite" size="2.4rem" icon="/svg/vite-color.svg" />
                    <TechIcon name="webpack" size="2.4rem" icon="/svg/webpack-color.svg" />
                    <TechIcon name="rollup" size="2.4rem" icon="/svg/rollupdotjs-color.svg" />
                    <TechIcon name="turborepo" size="2.4rem" icon="/svg/turborepo-color.svg" />
                  </div>
                </div>
                Frameworks
              </div>
              <div
                class="w-40 h-full tech-item p-2 border-2 border-dashed rounded-md dark:bg-gray-800"
              >
                <div class="h-22 flex gap-2">
                  <div class="h-full flex flex-col gap-1 flex-wrap">
                    <!-- vscode -->
                    <TechIcon name="vscode" size="2.4rem" icon="/svg/visualstudiocode-color.svg" />
                    <TechIcon name="arc browser" size="2.6rem" icon="/svg/arc-logo.svg" />
                    <TechIcon
                      name="android studio"
                      size="2.4rem"
                      icon="/svg/androidstudio-color.svg"
                    />
                    <TechIcon name="docker" size="2.4rem" icon="/svg/docker-color.svg" />
                    <TechIcon name="postman" size="2.4rem" icon="/svg/postman-color.svg" />
                    <TechIcon name="warp" size="2.4rem" icon="/svg/warp-color.svg" />
                  </div>
                </div>
                Tools
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <HomePage /> -->
      <section class="max-w-xl px-4 sm:px-0 mt-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Latest Posts</h2>
        </div>
        <PostsPreview />
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
