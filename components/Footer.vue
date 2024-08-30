<script setup lang="ts">
import {ref, onMounted} from 'vue';

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
  fetchLastCommit('https://github.com/grtsinry43/home-web');
});
</script>

<template>
  <div class="footer-container bg-opacity-25 bg-[#ccc] dark:bg-[black] dark:bg-opacity-25">
    <p class="m-2 text-[#666666] dark:text-[#cccccc]">本站源码最后更新： <span class="ml-4 mr-4">{{ commitDate }}</span>
      <strong>{{ commitHash }}</strong>
      <span class="ml-4">{{ commitMessage }}</span>
    </p>
    <p>Copyright &copy; 2024 home-web by grtsinry43. All rights reserved.</p>
    <p>Licensed under the MIT License.</p>
    <br/>
    <p><a href="https://beian.miit.gov.cn/" target="_blank" class="mr-8 hover:text-blue-600">湘ICP备2023033970号-1</a>
      湘公网安备43010402001538号</p>
  </div>
</template>

<style scoped>
.footer-container {
  padding: 2em;
  text-align: center;
  font-size: 0.875rem;
}
</style>
