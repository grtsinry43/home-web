<script setup lang="ts">
import {ref} from 'vue';
import {useI18n} from 'vue-i18n';

const showAlert = ref(true);
const {t, locale} = useI18n();

useHead({
  title: t('meta.title'),
  meta: [
    {
      name: 'description',
      content: t('meta.description'),
    },
    {
      name: 'keywords',
      content: t('meta.keywords'),
    }
  ]
});

useSeoMeta({
  title: t('meta.title'),
  ogTitle: t('meta.title'),
  description: t('meta.description'),
  ogDescription: t('meta.description'),
});

import type {SanityDocument} from "@sanity/client";

const FRIENDS_QUERY = groq`*[_type == "friend"]|order(publishedAt asc){_id, name, avatar, description, link}`;
const PROGRESS_QUERY = groq`*[_type == "progress"]|order(publishedAt desc)[0..6]{_id, name, description, progress}`;
const PROJECTS_QUERY = groq`*[_type == "project"]|order(publishedAt desc)[0..2]{_id, name, description, githubUrl, deployUrl, cover, techStack, progress}`;

const {data: friends} = await useSanityQuery<SanityDocument[]>(FRIENDS_QUERY);
const {data: progress} = await useSanityQuery<SanityDocument[]>(PROGRESS_QUERY);
const {data: projects} = await useSanityQuery<SanityDocument[]>(PROJECTS_QUERY);

</script>

<template>
  <UContainer class="main-container">
    <!--<div class="alert-container" v-if="showAlert">-->
    <!--  <UAlert-->
    <!--      :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }"-->
    <!--      color="cyan"-->
    <!--      :title="t('alert.title')"-->
    <!--      @close="showAlert = false"-->
    <!--  />-->
    <!--</div>-->
    <div class="hero-section">
      <div class="hero-content">
        <div class="slogan-container scroll-item" v-scroll-spring>
          <h1 class="slogan">
            <span class="gradient-text">Coding,</span>
            <span>build a better world</span>
            <span>together!</span>
          </h1>
          <p class="slogan-cn" v-if="locale === 'zh'" v-scroll-spring>{{ t('slogan.cn') }}</p>
        </div>

        <div class="button-container scroll-item" v-scroll-spring>
          <UButton to="https://github.com/grtsinry43" target="_blank"
                   icon="i-grommet-icons:github"
                   class="btn-item github-btn">
            {{ t('buttons.github') }}
          </UButton>
          <UButton to="https://blog.grtsinry43.com/"
                   :label="t('buttons.learningLog')"
                   class="btn-item blog-btn"
                   v-scroll-spring>
            <template #trailing>
              <UIcon name="i-heroicons-arrow-right-20-solid" class="btn-more-icon"/>
            </template>
          </UButton>
          <UButton class="btn-item resume-btn scroll-item" disabled v-scroll-spring>
            {{ t('buttons.resume') }}
          </UButton>
        </div>
      </div>
      <div class="hero-image scroll-item" v-scroll-spring>
        <img src="@/assets/home-img.svg" alt="Hero illustration">
      </div>
    </div>

    <div class="section-title scroll-item" v-scroll-spring>
      <h2>My Work</h2>
      <div class="title-underline"></div>
    </div>

    <div class="card-container">
      <UCard class="item-card projects-card scroll-item" v-scroll-spring>
        <div class="card-header">
          <h3>{{ t('cards.currentProjects') }}</h3>
        </div>
        <div class="card-content">
          <ProjectPreview
              v-for="project in projects"
              :key="project._id"
              class="project-item scroll-item"
              v-scroll-spring
              :name="project.name"
              :description="project.description"
          />
          <NuxtLink to="/project" class="see-more-link">
            <span>{{ t('buttons.seeMore') }}</span>
            <UIcon name="i-heroicons-arrow-right-20-solid" class="see-more-icon"/>
          </NuxtLink>
        </div>
      </UCard>

      <UCard class="item-card progress-card scroll-item" v-scroll-spring>
        <div class="card-header">
          <h3>{{ t('cards.learningProgress') }}</h3>
        </div>
        <div class="card-content">
          <LearnProgress
              v-for="item in progress"
              :key="item._id"
              class="progress-item scroll-item"
              v-scroll-spring
              :name="item.name"
              :description="item.description"
              :progress="item.progress"
          />
        </div>
      </UCard>

      <UCard class="item-card about-me-card scroll-item" v-scroll-spring>
        <div class="card-header">
          <h3>{{ t('cards.aboutMe') }}</h3>
        </div>
        <div style="height: 100%;width: 100%;position: absolute;">
          <AboutMe/>
        </div>
      </UCard>
    </div>

    <div class="friends-section">
      <div class="section-title scroll-item" v-scroll-spring>
        <h2>{{ t('friends') }}</h2>
        <div class="title-underline"></div>
      </div>
      <div class="friend-list">
        <FriendCard
            v-for="friend in friends"
            :key="friend.name"
            :name="friend.name"
            :avatar="friend.avatar"
            :description="friend.description"
            :link="friend.link"
            class="friend-item scroll-item"
            v-scroll-spring
        />
      </div>
    </div>
  </UContainer>
