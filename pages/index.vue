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

const friends = ref([
  {
    name: 'Barkure',
    avatar: 'https://barku.re/assets/icon.svg',
    description: 'Hello! I\'m Barkure.',
    link: 'https://barku.re/'
  },
  {
    name: 'OctAutumn',
    avatar: 'https://www.octautumn.cn/upload/logo.png',
    description: 'Oct\'s CyberHouse',
    link: 'https://www.octautumn.cn/'
  },
  {
    name: 'mufen\'s Blog',
    avatar: 'https://picture-bed-1319447205.cos.ap-guangzhou.myqcloud.com/avatar.png',
    description: 'Nothing is impossible',
    link: 'https://blog.mufen.site/'
  },
  {
    name: '路过',
    avatar: 'https://www.jikamjmk.cn/upload/1.png',
    description: 'jika_walking_by',
    link: 'https://www.jikamjmk.cn/'
  }
]);
</script>

<template>
  <UContainer>
    <div class="alert-container" v-if="showAlert">
      <UAlert
          :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }"
          color="cyan"
          :title="t('alert.title')"
          @close="showAlert = false"
      />
    </div>
    <div class="content-container">
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
          <UButton :label="t('buttons.learningLog')" color="gray" class="btn-item scroll-item" v-scroll-spring>
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
              class="scroll-item"
              v-scroll-spring
              name="home-web"
              :description="t('projects.homeWeb.description')"
              detailsUrl="/project"
          />
          <ProjectPreview
              class="scroll-item"
              v-scroll-spring
              name="54sh-web"
              :description="t('projects.54shWeb.description')"
              detailsUrl="/project"
          />
          <ProjectPreview
              class="scroll-item"
              v-scroll-spring
              name="summer-checkin-2024"
              :description="t('projects.summerCheckin.description')"
              detailsUrl="/project"
          />
          <NuxtLink to="/project" label="查看更多" color="gray" class="btn-more">
            <span>{{ t('buttons.seeMore') }}</span>
            <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5"/>
          </NuxtLink>
        </div>
      </UCard>
      <UCard class="item-card overflow-y-auto scroll-item" v-scroll-spring>
        <span>{{ t('cards.learningProgress') }}</span>
        <LearnProgress name="Vue.js"
                       class="scroll-item"
                       v-scroll-spring
                       description=" 我的首个接触的前端框架，对我有非常深远的影响和帮助，
        从三件套的简陋页面到现在的完整项目，可以说 Vue.js 是我前端框架路程的起点，有了它才有了后来的 React 和 Angular 等等，
        Next.js 和 Nuxt.js 等等，自己完成项目的成就感还是很大的，希望自己能够继续努力，不断学习，不断进步。" :progress="99"/>
        <LearnProgress name="React"
                       class="scroll-item"
                       v-scroll-spring
                       description="React是我在Vue.js之后接触的第二个前端框架，不同于Vue的模板语法，React使用的JSX语法代表了一种新的编程思维。"
                       :progress="80"/>
        <LearnProgress name="Bootstrap"
                       class="scroll-item"
                       v-scroll-spring
                       description="这个框架的学习始于一次偶然的项目，简单的类名就可以实现很多功能，更有非常舒服的响应式"
                       :progress="60"/>
        <LearnProgress name="Spring Boot"
                       class="scroll-item"
                       v-scroll-spring
                       description=" 由于 Java 是我的主语言，所以 Spring Boot 是我后端框架的首选，
        但是说实话其复杂程度和难度远远超过了前端框架，后端学习对我来说路还很长，现在只是一些简单的业务逻辑，
        未来能继续深入学习的话，希望能够学习到更多的知识。" :progress="40"/>
        <LearnProgress name="Python"
                       class="scroll-item"
                       v-scroll-spring
                       description="Python语言的语法一直不习惯，但是正好专业方向需要，并且其强大的生态系统和封装便捷性是其他语言无法比拟的"
                       :progress="80"/>
        <LearnProgress name="Docker"
                       class="scroll-item"
                       v-scroll-spring
                       description="目前还只是会用一些简单的命令，但是Docker的强大和便捷性是不言而喻的，未来希望能够深入学习"
                       :progress="40"/>
        <LearnProgress name="SQL"
                       class="scroll-item"
                       v-scroll-spring
                       description="SQL是数据库的基础，虽然常用的语法没问题，但是真的已经写累了，目前很多都是在用框架"
                       :progress="90"/>
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
