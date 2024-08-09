<script setup lang="ts">

</script>

<template>
  <div class="nav-container fixed w-dvw">
    <UContainer class="flex flex-row">
      <div class="nav-logo">
        <NuxtLink to="/">
          <!--<NuxtImg src="~/assets/logo.svg" alt="Nuxt.js Logo" width="50" height="50"/>-->
          Grtsinry43的个人主页
        </NuxtLink>
      </div>
      <div class="nav-links flex">
        <NuxtLink class="nav-item" to="/">首页</NuxtLink>
        <NuxtLink class="nav-item" to="/about">关于</NuxtLink>
        <NuxtLink class="nav-item" to="/blog">博客</NuxtLink>
        <NuxtLink class="nav-item" to="/project">项目</NuxtLink>
        <NuxtLink class="nav-item" to="/docs">文档</NuxtLink>
        <NuxtLink class="nav-item" to="/reach_me">联系我</NuxtLink>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.nav-container {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  color: white;
  padding: 10px;
  z-index: 1;
  height: 3em;
}

.nav-links {
  margin-left: auto;
  .nav-item {
    margin-right: 3em;
    flex-grow: 1;
  }
}
</style>