</template>


<style lang="less" scoped>
// Variables
@primary-color: #3b82f6;
@secondary-color: #10b981;
@accent-color: #8b5cf6;
@text-color: #1f2937;
@text-light: #6b7280;
@card-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
@transition-standard: all 0.3s ease-in-out;

// Dark mode variables
:root.dark {
  --card-bg: #1e293b;
  --text-color: #f3f4f6;
  --text-light: #d1d5db;
}

.main-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

// Hero Section
.hero-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 8vh 0;
  gap: 2rem;
}

.hero-content {
  flex: 1 1 500px;
}

.slogan-container {
  margin-bottom: 2rem;
}

.slogan {
  font-weight: 800;
  font-size: 3.5rem;
  line-height: 1.1;
  letter-spacing: -0.05em;
  margin-bottom: 1rem;

  span {
    display: block;
    margin-bottom: 0.5rem;
  }
}

.gradient-text {
  background: linear-gradient(135deg, @primary-color, @accent-color);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.slogan-cn {
  font-size: 1.25rem;
  font-weight: 500;
  color: @text-light;
  margin-top: 1rem;
}

.hero-image {
  flex: 1 1 400px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    height: auto;
    filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15));
    transform: translateY(0);
    transition: transform 0.5s ease-out;

    &:hover {
      transform: translateY(-10px);
    }
  }
}

// Buttons
.button-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-item {
  border-radius: 12px;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  transition: @transition-standard;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
}

.github-btn {
  background: @primary-color;
  color: white;

  &:hover {
    background: darken(@primary-color, 10%);
  }
}

.blog-btn {
  background: white;
  color: @text-color;
  border: 2px solid @text-light;

  &:hover {
    background: #f9fafb;
    border-color: @primary-color;
  }

  .btn-more-icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-left: 0.5rem;
    transition: transform 0.2s ease;
  }

  &:hover .btn-more-icon {
    transform: translateX(4px);
  }
}

.resume-btn {
  background: #f3f4f6;
  color: @text-light;

  &:not([disabled]):hover {
    background: #e5e7eb;
  }
}

// Section Titles
.section-title {
  text-align: center;
  margin: 4rem 0 2rem;
  position: relative;

  h2 {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .title-underline {
    height: 4px;
    width: 80px;
    background: linear-gradient(90deg, @primary-color, @accent-color);
    margin: 0 auto;
    border-radius: 2px;
  }
}

// Cards
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.item-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: @card-shadow;
  transition: @transition-standard;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
}

.card-header {
  padding: 1.5rem 1.5rem 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
  }
}

.card-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-item {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:last-of-type {
    border-bottom: none;
  }
}

.progress-item {
  margin-bottom: 1.25rem;
}

.about-me-card {
  position: relative;
  overflow: hidden;
  min-height: 400px;
  background-position: bottom right;
  background-repeat: no-repeat;
  background-size: 200px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='none'%3E%3Cpath d='M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0z' fill='%233b82f620'/%3E%3C/svg%3E");
}

.see-more-link {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: auto;
  padding-top: 1rem;
  font-weight: 600;
  color: @primary-color;
  text-decoration: none;
  transition: @transition-standard;

  .see-more-icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-left: 0.5rem;
    transition: transform 0.2s ease;
  }

  &:hover {
    color: darken(@primary-color, 10%);

    .see-more-icon {
      transform: translateX(4px);
    }
  }
}

// Friends Section
.friends-section {
  margin: 4rem 0;
}

.friend-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.friend-item {
  transition: @transition-standard;

  &:hover {
    transform: translateY(-5px);
  }
}

// Animation
.scroll-item {
  opacity: 0;
  filter: blur(8px);
  transform: translateY(30px);
  transition: opacity 0.8s ease-out,
  filter 0.8s ease-out,
  transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.scroll-in {
  opacity: 1;
  filter: blur(0);
  transform: translateY(0);
}

// Responsive adjustments
@media (max-width: 768px) {
  .slogan {
    font-size: 2.5rem;
  }

  .hero-section {
    margin: 4vh 0;
  }

  .card-container {
    grid-template-columns: 1fr;
  }

  .section-title h2 {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .slogan {
    font-size: 2rem;
  }

  .button-container {
    flex-direction: column;
    align-items: stretch;

    .btn-item {
      width: 100%;
      margin-bottom: 0.75rem;
    }
  }
}
</style>
