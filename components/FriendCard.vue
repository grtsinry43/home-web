<script setup lang="ts">
import {defineProps} from 'vue';
import {useI18n} from 'vue-i18n';

const props = defineProps({
  name: String,
  description: String,
  link: String,
  avatar: String
});

const {t: $t} = useI18n();
</script>

<template>
  <a :href="link" target="_blank">
    <div class="friend-card-container">
      <div class="friend-avatar">
        <img :src="avatar" :alt="name"/>
      </div>
      <div class="friend-info flex flex-col">
        <h3 class="friend-name font-jb-mono">{{ name }}</h3>
        <p class="friend-description mr-8">{{ description }}</p>
      </div>
    </div>
  </a>
</template>

<style scoped>
.friend-card-container {
  margin: 1em;
  display: flex;
  transition: all 0.3s;
  max-width: 350px;
  padding: 10px;
  border-radius: 8px;

  .friend-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;

    img {
      width: 2em;
      height: 2em;
      border-radius: 50%;
      transition: transform 0.3s;
    }
  }

  .friend-info{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &:hover {
    .friend-avatar img {
      transform: scale(1.1);
    }

    letter-spacing: 0.05em;

    @apply shadow-lg dark:shadow-dark-lg;
  }
}
</style>
