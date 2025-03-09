<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import {useI18n} from 'vue-i18n';

const {t, locale} = useI18n();
const $t = t;
const localePath = useLocalePath();
const colorMode = useColorMode();
const isMenuOpen = ref(false);
const isScrolled = ref(false);
const buttonState = ref(false);

// Toggle theme between light and dark
const toggleTheme = () => {
  if (colorMode.preference === 'system') {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  } else {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
  }
  buttonState.value = colorMode.preference === 'dark' || (colorMode.preference === 'system' && colorMode.value === 'dark');
};

// Toggle language between English and Chinese
const toggleLocale = () => {
  locale.value = locale.value === 'en' ? 'zh' : 'en';
};

// Toggle mobile menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;

  // Prevent scrolling when menu is open
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

// Close mobile menu when clicking on a link
const closeMenu = () => {
  if (isMenuOpen.value) {
    isMenuOpen.value = false;
    document.body.style.overflow = '';
  }
};

// Check if page is scrolled for navbar styling
const checkScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

// Watch for route changes to close menu
watch(() => localePath, () => {
  closeMenu();
}, {deep: true});

onMounted(() => {
  // Set initial theme button state
  buttonState.value = colorMode.value === 'dark';

  // Add scroll event listener
  window.addEventListener('scroll', checkScroll);
  checkScroll();

  // Clean up event listener
  return () => {
    window.removeEventListener('scroll', checkScroll);
  };
});
</script>

<template>
  <header
      :class="[
      'navbar fixed w-full z-50 transition-all duration-300',
      isScrolled ? 'navbar-scrolled py-2' : 'py-4',
      isMenuOpen ? 'navbar-open' : ''
    ]"
  >
    <UContainer class="flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink :to="localePath('/')" class="navbar-logo">
        {{ $t('homePageTitle') }}
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="navbar-links hidden lg:flex">
        <NuxtLink
            v-for="(item, index) in ['home', 'about', 'project', 'docs', 'contactMe']"
            :key="index"
            :to="localePath(item === 'home' ? '/' : `/${item.toLowerCase().replace('contactme', 'reach_me')}`)"
            class="nav-link"
            active-class="nav-link-active"
        >
          {{ $t(item) }}
        </NuxtLink>
      </nav>

      <!-- Desktop Actions -->
      <div class="navbar-actions hidden lg:flex">
        <!-- Theme Toggle -->
        <div class="action-item theme-toggle">
          <UToggle
              on-icon="i-heroicons-moon-20-solid"
              off-icon="i-heroicons-sun-20-solid"
              :model-value="buttonState"
              @change="toggleTheme"
              class="theme-toggle-button"
          />
        </div>

        <!-- Language Toggle -->
        <button class="action-item" @click="toggleLocale" aria-label="Toggle Language">
          <Icon name="i-heroicons-language" class="action-icon"/>
          <span class="action-label">{{ locale === 'en' ? '中文' : 'EN' }}</span>
        </button>

        <!-- RSS -->
        <a href="#" class="action-item" aria-label="RSS Feed">
          <Icon name="i-heroicons-rss" class="action-icon"/>
        </a>

        <!-- GitHub -->
        <a href="https://github.com/grtsinry43/home-web" target="_blank" class="action-item" aria-label="GitHub">
          <Icon name="i-grommet-icons:github" class="action-icon"/>
        </a>
      </div>

      <!-- Mobile Actions -->
      <div class="navbar-mobile-actions flex lg:hidden">
        <!-- Theme Toggle (Mobile) -->
        <div class="action-item theme-toggle mr-2">
          <UToggle
              on-icon="i-heroicons-moon-20-solid"
              off-icon="i-heroicons-sun-20-solid"
              :model-value="buttonState"
              @change="toggleTheme"
              class="theme-toggle-button"
          />
        </div>

        <!-- Menu Toggle -->
        <button
            class="menu-toggle"
            @click="toggleMenu"
            aria-label="Toggle Menu"
            :aria-expanded="isMenuOpen"
        >
          <div class="menu-icon" :class="{ 'open': isMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </UContainer>

    <!-- Mobile Menu -->
    <div
        class="mobile-menu"
        :class="{ 'open': isMenuOpen }"
    >
      <UContainer class="mobile-menu-container">
        <nav class="mobile-nav">
          <NuxtLink
              v-for="(item, index) in ['home', 'about', 'project', 'docs', 'contactMe']"
              :key="index"
              :to="localePath(item === 'home' ? '/' : `/${item.toLowerCase().replace('contactme', 'reach_me')}`)"
              class="mobile-nav-link"
              active-class="mobile-nav-link-active"
              @click="closeMenu"
          >
            {{ $t(item) }}
          </NuxtLink>
        </nav>

        <div class="mobile-actions">
          <button class="mobile-action-item" @click="toggleLocale">
            <Icon name="i-heroicons-language" class="mobile-action-icon"/>
            <span>{{ locale === 'en' ? '切换到中文' : 'Switch to English' }}</span>
          </button>

          <a href="#" class="mobile-action-item">
            <Icon name="i-heroicons-rss" class="mobile-action-icon"/>
            <span>RSS</span>
          </a>

          <a href="https://github.com/grtsinry43/home-web" target="_blank" class="mobile-action-item">
            <Icon name="i-grommet-icons:github" class="mobile-action-icon"/>
            <span>GitHub</span>
          </a>
        </div>
      </UContainer>
    </div>
  </header>
