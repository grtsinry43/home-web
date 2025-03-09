<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch, computed} from 'vue';
import {useI18n} from "vue-i18n";

const {t: $t} = useI18n();
const {locale} = useI18n();

const wordElements = ref<HTMLElement[]>([]);
let animationFrameId: number | null = null;
const containerRef = ref<HTMLElement | null>(null);
const isHovering = ref(false);
const hoveredWordIndex = ref(-1);

// Generate a color palette
const colorPalette = [
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#f97316', // orange
  '#10b981', // emerald
  '#06b6d4', // cyan
];

// Words with their initial properties
const words = computed(() => [
  {text: $t('word1'), size: 40, color: colorPalette[0], depth: 1},
  {text: $t('word2'), size: 40, color: colorPalette[1], depth: 0.8},
  {text: $t('word3'), size: 40, color: colorPalette[2], depth: 0.6},
  {text: $t('word4'), size: 30, color: colorPalette[3], depth: 0.9},
  {text: $t('word5'), size: 20, color: colorPalette[4], depth: 0.7},
  {text: $t('word6'), size: 30, color: colorPalette[5], depth: 0.5},
  {text: $t('word7'), size: 30, color: colorPalette[0], depth: 0.8},
  {text: $t('word8'), size: 30, color: colorPalette[1], depth: 0.7},
  {text: $t('word9'), size: 30, color: colorPalette[2], depth: 0.9},
  {text: $t('word10'), size: 20, color: colorPalette[3], depth: 0.6},
  {text: $t('word11'), size: 40, color: colorPalette[4], depth: 1},
  {text: $t('word12'), size: 40, color: colorPalette[5], depth: 0.8},
  {text: $t('word13'), size: 25, color: colorPalette[0], depth: 0.7},
  {text: $t('word14'), size: 25, color: colorPalette[1], depth: 0.9},
  {text: $t('word15'), size: 25, color: colorPalette[2], depth: 0.6},
  {text: $t('word16'), size: 35, color: colorPalette[3], depth: 0.8},
  {text: $t('word17'), size: 15, color: colorPalette[4], depth: 0.5},
  {text: $t('word18'), size: 20, color: colorPalette[5], depth: 0.7},
  {text: $t('word19'), size: 50, color: colorPalette[0], depth: 1},
  {text: $t('word20'), size: 40, color: colorPalette[1], depth: 0.9},
  {text: $t('word21'), size: 20, color: colorPalette[2], depth: 0.6},
  {text: $t('word22'), size: 20, color: colorPalette[3], depth: 0.7},
  {text: $t('word23'), size: 20, color: colorPalette[4], depth: 0.8},
  {text: $t('word24'), size: 35, color: colorPalette[5], depth: 0.9}
]);

// Store the current state of each word
const wordStates = ref<Array<{
  x: number;
  y: number;
  opacity: number;
  size: number;
  rotation: number;
  targetX: number;
  targetY: number;
  targetOpacity: number;
  targetSize: number;
  targetRotation: number;
  velocityX: number;
  velocityY: number;
}>>([]);

// Initialize word positions in a spiral pattern
const initializeWordPositions = () => {
  const containerWidth = containerRef.value?.clientWidth || 500;
  const containerHeight = containerRef.value?.clientHeight || 500;
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;

  wordStates.value = words.value.map((word, index) => {
    // Create a spiral pattern
    const angle = index * 0.5;
    const radius = 30 + index * 10;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    return {
      x,
      y,
      opacity: 0.1 + Math.random() * 0.5,
      size: word.size,
      rotation: Math.random() * 20 - 10,
      targetX: x,
      targetY: y,
      targetOpacity: 0.1 + Math.random() * 0.5,
      targetSize: word.size,
      targetRotation: Math.random() * 20 - 10,
      velocityX: 0,
      velocityY: 0
    };
  });
};

// Set new random targets for words
const setNewTargets = () => {
  if (!containerRef.value) return;

  const containerWidth = containerRef.value.clientWidth;
  const containerHeight = containerRef.value.clientHeight;
  const padding = 50; // Keep words away from edges

  wordStates.value.forEach((state, index) => {
    // Don't update the hovered word
    if (index === hoveredWordIndex.value) return;

    // Set new target positions with some constraints to keep words visible
    state.targetX = padding + Math.random() * (containerWidth - padding * 2);
    state.targetY = padding + Math.random() * (containerHeight - padding * 2);

    // Vary opacity based on depth
    const word = words.value[index];
    state.targetOpacity = 0.3 + word.depth * 0.7;

    // Vary size slightly
    state.targetSize = word.size * (0.8 + Math.random() * 0.4);

    // Add some rotation for visual interest
    state.targetRotation = Math.random() * 20 - 10;
  });
};

