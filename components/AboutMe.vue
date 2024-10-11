<template>
  <div class="about-me-word-cloud-container">
    <div class="title font-jb-mono">👋{{ $t('aboutMeTitle') }}</div>
    <div v-for="(word, index) in words" :key="index"
         class="word font-jb-mono"
         :style="getInitialWordStyle(word.text, word.size, word.color)"
         ref="wordItem">
      {{ word.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from "vue-i18n";

const { t: $t } = useI18n();
const { locale } = useI18n();

const wordItem = ref<HTMLCollection | null>(null);
let intervalId: number | null = null;

const words = ref([
  { text: $t('word1'), size: 40, color: '#FF5733' },
  { text: $t('word2'), size: 40, color: '#33FF57' },
  { text: $t('word3'), size: 40, color: '#3357FF' },
  { text: $t('word4'), size: 30, color: '#F1C40F' },
  { text: $t('word5'), size: 20, color: '#8E44AD' },
  { text: $t('word6'), size: 30, color: '#E67E22' },
  { text: $t('word7'), size: 30, color: '#2ECC71' },
  { text: $t('word8'), size: 30, color: '#E74C3C' },
  { text: $t('word9'), size: 30, color: '#3498DB' },
  { text: $t('word10'), size: 30, color: '#9B59B6' },
  { text: $t('word11'), size: 40, color: '#F39C12' },
  { text: $t('word12'), size: 40, color: '#D35400' },
  { text: $t('word13'), size: 25, color: '#1ABC9C' },
  { text: $t('word14'), size: 25, color: '#2C3E50' },
  { text: $t('word15'), size: 25, color: '#BDC3C7' },
  { text: $t('word16'), size: 35, color: '#7F8C8D' },
  { text: $t('word17'), size: 15, color: '#C0392B' },
  { text: $t('word18'), size: 20, color: '#8E44AD' },
  { text: $t('word19'), size: 50, color: '#F1C40F' },
  { text: $t('word20'), size: 40, color: '#3498DB' },
  { text: $t('word21'), size: 20, color: '#E67E22' },
  { text: $t('word22'), size: 20, color: '#2ECC71' },
  { text: $t('word23'), size: 20, color: '#E74C3C' },
  { text: $t('word24'), size: 35, color: '#9B59B6' }
]);

const getInitialWordStyle = (text: string, size: number, color: string) => {
  return `
    font-size: ${size}px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    color: ${color};
  `;
};

onMounted(() => {
  intervalId = setInterval(() => {
    if (wordItem.value) {
      Array.from(wordItem.value).forEach((item: HTMLElement) => {
        const currentTop = parseFloat(item.style.top);
        const currentLeft = parseFloat(item.style.left);
        const newTop = currentTop + (Math.random() * 40 - 20);
        const newLeft = currentLeft + (Math.random() * 40 - 20);

        item.style.top = `${Math.max(0, Math.min(100, newTop))}%`;
        item.style.left = `${Math.max(0, Math.min(100, newLeft))}%`;

        const currentOpacity = parseFloat(item.style.opacity);
        const newOpacity = currentOpacity + (Math.random() * 0.2 - 0.1);
        item.style.opacity = `${Math.max(0.3, Math.min(0.8, newOpacity))}`;

        const currentFontSize = parseFloat(item.style.fontSize);
        const newFontSize = currentFontSize + (Math.random() * 10 - 5);
        item.style.fontSize = `${Math.max(10, Math.min(50, newFontSize))}`;

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

watch(() => locale.value, () => {
  words.value = [
    { text: $t('word1'), size: 40, color: '#FF5733' },
    { text: $t('word2'), size: 40, color: '#33FF57' },
    { text: $t('word3'), size: 40, color: '#3357FF' },
    { text: $t('word4'), size: 30, color: '#F1C40F' },
    { text: $t('word5'), size: 20, color: '#8E44AD' },
    { text: $t('word6'), size: 30, color: '#E67E22' },
    { text: $t('word7'), size: 30, color: '#2ECC71' },
    { text: $t('word8'), size: 30, color: '#E74C3C' },
    { text: $t('word9'), size: 30, color: '#3498DB' },
    { text: $t('word10'), size: 30, color: '#9B59B6' },
    { text: $t('word11'), size: 40, color: '#F39C12' },
    { text: $t('word12'), size: 40, color: '#D35400' },
    { text: $t('word13'), size: 25, color: '#1ABC9C' },
    { text: $t('word14'), size: 25, color: '#2C3E50' },
    { text: $t('word15'), size: 25, color: '#BDC3C7' },
    { text: $t('word16'), size: 35, color: '#7F8C8D' },
    { text: $t('word17'), size: 15, color: '#C0392B' },
    { text: $t('word18'), size: 20, color: '#8E44AD' },
    { text: $t('word19'), size: 50, color: '#F1C40F' },
    { text: $t('word20'), size: 40, color: '#3498DB' },
    { text: $t('word21'), size: 20, color: '#E67E22' },
    { text: $t('word22'), size: 20, color: '#2ECC71' },
    { text: $t('word23'), size: 20, color: '#E74C3C' },
    { text: $t('word24'), size: 35, color: '#9B59B6' }
  ];
});
</script>

<style scoped>
.about-me-word-cloud-container {
  background: linear-gradient(to bottom right, #f0f4f8, #c1e1c5);
  height: 100vh; /* 充满视口高度 */
  width: 100%;
  overflow: hidden;
  position: relative; /* 使得子元素绝对定位 */
}

.title {
  font-size: 2em;
  font-weight: bold;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.word {
  position: absolute;
  transition: top 2s, left 2s, transform 0.3s ease, filter 0.5s ease, opacity 2s;
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.word:hover {
  transform: translate(-50%, -50%) scale(1.5);
}
</style>
