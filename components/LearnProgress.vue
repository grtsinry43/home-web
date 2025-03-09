<script setup lang="ts">
import {defineProps, ref, computed} from "vue";

const props = defineProps<{
  name: string;
  description: string;
  progress: number;
}>();

const isExpanded = ref(false);

const progressStatus = computed(() => {
  if (props.progress <= 20) return {class: 'beginner', text: 'Just Started'};
  if (props.progress <= 60) return {class: 'intermediate', text: 'In Progress'};
  if (props.progress <= 80) return {class: 'advanced', text: 'Advanced'};
  return {class: 'complete', text: 'Completed'};
});

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <div class="progress-card-wrapper">
    <div
        class="progress-card"
        :class="[progressStatus.class, { 'is-expanded': isExpanded }]"
        @click="toggleExpand"
    >
      <!-- Card Header -->
      <div class="progress-card-header">
        <h3 class="progress-title font-jb-mono">{{ name }}</h3>
        <div class="progress-status-badge" :class="progressStatus.class">
          {{ progressStatus.text }}
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="progress-bar-container">
        <div class="progress-bar-wrapper">
          <div class="progress-bar-track">
            <div
                class="progress-bar-fill"
                :class="progressStatus.class"
                :style="{ width: `${progress}%` }"
            ></div>
          </div>
          <div class="progress-percentage">{{ progress }}%</div>
        </div>
      </div>

      <!-- Description (Hidden until expanded) -->
      <div class="progress-description" :class="{ 'is-visible': isExpanded }">
        <p>{{ description }}</p>
      </div>

      <!-- Background Elements -->
      <div class="progress-card-background">
        <div class="bg-name font-jb-mono">{{ name }}</div>
        <div class="hint">{{ $t('tapToLearnMore') }}</div>
        <div class="bg-pattern" :class="progressStatus.class"></div>
      </div>

      <!-- Expand Indicator -->
      <div class="expand-indicator" :class="{ 'is-expanded': isExpanded }">
        <UIcon
            :name="isExpanded ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
            class="expand-icon"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
// Variables
@card-radius: 16px;
@transition-standard: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

// Status Colors
@beginner-color: #3b82f6;
@intermediate-color: #f59e0b;
@advanced-color: #f97316;
@complete-color: #10b981;

// Card Container
.progress-card-wrapper {
  margin: 1rem 0;
}

.progress-card {
  position: relative;
  border-radius: @card-radius;
  background: #ffffff;
  padding: 1.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: @transition-standard;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
  0 2px 4px -1px rgba(0, 0, 0, 0.03);

  .dark & {
    background: #1e293b;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2),
    0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);

    .dark & {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3),
      0 4px 6px -2px rgba(0, 0, 0, 0.2);
    }
  }

  &.is-expanded {
    padding-bottom: 2.5rem;
  }

  // Status-based border colors
  &.beginner {
    border-left: 4px solid @beginner-color;
  }

  &.intermediate {
    border-left: 4px solid @intermediate-color;
  }

  &.advanced {
    border-left: 4px solid @advanced-color;
  }

  &.complete {
    border-left: 4px solid @complete-color;
  }
}

// Card Header
.progress-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
}

.progress-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;

  .dark & {
    color: #f8fafc;
  }
}

.progress-status-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;

  &.beginner {
    background-color: rgba(59, 130, 246, 0.1);
    color: @beginner-color;
  }

  &.intermediate {
    background-color: rgba(245, 158, 11, 0.1);
    color: @intermediate-color;
  }

  &.advanced {
    background-color: rgba(249, 115, 22, 0.1);
    color: @advanced-color;
  }

  &.complete {
    background-color: rgba(16, 185, 129, 0.1);
    color: @complete-color;
  }

  .dark & {
    &.beginner {
      background-color: rgba(59, 130, 246, 0.2);
    }

    &.intermediate {
      background-color: rgba(245, 158, 11, 0.2);
    }

    &.advanced {
      background-color: rgba(249, 115, 22, 0.2);
    }

    &.complete {
      background-color: rgba(16, 185, 129, 0.2);
    }
  }
}

// Progress Bar
.progress-bar-container {
  position: relative;
  z-index: 2;
  margin-bottom: 1rem;
}

.progress-bar-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar-track {
  flex: 1;
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 9999px;
  overflow: hidden;

  .dark & {
    background-color: #334155;
  }
}

.progress-bar-fill {
  height: 100%;
  border-radius: 9999px;
  transition: width 1s cubic-bezier(0.34, 1.56, 0.64, 1);

  &.beginner {
    background: linear-gradient(90deg, #3b82f6, #60a5fa);
  }

  &.intermediate {
    background: linear-gradient(90deg, #f59e0b, #fbbf24);
  }

  &.advanced {
    background: linear-gradient(90deg, #f97316, #fb923c);
  }

  &.complete {
    background: linear-gradient(90deg, #10b981, #34d399);
  }
}

.progress-percentage {
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  min-width: 3rem;
  text-align: right;

  .dark & {
    color: #cbd5e1;
  }
}

// Description
.progress-description {
  position: relative;
  z-index: 2;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: @transition-standard;

  p {
    margin: 0;
    padding-top: 0.5rem;
    color: #64748b;
    font-size: 0.9375rem;
    line-height: 1.6;

    .dark & {
      color: #cbd5e1;
    }
  }

  &.is-visible {
    max-height: 300px;
    opacity: 1;
  }
}

// Background Elements
.progress-card-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.bg-name {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 5rem;
  font-weight: 800;
  opacity: 0.03;
  white-space: nowrap;
  transform: translateX(20%);
  pointer-events: none;

  .dark & {
    opacity: 0.05;
  }
}

.hint {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  font-size: 0.75rem;
  opacity: 0.3;
  font-style: italic;

  .is-expanded & {
    opacity: 0;
  }
}

.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.03;
  transition: @transition-standard;

  &.beginner {
    background: radial-gradient(circle at 0% 0%, @beginner-color 0%, transparent 50%);
  }

  &.intermediate {
    background: radial-gradient(circle at 0% 0%, @intermediate-color 0%, transparent 50%);
  }

  &.advanced {
    background: radial-gradient(circle at 0% 0%, @advanced-color 0%, transparent 50%);
  }

  &.complete {
    background: radial-gradient(circle at 0% 0%, @complete-color 0%, transparent 50%);
  }

  .progress-card:hover & {
    opacity: 0.05;
  }

  .dark & {
    opacity: 0.05;

    .progress-card:hover & {
      opacity: 0.08;
    }
  }
}

// Expand Indicator
.expand-indicator {
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #f1f5f9;
  transition: @transition-standard;

  .dark & {
    background-color: #334155;
  }

  .expand-icon {
    width: 16px;
    height: 16px;
    color: #64748b;
    transition: transform 0.3s ease;

    .dark & {
      color: #cbd5e1;
    }
  }

  &.is-expanded {
    .expand-icon {
      transform: rotate(180deg);
    }
  }
}
</style>
