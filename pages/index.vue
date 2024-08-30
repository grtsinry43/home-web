<script setup lang="ts">
import {ref} from 'vue';
import {useI18n} from 'vue-i18n';

const showAlert = ref(true);
const {t, locale} = useI18n();

useHead({
  title: t('meta.title'),
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
})

useSeoMeta({
  title: t('meta.title'),
  ogTitle: t('meta.title'),
  description: t('meta.description'),
  ogDescription: t('meta.description'),
})
</script>


<template>
  <UContainer>
    <div class="alert-container" v-if="showAlert">
      <UAlert
          :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }"
          color="cyan"
          :title="t('alert.title')"
          @close="showAlert = false"
      />
    </div>
    <div class="content-container">
      <div class="top-left-container">
        <div class="slogan font-jb-mono">
          <p>Coding,</p>
          <p>build a better world</p>
          <p>together!</p>
        </div>
        <span class="slogan-cn" v-if="locale === 'zh'">{{ t('slogan.cn') }}</span>
        <br/>
        <div class="button-container">
          <UButton to="https://github.com/grtsinry43" target="_blank"
                   icon="i-grommet-icons:github" style="vertical-align: -4px"
                   class="btn-item github-link bg-blue-400 text-black dark:bg-blue-800 dark:text-white">
            {{ t('buttons.github') }}
          </UButton>
          <UButton :label="t('buttons.learningLog')" color="gray" class="btn-item">
            <template #trailing>
              <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5 btn-more-icon"/>
            </template>
          </UButton>
          <UButton color="gray" class="btn-item" disabled>
            {{ t('buttons.resume') }}
          </UButton>
        </div>
      </div>
      <div class="top-right-container">
        <div class="img-container">
          <img src="@/assets/home-img.svg" alt="">
        </div>
      </div>
    </div>
    <div class="card-container">
      <UCard class="item-card">
        <div class="item-card-inner flex flex-col">
          <span>{{ t('cards.currentProjects') }}</span>
          <ProjectPreview
              name="home-web"
              :description="t('projects.homeWeb.description')"
              detailsUrl="/project"
          />
          <ProjectPreview
              name="54sh-web"
              :description="t('projects.54shWeb.description')"
              detailsUrl="/project"
          />
          <ProjectPreview
              name="summer-checkin-2024"
              :description="t('projects.summerCheckin.description')"
              detailsUrl="/project"
          />
          <NuxtLink to="/project" label="查看更多" color="gray" class="btn-more">
            <span>{{ t('buttons.seeMore') }}</span>
            <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5"/>
          </NuxtLink>
        </div>
      </UCard>
      <UCard class="item-card">
        <span>{{ t('cards.learningProgress') }}</span>
      </UCard>
      <UCard class="item-card">
        <span>{{ t('cards.aboutMe') }}</span>
      </UCard>
    </div>
  </UContainer>
</template>


<style lang="less" scoped>
.content-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.top-left-container {
  flex: 1 1 400px;
}

.top-right-container {
  flex: 1 1 400px;
}

.slogan {
  font-weight: bolder;
  font-size: 40px;
  letter-spacing: -1px; //减小一下字距
  line-height: 50px;
  padding: 30px;
}

.slogan-cn {
  font-weight: bolder;
  padding: 30px;
  font-size: 16px;
}

.img-container {
  margin: 2em auto;
  width: 60%;
  text-align: center;

  img {
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
  }
}

@media (max-width: 800px) {
  .content-container {
    flex-direction: column;
  }
}

.button-container {
  margin: 30px;

  .btn-item, a {
    margin-right: 1em;
    margin-bottom: 1em;
  }
}

.alert-container {
  margin: 1em;
}

.item-card {
  margin: 1em;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item-card {
  flex: 1 1 calc(33.333% - 1em);
  margin: 0.5em;
}

@media (max-width: 1200px) {
  .item-card {
    flex: 1 1 calc(50% - 1em);
  }
}

@media (max-width: 800px) {
  .item-card {
    flex: 1 1 100%;
  }
}

.btn-more {
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
