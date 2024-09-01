<script setup lang="ts">
import {ref, defineComponent, onMounted} from 'vue';

const wordItem = ref<HTMLCollection | null>(null);
let intervalId: number | null = null;

const words = ref([
  {text: '左家垅男子技校（）😰', size: 40},
  {text: 'Vue.js', size: 40},
  {text: 'Vue.js', size: 40},
  {text: 'Java受害者（', size: 30},
  {text: 'Spring Boot', size: 20},
  {text: 'HTML5', size: 20},
  {text: 'CSS', size: 20},
  {text: 'JavaScript', size: 20},
  {text: 'Python', size: 20},
  {text: 'Cpp', size: 20},
  {text: 'Archlinux重度用户', size: 40},
  {text: '主力前端，后端依！托！😭', size: 40},
  {text: 'Arcaea 玩家，源神，启动！！😡', size: 25},
  {text: 'Phigros玩家', size: 25},
  {text: '对立，我的对立~😋', size: 25},
  {text: '音游', size: 35},
  {text: '视频剪辑', size: 15},
  {text: 'Coding', size: 20},
  {text: '前端开发', size: 50},
  {text: '后端开发', size: 40},
  {text: '原！神！', size: 20},
  {text: '崩坏 星穹铁道', size: 20},
  {text: '大二萌新', size: 20},
  {text: '成分复杂👀', size: 35},
]);

const getInitialWordStyle = (word: { text: string; size: number }) => {

  return `
    font-size: ${word.size}px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  `;
};

onMounted(() => {
  intervalId = setInterval(() => {
    if (wordItem.value) {
      wordItem.value.forEach((item) => {
        const currentTop = parseFloat(item.style.top);
        const currentLeft = parseFloat(item.style.left);
        const newTop = currentTop + (Math.random() * 40 - 20); // 变化范围在 -20% 到 20% 之间
        const newLeft = currentLeft + (Math.random() * 40 - 20); // 变化范围在 -20% 到 20% 之间

        item.style.top = `${Math.max(0, Math.min(100, newTop))}%`; // 确保新位置在 0% 到 100% 之间
        item.style.left = `${Math.max(0, Math.min(100, newLeft))}%`; // 确保新位置在 0% 到 100% 之间

        //透明度也是一样
        const currentOpacity = parseFloat(item.style.opacity);
        const newOpacity = currentOpacity + (Math.random() * 0.2 - 0.1); // 变化范围在 -0.1 到 0.1 之间
        item.style.opacity = `${Math.max(0.3, Math.min(0.8, newOpacity))}`; // 确保新透明度在 0.3 到 0.8 之间

        //字体大小也是一样
        const currentFontSize = parseFloat(item.style.fontSize);
        const newFontSize = currentFontSize + (Math.random() * 10 - 5); // 变化范围在 -5 到 5 之间
        item.style.fontSize = `${Math.max(10, Math.min(50, newFontSize))}`; // 确保新字体大小在 10 到 50 之间

        // 对于字体大小小于 20 的词语，进行filter: blur(2px) 处理
        if (newFontSize < 20) {
          item.style.filter = 'blur(2px)';
        } else {
          item.style.filter = 'none';
        }
      });
    }
  }, 2000);
});

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
});

</script>

<template>
  <div class="about-me-word-cloud-container">
    <div class="title font-jb-mono">👋{{ $t('aboutMeTitle') }}</div>
    <div v-for="(word, index) in words" :key="index" class="word font-jb-mono" :style="getInitialWordStyle(word)"
         ref="wordItem">
      {{ word.text }}
    </div>
  </div>
</template>

<style scoped>
.about-me-word-cloud-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.title {
  font-size: 1.5em;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.word {
  position: absolute;
  transition: top 2s, left 2s, transform 0.3s ease, filter 0.5s ease, opacity 2s;
}

.word:hover {
  transform: translate(-50%, -50%) scale(1.5);
}

</style>
