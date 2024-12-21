<script setup lang="ts">
import {useI18n} from "vue-i18n";

import imageUrlBuilder from "@sanity/image-url";
import type {SanityImageSource} from "@sanity/image-url/lib/types/types";

const {projectId, dataset} = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? imageUrlBuilder({projectId, dataset}).image(source)
        : null;

const {t: $t} = useI18n();
useHead({
  title: `${$t('project')} | ${$t('homePageTitle')}`,
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
})

import type {SanityDocument} from "@sanity/client";

const PROJECTS_QUERY = groq`*[_type == "project"]|order(publishedAt desc){_id, name, description, githubUrl, deployUrl, cover, techStack, progress}`;

const {data: projects} = await useSanityQuery<SanityDocument[]>(PROJECTS_QUERY);
</script>

<template>
  <UContainer>
    <div class="project-container">
      <ProjectItem
          v-for="project in projects"
          :key="project._id"
          :name="project.name"
          :description="project.description"
          :githubUrl="project.githubUrl || ''"
          :deployUrl="project.deployUrl || ''"
          :cover="project.cover ? urlFor(project.cover)?.url() : ''"
          :techStack="project.techStack"
          :progress="project.progress"
      />
    </div>
  </UContainer>
</template>

<style scoped>

</style>
