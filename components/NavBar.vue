<script setup lang="ts">

const colorMode = useColorMode()

const toggleTheme = () => {
  // 切换主题
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div
      class="nav-container fixed w-dvw bg-blue-50 bg-opacity-80 text-blue-950 dark:bg-black dark:text-white dark:bg-opacity-80">
    <UContainer class="flex flex-row nav-inner">
      <div class="nav-logo">
        <NuxtLink to="/" class="font-bold">Grtsinry43 的个人主页</NuxtLink>
      </div>
      <div class="nav-links flex">
        <NuxtLink class="nav-item hover:text-blue-400 dark:hover:text-blue-600" to="/">首页</NuxtLink>
        <NuxtLink class="nav-item hover:text-blue-400 dark:hover:text-blue-600" to="/about">关于</NuxtLink>
        <!--<NuxtLink class="nav-item hover:text-blue-400 dark:hover:text-blue-600" to="/blog">博客</NuxtLink>-->
        <NuxtLink class="nav-item hover:text-blue-400 dark:hover:text-blue-600" to="/project">项目</NuxtLink>
        <NuxtLink class="nav-item hover:text-blue-400 dark:hover:text-blue-600" to="/docs">文档</NuxtLink>
        <NuxtLink class="nav-item hover:text-blue-400 dark:hover:text-blue-600" to="/reach_me">联系我</NuxtLink>
      </div>
      <div class="theme-option">
        <UToggle
            on-icon="i-heroicons-moon-20-solid"
            off-icon="i-heroicons-sun-20-solid"
            :model-value="colorMode.preference === 'dark'"
            @change="toggleTheme"
        />
      </div>
      <div class="actions-container">
        <Icon class="language-toggle-icon hover:text-blue-400 dark:hover:text-blue-600" name="i-heroicons-language"/>
        <Icon class="rss-icon hover:text-blue-400 dark:hover:text-blue-600" name="i-heroicons-rss"/>
        <a href="https://github.com/grtsinry43/home-web" target="_blank">
          <Icon class="github-icon hover:text-blue-400 dark:hover:text-blue-600" name="i-grommet-icons:github"/>
        </a>
      </div>
    </UContainer>
  </div>
</template>

<style lang="less" scoped>
.nav-container {
  backdrop-filter: blur(10px);
  padding: 10px;
  z-index: 1;
  height: 5em;

  .nav-inner {
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}

.nav-links {
  margin-left: auto;

  .nav-item {
    margin-right: 2em;
    flex-grow: 1;
  }
}

.actions-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.5em;
  margin-left: 1em;
  font-size: 1.2em;
}
</style>
