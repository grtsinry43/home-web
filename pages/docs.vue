<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t: $t} = useI18n();
useHead({
  title: `${$t('docs')} | ${$t('homePageTitle')}`,
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

window.location.href = 'https://docs.grtsinry43.com';
</script>

<template>

</template>

<style scoped>

</style>
