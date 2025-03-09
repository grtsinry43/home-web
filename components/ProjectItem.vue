<script setup lang="ts">
import {defineProps, ref, onMounted, computed} from 'vue';
import {useI18n} from "vue-i18n";

const {t: $t} = useI18n();

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
const isLoading = ref(true);
const hasError = ref(false);

// Format the GitHub repository name
const repoName = computed(() => {
  return parseGithubUrl(props.githubUrl);
});

// Format the deploy URL for display
const formattedDeployUrl = computed(() => {
  if (!props.deployUrl) return '';
  return props.deployUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
});

// Determine progress status
const progressStatus = computed(() => {
  if (props.progress <= 10) return {class: 'status-new', text: $t('newProject'), emoji: '👀'};
  if (props.progress <= 40) return {class: 'status-basic', text: $t('basicFunctionality'), emoji: '🚧'};
  if (props.progress <= 80) return {class: 'status-advanced', text: $t('coreIssuesResolved'), emoji: '🔨'};
  return {class: 'status-complete', text: $t('projectComplete'), emoji: '🎉'};
});

// Format the tech stack as an array
const techStackArray = computed(() => {
  return props.techStack.split(',').map(tech => tech.trim());
});

// Format the commit date
const formattedCommitDate = computed(() => {
  if (!commitDate.value) return '';

  const date = new Date(commitDate.value);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)} weeks ago`;
  } else {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
});

function parseGithubUrl(url: string) {
  if (!url) return '';
  const match = url.match(/https:\/\/github.com\/(.+\/.+)/);
  return match ? match[1] : '';
}

async function fetchLastCommit(url: string) {
  isLoading.value = true;
  hasError.value = false;

  const repo = parseGithubUrl(url);
  if (!repo) {
    isLoading.value = false;
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`);
    if (!response.ok) {
      throw new Error('Failed to fetch commit data');
    }

    const data = await response.json();
    if (data.length > 0) {
      commitHash.value = data[0].sha.substring(0, 7);

      // Truncate commit message if too long
      const message = data[0].commit.message;
      commitMessage.value = message.length > 60
          ? message.substring(0, 57) + '...'
          : message;

      commitDate.value = data[0].commit.committer.date;
    }
  } catch (error) {
    console.error('Error fetching commit data:', error);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  if (props.githubUrl) {
    fetchLastCommit(props.githubUrl);
  } else {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="project-card">
    <!-- Cover Image -->
    <div class="project-cover-container" v-if="cover">
      <img :src="cover" :alt="name" class="project-cover"/>
      <div class="project-cover-overlay"></div>
    </div>

    <!-- Project Content -->
    <div class="project-content">
      <!-- Header -->
      <div class="project-header">
        <h3 class="project-title font-jb-mono">{{ name }}</h3>

        <!-- Progress Badge -->
        <div class="project-progress-badge" :class="progressStatus.class">
          <span class="progress-emoji">{{ progressStatus.emoji }}</span>
          <span class="progress-text">{{ progressStatus.text }}</span>
        </div>
      </div>

      <!-- Description -->
      <p class="project-description">{{ description }}</p>

      <!-- Tech Stack -->
      <div class="tech-stack">
        <div class="tech-stack-header">
          <UIcon name="i-heroicons:code-bracket" class="tech-icon"/>
          <span>{{ $t('techStack') }}</span>
        </div>
        <div class="tech-stack-tags">
          <span
              v-for="(tech, index) in techStackArray"
              :key="index"
              class="tech-tag"
          >
            {{ tech }}
          </span>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="progress-container">
        <div class="progress-header">
          <span>{{ $t('currentProgress') }}</span>
          <span class="progress-percentage">{{ progress }}%</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-track">
            <div
                class="progress-bar-fill"
                :class="progressStatus.class"
                :style="{ width: `${progress}%` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Links -->
      <div class="project-links">
        <a
            v-if="githubUrl"
            :href="githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="project-link github-link"
        >
          <UIcon name="i-grommet-icons:github" class="link-icon"/>
          <span class="link-text">{{ repoName }}</span>
        </a>

        <a
            v-if="deployUrl"
            :href="deployUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="project-link deploy-link"
        >
          <UIcon name="i-heroicons:globe-alt" class="link-icon"/>
          <span class="link-text">{{ formattedDeployUrl }}</span>
        </a>
      </div>

      <!-- Last Commit -->
      <div v-if="githubUrl" class="commit-container">
        <div class="commit-header">
          <UIcon name="i-heroicons:code-commit" class="commit-icon"/>
          <span>{{ $t('lastCommit') }}</span>
        </div>

        <div v-if="isLoading" class="commit-loading">
          <div class="loading-spinner"></div>
          <span>Loading commit data...</span>
        </div>

        <div v-else-if="hasError" class="commit-error">
          <UIcon name="i-heroicons:exclamation-circle" class="error-icon"/>
          <span>Failed to load commit data</span>
        </div>

        <div v-else-if="commitHash" class="commit-details">
          <div class="commit-info">
            <span class="commit-hash">{{ commitHash }}</span>
            <span class="commit-date">{{ formattedCommitDate }}</span>
          </div>
          <p class="commit-message">{{ commitMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
// Variables
@card-radius: 6px;
@transition-standard: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

// Status Colors
@status-new: #3b82f6;
@status-basic: #f59e0b;
@status-advanced: #f97316;
@status-complete: #10b981;

// Card Container
.project-card {
  position: relative;
  border-radius: @card-radius;
  background: #ffffff;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
  0 2px 4px -1px rgba(0, 0, 0, 0.03);
  transition: @transition-standard;
  display: flex;
  flex-direction: column;
  margin: 30px 0;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .dark & {
    background: #1e293b;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2),
    0 2px 4px -1px rgba(0, 0, 0, 0.1);

    &:hover {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
      0 10px 10px -5px rgba(0, 0, 0, 0.2);
    }
  }
}

// Cover Image
.project-cover-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.project-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: @transition-standard;

  .project-card:hover & {
    transform: scale(1.05);
  }

  .dark & {
    opacity: 0.9;
    filter: brightness(0.9);
  }
}

.project-cover-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
}

// Project Content
.project-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex: 1;
}

// Header
.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  line-height: 1.2;

  .dark & {
    color: #f8fafc;
  }
}

