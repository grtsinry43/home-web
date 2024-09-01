<script setup lang="ts">
import {defineProps} from 'vue';

const props = defineProps<{
  name: string;
  description: string;
  detailsUrl: string;
}>();
</script>

<template>
  <UCard class="project-preview-container">
    <h3 class="project-preview-title font-jb-mono">{{ name }}</h3>
    <p class="project-preview-description text-[#666666] dark:text-[#cccccc]">{{ description }}</p>
    <UButton :to="detailsUrl" :label="$t('detail')" color="gray" class="btn-item">
      <template #trailing>
        <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5"/>
      </template>
    </UButton>
  </UCard>
</template>

<style lang="less" scoped>

.project-preview-container {
  margin: 1em 0;
  transition: all 0.5s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 3px 6px rgba(0, 0, 0, 0.1), 0px 12px 12px rgba(0, 0, 0, 0.09), 0px 26px 16px rgba(0, 0, 0, 0.05), 0px 46px 19px rgba(0, 0, 0, 0.01), 0px 73px 20px rgba(0, 0, 0, 0);
    // 来点渐变色~
    background: linear-gradient(30deg, rgba(161, 196, 253, 1) 0%, rgba(194, 233, 251, 1) 100%);
  }
}

.dark .project-preview-container:hover {
  background: linear-gradient(30deg, rgba(102, 126, 234, 1) 0%, rgba(118, 75, 162, 1) 100%);
}

.project-preview-title {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0.5em;
}

.project-preview-description {
  font-size: 1em;
  margin-bottom: 1em;
}

.btn-item {
  margin-top: 1em;
}
</style>
