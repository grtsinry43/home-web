<script setup lang="ts">
useHead({
  title: '文档｜GRTSINTY43的个人主页',
})
</script>

<template>
  <UContainer>
    <div class="project-container">
      <ProjectItem
          name="home-web"
          description="GRTSINRY43的个人主页，也就是本站的源码，使用 Nuxt.js 重构，实现了前端的 SSR，SEO，以及一些动画效果，响应式设计"
          githubUrl="https://github.com/grtsinry43/home-web"
          deployUrl="https://www.grtsinry43.com"
          cover="https://dogeoss.grtsinry43.com/2024/08/screenshot_20240830_121932.png"
          techStack="Nuxt.js,Vite,Tailwind CSS,Vue.js,TypeScript"
          :progress="40"
      />
      <ProjectItem
          name="54sh-web"
          description="中南大学校团委官网重构，采用 Bootstrap 响应式设计，实现了新闻展示，视频展示，以及一些动画效果"
          githubUrl="https://github.com/54shenghua/54sh-web"
          deployUrl="https://54sh.csu.edu.cn"
          cover="https://dogeoss.grtsinry43.com/2024/08/screenshot_20240830_132401.png"
          techStack="Bootstrap,JavaScript,HTML,CSS"
          :progress="100"
      />
      <ProjectItem
          name="summer-checkin-2024"
          description="学校项目，实现学生定位签到，队长查询队员签到情况，以及一些简单的数据分析"
          githubUrl=""
          deployUrl="https://sp24.54sher.com/"
          cover="https://dogeoss.grtsinry43.com/2024/08/screenshot_20240830_140405.png"
          techStack="Vue.js,Vite,Vant UI,TypeScript,FastAPI,MongoDB"
          :progress="100"
      />
      <ProjectItem
          name="bilibili-danmaku-dplayer"
          description="一个调用B站api获取弹幕并转换为dplayer所需响应格式的服务端程序（这里仅是核心代码，实际使用建议配合缓存和增量更新）"
          githubUrl="https://github.com/grtsinry43/bilibili-danmaku-dplayer"
          deployUrl=""
          cover=""
          techStack="JavaScript,Node.js,Express"
          :progress="100"
      />
      <ProjectItem
          name="simple12306"
          description="（这个是应付课程设计的）一个简单的 12306 火车票查询系统，实现了用户登录，车票查询，车票预订，以及一些简单的数据分析"
          githubUrl="https://github.com/grtsinry43/simple12306-backend"
          deployUrl=""
          cover="https://dogeoss.grtsinry43.com/2024/07/image-20240711222156417.png"
          techStack="Cpp,Drogon,MySQL,Vue.js,Element Plus"
          :progress="100"
      />
    </div>
  </UContainer>
</template>

<style scoped>

</style>