</template>

<style lang="less" scoped>
// Variables
@primary: #3b82f6;
@primary-dark: #2563eb;
@primary-light: #60a5fa;
@text-light: rgba(30, 58, 138, 0.8);
@text-dark: rgba(255, 255, 255, 0.8);
@transition-standard: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
@transition-menu: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);

// Navbar Base
.navbar {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background-color: rgba(239, 246, 255, 0.85);
  border-bottom: 1px solid rgba(219, 234, 254, 0.3);

  &.navbar-scrolled {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    background-color: rgba(239, 246, 255, 0.95);
  }

  :deep(.dark) &, .dark & {
    background-color: rgba(17, 24, 39, 0.85);
    border-bottom: 1px solid rgba(55, 65, 81, 0.3);

    &.navbar-scrolled {
      background-color: rgba(17, 24, 39, 0.95);
    }
  }
}

// Logo
.navbar-logo {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #1e40af;
  transition: @transition-standard;
  position: relative;
  padding: 0.5rem 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, @primary, @primary-light);
    transition: width 0.3s ease;
  }

  &:hover {
    color: @primary;

    &::after {
      width: 100%;
    }
  }

  .dark & {
    color: white;

    &:hover {
      color: @primary-light;
    }
  }
}

// Desktop Navigation Links
.navbar-links {
  // display: flex;
  gap: 2rem;
}

.nav-link {
  position: relative;
  padding: 0.5rem 0;
  font-weight: 500;
  color: @text-light;
  transition: @transition-standard;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: @primary;
    transition: all 0.3s ease;
    transform: translateX(-50%);
    opacity: 0;
  }

  &:hover, &.nav-link-active {
    color: @primary;

    &::after {
      width: 100%;
      opacity: 1;
    }
  }

  .dark & {
    color: @text-dark;

    &:hover, &.nav-link-active {
      color: @primary-light;

      &::after {
        background: @primary-light;
      }
    }
  }
}

// Desktop Actions
.navbar-actions {
  // display: flex;
  align-items: center;
  gap: 1.25rem;
}

.action-item {
  display: flex;
  align-items: center;
  color: @text-light;
  transition: @transition-standard;
  position: relative;

  .action-icon {
    font-size: 1.25rem;
  }

  .action-label {
    font-size: 0.875rem;
    margin-left: 0.5rem;
    font-weight: 500;
  }

  &:hover {
    color: @primary;
    transform: translateY(-2px);
  }

  .dark & {
    color: @text-dark;

    &:hover {
      color: @primary-light;
    }
  }
}

// Theme Toggle
.theme-toggle {
  .theme-toggle-button {
    --toggle-bg: #e5e7eb;
    --toggle-ring: white;
    --toggle-active: @primary;

    .dark & {
      --toggle-active: @primary-light;
    }
  }
}

// Mobile Menu Toggle
.menu-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;
}

.menu-icon {
  width: 24px;
  height: 20px;
  position: relative;
  transition: @transition-standard;

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: @text-light;
    border-radius: 2px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: @transition-standard;

    &:nth-child(1) {
      top: 0;
    }

    &:nth-child(2) {
      top: 9px;
      width: 75%;
    }

    &:nth-child(3) {
      top: 18px;
    }

    .dark & {
      background: @text-dark;
    }
  }

  &.open {
    span {
      background: @primary;

      &:nth-child(1) {
        top: 9px;
        transform: rotate(135deg);
      }

      &:nth-child(2) {
        opacity: 0;
        width: 0;
      }

      &:nth-child(3) {
        top: 9px;
        transform: rotate(-135deg);
      }

      .dark & {
        background: @primary-light;
      }
    }
  }
}

// Mobile Menu
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  background: rgba(239, 246, 255, 0.98);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  overflow: hidden;
  z-index: 50;
  transition: @transition-menu;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .dark & {
    background: rgba(17, 24, 39, 0.98);
  }

  &.open {
    height: 100vh;
  }
}

.mobile-menu-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 2rem 0;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  transition-delay: 0.1s;

  .mobile-menu.open & {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.mobile-nav-link {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e3a8a;
  transition: @transition-standard;
  position: relative;
  padding: 0.5rem 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, @primary, @primary-light);
    transition: width 0.3s ease;
  }

  &:hover, &.mobile-nav-link-active {
    color: @primary;

    &::after {
      width: 100%;
    }
  }

  .dark & {
    color: white;

    &:hover, &.mobile-nav-link-active {
      color: @primary-light;
    }
  }
}

.mobile-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  margin-top: 2rem;
}

.mobile-action-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  background: rgba(219, 234, 254, 0.5);
  color: #1e3a8a;
  font-weight: 500;
  transition: @transition-standard;
  width: 100%;
  max-width: 250px;

  .mobile-action-icon {
    font-size: 1.25rem;
  }

  &:hover {
    background: rgba(191, 219, 254, 0.8);
    transform: translateY(-2px);
  }

  .dark & {
    background: rgba(55, 65, 81, 0.5);
    color: white;

    &:hover {
      background: rgba(75, 85, 99, 0.8);
    }
  }
}

// Responsive adjustments
@media (max-width: 1023px) {
  .navbar-logo {
    font-size: 1.125rem;
  }
}
</style>
