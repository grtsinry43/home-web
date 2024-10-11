<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();
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
</script>

<template>
  <div class="page-container">
    <div class="floating-shapes"></div>
    <div class="contact-info-card #000">
      <h1>{{ $t('contactMe') }}</h1>
      <ul>
        <li>
          <strong>{{ $t('website') }}:</strong> www.grtsinry43.com / blog.grtsinry43.com
        </li>
        <li>
          <strong>{{ $t('github') }}:</strong> grtsinry43
        </li>
        <li>
          <strong>{{ $t('email') }}:</strong> grtsinry43@outlook.com
        </li>
        <li>
          <strong>{{ $t('socialMedia') }}:</strong>
          <div class="social-icons">
            <a href="https://github.com/grtsinry43" target="_blank">
              <Icon name="i-grommet-icons:github" />
            </a>
            <a href="https://twitter.com/grtsinry43" target="_blank">
              <Icon name="i-grommet-icons:twitter" />
            </a>
          </div>
        </li>
      </ul>
      <div class="action-buttons">
        <a href="mailto:grtsinry43@outlook.com" class="btn-gradient">Send an Email</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.page-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  font-family: 'Poppins', sans-serif;
  padding: 20px;
  overflow: hidden;
}

.floating-shapes {
  position: absolute;
  top: -100px;
  left: -100px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #f093fb, #f5576c);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
  z-index: 0;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(50px, 50px);
  }
}

.contact-info-card {
  position: relative;
  background-color: white;
  padding: 2.5em;
  max-width: 600px;
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

h1 {
  text-align: center;
  margin-bottom: 1.5em;
  font-weight: 600;
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 1.5em;
}

strong {
  color: #555;
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icons img {
  width: 30px;
  height: 30px;
  transition: transform 0.3s ease;
}

.social-icons img:hover {
  transform: scale(1.2);
}

.action-buttons {
  text-align: center;
  margin-top: 2em;
}

.btn-gradient {
  display: inline-block;
  padding: 0.8em 2em;
  border-radius: 30px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  color: white;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.btn-gradient:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

@media (max-width: 768px) {
  .contact-info-card {
    padding: 2em;
  }

  h1 {
    font-size: 1.5em;
  }
}
</style>
