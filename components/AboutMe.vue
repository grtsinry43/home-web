<script setup lang="ts">
import {ref, defineComponent, onMounted} from 'vue';
import {useI18n} from "vue-i18n";

const {t: $t} = useI18n();
const {locale} = useI18n();

const wordItem = ref<HTMLCollection | null>(null);
let intervalId: number | null = null;

const words = ref([
  {text: $t('word1'), size: 40},
  {text: $t('word2'), size: 40},
  {text: $t('word3'), size: 40},
  {text: $t('word4'), size: 30},
  {text: $t('word5'), size: 20},
  {text: $t('word6'), size: 30},
  {text: $t('word7'), size: 30},
  {text: $t('word8'), size: 30},
  {text: $t('word9'), size: 30},
  {text: $t('word10'), size: 20},
  {text: $t('word11'), size: 40},
  {text: $t('word12'), size: 40},
  {text: $t('word13'), size: 25},
  {text: $t('word14'), size: 25},
  {text: $t('word15'), size: 25},
  {text: $t('word16'), size: 35},
  {text: $t('word17'), size: 15},
  {text: $t('word18'), size: 20},
  {text: $t('word19'), size: 50},
  {text: $t('word20'), size: 40},
  {text: $t('word21'), size: 20},
  {text: $t('word22'), size: 20},
  {text: $t('word23'), size: 20},
  {text: $t('word24'), size: 35}
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

//这里如果locale被修改，就需要重新获取翻译
watch(() => locale.value, () => {
  words.value = [
    {text: $t('word1'), size: 40},
    {text: $t('word2'), size: 40},
    {text: $t('word3'), size: 40},
    {text: $t('word4'), size: 30},
    {text: $t('word5'), size: 20},
    {text: $t('word6'), size: 20},
    {text: $t('word7'), size: 30},
    {text: $t('word8'), size: 30},
    {text: $t('word9'), size: 30},
    {text: $t('word10'), size: 30},
    {text: $t('word11'), size: 40},
    {text: $t('word12'), size: 40},
    {text: $t('word13'), size: 25},
    {text: $t('word14'), size: 25},
    {text: $t('word15'), size: 25},
    {text: $t('word16'), size: 35},
    {text: $t('word17'), size: 15},
    {text: $t('word18'), size: 20},
    {text: $t('word19'), size: 50},
    {text: $t('word20'), size: 40},
    {text: $t('word21'), size: 20},
    {text: $t('word22'), size: 20},
    {text: $t('word23'), size: 20},
    {text: $t('word24'), size: 35}
  ];
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
