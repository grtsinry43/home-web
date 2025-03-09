<script setup lang="ts">
import {defineProps, ref} from 'vue';

const props = defineProps<{
  name: string;
  description: string;
}>();

const isHovered = ref(false);
</script>

<template>
  <div
      class="project-card"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
  >
    <div class="project-card-inner" :class="{ 'is-hovered': isHovered }">
      <div class="project-card-content">
        <div class="project-card-header">
          <h3 class="project-title font-jb-mono">{{ name }}</h3>
          <div class="project-badge">Project</div>
        </div>

        <p class="project-description">{{ description }}</p>

        <div class="project-footer">
          <UButton
              to="/project"
              class="project-button"
              :class="{ 'button-visible': isHovered }"
          >
            <span>{{ $t('detail') }}</span>
            <UIcon name="i-heroicons-arrow-right-20-solid" class="button-icon"/>
          </UButton>
        </div>
      </div>

      <div class="project-card-background">
        <div class="bg-pattern"></div>
        <div class="bg-glow"></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
// Variables
@card-radius: 16px;
@transition-standard: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

// Card Container
.project-card {
  position: relative;
  margin: 1.5rem 0;
  perspective: 1000px;
}

.project-card-inner {
  position: relative;
  border-radius: @card-radius;
  background: #ffffff;
  overflow: hidden;
  transition: @transition-standard;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
  0 2px 4px -1px rgba(0, 0, 0, 0.03);
  transform-style: preserve-3d;

  .dark & {
    background: #1e293b;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2),
    0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }

  &.is-hovered {
    transform: translateY(-8px) rotateX(2deg);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);

    .dark & {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
      0 10px 10px -5px rgba(0, 0, 0, 0.2);
    }
  }
}

// Card Content
.project-card-content {
  position: relative;
  z-index: 2;
  padding: 1.75rem;
}

// Card Header
.project-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  line-height: 1.2;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

  .dark & {
    background: linear-gradient(90deg, #60a5fa, #a78bfa);
    background-clip: text;
    -webkit-background-clip: text;
  }
}

.project-badge {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
  color: #3b82f6;

  .dark & {
    background: linear-gradient(90deg, rgba(96, 165, 250, 0.2), rgba(167, 139, 250, 0.2));
    color: #60a5fa;
  }
}

// Description
.project-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #64748b;
  margin-bottom: 1.5rem;

  .dark & {
    color: #cbd5e1;
  }
}

// Footer
.project-footer {
  display: flex;
  justify-content: flex-end;
}

.project-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.875rem;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  transform: translateY(10px);
  opacity: 0;
  transition: @transition-standard;

  &.button-visible {
    transform: translateY(0);
    opacity: 1;
  }

  .button-icon {
    transition: transform 0.2s ease;
  }

  &:hover {
    background: linear-gradient(90deg, #2563eb, #7c3aed);

    .button-icon {
      transform: translateX(4px);
    }
  }

  .dark & {
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);

    &:hover {
      background: linear-gradient(90deg, #60a5fa, #a78bfa);
    }
  }
}

// Background Elements
.project-card-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.bg-pattern {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
  opacity: 0;
  transition: @transition-standard;

  .is-hovered & {
    opacity: 1;
  }

  .dark & {
    background-image: radial-gradient(circle at 100% 0%, rgba(96, 165, 250, 0.15) 0%, transparent 50%);
  }
}

.bg-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg,
  rgba(59, 130, 246, 0) 0%,
  rgba(59, 130, 246, 0.03) 30%,
  rgba(139, 92, 246, 0.03) 70%,
  rgba(139, 92, 246, 0) 100%);
  transform: rotate(0deg) translateY(0);
  opacity: 0;
  transition: @transition-standard;

  .is-hovered & {
    transform: rotate(10deg) translateY(-10%);
    opacity: 1;
  }

  .dark & {
    background: linear-gradient(45deg,
    rgba(96, 165, 250, 0) 0%,
    rgba(96, 165, 250, 0.05) 30%,
    rgba(167, 139, 250, 0.05) 70%,
    rgba(167, 139, 250, 0) 100%);
  }
}
</style>
