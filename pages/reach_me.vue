<script setup lang="ts">
import {useI18n} from 'vue-i18n';
import {ref, onMounted} from 'vue';
import {Github, Twitter, Mail, ExternalLink} from 'lucide-vue-next';

const {t: $t} = useI18n();
useHead({
  title: `${$t('contactMe')} | ${$t('homePageTitle')}`,
  meta: [
    {
      name: 'description',
      content: $t('meta.description'),
    },
    {
      name: 'keywords',
      content: $t('meta.keywords'),
    }
  ]
});

// Animation states
const isLoaded = ref(false);
const hoverStates = ref({
  email: false,
  github: false,
  twitter: false
});

onMounted(() => {
  // Trigger entrance animations after component is mounted
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);
});
</script>

<template>
  <div class="page-container">
    <!-- Animated background elements -->
    <div class="animated-background">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
    </div>

    <!-- Particles effect -->
    <div class="particles">
      <div v-for="n in 20" :key="n" class="particle" :style="{
        '--delay': `${Math.random() * 5}s`,
        '--size': `${Math.random() * 10 + 5}px`,
        '--left': `${Math.random() * 100}%`,
        '--duration': `${Math.random() * 10 + 10}s`
      }"></div>
    </div>

    <!-- Main content card -->
    <div class="contact-info-card" :class="{ 'loaded': isLoaded }">
      <div class="card-glow"></div>

      <h1 class="title">{{ $t('contactMe') }}</h1>

      <ul class="contact-list">
        <li class="contact-item website-item">
          <div class="contact-label">{{ $t('website') }}:</div>
          <div class="contact-value">
            <a href="https://www.grtsinry43.com" target="_blank" class="link-with-icon">
              www.grtsinry43.com
              <ExternalLink class="icon-small"/>
            </a>
            <span class="separator">/</span>
            <a href="https://blog.grtsinry43.com" target="_blank" class="link-with-icon">
              blog.grtsinry43.com
              <ExternalLink class="icon-small"/>
            </a>
          </div>
        </li>

        <li class="contact-item">
          <div class="contact-label">{{ $t('github') }}:</div>
          <div class="contact-value">
            <a href="https://github.com/grtsinry43" target="_blank" class="link-with-icon">
              grtsinry43
              <Github class="icon-small"/>
            </a>
          </div>
        </li>

        <li class="contact-item">
          <div class="contact-label">{{ $t('email') }}:</div>
          <div class="contact-value">
            <a href="mailto:grtsinry43@outlook.com" class="link-with-icon">
              grtsinry43@outlook.com
              <Mail class="icon-small"/>
            </a>
          </div>
        </li>

        <li class="contact-item">
          <div class="contact-label">{{ $t('socialMedia') }}:</div>
          <div class="social-icons">
            <a
                href="https://github.com/grtsinry43"
                target="_blank"
                class="social-icon-wrapper"
                @mouseenter="hoverStates.github = true"
                @mouseleave="hoverStates.github = false"
                :class="{ 'hovered': hoverStates.github }"
            >
              <Github class="social-icon"/>
              <span class="icon-tooltip">GitHub</span>
            </a>

            <a
                href="https://twitter.com/grtsinry43"
                target="_blank"
                class="social-icon-wrapper"
                @mouseenter="hoverStates.twitter = true"
                @mouseleave="hoverStates.twitter = false"
                :class="{ 'hovered': hoverStates.twitter }"
            >
              <Twitter class="social-icon"/>
              <span class="icon-tooltip">Twitter</span>
            </a>
          </div>
        </li>
      </ul>

      <div class="action-buttons">
        <a
            href="mailto:grtsinry43@outlook.com"
            class="btn-gradient"
            @mouseenter="hoverStates.email = true"
            @mouseleave="hoverStates.email = false"
            :class="{ 'hovered': hoverStates.email }"
        >
          <span class="btn-text">{{ $t('sendEmail') || 'Send an Email' }}</span>
          <span class="btn-icon"><Mail/></span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Base styles */
.page-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  font-family: 'Poppins', sans-serif;
  padding: 20px;
  overflow: hidden;
  color: #e2e8f0;
}

/* Animated background */
.animated-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
}

