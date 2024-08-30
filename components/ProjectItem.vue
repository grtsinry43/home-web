<script setup lang="ts">
import {defineProps, ref, onMounted} from 'vue';

const props = defineProps<{
  name: string;
  description: string;
  githubUrl: string;
  deployUrl: string;
  cover: string;
  techStack: string;
  progress: number;
}>();

const commitHash = ref('');
const commitMessage = ref('');
const commitDate = ref('');

function parseGithubUrl(url: string) {
  const match = url.match(/https:\/\/github.com\/(.+\/.+)/);
  return match ? match[1] : '';
}

async function fetchLastCommit(url: string) {
  const repo = parseGithubUrl(url);
  if (!repo) return;

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`);
    if (!response.ok) {
      throw new Error('Failed to fetch commit data');
    }

    const data = await response.json();
    if (data.length > 0) {
      commitHash.value = data[0].sha.substring(0, 6);
      commitMessage.value = data[0].commit.message;
      commitDate.value = new Date(data[0].commit.committer.date).toLocaleString(); // Format date to a readable format
    }
  } catch (error) {
    console.error('Error fetching commit data:', error);
  }
}

onMounted(() => {
  fetchLastCommit(props.githubUrl);
});
</script>

<template>
  <div class="project-item-container">
    <UCard>
      <div class="project-item-header">
        <img v-if="cover !== ''" :src="cover" alt="Project Cover" class="project-item-cover dark:opacity-80"/>
        <h3 class="project-item-title font-jb-mono">{{ name }}</h3>
        <p class="project-item-description text=[#666666] dark:text-[#cccccc]">{{ description }}</p>
      </div>
      <div class="project-inner font-jb-mono">
        <div class="links-container">
          <a :href="githubUrl" class="mr-8 hover:text-blue-400 dark:hover:text-blue-600">
            <UIcon name="i-grommet-icons:github" class="w-5 h-5 align-middle"/>
            <span class="ml-2" v-if="githubUrl !== ''">{{ parseGithubUrl(githubUrl) }}</span>
            <span class="ml-2" v-else>{{ $t('privateProject') }}</span>
          </a>
          <a :href="deployUrl" class="hover:text-blue-400 dark:hover:text-blue-600">
            <UIcon name="i-heroicons:globe-alt" class="w-5 h-5 align-middle"/>
            <span class="ml-2" v-if="deployUrl !== ''">{{ deployUrl }}</span>
            <span class="ml-2" v-else>{{ $t('internalOnly') }}</span>
          </a>
        </div>
        <div class="tech-stack">
          <span>{{ $t('techStack') }}：</span>
          <span v-for="(tech, index) in techStack.split(',')" :key="index"
                class="tech-item bg-[#f0f0f0] dark:bg-[#242424]">
                {{ tech.trim() }}
              </span>
        </div>
        <div class="progress">
          <span>{{ $t('currentProgress') }}</span>
          <UProgress :value="progress" class="progress-bar">
            <template #indicator="{ percent }">
              <div class="text-right" :style="{ width: `${percent}%` }">
                <span v-if="progress <= 10" class="text-blue-500">{{ $t('newProject') }} 👀 {{ progress }}%</span>
                <span v-else-if="progress <= 40" class="text-amber-500">{{ $t('basicFunctionality') }}... {{ progress }}%</span>
                <span v-else-if="progress <= 80" class="text-orange-500">{{ $t('coreIssuesResolved') }}... {{ progress }}%</span>
                <span v-else class="text-red-500 font-bold">{{ $t('projectComplete') }} 🎉</span>
              </div>
            </template>
          </UProgress>
        </div>
        <div v-if="githubUrl !== ''" class="commit-info">
          {{ $t('lastCommit') }}: <span class="ml-4 mr-4">{{ commitDate }}</span>
          <strong>{{ commitHash }}</strong>
          <span class="ml-4">{{ commitMessage }}</span>
        </div>
      </div>
    </UCard>
  </div>
</template>

<style scoped>
.project-item-container {
  margin: 1em;
  padding: 2px;
}

.project-item-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.project-item-cover {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1em;
}

.project-item-title {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0.5em;
}

.project-item-description {
  font-size: 1em;
  margin-bottom: 1em;
}

.project-inner {
  display: flex;
  flex-direction: column;
  padding: 1em;
}

.links-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  margin-bottom: 1em;
}

.tech-stack {
  margin-top: 1em;

  .tech-item {
    margin-right: 0.5em;
    padding: 0.2em 0.5em;
    border-radius: 4px;
    font-size: small;
  }
}

.progress {
  margin-top: 1em;

  .progress-bar {
    margin-top: 0.5em;
  }
}

.commit-info {
  margin-top: 1em;
  font-size: 0.9em;
}
</style>
