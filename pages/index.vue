<script setup lang="ts">
import {ref} from 'vue';

const showAlert = ref(true);

useHead({
  title: '学习开发记录 - GRTSINTY43的个人主页',
  meta: [
    {
      name: 'description',
      content: 'GRTSINRY43的个人主页，记录了最近项目，学习进度，折腾历程，以及一些技术分享'
    },
    {
      name: 'keywords',
      content: 'GRTSINRY43, 个人主页, 开发, 折腾, 探索'
    }
  ]
})

useSeoMeta({
  title: '学习开发记录 - GRTSINTY43的个人主页',
  ogTitle: '学习开发记录 - GRTSINTY43的个人主页',
  description: 'GRTSINRY43的个人主页，记录了最近项目，学习进度，折腾历程，以及一些技术分享',
  ogDescription: 'GRTSINRY43的个人主页，记录了最近项目，学习进度，折腾历程，以及一些技术分享',
})
</script>

<template>
  <UContainer>
    <div class="alert-container" v-if="showAlert">
      <UAlert
          :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }"
          color="cyan"
          title="🎉 本站已使用 Nuxt.js 重构！代替了原来的 bootstrap 库，前端源码完全开源，具体可以点击网页右上角 Github 图标移步到仓库（grtsinry43/home-web）查看源码"
          @close="showAlert = false"
      />
    </div>
    <div class="content-container">
      <div class="top-left-container">
        <div class="slogan font-jb-mono">
          <p>Coding，</p>
          <p>build a better world</p>
          <p>together!</p>
        </div>
        <span class="slogan-cn">用自己的代码改变世界是一件很酷的事情！</span>
        <br/>
        <div class="button-container">
          <UButton to="https://github.com/grtsinry43" target="_blank"
                   icon="i-grommet-icons:github" style="vertical-align: -5px"
                   class="btn-item github-link bg-blue-400 text-black dark:bg-blue-800 dark:text-white">前往 Github
            个人主页
          </UButton>
          <UButton label="前往学习记录" color="gray" class="btn-item">
            <template #trailing>
              <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5"/>
            </template>
          </UButton>
          <UButton color="gray" class="btn-item" disabled>
            简历（正在完善）
          </UButton>
        </div>
      </div>
      <div class="top-right-container">
        <div class="img-container">
          <img src="@/assets/home-img.svg" alt="">
        </div>
      </div>
    </div>
    <div class="card-container">
      <UCard class="item-card">
        <div class="item-card-inner flex flex-col">
          <span>当前项目</span>
          <!--<span class="title">GRTSINRY43 的个人主页</span>-->
          <!--<span class="subtitle">grtsinry43/home-web</span>-->
          <!--<span class="description"></span>-->
          <!--<UButton>转到 ></UButton>-->
        </div>
      </UCard>
      <UCard class="item-card">
        <span>学习进度</span>
      </UCard>
      <!--<UCard class="item-card">-->
      <!--  <span>个人博客</span>-->
      <!--</UCard>-->
      <UCard class="item-card">
        <span>关于我</span>
      </UCard>
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
  letter-spacing: -1px; //减小一下字距
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

  .item-card-inner {
    width: 100%;
  }
}
</style>
