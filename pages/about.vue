<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n();
useHead({
  title: `${t('about')} | ${t('homePageTitle')}`,
  meta: [
    {
      name: 'description',
      content: t('meta.description'),
    },
    {
      name: 'keywords',
      content: t('meta.keywords'),
    }
  ]
});

const personalDetails = [
  {label: t('about.name'), value: 'John Doe'},
  {label: t('about.language'), value: 'JavaScript, TypeScript, Python'},
  {label: t('about.toolchain'), value: 'VSCode, Git, Docker'},
  {label: t('about.experience'), value: '5 years of web development'}
];
</script>

<template>
  <UContainer>
    <section class="intro-section">
      <!--<h1 class="intro-title">{{ t('aboutMe') }}</h1>-->
      <!--<p class="intro-description">{{ t('about.description') }}</p>-->
    </section>

    <AboutMe />

    <!--<section class="details-section">-->
    <!--  <h2>{{ t('about.details') }}</h2>-->
    <!--  <ul>-->
    <!--    <li v-for="detail in personalDetails" :key="detail.label" class="detail-item">-->
    <!--      <strong>{{ detail.label }}:</strong> {{ detail.value }}-->
    <!--    </li>-->
    <!--  </ul>-->
    <!--</section>-->

    <!--<section class="tech-philosophy">-->
    <!--  <h2>{{ t('about.techPhilosophy') }}</h2>-->
    <!--  <p>{{ t('about.philosophyDescription') }}</p>-->
    <!--  <blockquote class="quote">{{ t('about.quote') }}</blockquote>-->
    <!--</section>-->

    <footer class="footer">
      <UButton to="https://github.com/yourprofile" icon="i-grommet-icons:github">
        {{ t('buttons.github') }}
      </UButton>
      <UButton to="/contact" color="gray">
        {{ t('buttons.contactMe') }}
      </UButton>
    </footer>
  </UContainer>
</template>

<style scoped>
.intro-section {
  text-align: center;
  margin-bottom: 2em;
  font-family: 'Fira Code', monospace;
}

.intro-title {
  font-size: 3rem;
  color: #2d2d2d;
}

.intro-description {
  font-size: 1.5rem;
  color: #4a4a4a;
}

.details-section {
  background-color: #f4f4f4;
  padding: 1em;
  border-radius: 10px;
  margin-bottom: 2em;
}

.detail-item {
  font-size: 1.2rem;
  font-family: 'Fira Code', monospace;
}

.tech-philosophy {
  padding: 1em;
  font-style: italic;
}

.quote {
  font-size: 1.2rem;
  border-left: 4px solid #ccc;
  padding-left: 1em;
  margin-top: 1em;
  color: #666;
}

.footer {
  display: flex;
  justify-content: center;
  gap: 1em;
  margin-top: 3em;
}
</style>
