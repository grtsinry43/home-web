<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps<{
  name: string;
  description: string;
  progress: number;
}>();
</script>

<template>
  <div class="learn-progress-container">
    <UCard class="interactive-card">
      <h3 class="learn-progress-title font-jb-mono">{{ name }}</h3>
      <div class="hint">{{ $t('tapToLearnMore') }} ~ 😏</div>
      <div class="bg-name font-jb-mono">{{ name }}</div>
      <p class="learn-progress-description text-[#666666] dark:text-[#cccccc] overflow-scroll">{{ description }}</p>
      <div class="progress">
        <UProgress :value="progress" class="progress-bar" color="gray">
          <template #indicator="{ percent }">
            <div class="text-right progress-indicator-text" :style="{ width: `${percent}%` }">
              <span v-if="progress <= 20" class="text-blue-500">刚开始学习诶 {{ progress }}%</span>
              <span v-else-if="progress <= 60" class="text-amber-500">学了一点点基础 {{ progress }}%</span>
              <span v-else-if="progress <= 80" class="text-orange-500">比较熟练了 {{ progress }}%</span>
              <span v-else class="text-red-500 font-bold">{{ $t('projectComplete') }} 🎉</span>
            </div>
          </template>
        </UProgress>
      </div>
    </UCard>
  </div>
</template>

<style scoped>
.learn-progress-container {
  margin: 1em 0;
  position: relative;
}

.interactive-card {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.interactive-card:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.interactive-card::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  transform: rotate(0deg);
  transition: transform 0.5s ease;
}
.dark .interactive-card::before {
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
}

.interactive-card:hover::before {
  transform: rotate(30deg);
}

.learn-progress-description {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  opacity: 0;
}

.interactive-card:hover .learn-progress-description {
  max-height: 300px;
  /* 设置一个大于或等于实际内容高度的值 */
  opacity: 1;
}

.progress-indicator-text {
  font-size: 0.6rem;
}

.hint {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  opacity: 10%;
  font-size: small;
}

.bg-name {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 5em;
  opacity: 5%;
  z-index: -1;
  pointer-events: none;
  transition: all 0.5s;
}
</style>