.shape-1 {
  top: -10%;
  left: -10%;
  width: 50%;
  height: 50%;
  background: radial-gradient(circle, #f59e0b, #d97706);
  animation: float-slow 15s ease-in-out infinite;
}

.shape-2 {
  bottom: -15%;
  right: -10%;
  width: 60%;
  height: 60%;
  background: radial-gradient(circle, #8b5cf6, #7c3aed);
  animation: float-slow 18s ease-in-out infinite reverse;
}

.shape-3 {
  top: 40%;
  left: 60%;
  width: 30%;
  height: 30%;
  background: radial-gradient(circle, #ec4899, #db2777);
  animation: float-slow 20s ease-in-out infinite 2s;
}

.shape-4 {
  bottom: 30%;
  left: 10%;
  width: 25%;
  height: 25%;
  background: radial-gradient(circle, #3b82f6, #2563eb);
  animation: float-slow 12s ease-in-out infinite 1s;
}

/* Particles effect */
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  left: var(--left);
  top: -20px;
  animation: fall var(--duration) linear infinite;
  animation-delay: var(--delay);
  opacity: 0.3;
}

/* Define custom properties for light and dark themes */
:root {
  --card-bg-light: rgba(255, 255, 255, 0.7);
  --card-bg-dark: rgba(15, 23, 42, 0.7);
  --card-border-light: rgba(0, 0, 0, 0.1);
  --card-border-dark: rgba(255, 255, 255, 0.1);
  --card-box-shadow-light: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  --card-box-shadow-dark: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Main card */
.contact-info-card {
  position: relative;
  background: var(--card-bg-dark);
  backdrop-filter: blur(10px);
  padding: 3em;
  max-width: 600px;
  width: 100%;
  border-radius: 24px;
  box-shadow: var(--card-box-shadow-dark);
  z-index: 2;
  border: 1px solid var(--card-border-dark);
  transform: translateY(30px);
  opacity: 0;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
  opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

/* Light theme */
@media (prefers-color-scheme: light) {
  .contact-info-card {
    background: var(--card-bg-light);
    box-shadow: var(--card-box-shadow-light);
    border: 1px solid var(--card-border-light);
  }
}

.contact-info-card.loaded {
  transform: translateY(0);
  opacity: 1;
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0) 70%
  );
  pointer-events: none;
  z-index: -1;
}

/* Typography */
.title {
  text-align: center;
  margin-bottom: 2em;
  font-weight: 700;
  color: #f8fafc;
  font-size: 2.2rem;
  background: linear-gradient(90deg, #f59e0b, #ec4899, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
  transform: translateY(20px);
  animation: fade-in 0.8s forwards 0.3s;
}

/* Contact list */
.contact-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.8em;
}

.contact-item {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  opacity: 0;
  transform: translateX(-20px);
  animation: slide-in 0.5s forwards;
}

.contact-item:nth-child(1) {
  animation-delay: 0.4s;
}

.contact-item:nth-child(2) {
  animation-delay: 0.6s;
}

.contact-item:nth-child(3) {
  animation-delay: 0.8s;
}

.contact-item:nth-child(4) {
  animation-delay: 1s;
}

.contact-label {
  font-weight: 600;
  color: #94a3b8;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.contact-value {
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5em;
}

.website-item .contact-value {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.separator {
  color: #64748b;
  margin: 0 0.3em;
}

/* Links */
.link-with-icon {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  color: #e2e8f0;
  text-decoration: none;
  position: relative;
  transition: color 0.3s;
  padding-bottom: 2px;
}

.link-with-icon::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, #f59e0b, #ec4899);
  transition: width 0.3s ease;
}

.link-with-icon:hover {
  color: #f8fafc;
}

.link-with-icon:hover::after {
  width: 100%;
}

.icon-small {
  width: 16px;
  height: 16px;
  opacity: 0.7;
}

/* Social icons */
.social-icons {
  display: flex;
  gap: 1.2em;
  margin-top: 0.5em;
}

.social-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  transition: transform 0.3s, background-color 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.social-icon-wrapper:hover, .social-icon-wrapper.hovered {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.1);
}

.social-icon {
  width: 22px;
  height: 22px;
  color: #f8fafc;
  transition: transform 0.3s;
}

.social-icon-wrapper:hover .social-icon,
.social-icon-wrapper.hovered .social-icon {
  transform: scale(1.1);
}

.icon-tooltip {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: rgba(15, 23, 42, 0.9);
  color: #f8fafc;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, transform 0.3s, visibility 0.3s;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.social-icon-wrapper:hover .icon-tooltip,
.social-icon-wrapper.hovered .icon-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

/* Action buttons */
.action-buttons {
  text-align: center;
  margin-top: 2.5em;
  opacity: 0;
  transform: translateY(20px);
  animation: fade-in 0.8s forwards 1.2s;
}

.btn-gradient {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8em;
  padding: 0.9em 2.2em;
  border-radius: 50px;
  background: linear-gradient(90deg, #f59e0b, #ec4899, #8b5cf6);
  background-size: 200% 100%;
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 10px 25px -5px rgba(236, 72, 153, 0.3);
  transition: all 0.3s ease;
  overflow: hidden;
  z-index: 1;
}

.btn-gradient::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f59e0b, #ec4899, #8b5cf6);
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.btn-gradient:hover, .btn-gradient.hovered {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(236, 72, 153, 0.4);
  background-position: 100% 0;
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.btn-gradient:hover .btn-icon, .btn-gradient.hovered .btn-icon {
  transform: translateX(3px);
}

/* Animations */
@keyframes float-slow {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(5%, 5%);
  }
}

@keyframes fall {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  10% {
    opacity: 0.3;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}

@keyframes fade-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive styles */
@media (max-width: 768px) {
  .contact-info-card {
    padding: 2em;
    max-width: 90%;
  }

  .title {
    font-size: 1.8rem;
    margin-bottom: 1.5em;
  }

  .contact-item {
    gap: 0.3em;
  }

  .contact-value {
    font-size: 1rem;
  }

  .social-icon-wrapper {
    width: 42px;
    height: 42px;
  }

  .btn-gradient {
    padding: 0.8em 1.8em;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .contact-info-card {
    padding: 1.5em;
  }

  .title {
    font-size: 1.5rem;
  }

  .contact-label {
    font-size: 0.8rem;
  }

  .contact-value {
    font-size: 0.9rem;
  }

  .social-icon-wrapper {
    width: 38px;
    height: 38px;
  }

  .social-icon {
    width: 18px;
    height: 18px;
  }
}
</style>
