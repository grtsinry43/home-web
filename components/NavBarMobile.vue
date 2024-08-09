<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from 'vue';

const isMenuVisible = ref(false);

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

const handleClickOutside = (event: MouseEvent) => {
  const menuIconContainer = document.querySelector('.menu-icon-container');
  if (menuIconContainer && !menuIconContainer.contains(event.target as Node)) {
    isMenuVisible.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="nav-container fixed w-dvw">
    <UContainer class="flex flex-col nav-inner">
      <div class="nav-logo-bar flex">
        <div class="nav-logo flex flex-row">
          <NuxtLink to="/">
            Grtsinry43 的个人主页
          </NuxtLink>
        </div>
        <div class="menu-icon-container" @click="toggleMenu">
          <Icon class="menu-icon" name="i-simple-line-icons:menu"/>
        </div>
      </div>
      <div v-if="isMenuVisible" class="nav-links flex flex-col">
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
  width: 100%;
  color: white;
  padding: 10px;
  z-index: 1;
  justify-content: center;
  transition: height 1s;
}

.nav-inner {
  align-items: center;
}

.nav-links {
  align-items: center;
  margin-top: 1em;

  .nav-item {
    text-align: center;
    flex-grow: 1;
    margin-top: 0.5em;
  }
}

.menu-icon-container {
  margin-left: 20px;
  cursor: pointer;
  outline: yellow;
  color: white;
  line-height: 20px;
  padding: 3px;
  border-radius: 5px;
  position: relative;
  display: flex;
  justify-content: center;
}

.menu-icon-container::before {
  content: '';
  display: block;
  width: 1px;
  height: 25px;
  background: white;
  position: absolute;
  left: -10px;
  top: -1px;
}
</style>