// Animate words with smooth transitions
const animateWords = () => {
  const easing = 0.03; // Lower = slower, higher = faster

  wordStates.value.forEach((state, index) => {
    // Calculate the distance to target
    const dx = state.targetX - state.x;
    const dy = state.targetY - state.y;

    // Apply velocity with easing
    state.velocityX = state.velocityX * 0.95 + dx * easing;
    state.velocityY = state.velocityY * 0.95 + dy * easing;

    // Update position
    state.x += state.velocityX;
    state.y += state.velocityY;

    // Smoothly transition opacity, size and rotation
    state.opacity += (state.targetOpacity - state.opacity) * 0.05;
    state.size += (state.targetSize - state.size) * 0.05;
    state.rotation += (state.targetRotation - state.rotation) * 0.05;

    // Apply the updated values to the DOM elements
    if (wordElements.value[index]) {
      const el = wordElements.value[index];
      el.style.transform = `translate(-50%, -50%) rotate(${state.rotation}deg)`;
      el.style.left = `${state.x}px`;
      el.style.top = `${state.y}px`;
      el.style.opacity = `${state.opacity}`;
      el.style.fontSize = `${state.size}px`;

      // Apply blur based on size and depth
      const word = words.value[index];
      const blurAmount = state.size < 20 ? 2 : state.size < 30 ? 1 : 0;
      el.style.filter = `blur(${blurAmount}px)`;

      // Apply 3D transform based on depth
      el.style.transform += ` translateZ(${word.depth * 50}px)`;
    }
  });

  animationFrameId = requestAnimationFrame(animateWords);
};

// Handle mouse interaction
const handleMouseMove = (e: MouseEvent) => {
  if (!containerRef.value || !isHovering.value) return;

  const rect = containerRef.value.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  // Find the closest word to the mouse
  let closestDistance = Infinity;
  let closestIndex = -1;

  wordStates.value.forEach((state, index) => {
    const dx = mouseX - state.x;
    const dy = mouseY - state.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < closestDistance && distance < 100) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  // Update the hovered word
  hoveredWordIndex.value = closestIndex;

  // Repel other words from the mouse
  wordStates.value.forEach((state, index) => {
    if (index === closestIndex) {
      // Attract the hovered word to the mouse
      state.targetX = mouseX;
      state.targetY = mouseY;
      state.targetSize = words.value[index].size * 1.5;
      state.targetOpacity = 1;
    } else {
      // Calculate vector from mouse to word
      const dx = state.x - mouseX;
      const dy = state.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Apply repulsion force (inverse square law)
      if (distance < 150) {
        const repulsionForce = 2000 / (distance * distance);
        const angle = Math.atan2(dy, dx);

        state.velocityX += Math.cos(angle) * repulsionForce;
        state.velocityY += Math.sin(angle) * repulsionForce;
      }
    }
  });
};

const handleMouseEnter = () => {
  isHovering.value = true;
};

const handleMouseLeave = () => {
  isHovering.value = false;
  hoveredWordIndex.value = -1;

  // Reset all words to normal state
  wordStates.value.forEach((state, index) => {
    state.targetSize = words.value[index].size;
    state.targetOpacity = 0.3 + words.value[index].depth * 0.7;
  });
};

onMounted(() => {
  // Initialize word positions
  initializeWordPositions();

  // Start animation
  animateWords();

  // // Set new targets periodically
  // const intervalId = setInterval(() => {
  //   if (!isHovering.value) {
  //     setNewTargets();
  //   }
  // }, 4000);

  // // Clean up interval on unmount
  // onUnmounted(() => {
  //   clearInterval(intervalId);
  //   if (animationFrameId !== null) {
  //     cancelAnimationFrame(animationFrameId);
  //   }
  // });
});

// Update words when language changes
watch(() => locale.value, () => {
  // Keep the same positions but update the text
  initializeWordPositions();
});
</script>

<template>
  <div
      ref="containerRef"
      class="word-cloud-container"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
  >
    <div class="title-container">
      <div class="title-emoji">👋</div>
      <h2 class="title font-jb-mono">{{ $t('aboutMeTitle') }}</h2>
    </div>

    <div
        v-for="(word, index) in words"
        :key="index"
        :ref="el => { if (el) wordElements[index] = el as HTMLElement }"
        class="word font-jb-mono"
        :class="{ 'word-hovered': index === hoveredWordIndex }"
        :style="{
        color: word.color,
        fontWeight: word.size > 30 ? 'bold' : 'normal',
      }"
    >
      {{ word.text }}
    </div>
  </div>
</template>

<style scoped>
.word-cloud-container {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.01) 0%, rgba(0, 0, 0, 0.05) 100%);
  border-radius: 16px;
}

.dark .word-cloud-container {
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0.1) 100%);
}

.title-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 50%;
  width: 120px;
  height: 120px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .title-container {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.title-emoji {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  animation: wave 2s infinite;
  transform-origin: 70% 70%;
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(14deg);
  }
  20% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(14deg);
  }
  40% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.title {
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.word {
  position: absolute;
  cursor: pointer;
  transform-origin: center center;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
  text-shadow 0.3s ease,
  filter 0.3s ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  will-change: transform, opacity, left, top, font-size;
  user-select: none;
}

.word::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 2px;
  background: currentColor;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: width 0.3s ease, opacity 0.3s ease;
  z-index: -1;
}

.word:hover::before,
.word-hovered::before {
  width: 100%;
  opacity: 0.3;
}

.word:hover,
.word-hovered {
  transform: translate(-50%, -50%) scale(1.5) !important;
  z-index: 20;
  filter: none !important;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2),
  0 0 10px currentColor !important;
}

/* Add a subtle glow effect for dark mode */
.dark .word {
  text-shadow: 0 0 5px currentColor;
}

.dark .word:hover,
.dark .word-hovered {
  text-shadow: 0 0 15px currentColor,
  0 0 30px currentColor !important;
}
</style>
