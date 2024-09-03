<script setup lang="ts">
import {useI18n} from 'vue-i18n';
import {onMounted} from "vue";

const {locale} = useI18n();
const localePath = useLocalePath();
const colorMode = useColorMode();

const toggleTheme = () => {
  if (colorMode.preference === 'system') {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
    buttonState.value = colorMode.preference === 'dark';
  } else {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
    buttonState.value = colorMode.preference === 'dark';
  }
};

const toggleLocale = () => {
  locale.value = locale.value === 'en' ? 'zh' : 'en';
};

const buttonState = ref(false);

onMounted(() => {
  // 根据最开始的主题设置按钮的图标
  buttonState.value = colorMode.value === 'dark';
})
</script>

<template>
  <div
      class="nav-container fixed w-dvw bg-blue-50 bg-opacity-80 text-blue-950 dark:bg-black dark:text-white dark:bg-opacity-80">
    <UContainer class="flex flex-row nav-inner">
      <div class="nav-logo">
        <NuxtLink :to="localePath('/')" class="font-bold">{{ $t('homePageTitle') }}</NuxtLink>
      </div>
      <div class="nav-links flex">
        <NuxtLink class="nav-item hover:text-blue-400 dark:hover:text-blue-600" :to="localePath('/')">{{
            $t('home')
          }}
        </NuxtLink>
        <NuxtLink class="nav-item hover:text-blue-400 dark:hover:text-blue-600" :to="localePath('/about')">
          {{ $t('about') }}
        </NuxtLink>
        <!--<NuxtLink class="nav-item hover:text-blue-400 dark:hover:text-blue-600" :to="$i18n.localePath('/blog')">{{ $t('blog') }}</NuxtLink>-->
        <NuxtLink class="nav-item hover:text-blue-400 dark:hover:text-blue-600" :to="localePath('/project')">
          {{ $t('project') }}
        </NuxtLink>
        <NuxtLink class="nav-item hover:text-blue-400 dark:hover:text-blue-600" :to="localePath('/docs')">{{
            $t('docs')
          }}
        </NuxtLink>
        <NuxtLink class="nav-item hover:text-blue-400 dark:hover:text-blue-600" :to="localePath('/reach_me')">
          {{ $t('contactMe') }}
        </NuxtLink>
      </div>
      <div class="theme-option">
        <UToggle
            on-icon="i-heroicons-moon-20-solid"
            off-icon="i-heroicons-sun-20-solid"
            :model-value="buttonState"
            @change="toggleTheme"
        />
      </div>
      <div class="actions-container">
        <Icon class="language-toggle-icon hover:text-blue-400 dark:hover:text-blue-600" name="i-heroicons-language"
              @click="toggleLocale"/>
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
