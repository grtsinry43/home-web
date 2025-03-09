<script setup lang="ts">
import {defineProps, ref, onMounted} from 'vue';
import {useI18n} from 'vue-i18n';

const props = defineProps({
  name: String,
  description: String,
  link: String,
  avatar: String,
  tags: {
    type: Array as () => string[],
    default: () => []
  }
});

const {t: $t} = useI18n();
const isHovered = ref(false);
const cardRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (cardRef.value) {
    cardRef.value.addEventListener('mousemove', handleMouseMove);
    cardRef.value.addEventListener('mouseleave', handleMouseLeave);
  }
});

const handleMouseMove = (e: MouseEvent) => {
  if (!cardRef.value) return;

  const rect = cardRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = (y - centerY) / 20;
  const rotateY = (centerX - x) / 20;

  cardRef.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg)rotateY(${rotateY}deg)scale3d(1.02, 1.02, 1.02)`;
};

const handleMouseLeave = () => {
  if (!cardRef.value) return;
  cardRef.value.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
};
</script>

<template>
  <a
      :href="link"
      target="_blank"
      class="friend-card-link"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
  >
    <div
        ref="cardRef"
        class="friend-card-container"
    >
      <div class="friend-avatar-wrapper">
        <div class="friend-avatar">
          <img :src="avatar" :alt="name"/>
        </div>
        <div class="avatar-glow" :class="{ 'glow-active': isHovered }"></div>
      </div>
      <div class="friend-info">
        <h3 class="friend-name">{{ name }}</h3>
        <p class="friend-description">{{ description }}</p>
        <div v-if="tags && tags.length" class="friend-tags">
          <span v-for="(tag, index) in tags" :key="index" class="friend-tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </a>
</template>

<style scoped>
.friend-card-link {
  display: block;
  text-decoration: none;
  color: inherit;
  margin: 1rem;
  perspective: 1000px;
}

.friend-card-container {
  display: flex;
  align-items: center;
  padding: 1.25rem;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  max-width: 380px;
  border: 1px solid rgba(229, 231, 235, 0.5);
  overflow: hidden;
  position: relative;
}

.dark .friend-card-container {
  background-color: rgba(30, 41, 59, 0.8);
  border-color: rgba(55, 65, 81, 0.5);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.3);
}

.friend-avatar-wrapper {
  position: relative;
  margin-right: 1rem;
}

.friend-avatar {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  z-index: 2;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  background-color: #f3f4f6;
}

.dark .friend-avatar {
  background-color: #1e293b;
}

.friend-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.avatar-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff6b6b, #6b6bff);
  opacity: 0;
  filter: blur(8px);
  z-index: 1;
  transition: all 0.5s ease;
}

.glow-active {
  opacity: 0.6;
  width: 4rem;
  height: 4rem;
}

.friend-info {
  flex: 1;
  min-width: 0;
}

.friend-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
  color: #1e293b;
  transition: all 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dark .friend-name {
  color: #e2e8f0;
}

.friend-description {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 0.5rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all 0.3s ease;
}

.dark .friend-description {
  color: #94a3b8;
}

.friend-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.friend-tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: #f1f5f9;
  color: #64748b;
  transition: all 0.3s ease;
}

.dark .friend-tag {
  background-color: #334155;
  color: #94a3b8;
}

/* Hover effects */
.friend-card-container:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05);
}

.dark .friend-card-container:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3), 0 5px 10px rgba(0, 0, 0, 0.2);
}

.friend-card-container:hover .friend-avatar {
  border-color: rgba(107, 107, 255, 0.5);
}

.friend-card-container:hover .friend-avatar img {
  transform: scale(1.1);
}

.friend-card-container:hover .friend-name {
  color: #6b6bff;
  letter-spacing: 0.02em;
}

.dark .friend-card-container:hover .friend-name {
  color: #818cf8;
}

.friend-card-container:hover .friend-tag {
  background-color: #e0e7ff;
  color: #4f46e5;
}

.dark .friend-card-container:hover .friend-tag {
  background-color: #3730a3;
  color: #c7d2fe;
}

@media (max-width: 640px) {
  .friend-card-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }

  .friend-avatar-wrapper {
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .friend-info {
    width: 100%;
  }
}
</style>
