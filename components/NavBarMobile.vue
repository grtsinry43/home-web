<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useI18n} from "vue-i18n";

const {locale} = useI18n();
const colorMode = useColorMode()
const isMenuOpen = ref(false)
const localePath = useLocalePath()

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

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
      class="nav-container fixed w-full bg-opacity-80 bg-blue-50 text-blue-950 dark:bg-opacity-80 dark:bg-black dark:text-white">
    <UContainer class="flex flex-row items-center justify-between nav-inner">
      <div class="nav-logo">
        <NuxtLink :to="localePath('/')" class="font-bold">{{ $t('homePageTitle') }}</NuxtLink>
      </div>
      <!-- Toggle Button for Mobile Menu -->
      <UButton class="lg:hidden bg-opacity-0 dark:bg-opacity-0" @click="toggleMenu"
               icon="i-heroicons:bars-3-bottom-right"
               square
               color="gray"
      >
      </UButton>
      <!-- Theme Toggle Button -->
      <div class="theme-option lg:block">
        <UToggle
            on-icon="i-heroicons-moon-20-solid"
            off-icon="i-heroicons-sun-20-solid"
            :model-value="buttonState"
            @change="toggleTheme"
        />
      </div>
      <!-- Icons Container -->
      <div class="actions-container hidden lg:grid">
        <Icon class="language-toggle-icon hover:text-blue-400 dark:hover:text-blue-600" name="i-heroicons-language"
              @click="toggleLocale"/>
        <Icon class="rss-icon hover:text-blue-400 dark:hover:text-blue-600" name="i-heroicons-rss"/>
        <a href="https://github.com/grtsinry43/home-web" target="_blank">
          <Icon class="github-icon hover:text-blue-400 dark:hover:text-blue-600" name="i-grommet-icons:github"/>
        </a>
      </div>
    </UContainer>

    <!-- Mobile Navigation Menu -->
    <div v-show="isMenuOpen"
         class="nav-extend-container flex flex-col items-center bg-blue-50 bg-opacity-85 dark:bg-black dark:bg-opacity-80 backdrop-blur-lg">
      <NuxtLink class="nav-item hover:text-blue-400 dark:hover:text-blue-600" :to="localePath('/')">{{
          $t('home')
        }}
      </NuxtLink>
      <NuxtLink class="nav-item hover:text-blue-400 dark:hover:text-blue-600" :to="localePath('/about')">{{
          $t('about')
        }}
      </NuxtLink>
      <!--<NuxtLink class="nav-item hover:text-blue-400 dark:hover:text-blue-600" :to="$i18n.localePath('/blog')">{{ $t('blog')}}</NuxtLink>-->
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
    justify-content: space-between;
    height: 100%;
  }
}

.actions-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.5em;
  margin-left: 1em;
  font-size: 1.2em;
}

.nav-extend-container {
  align-items: center;
  border-radius: 10px;
  width: 100px;
  margin: 20px auto 0 auto;
  height: 13em;

  .nav-item {
    margin-top: 8px;
  }

  .nav-item:first-child {
    margin-top: 12px;
  }
}
</style>
