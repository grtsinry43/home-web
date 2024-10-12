<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n();
useHead({
  title: `${t('about')} | ${t('homePageTitle')}`,
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

const personalDetails = [
  {label: t('about.name'), value: 'John Doe', icon: 'i-mdi-account'},
  {label: t('about.language'), value: 'JavaScript, TypeScript, Python', icon: 'i-mdi-code-tags'},
  {label: t('about.toolchain'), value: 'VSCode, Git, Docker', icon: 'i-mdi-toolbox'},
  {label: t('about.experience'), value: '5 years of web development', icon: 'i-mdi-timer'},
];

// 动态返回卡片大小
const cardSize = (index: number) => {
  // 可以根据索引来随机指定卡片大小
  if (index % 2 === 0) {
    return 'large-card';
  }
  return 'small-card';
};
</script>

<template>
  <AboutMe class="cloud-inner"/>
  <UContainer class="cloud-container">
    <UContainer style="height: 100vh">
      <!--<div class="grid-container">-->
      <!--  <UCard-->
      <!--      v-for="(detail, index) in personalDetails"-->
      <!--      :key="detail.label"-->
      <!--      :class="['glass-card', cardSize(index)]"-->
      <!--  >-->
      <!--    <div class="card-content">-->
      <!--      <i :class="detail.icon" class="card-icon"></i> &lt;!&ndash; 卡片图标 &ndash;&gt;-->
      <!--      <strong>{{detail.label}}:</strong> {{detail.value}}-->
      <!--    </div>-->
      <!--  </UCard>-->
      <!--</div>-->
    </UContainer>
  </UContainer>
  <footer class="footer">
    <UButton to="https://github.com/yourprofile" icon="i-grommet-icons:github">
      {{ t('buttons.github') }}
    </UButton>
    <UButton to="/contact" color="gray">
      {{ t('buttons.contactMe') }}
    </UButton>
  </footer>
</template>

<style scoped>
.cloud-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cloud-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em;
  width: 100%;
  max-width: 1200px;
  height: auto;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* 自动调整列数 */
  gap: 1.5rem;
  width: 100%;
}

.glass-card {
  background: rgba(255, 255, 255, 0.3); /* 半透明背景 */
  backdrop-filter: blur(15px); /* 毛玻璃效果 */
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  transition: transform 0.3s ease-in-out;
}

.large-card {
  grid-column: span 2; /* 让卡片占两列 */
}

.small-card {
  grid-column: span 1; /* 卡片占一列 */
}

.glass-card:hover {
  transform: scale(1.05); /* 鼠标悬停时轻微放大 */
}

.card-content {
  display: flex;
  align-items: center;
}

.card-icon {
  font-size: 2rem;
  margin-right: 1rem;
  color: #666; /* 图标颜色 */
}

.footer {
  display: flex;
  justify-content: center;
  gap: 1em;
  margin-top: 2em;
}

</style>