// Progress Badge
.project-progress-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;

  &.status-new {
    background-color: rgba(59, 130, 246, 0.1);
    color: @status-new;
  }

  &.status-basic {
    background-color: rgba(245, 158, 11, 0.1);
    color: @status-basic;
  }

  &.status-advanced {
    background-color: rgba(249, 115, 22, 0.1);
    color: @status-advanced;
  }

  &.status-complete {
    background-color: rgba(16, 185, 129, 0.1);
    color: @status-complete;
  }

  .dark & {
    &.status-new {
      background-color: rgba(59, 130, 246, 0.2);
    }

    &.status-basic {
      background-color: rgba(245, 158, 11, 0.2);
    }

    &.status-advanced {
      background-color: rgba(249, 115, 22, 0.2);
    }

    &.status-complete {
      background-color: rgba(16, 185, 129, 0.2);
    }
  }

  .progress-emoji {
    font-size: 1rem;
  }
}

// Description
.project-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #64748b;
  margin: 0;

  .dark & {
    color: #cbd5e1;
  }
}

// Tech Stack
.tech-stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tech-stack-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #475569;
  font-size: 0.875rem;

  .tech-icon {
    width: 1rem;
    height: 1rem;
  }

  .dark & {
    color: #94a3b8;
  }
}

.tech-stack-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  background-color: #f1f5f9;
  color: #475569;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;

  .dark & {
    background-color: #334155;
    color: #e2e8f0;
  }
}

// Progress Bar
.progress-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;

  .dark & {
    color: #94a3b8;
  }
}

.progress-percentage {
  font-weight: 700;
}

.progress-bar-container {
  width: 100%;
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 9999px;
  overflow: hidden;

  .dark & {
    background-color: #334155;
  }
}

.progress-bar-track {
  width: 100%;
  height: 100%;
  position: relative;
}

.progress-bar-fill {
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 9999px;
  transition: width 1s cubic-bezier(0.34, 1.56, 0.64, 1);

  &.status-new {
    background: linear-gradient(90deg, @status-new, lighten(@status-new, 10%));
  }

  &.status-basic {
    background: linear-gradient(90deg, @status-basic, lighten(@status-basic, 10%));
  }

  &.status-advanced {
    background: linear-gradient(90deg, @status-advanced, lighten(@status-advanced, 10%));
  }

  &.status-complete {
    background: linear-gradient(90deg, @status-complete, lighten(@status-complete, 10%));
  }
}

// Links
.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: @transition-standard;

  .link-icon {
    width: 1rem;
    height: 1rem;
  }

  &.github-link {
    background-color: #f1f5f9;
    color: #475569;

    &:hover {
      background-color: #e2e8f0;
      color: #1e293b;
    }

    .dark & {
      background-color: #334155;
      color: #e2e8f0;

      &:hover {
        background-color: #475569;
        color: #f8fafc;
      }
    }
  }

  &.deploy-link {
    background-color: #eff6ff;
    color: #3b82f6;

    &:hover {
      background-color: #dbeafe;
      color: #2563eb;
    }

    .dark & {
      background-color: rgba(59, 130, 246, 0.2);

      &:hover {
        background-color: rgba(59, 130, 246, 0.3);
      }
    }
  }
}

// Commit Info
.commit-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e2e8f0;

  .dark & {
    border-top-color: #334155;
  }
}

.commit-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #475569;
  font-size: 0.875rem;

  .commit-icon {
    width: 1rem;
    height: 1rem;
  }

  .dark & {
    color: #94a3b8;
  }
}

.commit-loading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: #64748b;

  .dark & {
    color: #94a3b8;
  }
}

.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  .dark & {
    border-color: #334155;
    border-top-color: #3b82f6;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.commit-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #ef4444;

  .error-icon {
    width: 1rem;
    height: 1rem;
  }
}

.commit-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.commit-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.commit-hash {
  font-family: monospace;
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  background-color: #f1f5f9;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;

  .dark & {
    color: #e2e8f0;
    background-color: #334155;
  }
}

.commit-date {
  font-size: 0.75rem;
  color: #64748b;

  .dark & {
    color: #94a3b8;
  }
}

.commit-message {
  font-size: 0.875rem;
  line-height: 1.5;
  color: #64748b;
  margin: 0;
  font-style: italic;

  .dark & {
    color: #cbd5e1;
  }
}
</style>
