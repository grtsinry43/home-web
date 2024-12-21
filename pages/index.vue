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
  <UContainer>
    <!--<div class="alert-container" v-if="showAlert">-->
    <!--  <UAlert-->
    <!--      :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }"-->
    <!--      color="cyan"-->
    <!--      :title="t('alert.title')"-->
    <!--      @close="showAlert = false"-->
    <!--  />-->
    <!--</div>-->
    <div class="content-container" style="margin: 10vh 0">
      <div class="top-left-container">
        <div class="slogan font-jb-mono scroll-item" v-scroll-spring>
          <p>Coding,</p>
          <p>build a better world</p>
          <p>together!</p>
        </div>
        <span class="slogan-cn scroll-item" v-if="locale === 'zh'" v-scroll-spring>{{ t('slogan.cn') }}</span>
        <br/>
        <div class="button-container scroll-item" v-scroll-spring>
          <UButton to="https://github.com/grtsinry43" target="_blank"
                   icon="i-grommet-icons:github" style="vertical-align: -4px"
                   class="btn-item github-link bg-blue-400 text-black dark:bg-blue-800 dark:text-white">
            {{ t('buttons.github') }}
          </UButton>
          <UButton to="https://blog.grtsinry43.com/" :label="t('buttons.learningLog')" color="gray" class="btn-item"
                   v-scroll-spring>
            <template #trailing>
              <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5 btn-more-icon"/>
            </template>
          </UButton>
          <UButton color="gray" class="btn-item scroll-item" disabled v-scroll-spring>
            {{ t('buttons.resume') }}
          </UButton>
        </div>
      </div>
      <div class="top-right-container">
        <div class="img-container scroll-item" v-scroll-spring>
          <img src="@/assets/home-img.svg" alt="">
        </div>
      </div>
    </div>
    <div class="card-container">
      <UCard class="item-card scroll-item" v-scroll-spring>
        <div class="item-card-inner flex flex-col">
          <span>{{ t('cards.currentProjects') }}</span>
          <ProjectPreview
              v-for="project in projects"
              :key="project._id"
              class="scroll-item"
              v-scroll-spring
              :name="project.name"
              :description="project.description"
          />
          <NuxtLink to="/project" label="查看更多" color="gray" class="btn-more">
            <span>{{ t('buttons.seeMore') }}</span>
            <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5"/>
          </NuxtLink>
        </div>
      </UCard>
      <UCard class="item-card overflow-y-auto scroll-item" v-scroll-spring>
        <span>{{ t('cards.learningProgress') }}</span>
        <LearnProgress
            v-for="item in progress"
            :key="item._id"
            class="scroll-item"
            v-scroll-spring
            :name="item.name"
            :description="item.description"
            :progress="item.progress"
        />
      </UCard>
      <UCard class="item-card about-me-card scroll-item" v-scroll-spring>
        <span>{{ t('cards.aboutMe') }}</span>
        <AboutMe/>
      </UCard>
    </div>
    <div class="friend-container">
      <span class="font-bold">{{ t('friends') }}</span>
      <div class="friend-list">
        <FriendCard
            v-for="friend in friends"
            :key="friend.name"
            :name="friend.name"
            :avatar="friend.avatar"
            :description="friend.description"
            :link="friend.link"
            class="scroll-item"
            v-scroll-spring
        />
      </div>
    </div>
  </UContainer>
</template>


<style lang="less" scoped>
.content-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.top-left-container {
  flex: 1 1 400px;
}

.top-right-container {
  flex: 1 1 400px;
}

.slogan {
  font-weight: bolder;
  font-size: 40px;
  letter-spacing: -1px; // 减小一下字距
  line-height: 50px;
  padding: 30px;
}

.slogan-cn {
  font-weight: bolder;
  padding: 30px;
  font-size: 16px;
}

.img-container {
  margin: 2em auto;
  width: 60%;
  text-align: center;

  img {
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
  }
}

@media (max-width: 800px) {
  .content-container {
    flex-direction: column;
  }
}

.button-container {
  margin: 30px;

  .btn-item, a {
    margin-right: 1em;
    margin-bottom: 1em;
  }
}

.alert-container {
  margin: 1em;
}

.item-card {
  margin: 1em;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item-card {
  flex: 1 1 calc(33.333% - 1em);
  margin: 0.5em;
}

@media (max-width: 1200px) {
  .item-card {
    flex: 1 1 calc(50% - 1em);
  }
}

@media (max-width: 800px) {
  .item-card {
    flex: 1 1 100%;
  }
}

.btn-more {
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.about-me-card {
  position: relative;
  overflow: hidden;
  min-height: 500px;
}

.friend-container {
  margin: 1em 0;
}

.friend-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
}

.friend-card {
  flex: 1 1 calc(25% - 1em); /* 4 cards per row */
}

@media (max-width: 1200px) {
  .friend-card {
    flex: 1 1 calc(33.333% - 1em); /* 3 cards per row */
  }
}

@media (max-width: 800px) {
  .friend-card {
    flex: 1 1 calc(50% - 1em); /* 允许两个卡片一行 */
  }
}

@media (max-width: 500px) {
  .friend-card {
    flex: 1 1 100%; /* 手机尺寸一行一个 */
  }
}

/* 初始状态，元素处于下方且不可见，并带有模糊效果 */
.scroll-item {
  opacity: 0;
  filter: blur(10px); /* 元素模糊 25px */
  transform: translateY(20px); /* 元素初始位移 20px */
  transition: transform 0.5s ease-out, opacity 0.5s ease-out, filter 0.5s ease-out; /* 为 filter 添加动画 */
}

/* 当元素进入视口时，透明度变为 1，模糊度变为 0，且上移回原位 */
.scroll-in {
  opacity: 1;
  filter: blur(0); /* 模糊效果消失 */
  transform: translateY(0); /* 元素回到原始位置 */
  transition: transform 0.5s ease-out, opacity 0.5s ease-out, filter 0.5s ease-out; /* 确保 filter 也有动画 */
}

</style>
